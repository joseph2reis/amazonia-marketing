"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { AiOutlineLoading3Quarters, AiOutlineSearch } from "react-icons/ai";
import { PatternFormat } from "react-number-format";
import { CreateCompanyInput } from "@/app/types/company/company";

export default function CompleteCompanyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCepLoading, setIsCepLoading] = useState(false);
  const [msg, setMsg] = useState<{
    type: "error" | "success" | "";
    text: string;
  }>({
    type: "",
    text: "",
  });

  const router = useRouter();
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateCompanyInput>();

  const cepValue = watch("cep");

  const checkCEP = async () => {
    const cep = cepValue?.replace(/\D/g, "");
    if (!cep || cep.length !== 8) return;

    setIsCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (!data.erro) {
        setValue("logradouro", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("cidade", `${data.localidade} - ${data.uf}`);
      } else {
        setMsg({ type: "error", text: "CEP não encontrado." });
      }
    } catch (error) {
      console.error("Erro ao buscar CEP");
    } finally {
      setIsCepLoading(false);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
      return;
    }

    fetch("/api/company/check")
      .then((res) => res.json())
      .then((data) => {
        if (data.hasCompany) {
          router.push(data.approved ? "/dashboard" : "/pending-approval");
        }
      })
      .catch(() => {});
  }, [session, status, router]);

  const onSubmit = async (data: CreateCompanyInput) => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    setMsg({ type: "", text: "" });

    const payload = {
      ...data,
      userId: session.user.id,
      cnpj: data.cnpj?.replace(/\D/g, ""),
      phone: data.phone?.replace(/\D/g, ""),
      whatssap: data.cel?.replace(/\D/g, ""),
      cep: data.cep?.replace(/\D/g, ""),
    };

    try {
      const res = await fetch("/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Erro ao cadastrar");
      }

      setMsg({ type: "success", text: "Cadastro realizado com sucesso!" });
      setTimeout(() => router.push("/pending-approval"), 2000);
    } catch (err: any) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading")
    return (
      <div className="flex h-screen items-center justify-center text-text">
        Carregando...
      </div>
    );

  return (
    <section className="min-h-screen bg-surface flex items-center justify-center py-12 px-6 transition-colors duration-300">
      <div className="w-full max-w-2xl rounded-3xl border border-border bg-surface-strong p-8 shadow-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-text">Dados da Empresa</h1>
          <p className="mt-2 text-sm text-text-muted">
            Informe os dados para análise e aprovação
          </p>
        </div>

        {msg.text && (
          <div
            className={`mb-6 p-4 rounded-xl border text-sm font-medium ${
              msg.type === "error"
                ? "bg-red-500/10 text-red-500 border-red-500/20"
                : "bg-primary-soft text-primary border-primary/20"
            }`}
          >
            {msg.text}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-text mb-1.5">
              Nome da Empresa
            </label>
            <input
              {...register("name", { required: "Nome é obrigatório" })}
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface text-text transition-all placeholder:text-text-muted/40"
              placeholder="Ex: Tecnologia Norte Ltda"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-text mb-1.5">
              CNPJ
            </label>
            <Controller
              control={control}
              name="cnpj"
              rules={{ required: "Obrigatório" }}
              render={({ field: { onChange, value } }) => (
                <PatternFormat
                  format="##.###.###/####-##"
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface text-text transition-all"
                  value={value}
                  placeholder="00.000.000/0000-00"
                  onValueChange={(values) => onChange(values.value)}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-text mb-1.5">
              CEP
            </label>
            <div className="relative">
              <Controller
                control={control}
                name="cep"
                rules={{ required: "Obrigatório" }}
                render={({ field: { onChange, value } }) => (
                  <PatternFormat
                    format="#####-###"
                    className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface text-text transition-all"
                    value={value}
                    placeholder="00000-000"
                    onValueChange={(values) => onChange(values.value)}
                    onBlur={checkCEP}
                  />
                )}
              />
              <button
                type="button"
                onClick={checkCEP}
                className="absolute right-3 top-2.5 text-primary hover:opacity-70 transition-opacity"
              >
                {isCepLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <AiOutlineSearch size={20} />
                )}
              </button>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-text mb-1.5">
                Logradouro (Rua/Av)
              </label>
              <input
                {...register("logradouro", { required: "Obrigatório" })}
                className="w-full px-4 py-2.5 border border-border rounded-xl bg-surface/50 text-text outline-none placeholder:text-text-muted/40"
                placeholder="Ex: Rua das Flores, 123"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-text mb-1.5">
                Bairro
              </label>
              <input
                {...register("bairro", { required: "Obrigatório" })}
                className="w-full px-4 py-2.5 border border-border rounded-xl bg-surface/50 text-text outline-none placeholder:text-text-muted/40"
                placeholder="Bairro"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-text mb-1.5">
              Telefone Comercial
            </label>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <PatternFormat
                  format="(##) ####-####"
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface text-text transition-all"
                  value={value}
                  placeholder="(91) 3333-3333"
                  onValueChange={(values) => onChange(values.value)}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-text mb-1.5">
              WhatsApp
            </label>
            <Controller
              control={control}
              name="cel"
              rules={{ required: "Obrigatório" }}
              render={({ field: { onChange, value } }) => (
                <PatternFormat
                  format="(##) #####-####"
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface text-text transition-all"
                  value={value}
                  placeholder="(91) 98888-8888"
                  onValueChange={(values) => onChange(values.value)}
                />
              )}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-text mb-1.5">
              Sobre a Empresa (Descrição)
            </label>
            <textarea
              {...register("description", { required: "Obrigatório" })}
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface text-text transition-all min-h-25 placeholder:text-text-muted/40"
              placeholder="Conte um pouco sobre os produtos ou serviços que sua empresa oferece..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="md:col-span-2 w-full bg-primary text-white py-3.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center font-bold"
          >
            {isLoading && (
              <AiOutlineLoading3Quarters className="animate-spin mr-3" />
            )}
            CADASTRAR EMPRESA
          </button>
        </form>
      </div>
    </section>
  );
}
