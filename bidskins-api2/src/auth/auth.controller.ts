import { Controller, Request, Post, UseGuards, Get, Redirect } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { SteamAuthGuard } from './guards/steam-auth.guard'
import { SteamLoginResponse } from './types'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('local')
	async login(@Request() req) {
		return this.authService.login(req.user)
	}

	@UseGuards(SteamAuthGuard)
	@Get('steam')
	steamLogin() {
		return true
	}

	@UseGuards(SteamAuthGuard)
	@Get('steam/return')
	@Redirect(process.env.WEBSITE_URL)
	async steamLoginReturn(@Request() req) {
		try {
			const {
				id,
				displayName: username,
				_json: { avatarfull: avatar },
			}: SteamLoginResponse = req.user

			const { accessToken } = await this.authService.steamLogin({ id, username, avatar })

			return {
				url: `${process.env.WEBSITE_URL}/auth?token=${accessToken}`,
			}
		} catch (e) {}
	}
}
