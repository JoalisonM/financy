import { useAuthStore } from "@/stores/auth";
import { Navigate } from "react-router-dom";

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}
