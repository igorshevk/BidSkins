import { Strategy } from 'passport-steam'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
	constructor() {
		super({
			returnURL: `${process.env.API_URL}/auth/steam/return`,
			realm: process.env.API_URL,
			apiKey: '1389056DE3F2A929E10E24F4B59C1454',
			profile: true,
		})
	}

	async validate(identifier, profile, done: (err, user) => any) {
		return done(null, profile)
	}
}
