import { Edit, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Badge } from "./ui/badge";
import type { Category } from "@/dtos/category-dto";
import { COLORS, colorVariants, ICONS } from "@/lib/utils";
import clsx from "clsx";
import type { VariantProps } from "class-variance-authority";

type ColorVariant = VariantProps<typeof colorVariants>["color"];

export function CategoryCard({
  category,
  onEdit,
  onDelete,
}: {
  category: Category;
  onEdit: (categoryId: string) => void;
  onDelete: (categoryId: string) => void;
}) {
  const Icon = ICONS[category.icon];
  const color = COLORS[category.color];
  const colorVariant = color.value.toLowerCase() as ColorVariant;

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div
          className={clsx(
            colorVariants({ color: colorVariant }),
            "w-10 h-10 flex items-center justify-center rounded-xl",
          )}
        >
          {Icon && <Icon className="w-4 h-4" />}
        </div>

        <CardAction className="flex items-center self-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(category.id)}
          >
            <Trash className="w-4 h-4 text-danger" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(category.id)}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-1">
        <h1 className="font-semibold text-base text-gray-800 leading-6">
          {category?.title}
        </h1>
        <p className="font-normal text-sm text-gray-600">
          {category?.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between mt-auto">
        <Badge
          className={clsx(
            colorVariants({ color: colorVariant }),
            "h-7 font-medium text-sm leading-5 inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
          )}
        >
          {category?.title}
        </Badge>

        <span className="font-normal text-xs text-gray-600 leading-5">
          {category.countTransactions === 1
            ? `${category?.countTransactions} item`
            : `${category?.countTransactions || 0} itens`}
        </span>
      </CardFooter>
    </Card>
  );
}
