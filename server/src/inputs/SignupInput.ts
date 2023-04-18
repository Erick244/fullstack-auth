import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export default class SignupInput {
    @Field()
    @Length(5, 20)
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @Length(8, 16)
    password: string;

    @Field()
    @Length(8, 16)
    confirmPassword: string;
}
