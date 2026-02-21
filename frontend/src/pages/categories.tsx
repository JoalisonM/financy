import { CategoryCard } from "@/components/category-card";
import { CategoryFormDialog } from "@/components/category-form-dialog";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useCategory } from "@/hooks/use-category";
import { useInsights } from "@/hooks/use-insights";
import { ArrowUpDown, Inbox, Plus, Tag } from "lucide-react";
import { useState } from "react";

export function Categories() {
  const { insights } = useInsights();
  const { category, categories, getCategory, deleteCategory } = useCategory();
  const [openDialog, setOpenDialog] = useState(false);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  async function handleDeleteCategory(categoryId: string) {
    await deleteCategory({
      variables: {
        categoryId,
      },
    });
  }

  async function handleOpenEditDialog(categoryId: string) {
    setOpenDialog(true);

    await getCategory({
      variables: {
        categoryId,
      },
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-bold text-2xl leafing-8">Categorias</h1>
          <p className="text-base text-gray-600 leading-6">
            Organize suas transações por categorias
          </p>
        </div>

        <Button onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4" />
          Nova categoria
        </Button>
      </header>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex gap-4 p-6 rounded-2xl bg-white border border-gray-200">
          <div className="h-8 flex items-center justify-center">
            <Tag className="w-6 h-6 text-gray-700 leading-8" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-[28px] leading-8">
              {insights?.totalCategories || 0}
            </h1>
            <span className="font-medium text-xs leading-8 text-gray-500">
              TOTAL DE CATEGORIAS
            </span>
          </div>
        </div>

        <div className="flex gap-4 p-6 rounded-2xl bg-white border border-gray-200">
          <div className="h-8 flex items-center justify-center">
            <ArrowUpDown className="w-6 h-6 text-purple-base leading-8" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-[28px] leading-8">
              {insights?.totalTransactions || 0}
            </h1>
            <span className="font-medium text-xs leading-8 text-gray-500">
              TOTAL DE TRANSAÇÕES
            </span>
          </div>
        </div>

        <div className="flex gap-4 p-6 rounded-2xl bg-white border border-gray-200">
          <div className="h-8 flex items-center justify-center">
            <ArrowUpDown className="w-6 h-6 text-blue-base leading-8" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-[28px] leading-8">
              {insights?.categoryMoreFrequent}
            </h1>
            <span className="font-medium text-xs leading-8 text-gray-500">
              CATEGORIA MAIS UTILIZADA
            </span>
          </div>
        </div>
      </div>

      {categories && categories.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {categories?.map((category) => (
            <CategoryCard
              category={category}
              onEdit={handleOpenEditDialog}
              onDelete={handleDeleteCategory}
            />
          ))}
        </div>
      )}

      {categories && categories.length === 0 && (
        <Empty className="w-full">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="rounded-xl h-10 w-10 m-0">
              <Inbox className="w-8 h-8 text-gray-400" />
            </EmptyMedia>

            <EmptyTitle className="text-sm">
              Nenhuma categoria encontrada
            </EmptyTitle>
          </EmptyHeader>
        </Empty>
      )}

      <CategoryFormDialog
        open={openDialog}
        category={category}
        onOpenChange={setOpenDialog}
      />
    </div>
  );
}
