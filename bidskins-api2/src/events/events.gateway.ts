import { Logger, UseGuards } from '@nestjs/common'
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { AuctionsService } from '../auctions/auctions.service'
import { WsJwtAuthGuard } from '../auth/guards/ws-jwt-auth.guard'
import { Cron, CronExpression } from '@nestjs/schedule'

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
	constructor(private readonly auctionsService: AuctionsService) {}

	@WebSocketServer() server: Server

	private logger = new Logger('EventsGateway')

	async handleConnection(client) {
		this.logger.log('New client connected')

		// load all auctions and send to client
		const auctions = await this.auctionsService.findAll()
		client.emit('load-auctions', auctions)
	}

	handleDisconnect(client) {
		this.logger.log('Client disconnnected')
	}

	@UseGuards(WsJwtAuthGuard)
	@SubscribeMessage('bid')
	async bid(@MessageBody() data: { id: number; user: { id: string } }, @ConnectedSocket() client: Socket) {
		const updatedValues = await this.auctionsService.bidOnAuction(data.id, data.user.id)

		if (!updatedValues) {
			return 'FAILURE'
		}

		const [updatedAuction, updatedUser] = updatedValues

		if (updatedAuction) {
			this.server.sockets.emit('update-auction', updatedAuction)
		}

		client.emit('tokens', { tokens: updatedUser.tokens })

		return 'SUCCESS'
	}

	@Cron(CronExpression.EVERY_10_SECONDS)
	async completeAuctions() {
		const completedAuctions = await this.auctionsService.fulfillUncompletedAuctions()

		this.server.sockets.emit('complete-auctions', completedAuctions)
	}
}
