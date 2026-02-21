import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class InsightsModel {
  @Field(() => Number, { nullable: true })
  totalBalance?: number;

  @Field(() => Number, { nullable: true })
  totalMonthlyIncome?: number;

  @Field(() => Number, { nullable: true })
  totalMonthlyExpenses?: number;

  @Field(() => Number, { nullable: true })
  totalCategories?: number;

  @Field(() => Number, { nullable: true })
  totalTransactions?: number;

  @Field(() => String, { nullable: true })
  categoryMoreFrequent?: string;
}
