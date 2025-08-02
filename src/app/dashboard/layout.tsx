"use client";
import React, {  useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiMenuAlt2,
  HiX,
  HiViewGrid,
  HiUserGroup,
  HiClipboardList,
} from "react-icons/hi";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { getCookie } from "cookies-next";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <aside
        className={`
          fixed md:static z-20 top-0 left-0 h-screen bg-white dark:bg-black shadow-md p-6
          transition-all duration-300 flex flex-col
          ${open ? "w-64" : "w-16 items-center"}
        `}
      >
        <div
          className={`flex items-center mb-6 w-full ${open ? "justify-between" : "justify-center"}`}
        >
          <h2
            className={`text-xl font-bold transition-all duration-700 ${open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
          >
            CRM
          </h2>
          <button
            className="ml-auto bg-white dark:bg-black rounded-full p-2 shadow-md border border-gray-300 transition-all"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <HiX size={24} /> : <HiMenuAlt2 size={24} />}
          </button>
        </div>
        <nav className="space-y-4 w-full">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 transition-all duration-300 px-2 py-2 rounded-lg
    ${
      pathname === "/dashboard"
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }
    ${open ? "" : "justify-center"}
  `}
          >
            <span className="relative flex items-center justify-center">
              {pathname === "/dashboard" && !open && (
                <span className="absolute w-12 h-12 rounded-full bg-blue-100 -z-10" />
              )}
              <HiViewGrid size={24} />
            </span>
            <span
              className={`${open ? "transition-all duration-300" : "sr-only"}`}
            >
              Dashboard
            </span>
          </Link>
          <Link
            href="/dashboard/clients"
            className={`flex items-center gap-3 transition-all duration-300 px-2 py-2 rounded-lg
    ${
      pathname === "/dashboard/clients"
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }
    ${open ? "" : "justify-center"}
  `}
          >
            <span className="relative flex items-center justify-center">
              {pathname === "/dashboard/clients" && !open && (
                <span className="absolute w-12 h-12 rounded-full bg-blue-100 -z-10" />
              )}
              <HiUserGroup size={24} />
            </span>
            <span
              className={`${open ? "transition-all duration-300" : "sr-only"}`}
            >
              Clientes
            </span>
          </Link>
          <Link
            href="/dashboard/tasks"
            className={`flex items-center gap-3 transition-all duration-300 px-2 py-2 rounded-lg
    ${
      pathname === "/dashboard/tasks"
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }
    ${open ? "" : "justify-center"}`}
          >
            <span className="relative flex items-center justify-center">
              {pathname === "/dashboard/tasks" && !open && (
                <span className="absolute w-12 h-12 rounded-full bg-blue-100 -z-10" />
              )}
              <HiClipboardList size={24} />
            </span>
            <span
              className={`${open ? "transition-all duration-300" : "sr-only"}`}
            >
              Tarefas
            </span>
          </Link>

          <Link
            href="/dashboard/contas"
            className={`flex items-center gap-3 transition-all duration-300 px-2 py-2 rounded-lg
    ${
      pathname === "/dashboard/contas"
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }
    ${open ? "" : "justify-center"}`}
          >
            <span className="relative flex items-center justify-center">
              {pathname === "/dashboard/contas" && !open && (
                <span className="absolute w-12 h-12 rounded-full bg-blue-100 -z-10" />
              )}
              <HiClipboardList size={24} />
            </span>
            <span
              className={`${open ? "transition-all duration-300" : "sr-only"}`}
            >
              Contas
            </span>
          </Link>

          <DarkModeToggle open={open} />
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-10 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <main className={`flex-1 p-8 transition-all duration-300 `}>
        {children}
      </main>
    </div>
  );
}
