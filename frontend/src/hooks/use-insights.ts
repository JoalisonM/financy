import type { Insights } from "@/dtos/insights-dto";
import { GET_INSIGHTS } from "@/graphql/queries/insights";
import { useQuery } from "@apollo/client/react";

export const useInsights = () => {
  const {
    data: insights,
    loading: isLoading,
    refetch: refetchInsights,
  } = useQuery<{ getInsights: Insights }>(GET_INSIGHTS);

  return {
    isLoading,
    refetchInsights,
    insights: insights?.getInsights,
  };
};
