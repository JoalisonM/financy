import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { UpdateUserInput } from "../dtos/input/user.input";
import { User } from "@prisma/client";
import { GqlUser } from "../graphql/decorators/user.decorator";

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
  private userService = new UserService();

  @Query(() => UserModel)
  async getUser(@Arg("id", () => String) id: string): Promise<UserModel> {
    return this.userService.findUserById(id);
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
    @GqlUser() user: User,
  ): Promise<UserModel> {
    return this.userService.updateUser(user.id, data);
  }
}
