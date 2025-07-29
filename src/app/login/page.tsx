'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'teste@teste.com' && password === '123') {
            document.cookie = `token=meu-token-fake; path=/`;
            router.push('/dashboard');
        } else {
            alert('Credenciais inválidas');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100">
            <motion.form
                onSubmit={handleLogin}
                className="bg-white/80 shadow-xl rounded-2xl px-8 py-10 flex flex-col gap-5 min-w-[320px] w-full max-w-sm"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <h1 className="text-2xl font-bold text-center text-slate-800 mb-2 tracking-wide">Login</h1>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-slate-100 focus:bg-blue-50 focus:ring-2 focus:ring-blue-300 outline-none transition-all text-slate-700"
                    autoFocus
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
                    className="mt-2 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-md hover:from-blue-600 hover:to-cyan-500 transition-all"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    Entrar
                </motion.button>
            </motion.form>
        </main>
    );
}