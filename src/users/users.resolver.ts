import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";


@Resolver(of => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Query(returns => User)
    me(@Context() context) {
        console.log(context)
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        try {
            const [ok, error] = await this.usersService.createAccount(createAccountInput)
            return {
                ok,
                error
            }
        } catch (error) {
            return {

                error,
                ok: false
            }
        }
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        try {
            return this.usersService.login(loginInput)
        } catch (error) {
            return { ok: false, error }
        }
    }
}