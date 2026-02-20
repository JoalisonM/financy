import { Eye, EyeClosed, Lock, LogIn, Mail, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { signUpInput, type SignUpInput } from "@/dtos/sign-up-dto";
import { useAuthStore } from "@/stores/auth";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { FormItem } from "@/components/form-item";
import { useState } from "react";

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpInput),
  });

  const navigate = useNavigate();
  const signUp = useAuthStore((state) => state.signUp);

  const [isPassword, setIsPassword] = useState(true);

  function handleTogglePassword() {
    setIsPassword((state) => !state);
  }

  async function onSubmit({ name, email, password }: SignUpInput) {
    try {
      const signUpMutation = await signUp({ name, email, password });

      if (signUpMutation) navigate("/");
    } catch {
      toast.error("Erro ao criar conta");
    }
  }

  return (
    <div className="w-md p-8 bg-white rounded-2xl border border-gray-200">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center gap-1 mb-8">
          <h1 className="text-[20px] leading-7 font-bold">Criar conta</h1>
          <p className="text-md leading-6 text-gray-600">
            Comece a controlar suas finanças ainda hoje
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <FormItem error={errors.email}>
            <Label htmlFor="name">Nome completo</Label>
            <InputGroup>
              <InputGroupInput
                id="name"
                placeholder="Seu nome completo"
                {...register("name")}
              />
              <InputGroupAddon>
                <UserRound className="w-4 h-4" />
              </InputGroupAddon>
            </InputGroup>
          </FormItem>

          <FormItem error={errors.email}>
            <Label htmlFor="email">E-mail</Label>
            <InputGroup>
              <InputGroupInput
                id="email"
                placeholder="mail@example.com"
                {...register("email")}
              />
              <InputGroupAddon>
                <Mail className="w-4 h-4" />
              </InputGroupAddon>
            </InputGroup>
          </FormItem>

          <FormItem error={errors.password}>
            <Label htmlFor="password">Senha</Label>
            <InputGroup>
              <InputGroupInput
                id="password"
                type={isPassword ? "password" : "text"}
                placeholder="Digite sua senha"
                {...register("password")}
              />
              <InputGroupAddon>
                <Lock className="w-4 h-4" />
              </InputGroupAddon>
              <InputGroupAddon
                align="inline-end"
                className="cursor-pointer text-gray-700"
                onClick={() => handleTogglePassword()}
              >
                {!isPassword && <Eye className="w-4 h-4" />}
                {isPassword && <EyeClosed className="w-4 h-4" />}
              </InputGroupAddon>
            </InputGroup>
            <span className="text-xs leading-4 text-gray-500">
              A senha deve ter no mínimo 8 caracteres
            </span>
          </FormItem>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Checkbox />
              <Label>Lembrar-me</Label>
            </div>

            <Button className="text-sm" variant="link">
              Recuperar senha
            </Button>
          </div>
        </div>

        <footer className="flex flex-col mt-6 gap-6">
          <Button
            className="h-12"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            Cadastrar
          </Button>

          <div className="flex items-center gap-3">
            <div className="h-px bg-gray-300 w-full" />
            <span className="text-sm leading-5 text-gray-500">ou</span>
            <div className="h-px bg-gray-300 w-full" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-gray-600 leading-5">Já tem uma conta?</p>

            <Link className="w-full" to="/">
              <Button className="h-12 w-full" variant="outline">
                <LogIn className="w-4 h-4" />
                Fazer login
              </Button>
            </Link>
          </div>
        </footer>
      </form>
    </div>
  );
}
