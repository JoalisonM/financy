import type { LoginInput, LoginResponse } from "@/dtos/login-dto";
import type { SignUpInput, SignUpResponse } from "@/dtos/sign-up-dto";
import type { User, UserInput, UserResponse } from "@/dtos/user-dto";
import { LOGIN } from "@/graphql/mutations/login";
import { REGISTER } from "@/graphql/mutations/register";
import { UPDATE_USER } from "@/graphql/mutations/user";
import { apolloClient } from "@/lib/apollo";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  logout: () => void;
  login: (data: LoginInput) => Promise<boolean>;
  signUp: (data: SignUpInput) => Promise<boolean>;
  updateUser: (data: UserInput) => Promise<boolean>;
}

export const useAuthStore = create<
  AuthState,
  [["zustand/persist", unknown], ["zustand/immer", never]]
>(
  persist(
    immer((set) => {
      const user = null;
      const token = null;
      const isAuthenticated = false;

      async function login(input: LoginInput) {
        const { data } = await apolloClient.mutate<
          LoginResponse,
          { data: LoginInput }
        >({
          mutation: LOGIN,
          variables: {
            data: {
              email: input.email,
              password: input.password,
            },
          },
        });

        if (data?.login) {
          const { token, user } = data.login;

          set({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            },
            token,
            isAuthenticated: true,
          });

          return true;
        }

        return false;
      }

      async function signUp(input: SignUpInput) {
        const { data } = await apolloClient.mutate<
          SignUpResponse,
          { data: SignUpInput }
        >({
          mutation: REGISTER,
          variables: {
            data: {
              name: input.name,
              email: input.email,
              password: input.password,
            },
          },
        });

        if (data?.register) {
          return true;
        }

        return false;
      }

      function logout() {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });

        apolloClient.clearStore();
      }

      async function updateUser(input: UserInput) {
        const { data } = await apolloClient.mutate<
          UserResponse,
          { data: UserInput }
        >({
          mutation: UPDATE_USER,
          variables: {
            data: {
              name: input.name,
              email: input.email,
            },
          },
        });

        if (data?.updateUser) {
          const { updateUser } = data;

          set({
            user: {
              id: updateUser.id,
              name: updateUser.name,
              email: updateUser.email,
              role: updateUser.role,
              createdAt: updateUser.createdAt,
              updatedAt: updateUser.updatedAt,
            },
          });

          return true;
        }

        return false;
      }

      return {
        user,
        isAuthenticated,
        token,
        login,
        signUp,
        logout,
        updateUser,
      };
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
