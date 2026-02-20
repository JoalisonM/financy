import z from "zod";
import type { User } from "./user-dto";

export const signUpInput = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  email: z.email("E-mail inválido").nonempty("O e-mail é obrigatório"),
  password: z.string().nonempty("A senha é obrigatória").min(8),
});

export type SignUpInput = z.infer<typeof signUpInput>;

export type SignUpResponse = {
  register: {
    token: string;
    refreshToken: string;
    user: User;
  };
};
