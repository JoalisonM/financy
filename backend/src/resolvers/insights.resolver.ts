import { Args, Query } from "type-graphql";
import { InsightsService } from "../services/insights.service";
import { InsightsModel } from "../models/insights.model";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";

export class InsightsResolver {
  private insightsService = new InsightsService();

  @Query(() => InsightsModel)
  async getInsights(@GqlUser() user: User): Promise<InsightsModel> {
    const [
      totalTransactions,
      totalBalance,
      totalMonthlyIncome,
      totalMonthlyExpenses,
      totalCategories,
      categoryMoreFrequent,
    ] = await Promise.all([
      this.insightsService.totalTransactions(user.id),
      this.insightsService.totalBalance(user.id),
      this.insightsService.totalMonthlyIncome(user.id),
      this.insightsService.totalMonthlyExpenses(user.id),
      this.insightsService.totalCategories(user.id),
      this.insightsService.categoryMoreFrequent(user.id),
    ]);

    return {
      totalTransactions,
      totalBalance,
      totalMonthlyIncome,
      totalMonthlyExpenses,
      totalCategories,
      categoryMoreFrequent: categoryMoreFrequent ?? "Nenhuma",
    };
  }
}
