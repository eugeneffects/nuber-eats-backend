import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { MutationOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@ArgsType()
export class UserProfileInput{
    @Field(is => Number)
    userId: number;
}


@ObjectType()
export class UserProfileOutput extends MutationOutput {
    @Field(is => User, {nullable: true})
    user?: User
}