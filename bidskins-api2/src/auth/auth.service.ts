import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { UpdateUserDto } from '../users/dto/update-user.dto'

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

	async validateUser(username: string, password: string): Promise<any> {
		// const user = await this.usersService.findOne(username)
		// if (!user) {
		// 	return null
		// }

		// const { password_hash, ...result } = user

		// const isPasswordMatching = await bcrypt.compare(password, password_hash)

		// if (isPasswordMatching) {
		// 	return result
		// }

		return null
	}

	async login(user: any) {
		const payload = { id: user.id, username: user.username }
		return {
			accessToken: this.jwtService.sign(payload),
		}
	}

	async steamLogin(user: UpdateUserDto) {
		const payload = { id: user.id }

		this.usersService.upsert(user.id, user)

		return {
			accessToken: this.jwtService.sign(payload),
		}
	}
}
