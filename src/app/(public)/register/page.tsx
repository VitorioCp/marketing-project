"use client";
import { Api } from "@/app/api/clients/api";
import { useState } from "react";
import { motion } from "framer-motion";
import Router from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState(""); // Adicionado estado para login
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await Api.post("/auth/register", {
        email,
        login, // Enviando login também
        password,
      });

      console.log("Registro bem-sucedido:", response.data);

      Router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao fazer registro:", error.message);
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100">
      <motion.form
        onSubmit={handleRegister}
        className="bg-white/80 shadow-xl rounded-2xl px-8 py-10 flex flex-col gap-5 min-w-[320px] w-full max-w-sm"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-2 tracking-wide">
          Register
        </h1>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-lg bg-slate-100 focus:bg-blue-50 focus:ring-2 focus:ring-blue-300 outline-none transition-all text-slate-700"
          autoFocus
        />
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="px-4 py-3 rounded-lg bg-slate-100 focus:bg-blue-50 focus:ring-2 focus:ring-blue-300 outline-none transition-all text-slate-700"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-3 rounded-lg bg-slate-100 focus:bg-blue-50 focus:ring-2 focus:ring-blue-300 outline-none transition-all text-slate-700"
        />
        <motion.button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Registrar
        </motion.button>
      </motion.form>
    </main>
  );
}
