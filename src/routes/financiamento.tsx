import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Banknote, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { formatBRL } from "@/data/cars";

export const Route = createFileRoute("/financiamento")({
  head: () => ({
    meta: [
      { title: "Financiamento · Motora Premium Auto" },
      { name: "description", content: "Simule seu financiamento em 60 segundos com os melhores bancos do país." },
    ],
  }),
  component: FinancePage,
});

function FinancePage() {
  const [value, setValue] = useState(80000);
  const [downPct, setDownPct] = useState(20);
  const [months, setMonths] = useState(48);

  const down = Math.round(value * (downPct / 100));
  const financed = value - down;
  const rate = 0.0149;
  const installment = Math.round((financed * rate) / (1 - Math.pow(1 + rate, -months)));
  const total = installment * months + down;

  return (
    <SiteLayout>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl container-px py-14 md:py-20">
          <div className="text-xs uppercase tracking-[0.2em] text-gold">Financiamento</div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight md:text-5xl">Parcelas que cabem no seu bolso, sem burocracia.</h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            Trabalhamos com Santander, Itaú, Bradesco, BV, PAN e Omni. Sua simulação leva menos de 1 minuto e a aprovação sai em até 24h úteis.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 container-px py-14 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant md:p-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
            <Banknote className="h-4 w-4" /> Simulador
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">Calcule sua parcela</h2>

          <div className="mt-8 space-y-7 text-sm">
            <Field label="Valor do veículo" value={formatBRL(value)}>
              <input type="range" min={30000} max={600000} step={5000} value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full accent-[oklch(0.55_0.13_252)]" />
            </Field>
            <Field label="Entrada" value={`${downPct}% · ${formatBRL(down)}`}>
              <input type="range" min={0} max={70} step={5} value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} className="w-full accent-[oklch(0.55_0.13_252)]" />
            </Field>
            <Field label="Prazo" value={`${months} meses`}>
              <input type="range" min={12} max={60} step={6} value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full accent-[oklch(0.55_0.13_252)]" />
            </Field>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-border bg-surface-2 p-6 md:grid-cols-4">
            <Stat l="Financiado" v={formatBRL(financed)} />
            <Stat l="Parcela" v={formatBRL(installment)} highlight />
            <Stat l="Total estimado" v={formatBRL(total)} />
            <Stat l="Taxa estimada" v="1,49% a.m." />
          </div>

          <p className="mt-4 text-[11px] text-muted-foreground">Simulação ilustrativa baseada em taxa média do mercado. Valores reais sujeitos à análise de crédito do banco parceiro.</p>
        </div>

        <div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold">Solicite sua aprovação</h3>
            <p className="mt-1 text-sm text-muted-foreground">Preencha e um consultor te chama em até 30 minutos.</p>
            <form className="mt-5 space-y-3 text-sm" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Seu nome completo" />
              <Input placeholder="WhatsApp com DDD" type="tel" />
              <Input placeholder="E-mail" type="email" />
              <Input placeholder="CPF" />
              <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md gradient-premium px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
                Solicitar análise <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-5 flex items-start gap-2 rounded-md border border-border bg-background p-3 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-gold" /> Seus dados são protegidos e usados apenas para análise de crédito.
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-base font-semibold">O que oferecemos</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {["Sem entrada (sujeito à análise)", "Aprovação em até 24h úteis", "Refinanciamento de veículo", "Aceitamos seu carro como entrada", "Atendimento personalizado"].map((it) => (
                <li key={it} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> {it}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className="font-display text-base font-semibold text-foreground">{value}</span></div>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}
function Stat({ l, v, highlight }: { l: string; v: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{l}</div>
      <div className={`mt-1 font-display text-lg font-bold ${highlight ? "text-gold" : "text-foreground"}`}>{v}</div>
    </div>
  );
}
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full rounded-md border border-border bg-background px-3.5 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none" />;
}
