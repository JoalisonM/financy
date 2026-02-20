import z from "zod";
import type { User } from "./user-dto";

export const loginInput = z.object({
  email: z.email("E-mail inválido").nonempty("O e-mail é obrigatório"),
  password: z.string().nonempty("A senha é obrigatória"),
});

export type LoginInput = z.infer<typeof loginInput>;

export type LoginResponse = {
  login: {
    token: string;
    refreshToken: string;
    user: User;
  };
};
