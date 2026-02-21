import { Button } from "./ui/button";
import type { ComponentProps } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

type BadgeVariant = VariantProps<typeof badgeVariants>["color"];

const badgeVariants = cva("w-10 h-5 rounded-lg", {
  variants: {
    color: {
      green: "bg-green-base",
      blue: "bg-blue-base",
      purple: "bg-purple-base",
      pink: "bg-pink-base",
      red: "bg-red-base",
      orange: "bg-orange-base",
      yellow: "bg-yellow-base",
    },
  },
});

interface ColorBadge extends ComponentProps<typeof Button> {
  color: string;
}

export function ColorBadge({ color, ...props }: ColorBadge) {
  return (
    <Button
      {...props}
      variant="outline"
      className="w-12.5 h-7.5 p-1 text-gray-500 border-gray-300 data-selected:bg-gray-100 data-selected:border-brand-base"
    >
      <span
        className={badgeVariants({
          color: color.toLowerCase() as BadgeVariant,
        })}
      />
    </Button>
  );
}
