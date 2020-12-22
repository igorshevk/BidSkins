import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { jwtConstants } from '../constants'
import * as jwt from 'jsonwebtoken'
import { WsException } from '@nestjs/websockets'

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const client = context.switchToWs().getClient()

		try {
			// check if there is an auth header
			if (client.handshake.query.authorization) {
				const bearerToken = client.handshake.query.authorization.split(' ')[1]

				// verify if the bearer token matches with our systems
				const user = jwt.verify(bearerToken, jwtConstants.secret)

				// lets us access the user after this guard, input must be a json with something inside already
				context.switchToWs().getData().user = user

				return true
			}
			return false
		} catch (err) {
			console.log(err)
			throw new WsException(err.message)
		}
	}
}
