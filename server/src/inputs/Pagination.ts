import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export default class Pagination {
    @Field(() => Number)
    @IsNotEmpty()
    take: number;

    @Field(() => Number)
    @IsNotEmpty()
    skip: number;
}