import { TransactionFilters } from "@/components/transaction-filters";
import { TransactionFormDialog } from "@/components/transaction-form-dialog";
import { TransactionPagination } from "@/components/transaction-pagination";
import { TransactionTable } from "@/components/transaction-table";
import { Button } from "@/components/ui/button";
import type { Transaction } from "@/dtos/transaction-dto";
import { useTransaction } from "@/hooks/use-transaction";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

export function Transactions() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const type = searchParams.get("type") as "INCOME" | "EXPENSE";
  const categoryId = searchParams.get("categoryId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const filters = useMemo(() => {
    return {
      limit: 10,
      page: page - 1,
      type: type ?? undefined,
      categoryId: categoryId ?? undefined,
      from: from ? new Date(from).toISOString() : undefined,
      to: to ? new Date(to).toISOString() : undefined,
    };
  }, [page, type, categoryId, from, to]);

  const [openDialog, setOpenDialog] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const { transactions, deleteTransaction, refetchTransactions } =
    useTransaction(filters);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  async function handleDeleteTransaction(transactionId: string) {
    await deleteTransaction({
      variables: {
        transactionId,
      },
    });

    await refetchTransactions(filters);
  }

  function handleOpenEditDialog(transaction: Transaction) {
    setOpenDialog(true);
    setTransaction(transaction);
  }

  function handleToggleOpenDialog(value: boolean) {
    if (!value) {
      setOpenDialog(value);
      setTransaction(null);

      return;
    }

    setOpenDialog(value);
  }

  async function onResetTransactions() {
    refetchTransactions(filters);
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-bold text-2xl leafing-8">Transações</h1>
          <p className="text-base text-gray-600 leading-6">
            Gerencie todas as suas transações financeiras
          </p>
        </div>

        <Button onClick={() => handleOpenDialog()} className="text-sm">
          <Plus className="w-4 h-4" />
          Nova transação
        </Button>
      </header>

      <TransactionFilters filters={filters} />

      <section className="rounded-2xl overflow-hidden bg-white border border-gray-200">
        <TransactionTable
          onEdit={handleOpenEditDialog}
          transactions={transactions?.items}
          onDelete={handleDeleteTransaction}
        />

        <div className="px-6 py-5 bg-white">
          <TransactionPagination
            page={page - 1}
            totalElements={transactions?.totalElements}
            totalPages={transactions?.totalPages}
            limit={filters.limit}
          />
        </div>
      </section>

      <TransactionFormDialog
        open={openDialog}
        transaction={transaction}
        onFinish={onResetTransactions}
        onOpenChange={handleToggleOpenDialog}
      />
    </div>
  );
}
