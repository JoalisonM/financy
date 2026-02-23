import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Button } from "./ui/button";

export function TransactionTypeToggle({
  value,
  onSelect,
}: {
  value?: "INCOME" | "EXPENSE";
  onSelect?: (value: "INCOME" | "EXPENSE") => void;
}) {
  const isIncome = value === "INCOME";

  return (
    <div className="grid grid-cols-2 p-2 rounded-2xl border border-gray-200">
      <Button
        size="lg"
        data-type={value}
        variant={isIncome ? "ghost" : "outline"}
        onClick={() => onSelect?.("EXPENSE")}
        className="group font-normal text-gray-600 data-[type=EXPENSE]:bg-gray-100 data-[type=EXPENSE]:border-danger data-[type=EXPENSE]:text-gray-800"
      >
        <ArrowDownCircle className="w-4 h-4 text-gray-400 group-data-[type=EXPENSE]:text-danger" />
        Despesa
      </Button>

      <Button
        size="lg"
        data-type={value}
        variant={isIncome ? "outline" : "ghost"}
        onClick={() => onSelect?.("INCOME")}
        className="group font-normal text-gray-600 data-[type=INCOME]:bg-gray-100 data-[type=INCOME]:border-green-base data-[type=INCOME]:text-gray-800"
      >
        <ArrowUpCircle className="w-4 h-4 text-gray-400 group-data-[type=INCOME]:text-green-base" />
        Receita
      </Button>
    </div>
  );
}
