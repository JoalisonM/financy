import { Menu } from "@/components/menu";
import type { ReactNode } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

export function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Menu />

      <main className="p-12">
        <Outlet />
        {children}
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}
