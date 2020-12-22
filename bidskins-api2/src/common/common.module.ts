import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { JsonBodyMiddleware } from './middleware/json-body.middleware'
import { RawBodyMiddleware } from './middleware/raw-body.middleware'

@Module({})
export class CommonModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(RawBodyMiddleware)
			.forRoutes({
				path: '/billing/checkout-webhook',
				method: RequestMethod.POST,
			})
			.apply(JsonBodyMiddleware)
			.forRoutes('*')
	}
}
