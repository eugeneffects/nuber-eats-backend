import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthUser } from "src/auth/auth-user.decorator";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { VerifyEmailInput, VerifyEmailOutput } from "./dtos/verifiy-email.dto";


@Resolver(of => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService
    ) { }

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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
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


    @Query(returns => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser: User) {
        console.log("fuck u")
        return authUser
    }

    @Query(returns => UserProfileOutput)
    async userProfile(
        @Args() userProfileInput: UserProfileInput,
    ): Promise<UserProfileOutput> {
        return this.usersService.findById(userProfileInput.userId);
    }
<<<<<<< Updated upstream

    @UseGuards(AuthGuard)
    @Mutation(returns => EditProfileOutput)
    async editProfile(@AuthUser() authUser: User, @Args('input') editProfileInput: EditProfileInput): Promise<EditProfileOutput> {
        try {
=======
    @UseGuards(AuthGuard)

    @Mutation(returns => EditProfileOutput)
    async editProfile(@AuthUser() authUser: User, @Args('input') editProfileInput: EditProfileInput): Promise<EditProfileOutput> {
        try {
            console.log("프로파일 수정")
>>>>>>> Stashed changes
            await this.usersService.editProfile(authUser.id, editProfileInput)
            return { ok: true }
        } catch (error) {
            return { ok: false, error }
        }
    }

    @Mutation(returns => VerifyEmailOutput)
    async verifyEmail(@Args('input') { code }: VerifyEmailInput): Promise<VerifyEmailOutput> {
        try {
            await this.usersService.verifyEmail(code)
            return { ok: true }
        } catch (error) {
            return { ok: false, error }
        }
    }
}