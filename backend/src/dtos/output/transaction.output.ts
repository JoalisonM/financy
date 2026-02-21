import { ObjectType, Field, Int } from "type-graphql";
import { TransactionModel } from "../../models/transaction.model";

@ObjectType()
export class PaginatedTransactions {
  @Field(() => [TransactionModel], { nullable: true })
  items?: TransactionModel[];

  @Field(() => Int, { nullable: true })
  totalElements?: number;

  @Field(() => Int, { nullable: true })
  totalPages?: number;

  @Field(() => Int, { nullable: true })
  currentPage?: number;
}
