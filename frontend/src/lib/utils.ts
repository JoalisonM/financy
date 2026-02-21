import { cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as Icons from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return value?.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatDate(date: string) {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;

  return format(parsedDate, "dd/MM/yy", { locale: ptBR });
}

export const ICONS = {
  BriefcaseBusiness: Icons.BriefcaseBusiness,
  CarFront: Icons.CarFront,
  HeartPulse: Icons.HeartPulse,
  PiggyBank: Icons.PiggyBank,
  ShoppingCart: Icons.ShoppingCart,
  Ticket: Icons.Ticket,
  ToolCase: Icons.ToolCase,
  Utensils: Icons.Utensils,
  PawPrint: Icons.PawPrint,
  House: Icons.House,
  Gift: Icons.Gift,
  Dumbbell: Icons.Dumbbell,
  BookOpen: Icons.BookOpen,
  BaggageClaim: Icons.BaggageClaim,
  Mailbox: Icons.Mailbox,
  ReceiptText: Icons.ReceiptText,
} as const;

export const COLORS = {
  GREEN: {
    base: "green-base",
    light: "green-light",
    value: "GREEN",
  },
  BLUE: {
    base: "blue-base",
    light: "blue-light",
    value: "BLUE",
  },
  PURPLE: {
    base: "purple-base",
    light: "purple-light",
    value: "PURPLE",
  },
  PINK: {
    base: "pink-base",
    light: "pink-light",
    value: "PINK",
  },
  RED: {
    base: "red-base",
    light: "red-light",
    value: "RED",
  },
  ORANGE: {
    base: "orange-base",
    light: "orange-light",
    value: "ORANGE",
  },
  YELLOW: {
    base: "yellow-base",
    light: "yellow-light",
    value: "YELLOW",
  },
} as const;

export const colorVariants = cva("w-10 h-5 rounded-lg", {
  variants: {
    color: {
      green: "bg-green-light text-green-base",
      blue: "bg-blue-light text-blue-base",
      purple: "bg-purple-light text-purple-base",
      pink: "bg-pink-light text-pink-base",
      red: "bg-red-light text-red-base",
      orange: "bg-orange-light text-orange-base",
      yellow: "bg-yellow-light text-yellow-base",
    },
  },
});
