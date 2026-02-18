import { createParameterDecorator, ResolverData } from "type-graphql";
import { GraphqlContext } from "../context";
import { User } from "@prisma/client";
import { prismaClient } from "../../../prisma/prisma";

export const GqlUser = () => {
  return createParameterDecorator(
    async ({
      context,
    }: ResolverData<GraphqlContext>): Promise<User | null | undefined> => {
      if (!context || !context.user) return null;

      try {
        const user = await prismaClient.user.findUnique({
          where: {
            id: context.user,
          },
        });

        if (!user) throw new Error("User not founded");

        return user;
      } catch (err) {
        console.error("Error to instanceof the gqlUser");
      }
    },
  );
};
