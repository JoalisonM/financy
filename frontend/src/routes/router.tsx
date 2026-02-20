import { createBrowserRouter } from "react-router";

import { ProtectedRoute } from "@/components/protected-route";
import { AuthLayout } from "@/layouts/auth-layout";
import { PublicRoute } from "@/components/public-route";
import { SignUp } from "@/pages/auth/sign-up";
import { AppLayout } from "@/layouts/app-layout";
import { RootPage } from "@/components/root-page";
import { UserProfile } from "@/pages/user-profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/profile",
        element: <UserProfile />,
      },
    ],
  },
]);
