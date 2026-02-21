import { TYPE } from "@prisma/client";
import { prismaClient } from "../../prisma/prisma";
import { TransactionInput } from "../dtos/input/transaction.input";

type TransactionFilters = {
  description?: string;
  type?: TYPE;
  categoryId?: string;
  to?: string;
  from?: string;
  page?: number;
  limit?: number;
};

export class TransactionService {
  async findTransactionById(userId: string, id: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        userId,
        id,
      },
    });

    if (!transaction) throw new Error("Transação não existe");

    return transaction;
  }

  async listTransactions(
    userId: string,
    {
      description,
      type,
      categoryId,
      to,
      from,
      limit = 10,
      page = 0,
    }: TransactionFilters,
  ) {
    const whereClause = {
      userId,
      description: description ? { contains: description } : undefined,
      type,
      categoryId,
      date: {
        gte: from ? new Date(from) : undefined,
        lte: to ? new Date(to) : undefined,
      },
    };

    const [items, totalElements] = await prismaClient.$transaction([
      prismaClient.transaction.findMany({
        where: whereClause,
        skip: page * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prismaClient.transaction.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalElements / limit);

    return {
      items,
      totalPages,
      totalElements,
      currentPage: page,
    };
  }

  async createTransaction(userId: string, data: TransactionInput) {
    return await prismaClient.transaction.create({
      data: {
        description: data.description,
        type: data.type,
        amount: data.amount,
        date: data.date ? new Date(data.date) : undefined,
        userId,
        categoryId: data.categoryId,
      },
    });
  }

  async updateTransaction(userId: string, id: string, data: TransactionInput) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        userId,
        id,
      },
    });

    if (!transaction) throw new Error("Transação não encontrada");

    return await prismaClient.transaction.update({
      where: { id },
      data: {
        description: data.description,
        type: data.type,
        amount: data.amount,
        date: data.date ? new Date(data.date) : undefined,
        categoryId: data.categoryId,
      },
    });
  }

  async deleteTransaction(userId: string, id: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        userId,
        id,
      },
    });

    if (!transaction) throw new Error("Transação não encontrada");

    return await prismaClient.transaction.delete({ where: { id } });
  }

  async countTransactionsByCategoryId(userId: string, categoryId: string) {
    return await prismaClient.transaction.count({
      where: {
        userId,
        categoryId,
        category: {
          userId,
        },
      },
    });
  }

  async totalTransactionsAmountByCategoryId(
    userId: string,
    categoryId: string,
  ) {
    const result = await prismaClient.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        categoryId,
      },
    });

    return result._sum.amount ?? 0;
  }
}
