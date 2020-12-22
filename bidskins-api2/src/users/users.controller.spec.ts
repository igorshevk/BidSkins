import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Connection, Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
const createMockRepository = <T = any>(): MockRepository<T> => ({
	findOne: jest.fn(),
	create: jest.fn(),
})

describe('UsersController', () => {
	let controller: UsersController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				UsersService,
				{
					provide: Connection,
					useValue: {},
				},
				{
					provide: getRepositoryToken(UserEntity),
					useValue: createMockRepository(),
				},
			],
		}).compile()

		controller = module.get<UsersController>(UsersController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
