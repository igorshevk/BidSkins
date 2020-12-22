import { Module } from '@nestjs/common'
import { AuctionsModule } from '../auctions/auctions.module'
import { AuctionsService } from '../auctions/auctions.service'
import { EventsGateway } from './events.gateway'

@Module({
	imports: [AuctionsModule],
	providers: [EventsGateway],
	exports: [EventsGateway],
})
export class EventsModule {}
