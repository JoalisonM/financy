import logo from "@/assets/Logo.png";
import { Link, NavLink } from "react-router";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useAuthStore } from "@/stores/auth";

export function Menu() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex h-17.25 bg-white border border-gray-200">
      <div className="w-full flex items-center justify-between py-4 px-12">
        <img src={logo} alt="" className="h-6" />

        <nav className="flex items-center gap-5">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm leading-5 ${
                isActive ? "text-brand-base font-semibold" : "text-gray-600"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `text-sm leading-5 ${
                isActive ? "text-brand-base font-semibold" : "text-gray-600"
              }`
            }
          >
            Transações
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `text-sm leading-5 ${
                isActive ? "text-brand-base font-semibold" : "text-gray-600"
              }`
            }
          >
            Categorias
          </NavLink>
        </nav>

        <Link to="/profile">
          <Avatar>
            <AvatarFallback className="text-gray-800 bg-gray-300">
              {user?.name[0]}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
