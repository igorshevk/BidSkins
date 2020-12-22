import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bodyParser: false })

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		})
	)
	app.enableCors()

	const options = new DocumentBuilder()
		.setTitle('API')
		.setDescription('API')
		.setVersion('1.0')
		.addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
		.build()

	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('docs', app, document)

	await app.listen(5000)
}
bootstrap()
