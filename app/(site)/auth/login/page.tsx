"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Para redirecionar após login
import { signIn } from "next-auth/react"; // Função principal do NextAuth
import { useForm } from "react-hook-form";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setAuthError("");

    // Chamada oficial para o NextAuth
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false, // Evita que a página recarregue sozinha para podermos tratar erros
    });

    if (result?.error) {
      // Se o 'authorize' no route.ts retornar null, cairá aqui
      setAuthError("E-mail ou senha incorretos.");
      setIsLoading(false);
    } else {
      // Login com sucesso!
      router.push("/dashboard"); // Mude para a rota que desejar
      router.refresh(); // Garante que os dados da sessão sejam atualizados
    }
  };

  return (
    <section className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface-strong p-8 shadow-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-text">
            Entrar na AgroAmazônia
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Acesse sua conta para continuar
          </p>
        </div>

        {authError && (
          <div className="mb-4 p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Campo E-mail */}
          <div>
            <label className="mb-1 block text-sm font-medium text-text">
              E-mail
            </label>
            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              <input
                {...register("email", { required: "O e-mail é obrigatório" })}
                type="email"
                placeholder="seu@email.com"
                className={`w-full rounded-xl border ${
                  errors.email ? "border-red-500" : "border-border"
                } bg-white pl-11 pr-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {String(errors.email.message)}
              </p>
            )}
          </div>

          {/* Campo Senha */}
          <div>
            <label className="mb-1 block text-sm font-medium text-text">
              Senha
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              <input
                {...register("password", { required: "A senha é obrigatória" })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full rounded-xl border ${
                  errors.password ? "border-red-500" : "border-border"
                } bg-white pl-11 pr-12 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text transition"
              >
                {showPassword ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {String(errors.password.message)}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white hover:bg-primary/90 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin size-5" />
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Não tem conta?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-secondary hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </section>
  );
}
