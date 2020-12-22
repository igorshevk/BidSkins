import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TransactionEntity } from '../users/entities/transaction.entity'
import { UserEntity } from '../users/entities/user.entity'
import { AuctionsController } from './auctions.controller'
import { AuctionsService } from './auctions.service'
import { AuctionEntity } from './entities/auction.entity'

@Module({
	imports: [TypeOrmModule.forFeature([AuctionEntity, UserEntity, TransactionEntity])],
	controllers: [AuctionsController],
	providers: [AuctionsService],
	exports: [AuctionsService],
})
export class AuctionsModule {}
