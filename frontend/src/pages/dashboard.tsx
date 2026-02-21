import { DashboardTransactionTable } from "@/components/dashboard-transaction-table";
import { Button } from "@/components/ui/button";
import { useTransaction } from "@/hooks/use-transaction";
import {
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  Wallet,
} from "lucide-react";
import { useCategory } from "@/hooks/use-category";
import { DashboardCategoryTable } from "@/components/dashboard-category-table";
import { useInsights } from "@/hooks/use-insights";
import { formatCurrency } from "@/lib/utils";
import { TransactionFormDialog } from "@/components/transaction-form-dialog";
import { useState } from "react";
import { Link } from "react-router";

export function Dashboard() {
  const { insights } = useInsights();
  const { categories } = useCategory();
  const { transactions, refetchTransactions } = useTransaction({ limit: 5 });

  const [openDialog, setOpenDialog] = useState(false);

  function handleOpenTransactionDialog() {
    setOpenDialog(true);
  }

  function handleToggleDialog(value: boolean) {
    setOpenDialog(value);

    refetchTransactions({ limit: 5 });
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-200">
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 text-purple-base" />
            <span className="font-medium text-xs text-gray-500">
              SALDO TOTAL
            </span>
          </div>

          <h1 className="font-bold text-[28px] leading-8">
            {formatCurrency(insights?.totalBalance || 0)}
          </h1>
        </div>

        <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-200">
          <div className="flex items-center gap-3">
            <CircleArrowUp className="w-5 h-5 text-brand-base" />
            <span className="font-medium text-xs text-gray-500">
              RECEITA DO MÊS
            </span>
          </div>

          <h1 className="font-bold text-[28px] leading-8">
            {formatCurrency(insights?.totalMonthlyIncome || 0)}
          </h1>
        </div>

        <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-200">
          <div className="flex items-center gap-3">
            <CircleArrowDown className="w-5 h-5 text-danger" />
            <span className="font-medium text-xs text-gray-500">
              DESPESAS DO MÊS
            </span>
          </div>

          <h1 className="font-bold text-[28px] leading-8">
            {formatCurrency(insights?.totalMonthlyExpenses || 0)}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="w-full col-span-2 flex flex-col bg-white rounded-2xl border border-gray-200">
          <div className="w-full flex items-center justify-between py-5 px-6 border-b border-gray-200">
            <h3 className="font-medium text-xs text-gray-500">
              TRANSAÇÕES RECENTES
            </h3>

            <Link to="/transactions">
              <Button variant="link" className="text-sm">
                Ver todas <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <DashboardTransactionTable transactions={transactions?.items} />

          <footer className="w-full flex items-center justify-center py-5 px-6">
            <Button
              variant="link"
              className="text-sm"
              onClick={() => handleOpenTransactionDialog()}
            >
              <Plus className="w-4 h-4" />
              Nova transação
            </Button>
          </footer>
        </div>

        <div className="w-full flex flex-col bg-white rounded-2xl border border-gray-200 py-1">
          <div className="w-full flex items-center justify-between py-5 px-6 border-b border-gray-200">
            <h3 className="font-medium text-xs text-gray-500">CATEGORIAS</h3>

            <Link to="/categories">
              <Button variant="link" className="text-sm">
                Gerenciar <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <DashboardCategoryTable categories={categories} />
        </div>
      </div>

      <TransactionFormDialog
        open={openDialog}
        onOpenChange={handleToggleDialog}
      />
    </div>
  );
}
