import { Outlet } from "react-router";
import { Toaster } from "sonner";
import logo from "@/assets/Logo.png";
import type { ReactNode } from "react";

export function AuthLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen">
      <main className="flex flex-col items-center gap-8 h-dvh mx-auto p-12">
        <img src={logo} className="h-8" />
        <Outlet />
        {children}
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}
