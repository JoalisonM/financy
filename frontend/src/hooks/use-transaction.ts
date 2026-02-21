import type {
  Transaction,
  TransactionFilters,
  TransactionInput,
  TransactionResponse,
} from "@/dtos/transaction-dto";
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION,
} from "@/graphql/mutations/transaction";
import { LIST_TRANSACTIONS } from "@/graphql/queries/transaction";
import { useMutation, useQuery } from "@apollo/client/react";
import { toast } from "sonner";

export const useTransaction = (filters?: TransactionFilters) => {
  const {
    data: transactionsData,
    loading: isLoadingTransactions,
    refetch: refetchTransactions,
  } = useQuery<{ listTransactions: TransactionResponse }, TransactionFilters>(
    LIST_TRANSACTIONS,
    {
      variables: filters,
    },
  );

  const [createTransaction] = useMutation<
    { createTransaction: Transaction },
    { data: TransactionInput }
  >(CREATE_TRANSACTION, {
    onCompleted(data) {
      if (data) {
        toast.success("Transação criada com sucesso!");
      }
    },
    onError() {
      toast.error("Erro ao criar transação");
    },
  });

  const [updateTransaction] = useMutation<
    { updateTransaction: Transaction },
    { transactionId: string; data: TransactionInput }
  >(UPDATE_TRANSACTION, {
    onCompleted(data) {
      if (data) {
        toast.success("Transação editada com sucesso!");
      }
    },
    onError() {
      toast.error("Erro ao editar transação");
    },
  });

  async function saveTransaction(data: TransactionInput) {
    if (data?.id) {
      const { id, ...rest } = data;

      return await updateTransaction({
        variables: { transactionId: id, data: rest },
      });
    }

    return await createTransaction({
      variables: { data },
    });
  }

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted(data) {
      if (data) {
        toast.success("Transação deletada com sucesso!");
      }
    },
    onError() {
      toast.error("Erro ao deletar transação");
    },
  });

  return {
    saveTransaction,
    deleteTransaction,
    refetchTransactions,
    isLoadingTransactions,
    transactions: transactionsData?.listTransactions,
  };
};
