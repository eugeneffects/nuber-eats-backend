import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { MutationOutput } from "src/common/dtos/output.dto";
import { Verification } from "../entities/verification.entity";

<<<<<<< Updated upstream
@InputType()
export class VerifyEmailInput extends PickType(Verification, ['code']) { }

@ObjectType()
export class VerifyEmailOutput extends MutationOutput {

}
=======
@ObjectType()
export class VerifyEmailOutput extends MutationOutput {

}

@InputType()
export class VerifyEmailInput extends PickType(Verification, ['code']) { }
>>>>>>> Stashed changes
