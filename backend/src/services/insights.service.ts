import { TYPE } from "@prisma/client";
import { prismaClient } from "../../prisma/prisma";
import { TransactionInput } from "../dtos/input/transaction.input";

export class InsightsService {
  async totalTransactions(userId: string) {
    return await prismaClient.transaction.count({
      where: {
        userId,
      },
    });
  }

  async totalBalance(userId: string) {
    const result = await prismaClient.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        type: "INCOME",
      },
    });

    return result._sum.amount ?? 0;
  }

  async totalMonthlyIncome(userId: string) {
    const result = await prismaClient.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        type: "INCOME",
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        },
      },
    });

    return result._sum.amount ?? 0;
  }

  async totalMonthlyExpenses(userId: string) {
    const result = await prismaClient.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        type: "EXPENSE",
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        },
      },
    });

    return result._sum.amount ?? 0;
  }

  async totalCategories(userId: string) {
    return await prismaClient.category.count({
      where: {
        userId,
      },
    });
  }

  async categoryMoreFrequent(userId: string) {
    const result = await prismaClient.transaction.groupBy({
      by: ["categoryId"],
      where: {
        userId: userId,
      },
      _count: {
        categoryId: true,
      },
      orderBy: {
        _count: {
          categoryId: "desc",
        },
      },
      take: 1,
    });

    if (result.length === 0) return null;

    const categoryDetails = await prismaClient.category.findUnique({
      where: { id: result[0].categoryId },
    });

    return categoryDetails?.title;
  }
}
