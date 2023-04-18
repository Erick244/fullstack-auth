import { IsEmail, Length } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
    @Field((_type) => ID)
    id: string;

    @Field()
    @Length(5, 20)
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @Length(8, 16)
    password?: string;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => Date)
    createdAt: Date;
}

@ObjectType()
export class UserWhithToken {
	@Field()
	user: User;

	@Field()
	token: string;
}
