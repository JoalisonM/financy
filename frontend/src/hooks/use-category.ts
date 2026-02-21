import type { Category, CategoryInput } from "@/dtos/category-dto";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "@/graphql/mutations/category";
import { GET_CATEGORY, LIST_CATEGORIES } from "@/graphql/queries/category";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
import { toast } from "sonner";

export const useCategory = () => {
  const [getCategory, { data }] = useLazyQuery<{ getCategory: Category }>(
    GET_CATEGORY,
  );

  const { getCategory: category } = data || {};

  const {
    data: categoriesData,
    loading: isLoadingCategories,
    refetch: refetchCategories,
  } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES);

  const [createCategory] = useMutation<
    { createCategory: Category },
    { data: CategoryInput }
  >(CREATE_CATEGORY, {
    onCompleted(data) {
      if (data) {
        toast.success("Categoria criada com sucesso!");
      }
    },
    onError() {
      toast.error("Erro ao criar categoria");
    },
  });

  const [updateCategory] = useMutation<
    { updateCategory: Category },
    { categoryId: string; data: CategoryInput }
  >(UPDATE_CATEGORY, {
    onCompleted(data) {
      if (data) {
        toast.success("Categoria editada com sucesso!");
      }
    },
    onError() {
      toast.error("Erro ao editar categoria");
    },
  });

  async function saveCategory(data: CategoryInput) {
    if (data?.id) {
      const { id, ...rest } = data;

      return await updateCategory({
        variables: { categoryId: id, data: rest },
        refetchQueries: [
          { query: GET_CATEGORY, variables: { categoryId: id } },
          { query: LIST_CATEGORIES },
        ],
      });
    }

    return await createCategory({
      variables: { data },
      refetchQueries: [{ query: LIST_CATEGORIES }],
    });
  }

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [LIST_CATEGORIES],
    onCompleted(data) {
      if (data) {
        toast.success("Categoria deletada com sucesso!");
      }
    },
    onError() {
      toast.error("Erro ao deletar categoria");
    },
  });

  return {
    category,
    getCategory,
    saveCategory,
    deleteCategory,
    refetchCategories,
    isLoadingCategories,
    categories: categoriesData?.listCategories,
  };
};
