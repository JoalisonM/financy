import type { Transaction } from "@/dtos/transaction-dto";
import {
  COLORS,
  colorVariants,
  formatCurrency,
  formatDate,
  ICONS,
} from "@/lib/utils";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Edit,
  Inbox,
  Trash,
} from "lucide-react";
import { Button } from "./ui/button";
import clsx from "clsx";
import { Badge } from "./ui/badge";
import type { VariantProps } from "class-variance-authority";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";

type ColorVariant = VariantProps<typeof colorVariants>["color"];

export function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}: {
  transactions?: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (categoryId: string) => void;
}) {
  return (
    <>
      <table className="w-full text-sm">
        <thead className="uppercase text-xs rounded-t-2xl bg-white text-gray-500 border-b border-gray-200">
          <tr>
            <th className="font-medium text-left px-6 py-5 rounded-tl-2xl">
              Descrição
            </th>
            <th className="font-medium text-center px-6 py-5">Data</th>
            <th className="font-medium text-center px-6 py-5">Categoria</th>
            <th className="font-medium text-center px-6 py-5">Tipo</th>
            <th className="font-medium text-right px-6 py-5">Valor</th>
            <th className="font-medium text-right px-6 py-5 rounded-tr-2xl">
              Ações
            </th>
          </tr>
        </thead>

        <tbody className="divide-y bg-white rounded-b-2xl">
          {transactions &&
            transactions?.length > 0 &&
            transactions?.map((transaction) => {
              const Icon = ICONS[transaction.category.icon];
              const isIncome = transaction.type === "INCOME";
              const color = COLORS[transaction.category.color];
              const colorVariant = color.value.toLowerCase() as ColorVariant;

              return (
                <tr
                  key={transaction.id}
                  className="h-18 border-b border-gray-200 hover:bg-gray-100/50 last:rounded-b-2xl"
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
                    <span className="font-medium text-base text-gray-800">
                      {transaction.description}
                    </span>
                  </td>

                  <td className="h-full px-6 text-center text-gray-600">
                    {formatDate(transaction.date)}
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

                  <td className="h-full px-6">
                    <div
                      className={`flex items-center justify-center gap-2 font-medium ${
                        isIncome ? "text-green-600" : "text-red-dark"
                      }`}
                    >
                      {isIncome ? (
                        <ArrowUpCircle className="h-4 w-4" />
                      ) : (
                        <ArrowDownCircle className="h-4 w-4" />
                      )}
                      {isIncome ? "Entrada" : "Saída"}
                    </div>
                  </td>

                  <td className="h-full px-6 text-right font-semibold text-gray-800">
                    {isIncome && `+ ${formatCurrency(transaction.amount)}`}
                    {!isIncome && `- ${formatCurrency(transaction.amount)}`}
                  </td>

                  <td className="h-full px-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(transaction.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(transaction)}
                      >
                        <Edit className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {transactions && transactions.length === 0 && (
        <Empty className="w-full border-b border-gray-200">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="rounded-xl h-10 w-10 m-0">
              <Inbox className="w-8 h-8 text-gray-400" />
            </EmptyMedia>

            <EmptyTitle className="text-sm">
              Nenhuma transação encontrada
            </EmptyTitle>
          </EmptyHeader>
        </Empty>
      )}
    </>
  );
}
