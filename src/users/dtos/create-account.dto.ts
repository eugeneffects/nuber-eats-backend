<<<<<<< Updated upstream
import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { MutationOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";


@InputType()
export class CreateAccountInput extends PickType(User, [
    'email',
    'password',
    'role'
]) { }


@ObjectType()
=======
import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { MutationOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";


@InputType()
export class CreateAccountInput extends PickType(User, [
    'email',
    'password',
    'role'
]) { }


@ObjectType()
>>>>>>> Stashed changes
export class CreateAccountOutput extends MutationOutput { }