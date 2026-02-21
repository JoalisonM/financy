import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { CategoryModel } from "../models/category.model";
import { CategoryInput } from "../dtos/input/category.input";
import { User } from "@prisma/client";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private userService = new UserService();
  private categoryService = new CategoryService();
  private transactionService = new TransactionService();

  @Query(() => CategoryModel)
  async getCategory(
    @Arg("id", () => String) id: string,
    @GqlUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.findCategoryById(user.id, id);
  }

  @Query(() => [CategoryModel])
  async listCategories(@GqlUser() user: User): Promise<CategoryModel[]> {
    return this.categoryService.listCategories(user.id);
  }

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CategoryInput) data: CategoryInput,
    @GqlUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(user.id, data);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("data", () => CategoryInput) data: CategoryInput,
    @Arg("id", () => String) id: string,
    @GqlUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(user.id, id, data);
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg("id", () => String) id: string,
    @GqlUser() user: User,
  ): Promise<Boolean> {
    await this.categoryService.deleteCategory(user.id, id);

    return true;
  }

  @FieldResolver(() => UserModel)
  async user(@Root() category: CategoryModel): Promise<UserModel> {
    return await this.userService.findUserById(category.userId);
  }

  @FieldResolver(() => Number)
  async countTransactions(
    @Root() category: CategoryModel,
    @GqlUser() user: User,
  ): Promise<Number> {
    return await this.transactionService.countTransactionsByCategoryId(
      user.id,
      category.id,
    );
  }

  @FieldResolver(() => Number)
  async transactionsAmount(
    @Root() category: CategoryModel,
    @GqlUser() user: User,
  ): Promise<Number> {
    return await this.transactionService.totalTransactionsAmountByCategoryId(
      user.id,
      category.id,
    );
  }
}
