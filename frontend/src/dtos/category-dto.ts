import { COLORS, ICONS } from "@/lib/utils";
import type { User } from "./user-dto";
import z from "zod";

export interface Category {
  id: string;
  title: string;
  description?: string;
  color: keyof typeof COLORS;
  icon: keyof typeof ICONS;
  countTransactions: number;
  transactionsAmount: number;
  createdAt: string;
  updatedAt?: string;
  user: User;
}

const iconKeys = Object.keys(ICONS) as Array<keyof typeof ICONS>;
const colorKeys = Object.keys(COLORS) as Array<keyof typeof COLORS>;

export const categoryInput = z.object({
  id: z.string().optional(),
  title: z.string().nonempty("O nome é obrigatório"),
  description: z.string().optional(),
  icon: z.enum(iconKeys, { error: "O ícone é obrigatório" }),
  color: z.enum(colorKeys, { error: "A cor é obrigatória" }),
});

export type CategoryInput = z.infer<typeof categoryInput>;
