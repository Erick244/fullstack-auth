import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export default class LoginInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @Length(8, 16)
    password: string;
}
