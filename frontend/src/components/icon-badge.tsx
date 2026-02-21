import { ICONS } from "@/lib/utils";
import { Button } from "./ui/button";
import type { ComponentProps } from "react";

type Icon = keyof typeof ICONS;

interface IconBadge extends ComponentProps<typeof Button> {
  icon: string;
}

export function IconBadge({ icon, ...props }: IconBadge) {
  const Icon = ICONS[icon as Icon];

  return (
    <Button
      {...props}
      variant="outline"
      className="w-10.5 h-10.5 text-gray-500 border-gray-300 data-selected:text-gray-600 data-selected:bg-gray-100 data-selected:border-brand-base"
    >
      <Icon className="w-5 h-5" />
    </Button>
  );
}
