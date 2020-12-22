import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Connection, Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
import { UsersService } from './users.service'

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
const createMockRepository = <T = any>(): MockRepository<T> => ({
	findOne: jest.fn(),
	update: jest.fn(),
	create: jest.fn(),
})

describe('UsersService', () => {
	let service: UsersService
	let userRepository: MockRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
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

		service = module.get<UsersService>(UsersService)
		userRepository = module.get<MockRepository>(getRepositoryToken(UserEntity))
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('findOne', () => {
		describe('when user with id exists', () => {
			it('should return the user object', async () => {
				const id = '76561198169324931'
				const expectedUser = { id: '76561198169324931', username: 'SubtleDeer' }

				userRepository.findOne.mockReturnValue(expectedUser)
				const user = await service.findOne(id)

				expect(user).toEqual(expectedUser)
			})
		})
		describe('otherwise', () => {
			it('should throw the "NotFoundException"', async () => {
				const id = '76561198169324931'
				userRepository.findOne.mockReturnValue(undefined)

				try {
					await service.findOne(id)
				} catch (e) {
					expect(e).toBeInstanceOf(NotFoundException)
				}
			})
		})
	})
})
