import { useEffect, type ComponentProps } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  categoryInput,
  type Category,
  type CategoryInput,
} from "@/dtos/category-dto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategory } from "@/hooks/use-category";
import { FormItem } from "./form-item";
import { Label } from "./ui/label";
import { InputGroup, InputGroupInput } from "./ui/input-group";
import { COLORS, ICONS } from "@/lib/utils";
import { IconBadge } from "./icon-badge";
import { ColorBadge } from "./color-badge";
import { Button } from "./ui/button";

type Icon = keyof typeof ICONS;

type CategoryFormDialogProps = ComponentProps<typeof Dialog> & {
  category?: Category;
};

export function CategoryFormDialog({
  category,
  onOpenChange,
  ...props
}: CategoryFormDialogProps) {
  const {
    watch,
    reset,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categoryInput),
  });

  const iconSelected = watch("icon");
  const colorSelected = watch("color");

  const { saveCategory } = useCategory();

  useEffect(() => {
    if (category) {
      setValue("id", category?.id);
      setValue("title", category?.title);
      setValue("description", category?.description);
      setValue("color", category?.color);
      setValue("icon", category?.icon);
    }
  }, [category]);

  function onToggleOpen(value: boolean) {
    if (!value) {
      reset();
      onOpenChange?.(value);
    }

    onOpenChange?.(value);
  }

  async function onSubmit({
    id,
    title,
    description,
    color,
    icon,
  }: CategoryInput) {
    const result = await saveCategory({
      id,
      title,
      description,
      color,
      icon,
    });

    if (result.data) {
      reset();
      onOpenChange?.(false);
    }
  }

  return (
    <Dialog onOpenChange={onToggleOpen} {...props}>
      <DialogContent className="w-md">
        <DialogHeader>
          <DialogTitle>
            {!category && "Nova categoria"}
            {category && "Editar categoria"}
          </DialogTitle>
          <DialogDescription>
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-col gap-4">
            <FormItem error={errors.title}>
              <Label htmlFor="title">Título</Label>
              <InputGroup>
                <InputGroupInput
                  id="title"
                  placeholder="Ex: Alimentação"
                  {...register("title")}
                />
              </InputGroup>
            </FormItem>

            <FormItem error={errors.description}>
              <Label htmlFor="description">Descrição</Label>
              <InputGroup>
                <InputGroupInput
                  id="description"
                  placeholder="Descrição da categoria"
                  {...register("description")}
                />
              </InputGroup>
              <span className="text-xs leading-4 text-gray-500">Opcional</span>
            </FormItem>

            <FormItem error={errors.icon}>
              <Label>Ícone</Label>

              <div className="grid grid-cols-8 gap-2">
                {Object.keys(ICONS).map((icon) => (
                  <IconBadge
                    key={icon}
                    icon={icon}
                    data-selected={icon === iconSelected}
                    onClick={() => setValue("icon", icon as Icon)}
                  />
                ))}
              </div>
            </FormItem>

            <FormItem error={errors.color}>
              <Label>Cor</Label>

              <div className="flex items-center gap-2">
                {Object.entries(COLORS).map(([key, color]) => (
                  <ColorBadge
                    key={key}
                    color={color.value}
                    data-selected={color.value === colorSelected}
                    onClick={() => setValue("color", color.value)}
                  />
                ))}
              </div>
            </FormItem>
          </div>

          <Button type="submit" className="h-12 mt-6">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
