import { createFileRoute } from "@tanstack/react-router";
import { Award, Users, Building2, Target, Heart, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import showroom from "@/assets/showroom.jpg";

export const Route = createFileRoute("/institucional")({
  head: () => ({
    meta: [
      { title: "A Empresa · Motora Premium Auto" },
      { name: "description", content: "Conheça a história da Motora: 18 anos de tradição em veículos seminovos no Brasil." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <img src={showroom} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative mx-auto max-w-7xl container-px py-20 md:py-28">
          <div className="text-xs uppercase tracking-[0.2em] text-gold">Sobre nós</div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">Há 18 anos movendo histórias pelo Brasil.</h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            A Motora nasceu em 2007 com uma ideia simples: tornar a compra de um carro seminovo uma experiência transparente, justa e acolhedora — para qualquer perfil.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 container-px py-20 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight">Nossa história</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>Tudo começou em uma pequena loja na Zona Sul de São Paulo, com 12 veículos e a missão de oferecer carros revisados a preços justos. Hoje, somos uma das principais referências em seminovos do Sudeste, com mais de 450 veículos em estoque e atendimento próprio em 3 unidades.</p>
            <p>Nosso compromisso permanece o mesmo: cada veículo passa por mais de 80 itens de checagem técnica, com laudo cautelar emitido por empresa independente. Sem letras miúdas. Sem surpresas.</p>
            <p>Acreditamos que comprar um carro deve ser um momento de conquista — não de ansiedade.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { I: Building2, n: "3", l: "Unidades físicas" },
            { I: Users, n: "12 mil+", l: "Clientes atendidos" },
            { I: Award, n: "18", l: "Anos de mercado" },
            { I: ShieldCheck, n: "100%", l: "Procedência" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <s.I className="h-6 w-6 text-gold" />
              <div className="mt-4 font-display text-3xl font-bold">{s.n}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-6 container-px py-20 md:grid-cols-3">
          {[
            { I: Target, t: "Missão", d: "Tornar a compra de um veículo uma experiência transparente, acessível e segura para todos os brasileiros." },
            { I: Heart, t: "Valores", d: "Honestidade radical, respeito ao cliente, excelência técnica e responsabilidade com cada negócio." },
            { I: Award, t: "Visão", d: "Ser a marca de referência em veículos seminovos no Brasil — sinônimo de confiança e atendimento humano." },
          ].map((v) => (
            <div key={v.t} className="rounded-xl border border-border bg-card p-8 shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg gradient-premium shadow-glow"><v.I className="h-5 w-5 text-primary-foreground" /></div>
              <h3 className="mt-5 font-display text-lg font-semibold">{v.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
