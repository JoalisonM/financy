import { prismaClient } from "../../prisma/prisma";
import { TransactionInput } from "../dtos/input/transaction.input";

export class TransactionService {
  async listTransactions(userId: string) {
    return await prismaClient.transaction.findMany({
      where: {
        userId,
      },
    });
  }

  async createTransaction(userId: string, data: TransactionInput) {
    return await prismaClient.transaction.create({
      data: {
        description: data.description,
        type: data.type,
        value: data.value,
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
        value: data.value,
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
}
