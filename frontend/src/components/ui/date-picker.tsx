"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";

export function DatePicker({
  value,
  onChange,
}: {
  value?: Date;
  onChange?: (value?: Date) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(() => {
    return value ? new Date(value) : undefined;
  });

  function handleChangeRange(value?: Date) {
    setDate(value);
    onChange?.(value);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground h-12 w-full justify-between text-left font-normal border-input cursor-default hover:bg-white"
        >
          {date ? (
            format(date, "dd/MM/yyyy", { locale: ptBR })
          ) : (
            <span>Selecione uma data</span>
          )}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" onSelect={handleChangeRange} />
      </PopoverContent>
    </Popover>
  );
}
