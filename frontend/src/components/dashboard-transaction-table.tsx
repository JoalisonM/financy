import type { Transaction } from "@/dtos/transaction-dto";
import {
  COLORS,
  colorVariants,
  formatCurrency,
  formatDate,
  ICONS,
} from "@/lib/utils";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import clsx from "clsx";
import { Badge } from "./ui/badge";
import type { VariantProps } from "class-variance-authority";

type ColorVariant = VariantProps<typeof colorVariants>["color"];

export function DashboardTransactionTable({
  transactions,
}: {
  transactions?: Transaction[];
}) {
  return (
    <table className="w-full text-sm">
      <tbody className="divide-y bg-white rounded-b-2xl">
        {transactions?.map((transaction) => {
          const Icon = ICONS[transaction.category.icon];
          const isIncome = transaction.type === "INCOME";
          const color = COLORS[transaction.category.color];
          const colorVariant = color.value.toLowerCase() as ColorVariant;

          return (
            <tr
              key={transaction.id}
              className="h-20 border-b border-gray-200 hover:bg-gray-100/50 last:rounded-b-2xl"
            >
              <td className="h-full px-6 flex items-center gap-4">
                <div
                  className={clsx(
                    colorVariants({ color: colorVariant }),
                    "h-10 w-10 rounded-xl flex items-center justify-center",
                  )}
                >
                  <Icon className="h-5 w-5 " />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-base text-gray-800">
                    {transaction.description}
                  </span>

                  <span className="text-sm text-gray-600">
                    {formatDate(transaction.date)}
                  </span>
                </div>
              </td>

              <td className="h-full px-6 text-center">
                <Badge
                  className={clsx(
                    colorVariants({ color: colorVariant }),
                    "h-7 font-medium text-sm leading-5 inline-flex items-center justify-center rounded-full border border-transparent px-3 py-0.5 w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
                  )}
                >
                  {transaction.category.title}
                </Badge>
              </td>

              <td className="h-full px-6 text-right">
                <div
                  className={`flex items-center justify-end gap-2 font-medium ${
                    isIncome ? "text-green-600" : "text-red-dark"
                  }`}
                >
                  {isIncome ? (
                    <>
                      + ${formatCurrency(transaction.amount)}
                      <ArrowUpCircle className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      - ${formatCurrency(transaction.amount)}
                      <ArrowDownCircle className="h-4 w-4" />
                    </>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
