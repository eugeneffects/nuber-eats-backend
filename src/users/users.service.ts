import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { JwtService } from "src/jwt/jwt.service";
import { UserProfileOutput } from "./dtos/user-profile.dto";
import { EditProfileInput } from "./dtos/edit-profile.dto";
import { Verification } from "./entities/verification.entity";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(Verification)
        private readonly verifications: Repository<Verification>,
        private readonly jwtService: JwtService,
        private readonly MailService: MailService,
    ) { }


    async createAccount({ email, password, role }: CreateAccountInput): Promise<[boolean, string?]> {
        try {
            const exists = await this.users.findOne({ email })
            console.log(exists)
            if (exists) {
                return [false, "There is a user with that email already"];
            }
            const user = await this.users.save(this.users.create({ email, password, role }));
            const verification = await this.verifications.save(this.verifications.create({
                user
            }))
            this.MailService.sendVerificationEmail(user.email, verification.code)
            return [true]
        } catch (e) {
            return [false, "Couldn't create account"]
        }
    }

    async login({ email, password }: LoginInput): Promise<{ ok: boolean, error?: string, token?: string }> {
        try {
            const user = await this.users.findOne({ email }, { select: ['password'] })
            if (!user) {
                return { ok: false, error: "User not found" }
            }
            const token = this.jwtService.sign(user.id)
            const passwordCorrect = await user.checkPassword(password);
            if (!passwordCorrect) {
                return { ok: false, error: "Wrong Password" }
            }
            return { ok: true, token }
        } catch (error) {
            return {
                ok: false,
                error
            }
        }
    }

    async findById(id: number): Promise<UserProfileOutput> {
        try {
            const user = await this.users.findOneOrFail({ id });
            return {
                ok: true,
                user,
            };
        } catch (error) {
            return { ok: false, error: 'User Not Found' };
        }
    }

    async editProfile(userId: number, { email, password }: EditProfileInput) {
        const user = await this.users.findOne(userId);
        if (email) {
            console.log("접속")
            user.email = email
            user.verified = false
            const verification = await this.verifications.save(this.verifications.create({ user }))
            this.MailService.sendVerificationEmail(user.email, verification.code)
        }
        if (password) {
            user.password = password
        }
        return this.users.save(user)
    }

    async verifyEmail(code: string): Promise<boolean> {
        try {
            const verification = this.verifications.findOne({ code }, { relations: ['user'] })
            if (verification) {
                (await verification).user.verified = true
                this.users.save((await verification).user)
                await this.verifications.delete((await verification).id)
                return true
            }
            throw new Error()
        } catch (error) {
            console.log(error)
            return false
        }

    }
}