import { User } from './entities/user.entity';
import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { UsersService } from "./users.service"
import { Verification } from './entities/verification.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';


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

describe("UserService", () => {

    let service:UsersService

beforeAll(async() => {
    const module = await Test.createTestingModule({
        providers: [
        UsersService,
        {
            provide: getRepositoryToken(User), useValue:mockRespository
        },
        {
            provide: getRepositoryToken(Verification), useValue:mockRespository
        },
        {
            provide: JwtService, useValue:mockJwtService
        },
        {
            provide: MailService, useValue:mockEmailService
        },
    ],
    }).compile()
    service = module.get<UsersService>(UsersService);
})
    
    it('be defined', () => {
        expect(service).toBeDefined()
    })

    it.todo('createAccount')
    it.todo('login')
    it.todo('findById')
    it.todo('editProfile')
    it.todo('verifyEmail')
})