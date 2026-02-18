import { Menu } from "@/components/menu";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-200">
      <Menu />

      <main className="px-8">
        <div className="min-h-[calc(100dvh-6rem)] p-12 bg-white rounded-t-4xl">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
}
