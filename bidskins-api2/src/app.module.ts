import * as Joi from '@hapi/joi'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { EventsModule } from './events/events.module'
import { BillingModule } from './billing/billing.module'
import { StripeModule } from 'nestjs-stripe'
import { CommonModule } from './common/common.module'
import { AuctionsModule } from './auctions/auctions.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				DATABASE_HOST: Joi.required(),
				DATABASE_PORT: Joi.number().default(5432).required(),
				DATABASE_USER: Joi.string().default('postgres').required(),
				DATABASE_PASSWORD: Joi.string().default('test_password').required(),
				DATABASE_NAME: Joi.string().default('postgres').required(),
				API_URL: Joi.string().required(),
				STRIPE_SIGNING_SECRET: Joi.string().required(),
				WEBSITE_URL: Joi.string().required(),
			}),
		}),
		AuthModule,
		UsersModule,
		StripeModule.forRoot({
			apiKey: process.env.STRIPE_API_KEY || 'sk_test_xHsqjvAHHI2ybK1QDNmRyDIn00kP3VT9aR',
			apiVersion: '2020-08-27',
		}),
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: 'postgres',
				host: process.env.DATABASE_HOST,
				port: +process.env.DATABASE_PORT,
				username: process.env.DATABASE_USER,
				password: process.env.DATABASE_PASSWORD,
				database: process.env.DATABASE_NAME,
				autoLoadEntities: true,
				synchronize: process.env.NODE_ENV === 'DEV',
			}),
		}),
		ScheduleModule.forRoot(),
		CommonModule,
		EventsModule,
		BillingModule,
		AuctionsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
