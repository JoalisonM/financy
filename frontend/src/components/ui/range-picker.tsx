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
import type { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";

export function RangePicker({
  defaultValue,
  onChange,
}: {
  defaultValue?: DateRange;
  onChange?: (value?: DateRange) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>(defaultValue);

  function handleChangeRange(value?: DateRange) {
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
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                {format(date.to, "dd/MM/yyyy", { locale: ptBR })}
              </>
            ) : (
              format(date.from, "dd/MM/yyyy", { locale: ptBR })
            )
          ) : (
            <span>Selecione uma data</span>
          )}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          numberOfMonths={2}
          onSelect={handleChangeRange}
        />
      </PopoverContent>
    </Popover>
  );
}
