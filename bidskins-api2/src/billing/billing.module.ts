import { HttpModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuctionsModule } from '../auctions/auctions.module'
import { UsersModule } from '../users/users.module'
import { BillingController } from './billing.controller'
import { BillingService } from './billing.service'
import { PackageEntity } from './entities/package.entity'

@Module({
	imports: [HttpModule, AuctionsModule, UsersModule, TypeOrmModule.forFeature([PackageEntity])],
	controllers: [BillingController],
	providers: [BillingService],
})
export class BillingModule {}
