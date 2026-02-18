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
import { User } from "@prisma/client";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { TransactionService } from "../services/transaction.service";
import { CategoryModel } from "../models/category.model";
import { CategoryService } from "../services/category.service";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private userService = new UserService();
  private categoryService = new CategoryService();
  private transactionService = new TransactionService();

  @Query(() => [TransactionModel])
  async listTransactions(@GqlUser() user: User): Promise<TransactionModel[]> {
    return this.transactionService.listTransactions(user.id);
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
  ): Promise<CategoryModel> {
    return await this.categoryService.findCategoryById(transaction.categoryId);
  }
}
