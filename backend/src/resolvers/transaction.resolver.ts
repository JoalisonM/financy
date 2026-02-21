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
import { TransactionModel } from "../models/transaction.model";
import { TransactionInput } from "../dtos/input/transaction.input";
import { TYPE, User } from "@prisma/client";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { TransactionService } from "../services/transaction.service";
import { CategoryModel } from "../models/category.model";
import { CategoryService } from "../services/category.service";
import { PaginatedTransactions } from "../dtos/output/transaction.output";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private userService = new UserService();
  private categoryService = new CategoryService();
  private transactionService = new TransactionService();

  @Query(() => TransactionModel)
  async getTransaction(
    @Arg("id", () => String) id: string,
    @GqlUser() user: User,
  ): Promise<TransactionModel> {
    return this.transactionService.findTransactionById(user.id, id);
  }

  @Query(() => PaginatedTransactions)
  async listTransactions(
    @GqlUser() user: User,
    @Arg("description", () => String, { nullable: true }) description?: string,
    @Arg("type", () => TYPE, { nullable: true }) type?: TYPE,
    @Arg("categoryId", () => String, { nullable: true }) categoryId?: string,
    @Arg("from", () => String, { nullable: true }) from?: string,
    @Arg("to", () => String, { nullable: true }) to?: string,
    @Arg("page", () => Number, { nullable: true }) page?: number,
    @Arg("limit", () => Number, { nullable: true }) limit?: number,
  ): Promise<PaginatedTransactions> {
    return this.transactionService.listTransactions(user.id, {
      description,
      type,
      categoryId,
      to,
      from,
      page,
      limit,
    });
  }

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => TransactionInput) data: TransactionInput,
    @GqlUser() user: User,
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(user.id, data);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("data", () => TransactionInput) data: TransactionInput,
    @Arg("id", () => String) id: string,
    @GqlUser() user: User,
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(user.id, id, data);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg("id", () => String) id: string,
    @GqlUser() user: User,
  ): Promise<Boolean> {
    await this.transactionService.deleteTransaction(user.id, id);

    return true;
  }

  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel): Promise<UserModel> {
    return await this.userService.findUserById(transaction.userId);
  }

  @FieldResolver(() => CategoryModel)
  async category(
    @Root() transaction: TransactionModel,
    @GqlUser() user: User,
  ): Promise<CategoryModel> {
    return await this.categoryService.findCategoryById(
      user.id,
      transaction.categoryId,
    );
  }
}
