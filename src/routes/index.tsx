import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Sparkles, ShieldCheck, Wallet, BadgeCheck, Users, MapPin, Star, ArrowRight, CarFront, Banknote, RefreshCw } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CarCard } from "@/components/site/CarCard";
import { cars } from "@/data/cars";
import heroCar from "@/assets/hero-car.jpg";
import showroom from "@/assets/showroom.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Motora Premium Auto · Seu próximo carro começa aqui" },
      { name: "description", content: "Concessionária Motora: veículos revisados, procedência garantida e financiamento facilitado em São Paulo." },
    ],
  }),
  component: HomePage,
});

const quickFilters = ["Até R$ 60 mil", "Automático", "SUV", "Sedan", "Picape", "0 entrada"];

function HomePage() {
  const destaques = cars.slice(0, 6);
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroCar}
            alt="Sedan premium em rua urbana à noite"
            width={1920}
            height={1080}
            className="h-full w-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center container-px py-20 md:py-28">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-gold" /> + de 18 anos no mercado · 12.000 famílias atendidas
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance text-foreground md:text-6xl lg:text-7xl">
              Seu próximo carro <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">começa aqui.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Veículos revisados, procedência garantida e condições para todos os perfis. Da sua primeira compra ao seu sedan executivo.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/catalogo" className="inline-flex items-center gap-2 rounded-md gradient-premium px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
                Ver catálogo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/financiamento" className="inline-flex items-center gap-2 rounded-md border border-border bg-background/50 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-md hover:bg-surface">
                <Wallet className="h-4 w-4 text-gold" /> Financiar Agora
              </Link>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mt-12 max-w-4xl animate-fade-up rounded-xl border border-border bg-card/90 p-3 shadow-elegant backdrop-blur-xl md:mt-16" style={{ animationDelay: "0.15s" }}>
            <form action="/catalogo" className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto_auto]">
              <div className="flex items-center gap-2 rounded-md bg-background px-3 py-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  name="q"
                  placeholder="Buscar marca, modelo ou versão (ex: Onix LT)"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <select className="rounded-md bg-background px-3 py-3 text-sm text-foreground focus:outline-none" name="categoria" defaultValue="">
                <option value="">Todas categorias</option>
                <option value="economico">Econômicos</option>
                <option value="sedan">Sedans</option>
                <option value="suv">SUVs</option>
                <option value="seminovo">Seminovos</option>
                <option value="picape">Picapes</option>
              </select>
              <button className="rounded-md gradient-premium px-5 py-3 text-sm font-semibold text-primary-foreground">
                Buscar
              </button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2 px-1">
              {quickFilters.map((f) => (
                <span key={f} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STATS */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden container-px py-10 md:grid-cols-4 md:py-12">
          {[
            { n: "18+", l: "Anos de mercado" },
            { n: "12 mil", l: "Famílias atendidas" },
            { n: "450+", l: "Veículos no estoque" },
            { n: "98%", l: "Aprovações de crédito" },
          ].map((s) => (
            <div key={s.l} className="px-4 text-center">
              <div className="font-display text-3xl font-bold text-foreground md:text-4xl">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="mx-auto max-w-7xl container-px py-20">
        <SectionHead eyebrow="Estoque selecionado" title="Veículos em destaque" subtitle="Selecionados pela nossa equipe técnica. Todos revisados, com laudo cautelar e garantia Motora." cta={{ to: "/catalogo", label: "Ver todo o catálogo" }} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((c) => <CarCard key={c.id} car={c} />)}
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl container-px py-20">
          <SectionHead eyebrow="Para cada perfil" title="Encontre o seu estilo" subtitle="Da economia urbana ao SUV premium." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Econômicos", d: "A partir de R$ 49.900", c: "economico" },
              { t: "Sedans Executivos", d: "Conforto e status", c: "sedan" },
              { t: "SUVs Premium", d: "Espaço e robustez", c: "suv" },
              { t: "Seminovos Aprovados", d: "Procedência Motora", c: "seminovo" },
            ].map((it) => (
              <Link key={it.t} to="/catalogo" className="group flex items-end justify-between overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-gold/50">
                <div>
                  <div className="font-display text-base font-semibold">{it.t}</div>
                  <div className="text-xs text-muted-foreground">{it.d}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-gold" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="mx-auto max-w-7xl container-px py-20">
        <SectionHead eyebrow="Por que Motora" title="A loja onde você compra com tranquilidade" subtitle="Transparência em cada etapa. Sem letras miúdas." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { I: ShieldCheck, t: "Procedência garantida", d: "Laudo cautelar e histórico verificados em todos os veículos." },
            { I: BadgeCheck, t: "Revisão certificada", d: "Mais de 80 itens checados por nossa equipe técnica." },
            { I: Wallet, t: "Crédito facilitado", d: "Trabalhamos com os principais bancos do país." },
            { I: RefreshCw, t: "Avaliamos seu usado", d: "Maior valor do mercado em até 30 minutos." },
          ].map((b) => (
            <div key={b.t} className="rounded-xl border border-border bg-card p-6 shadow-card transition-colors hover:border-primary/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg gradient-premium shadow-glow">
                <b.I className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="mt-4 font-display text-base font-semibold">{b.t}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINANCIAMENTO BANNER */}
      <section className="mx-auto max-w-7xl container-px">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="relative aspect-[16/10] md:aspect-auto">
              <img src={showroom} alt="Showroom Motora" loading="lazy" width={1600} height={1024} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-card via-card/30 to-transparent md:bg-gradient-to-l" />
            </div>
            <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs text-gold">
                <Banknote className="h-3 w-3" /> Financiamento Motora
              </span>
              <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Parcelas que cabem no seu bolso, com aprovação rápida.
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Simule online em 60 segundos. Trabalhamos com Santander, Itaú, Bradesco, BV e Banco PAN para encontrar a melhor condição para você.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/financiamento" className="inline-flex items-center gap-2 rounded-md gradient-premium px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
                  Simular financiamento <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contato" className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-semibold hover:bg-surface-2">
                  Avaliar meu usado
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="mx-auto max-w-7xl container-px py-20">
        <SectionHead eyebrow="Quem comprou recomenda" title="Histórias reais de quem encontrou o carro certo" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { n: "Carla Menezes", c: "São Paulo · SP", t: "Comprou Onix 2022", q: "Fui muito bem atendida. O carro estava exatamente como descrito. Recomendo de olhos fechados." },
            { n: "Rodrigo Almeida", c: "Campinas · SP", t: "Comprou GLE 2023", q: "Compra de alto valor que correu com total transparência. Documentação rapidíssima." },
            { n: "Patrícia Lopes", c: "Santo André · SP", t: "Financiou HB20 2021", q: "Sem entrada e parcela cabendo no orçamento. Atendimento humano do começo ao fim." },
          ].map((d) => (
            <div key={d.n} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground">"{d.q}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-sm font-semibold">{d.n.split(" ").map(p=>p[0]).slice(0,2).join("")}</div>
                <div>
                  <div className="text-sm font-semibold">{d.n}</div>
                  <div className="text-xs text-muted-foreground">{d.c} · {d.t}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARCEIROS */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl container-px py-12">
          <div className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">Parceiros financeiros</div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted-foreground">
            {["SANTANDER", "ITAÚ", "BRADESCO", "BANCO BV", "PAN", "OMNI"].map((p) => (
              <div key={p} className="font-display text-sm font-semibold tracking-wider md:text-base">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION + FAQ */}
      <section className="mx-auto grid max-w-7xl gap-10 container-px py-20 md:grid-cols-2">
        <div>
          <SectionHead eyebrow="Visite a loja" title="Estamos te esperando" />
          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
            <div className="aspect-[16/10] w-full bg-surface-2">
              <iframe
                title="Mapa Motora"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-46.6925%2C-23.5825%2C-46.6725%2C-23.5685&layer=mapnik"
                className="h-full w-full grayscale-[40%]"
                loading="lazy"
              />
            </div>
            <div className="flex items-start gap-3 p-5 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 text-gold" />
              <div>
                <div className="font-semibold">Av. Brigadeiro Faria Lima, 2200 — São Paulo / SP</div>
                <div className="text-muted-foreground">Seg a Sex 08h–19h · Sáb 09h–17h · Dom 10h–14h</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionHead eyebrow="Tira-dúvidas" title="Perguntas frequentes" />
          <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {[
              { q: "Os veículos têm garantia?", a: "Sim. Todos os veículos da Motora contam com garantia de motor e câmbio por 3 meses, além da garantia de fábrica quando aplicável." },
              { q: "Vocês aceitam meu carro como entrada?", a: "Sim. Avaliamos seu veículo no momento da visita, com pagamento à vista do valor avaliado ou abatimento direto." },
              { q: "Como funciona o financiamento?", a: "Trabalhamos com os principais bancos. A simulação pode ser feita online em 60 segundos, com aprovação em até 24h úteis." },
              { q: "Posso agendar test-drive?", a: "Sim. Você pode agendar pelo WhatsApp, telefone ou diretamente na página do veículo." },
            ].map((f, i) => (
              <details key={i} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium text-foreground marker:hidden">
                  {f.q}
                  <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-7xl container-px pb-20">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center shadow-elegant md:p-16">
          <div className="absolute inset-0 -z-10 opacity-50" style={{ background: "radial-gradient(60% 60% at 50% 0%, oklch(0.55 0.13 252 / 0.3), transparent)" }} />
          <CarFront className="mx-auto h-10 w-10 text-gold" />
          <h3 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">Pronto para encontrar o seu próximo carro?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
            Nossa equipe está pronta para te ajudar a escolher o veículo ideal, com a melhor condição do mercado.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/catalogo" className="inline-flex items-center gap-2 rounded-md gradient-premium px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow">Explorar catálogo</Link>
            <Link to="/contato" className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-semibold hover:bg-surface-2"><Users className="h-4 w-4 text-gold" /> Falar com consultor</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionHead({ eyebrow, title, subtitle, cta }: { eyebrow: string; title: string; subtitle?: string; cta?: { to: string; label: string } }) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-gold">{eyebrow}</div>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-sm text-muted-foreground md:text-base">{subtitle}</p>}
      </div>
      {cta && (
        <Link to={cta.to} className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-gold">
          {cta.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
