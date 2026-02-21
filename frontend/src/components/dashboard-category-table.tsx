import type { Category } from "@/dtos/category-dto";
import { Badge } from "./ui/badge";
import clsx from "clsx";
import { COLORS, colorVariants, formatCurrency } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type ColorVariant = VariantProps<typeof colorVariants>["color"];

export function DashboardCategoryTable({
  categories,
}: {
  categories?: Category[];
}) {
  return (
    <table className="w-full text-sm border-separate border-spacing-y-5">
      <tbody className="bg-white">
        {categories?.map((category) => {
          const color = COLORS[category.color];
          const colorVariant = color.value.toLowerCase() as ColorVariant;
          return (
            <tr
              key={category.id}
              className="h-7 hover:bg-gray-100/50 last:rounded-b-2xl"
            >
              <td className="h-full text-left pl-6">
                <Badge
                  className={clsx(
                    colorVariants({ color: colorVariant }),
                    "h-7 font-medium text-sm leading-5 inline-flex items-center justify-center rounded-full border border-transparent px-3 py-0.5 w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
                  )}
                >
                  {category.title}
                </Badge>
              </td>

              <td className="h-full text-right text-sm text-gray-600 leading-5">
                {category.countTransactions === 1
                  ? "1 item"
                  : `${category.countTransactions} itens`}
              </td>

              <td className="h-full pr-6 text-right text-sm font-semibold text-gray-800 leading-5">
                {formatCurrency(category.transactionsAmount)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
