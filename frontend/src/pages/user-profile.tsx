import { FormItem } from "@/components/form-item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { userInput, type UserInput } from "@/dtos/user-dto";
import { useAuthStore } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut, Mail, UserRound } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function UserProfile() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const updateUser = useAuthStore((state) => state.updateUser);

  const { handleSubmit, register, setValue } = useForm({
    resolver: zodResolver(userInput),
  });

  useEffect(() => {
    if (user) {
      setValue("name", user?.name);
      setValue("email", user?.email);
    }
  }, [user]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  async function onSubmit({ name }: UserInput) {
    try {
      await updateUser({ name });

      toast.success("Perfil atualizado com sucesso!");
    } catch {
      toast.error("Erro ao atualizar perfil");
    }
  }

  return (
    <div className="flex justify-center mz-auto">
      <div className="w-md p-8 bg-white rounded-2xl border border-gray-200">
        <div className="flex flex-col items-center justify-center gap-6">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-gray-300 text-2xl leading-10 text-gray-800">
              {user?.name[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-center gap-0.5">
            <h1 className="text-[20px] leading-7 font-bold">{user?.name}</h1>
            <p className="text-base leading-6 text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="h-px bg-gray-200 my-8" />

        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormItem error={undefined}>
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

            <FormItem error={undefined}>
              <Label htmlFor="email">E-mail</Label>
              <InputGroup>
                <InputGroupInput
                  id="email"
                  disabled
                  placeholder="mail@example.com"
                  {...register("email")}
                />
                <InputGroupAddon>
                  <Mail className="w-4 h-4" />
                </InputGroupAddon>
              </InputGroup>
              <span className="text-xs leading-4 text-gray-500">
                O e-mail não pode ser alterado
              </span>
            </FormItem>
          </div>

          <footer className="flex flex-col mt-8 gap-4">
            <Button className="h-12 w-full" type="submit">
              Salvar alterações
            </Button>

            <Button
              className="h-12 w-full"
              variant="outline"
              onClick={() => handleLogout()}
            >
              <LogOut className="w-4 h-4 text-danger" />
              Sair da conta
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
}
