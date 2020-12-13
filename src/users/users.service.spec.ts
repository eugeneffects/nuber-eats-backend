import { User } from './entities/user.entity';
import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { UsersService } from "./users.service"
import { Verification } from './entities/verification.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';


const mockRespository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
}

const mockJwtService = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
}

const mockEmailService = {
    sendverification: jest.fn(),
}

type MockRepository<T = any> = Partial<Record<keyof Repository<User>, jest.Mock>>


describe("UserService", () => {

    let service: UsersService
    let usersRepository: MockRepository

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User), useValue: mockRespository
                },
                {
                    provide: getRepositoryToken(Verification), useValue: mockRespository
                },
                {
                    provide: JwtService, useValue: mockJwtService
                },
                {
                    provide: MailService, useValue: mockEmailService
                },
            ],
        }).compile()
        service = module.get<UsersService>(UsersService);
        usersRepository = module.get(getRepositoryToken(User));
    })

    describe('createAccount', () => {
        it('should fail if user exists', async () => {
            usersRepository.findOne.mockResolvedValue({
                id: 1,
                email: 'lalalal'
            })
            const result = await service.createAccount({
                email: 'lalal',
                password: '1',
                role: 0,
            })
            expect(result).toMatchObject({
                ok: false,
                error: 'there is a user with that email already.'
            })
        })
    })

    it('be defined', () => {
        expect(service).toBeDefined()
    })

    it.todo('login')
    it.todo('findById')
    it.todo('editProfile')
    it.todo('verifyEmail')
})