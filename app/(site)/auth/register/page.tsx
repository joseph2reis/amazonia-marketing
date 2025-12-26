"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState<{ type: "error" | "success" | ""; text: string }>({
    type: "",
    text: "",
  });

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setMsg({ type: "", text: "" });

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setMsg({ type: "error", text: result.message });
        return;
      }

      setMsg({
        type: "success",
        text: "Conta criada com sucesso! Redirecionando...",
      });

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch {
      setMsg({
        type: "error",
        text: "Erro ao criar conta. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface-strong p-8 shadow-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-text">Criar conta</h1>
          <p className="mt-2 text-sm text-text-muted">
            Junte-se à AgroAmazônia 🌱
          </p>
        </div>

        {msg.text && (
          <div
            className={`mb-4 p-3 text-xs rounded-xl border ${
              msg.type === "error"
                ? "bg-red-50 text-red-600 border-red-200"
                : "bg-green-50 text-green-600 border-green-200"
            }`}
          >
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nome */}
          <div>
            <label className="mb-1 block text-sm font-medium text-text">
              Nome
            </label>
            <div className="relative">
              <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              <input
                {...register("name", { required: "Nome é obrigatório" })}
                type="text"
                placeholder="Seu nome"
                className="w-full rounded-xl border border-border bg-white pl-11 pr-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* E-mail */}
          <div>
            <label className="mb-1 block text-sm font-medium text-text">
              E-mail
            </label>
            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              <input
                {...register("email", { required: "E-mail é obrigatório" })}
                type="email"
                placeholder="seu@email.com"
                className="w-full rounded-xl border border-border bg-white pl-11 pr-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="mb-1 block text-sm font-medium text-text">
              Senha
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              <input
                {...register("password", {
                  required: "Senha é obrigatória",
                  minLength: { value: 6, message: "Mínimo de 6 caracteres" },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-white pl-11 pr-12 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-secondary py-3 text-sm font-semibold text-white hover:bg-secondary/90 transition disabled:opacity-70"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin size-5" />
            ) : (
              "Criar conta"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Já tem conta?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </section>
  );
}
