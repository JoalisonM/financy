import type { ComponentProps } from "react";
import type { FieldError } from "react-hook-form";

interface FormItemProps extends ComponentProps<"div"> {
  error: FieldError | undefined;
}

export function FormItem({ children, error, ...props }: FormItemProps) {
  return (
    <div
      {...props}
      className="group flex flex-col gap-2"
      aria-invalid={!!error}
    >
      {children}
      {error?.message && (
        <span className="text-xs text-gray-500">{error?.message}</span>
      )}
    </div>
  );
}
