import { prismaClient } from "../../prisma/prisma";
import { UpdateUserInput } from "../dtos/input/user.input";

export class UserService {
  async findUserById(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new Error("Usuário não existe");

    return user;
  }

  async updateUser(id: string, data: UpdateUserInput) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new Error("Usuário não existe");

    return await prismaClient.user.update({
      where: { id },
      data: {
        name: data.name,
      },
    });
  }
}
