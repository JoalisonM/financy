import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { UserModel } from "./user.model";
import { CategoryModel } from "./category.model";
import { TYPE } from "@prisma/client";

registerEnumType(TYPE, {
  name: "TYPE",
  description: "Transaction type",
});

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  description!: string;

  @Field(() => Number)
  amount!: number;

  @Field(() => TYPE)
  type!: string;

  @Field(() => String)
  categoryId!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
