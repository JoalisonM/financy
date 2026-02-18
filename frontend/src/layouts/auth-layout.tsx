import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-zinc-200">
      <main className="mx-auto px-16 py-4">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
