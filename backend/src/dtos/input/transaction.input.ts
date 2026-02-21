import { Field, GraphQLISODateTime, InputType } from "type-graphql";
import { TYPE } from "@prisma/client";

@InputType()
export class TransactionInput {
  @Field(() => String)
  description!: string;

  @Field(() => Number)
  amount!: number;

  @Field(() => TYPE)
  type!: TYPE;

  @Field(() => String)
  categoryId!: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;
}
