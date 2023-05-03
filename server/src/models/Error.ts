import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class Error {
    @Field(() => Number)
    status: number;

    @Field(() => String)
    message: string;

    constructor(message: string, status: number) {
        Object.assign(this, { message, status });
    }
}