import { useEffect, type ComponentProps } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  transactionInput,
  type Transaction,
  type TransactionInput,
} from "@/dtos/transaction-dto";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransaction } from "@/hooks/use-transaction";
import { FormItem } from "./form-item";
import { Label } from "./ui/label";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/date-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useCategory } from "@/hooks/use-category";
import { TransactionTypeToggle } from "./transaction-type-toggle";

type TransactionFormDialogProps = ComponentProps<typeof Dialog> & {
  transaction?: Transaction | null;
  onFinish: VoidFunction;
};

export function TransactionFormDialog({
  onFinish,
  transaction,
  onOpenChange,
  ...props
}: TransactionFormDialogProps) {
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionInput),
    defaultValues: {
      type: "EXPENSE",
    },
  });

  const { categories } = useCategory();
  const { saveTransaction } = useTransaction();

  useEffect(() => {
    if (transaction) {
      setValue("id", transaction?.id);
      setValue("type", transaction?.type || "EXPENSE");
      setValue("description", transaction?.description);
      setValue("amount", transaction?.amount);
      setValue("date", new Date(transaction?.date));
      setValue("categoryId", transaction?.categoryId);
    }
  }, [transaction]);

  function onToggleOpen(value: boolean) {
    if (!value) {
      reset();
      onOpenChange?.(value);
    }

    onOpenChange?.(value);
  }

  async function onSubmit({
    id,
    description,
    date,
    amount,
    categoryId,
    type,
  }: TransactionInput) {
    const result = await saveTransaction({
      id,
      description,
      date,
      amount,
      categoryId,
      type,
    });

    if (result.data) {
      reset();
      onOpenChange?.(false);
      onFinish?.();
    }
  }

  return (
    <Dialog onOpenChange={onToggleOpen} {...props}>
      <DialogContent className="w-md">
        <DialogHeader>
          <DialogTitle>
            {!transaction && "Nova transação"}
            {transaction && "Editar transação"}
          </DialogTitle>
          <DialogDescription>Registre sua despesa ou receita</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-col gap-4">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TransactionTypeToggle
                  value={field.value}
                  onSelect={field.onChange}
                />
              )}
            />

            <FormItem error={errors.description}>
              <Label htmlFor="description">Descrição</Label>
              <InputGroup>
                <InputGroupInput
                  id="description"
                  placeholder="Ex: Almoço no restaurante"
                  {...register("description")}
                />
              </InputGroup>
            </FormItem>

            <div className="grid grid-cols-2 gap-4">
              <FormItem error={errors.date}>
                <Label htmlFor="date">Data</Label>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker value={field.value} onChange={field.onChange} />
                  )}
                />
              </FormItem>

              <FormItem error={errors.amount}>
                <Label htmlFor="amount">Valor</Label>
                <InputGroup>
                  <InputGroupInput
                    id="amount"
                    type="number"
                    defaultValue={1}
                    {...register("amount", { valueAsNumber: true })}
                  />
                  <InputGroupAddon className="text-gray-800">
                    R$
                  </InputGroupAddon>
                </InputGroup>
              </FormItem>
            </div>

            <FormItem error={errors.categoryId}>
              <Label htmlFor="categoryId">Categoria</Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories?.map((category) => (
                          <SelectItem value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormItem>
          </div>

          <Button type="submit" className="h-12 mt-6">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
