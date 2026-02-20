import z from "zod";

export const userInput = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  email: z.email("E-mail inválido").nonempty("O e-mail é obrigatório"),
});

export type UserInput = z.infer<typeof userInput>;

export interface User {
  id: string;
  name: string;
  email: string;
  role?: "USER" | "ADMIN";
  createdAt: string;
  updatedAt?: string;
}

export type UserResponse = {
  updateUser: {
    id: string;
    name: string;
    email: string;
    role?: "USER" | "ADMIN";
    createdAt: string;
    updatedAt?: string;
  };
};
