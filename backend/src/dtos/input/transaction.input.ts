import { Field, InputType } from "type-graphql";
import { TYPE } from "@prisma/client";

@InputType()
export class TransactionInput {
  @Field(() => String)
  description!: string;

  @Field(() => Number)
  value!: number;

  @Field(() => TYPE)
  type!: TYPE;

  @Field(() => String)
  categoryId!: string;
}
