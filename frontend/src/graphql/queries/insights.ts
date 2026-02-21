import { gql } from "@apollo/client";

export const GET_INSIGHTS = gql`
  query GetInsights {
    getInsights {
      categoryMoreFrequent
      totalBalance
      totalCategories
      totalMonthlyExpenses
      totalMonthlyIncome
      totalTransactions
    }
  }
`;
