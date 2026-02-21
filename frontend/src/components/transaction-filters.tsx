import { Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RangePicker } from "./ui/range-picker";
import type { TransactionFilters as TransactionFiltersType } from "@/dtos/transaction-dto";
import { useCategory } from "@/hooks/use-category";
import type { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router";

export function TransactionFilters({
  filters,
}: {
  filters: TransactionFiltersType;
}) {
  const { categories } = useCategory();
  const [, setSearchParams] = useSearchParams();

  function handleChangeFilter(
    key: keyof TransactionFiltersType,
    value: string,
  ) {
    setSearchParams((params) => {
      if (value === "ALL") {
        params.delete(key);

        return params;
      }

      params.set("page", "0");
      params.set(key, value);

      return params;
    });
  }

  function handleSelectDate(value?: DateRange) {
    setSearchParams((params) => {
      if (!value) {
        params.delete("to");
        params.delete("from");

        return params;
      }

      params.set("page", "0");
      params.set("to", value?.to?.toISOString() ?? "");
      params.set("from", value?.from?.toISOString() ?? "");

      return params;
    });
  }

  return (
    <section className="grid grid-cols-4 items-center gap-4 pt-5 pb-6 px-6 rounded-2xl bg-white border border-gray-200">
      <div className="flex flex-col gap-2">
        <Label htmlFor="search">Busca</Label>
        <InputGroup>
          <InputGroupInput
            id="search"
            defaultValue={filters.description}
            placeholder="Buscar por descrição"
            onChange={(e) => handleChangeFilter("description", e.target.value)}
          />
          <InputGroupAddon>
            <Search className="w-4 h-4" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="type">Tipo</Label>
        <Select
          defaultValue={filters.type ?? "ALL"}
          onValueChange={(value) => handleChangeFilter("type", value)}
        >
          <SelectTrigger id="type" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="INCOME">Entrada</SelectItem>
              <SelectItem value="EXPENSE">Saída</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Categoria</Label>
        <Select
          defaultValue={filters.categoryId ?? "ALL"}
          onValueChange={(value) => handleChangeFilter("categoryId", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">Todas</SelectItem>
              {categories?.map((category) => (
                <SelectItem value={category.id}>{category.title}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Período</Label>
        <RangePicker
          defaultValue={
            filters.from && filters.to
              ? { from: new Date(filters.from), to: new Date(filters.to) }
              : undefined
          }
          onChange={handleSelectDate}
        />
      </div>
    </section>
  );
}
