import { HttpModule, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { TransactionEntity } from './entities/transaction.entity'

@Module({
	imports: [HttpModule, TypeOrmModule.forFeature([UserEntity, TransactionEntity])],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
