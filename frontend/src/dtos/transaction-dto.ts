import z from "zod";
import type { Category } from "./category-dto";
import type { User } from "./user-dto";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: string;
  categoryId: string;
  category: Category;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionResponse {
  items: Transaction[];
  currentPage: number;
  totalElements: number;
  totalPages: number;
}

export interface TransactionFilters {
  description?: string;
  type?: "INCOME" | "EXPENSE";
  categoryId?: string;
  to?: string | Date;
  from?: string | Date;
  page?: number;
  limit?: number;
}

export const transactionInput = z.object({
  id: z.string().optional(),
  description: z.string().nonempty("A descrição é obrigatória"),
  categoryId: z.string().nonempty("A categoria é obrigatória"),
  date: z.date().optional(),
  amount: z.float32().nonnegative().nonoptional("O valor é obrigatório"),
  type: z.enum(["INCOME", "EXPENSE"], { error: "O tipo é obrigatório" }),
});

export type TransactionInput = z.infer<typeof transactionInput>;
