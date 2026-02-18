import { prismaClient } from "../../prisma/prisma";
import { CategoryInput } from "../dtos/input/category.input";

export class CategoryService {
  async findCategoryById(id: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new Error("Categoria não existe");

    return category;
  }

  async listCategories(userId: string) {
    return await prismaClient.category.findMany({
      where: {
        userId,
      },
    });
  }

  async createCategory(userId: string, data: CategoryInput) {
    return await prismaClient.category.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        userId,
      },
    });
  }

  async updateCategory(userId: string, id: string, data: CategoryInput) {
    const category = await prismaClient.category.findUnique({
      where: {
        userId,
        id,
      },
    });

    if (!category) throw new Error("Categoria não encontrada");

    return await prismaClient.category.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
      },
    });
  }

  async deleteCategory(userId: string, id: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        userId,
        id,
      },
    });

    if (!category) throw new Error("Categoria não encontrada");

    return await prismaClient.category.delete({ where: { id } });
  }
}
