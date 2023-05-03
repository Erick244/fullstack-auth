import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export default class User {
    @Field((_type) => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

	@Field()
	token?: string;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => Date)
    createdAt: Date;
}
