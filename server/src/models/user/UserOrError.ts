import { Field, ObjectType } from "type-graphql";
import Error from "../Error";
import User from "./User";

@ObjectType()
export default class UserOrError {
    @Field(() => User || [User], { nullable: true })
    data?: User | User[];

    @Field(() => Error, { nullable: true })
    error?: Error;
}
