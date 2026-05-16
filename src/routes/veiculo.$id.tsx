import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Calendar, Gauge, Settings2, Fuel, Palette, DoorOpen, Phone, MessageCircle, MapPin, BadgeCheck, Wrench, FileCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CarCard } from "@/components/site/CarCard";
import { findCar, cars, formatBRL, formatKm } from "@/data/cars";

export const Route = createFileRoute("/veiculo/$id")({
  loader: ({ params }) => {
    const car = findCar(params.id);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.car.brand} ${loaderData.car.model} ${loaderData.car.year} · Motora` },
          { name: "description", content: loaderData.car.description },
          { property: "og:image", content: loaderData.car.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Veículo não encontrado</h1>
        <Link to="/catalogo" className="mt-6 inline-flex rounded-md gradient-premium px-5 py-3 text-sm font-semibold text-primary-foreground">Ver catálogo</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout><div className="mx-auto max-w-3xl px-5 py-32 text-center text-sm text-muted-foreground">{error.message}</div></SiteLayout>
  ),
  component: VehiclePage,
});

function VehiclePage() {
  const { car } = Route.useLoaderData();
  const gallery = [car.image, car.image, car.image, car.image];
  const [idx, setIdx] = useState(0);

  const [downPct, setDownPct] = useState(20);
  const [months, setMonths] = useState(48);
  const down = Math.round(car.price * (downPct / 100));
  const financed = car.price - down;
  const rate = 0.0149;
  const installment = Math.round((financed * rate) / (1 - Math.pow(1 + rate, -months)));

  const waLink = `https://wa.me/5511900000000?text=${encodeURIComponent(`Olá! Tenho interesse no ${car.brand} ${car.model} ${car.year} (${formatBRL(car.price)}).`)}`;

  return (
    <SiteLayout>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl container-px py-6">
          <div className="text-xs text-muted-foreground">
            <Link to="/catalogo" className="hover:text-foreground">Catálogo</Link> · {car.brand} {car.model}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 container-px py-10 lg:grid-cols-[1.5fr_1fr]">
        {/* GALLERY */}
        <div>
          <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-card">
            <div className="aspect-[16/10] bg-surface-2">
              <img src={gallery[idx]} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover" />
            </div>
            <button onClick={() => setIdx((i) => (i - 1 + gallery.length) % gallery.length)} aria-label="Anterior" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/70 p-2 backdrop-blur hover:bg-background"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={() => setIdx((i) => (i + 1) % gallery.length)} aria-label="Próxima" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/70 p-2 backdrop-blur hover:bg-background"><ChevronRight className="h-5 w-5" /></button>
            <div className="absolute left-3 top-3 flex gap-2">
              {car.badge && <span className="rounded-md gradient-gold px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold-foreground">{car.badge}</span>}
              <span className="inline-flex items-center gap-1 rounded-md bg-success/20 px-2 py-1 text-[11px] font-medium text-success-foreground" style={{ color: "oklch(0.85 0.13 155)" }}>
                <ShieldCheck className="h-3 w-3" /> Revisado
              </span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`overflow-hidden rounded-lg border transition-all ${idx === i ? "border-primary ring-2 ring-primary/40" : "border-border opacity-70 hover:opacity-100"}`}>
                <div className="aspect-[16/10]"><img src={g} alt="" className="h-full w-full object-cover" /></div>
              </button>
            ))}
          </div>

          {/* FICHA TÉCNICA */}
          <div className="mt-10 rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold">Ficha técnica</h2>
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 text-sm md:grid-cols-3">
              <Spec I={Calendar} l="Ano" v={String(car.year)} />
              <Spec I={Gauge} l="Quilometragem" v={formatKm(car.km)} />
              <Spec I={Settings2} l="Câmbio" v={car.transmission} />
              <Spec I={Fuel} l="Combustível" v={car.fuel} />
              <Spec I={Palette} l="Cor" v={car.color} />
              <Spec I={DoorOpen} l="Portas" v={String(car.doors)} />
            </div>
          </div>

          {/* DIFERENCIAIS */}
          <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold">Diferenciais e equipamentos</h2>
            <div className="mt-5 grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
              {["Ar-condicionado", "Direção elétrica", "Vidros elétricos", "Travas elétricas", "Airbag duplo", "Freios ABS", "Multimídia", "Câmera de ré", "Sensor de estacionamento", "Rodas de liga leve", "Bancos em couro", "Computador de bordo"].map((it) => (
                <div key={it} className="flex items-center gap-2 text-muted-foreground"><BadgeCheck className="h-4 w-4 text-gold" /> {it}</div>
              ))}
            </div>
          </div>

          {/* HISTÓRICO */}
          <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold">Histórico e procedência</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3"><FileCheck className="mt-0.5 h-4 w-4 text-gold" /> Laudo cautelar aprovado · sem sinistros registrados</li>
              <li className="flex items-start gap-3"><Wrench className="mt-0.5 h-4 w-4 text-gold" /> Revisão completa em mais de 80 itens</li>
              <li className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 text-gold" /> Garantia Motora de 3 meses (motor e câmbio)</li>
              <li className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-4 w-4 text-gold" /> Documentação e IPVA em dia</li>
            </ul>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-6 shadow-elegant">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{car.brand}</div>
            <h1 className="mt-1 font-display text-2xl font-bold tracking-tight">{car.model}</h1>
            <p className="text-sm text-muted-foreground">{car.version} · {car.year}</p>

            <div className="mt-5 border-t border-border pt-5">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Preço à vista</div>
              <div className="font-display text-3xl font-bold">{formatBRL(car.price)}</div>
              <div className="mt-2 text-xs text-muted-foreground">ou <span className="text-foreground font-semibold">{formatBRL(installment)}</span> /mês em {months}x</div>
            </div>

            <div className="mt-5 flex flex-col gap-2.5">
              <a href={waLink} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01]">
                <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp
              </a>
              <button className="inline-flex items-center justify-center gap-2 rounded-md gradient-premium px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
                <Calendar className="h-4 w-4" /> Agendar visita
              </button>
              <a href="tel:+551130000000" className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-semibold hover:bg-surface-2">
                <Phone className="h-4 w-4 text-gold" /> (11) 3000-0000
              </a>
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-md border border-border bg-background p-3 text-xs text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 text-gold" /> Veículo disponível em loja · Av. Brigadeiro Faria Lima, 2200
            </div>
          </div>

          {/* SIMULADOR */}
          <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="text-xs uppercase tracking-[0.2em] text-gold">Simulador</div>
            <h3 className="mt-1 font-display text-lg font-semibold">Simule seu financiamento</h3>

            <div className="mt-5 space-y-5 text-sm">
              <div>
                <div className="flex justify-between"><span className="text-muted-foreground">Entrada</span><span className="font-semibold">{downPct}% · {formatBRL(down)}</span></div>
                <input type="range" min={10} max={70} step={5} value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} className="mt-2 w-full accent-[oklch(0.55_0.13_252)]" />
              </div>
              <div>
                <div className="flex justify-between"><span className="text-muted-foreground">Parcelas</span><span className="font-semibold">{months}x</span></div>
                <input type="range" min={12} max={60} step={6} value={months} onChange={(e) => setMonths(Number(e.target.value))} className="mt-2 w-full accent-[oklch(0.55_0.13_252)]" />
              </div>
              <div className="rounded-lg bg-surface-2 p-4">
                <div className="text-xs text-muted-foreground">Parcela estimada</div>
                <div className="font-display text-2xl font-bold text-foreground">{formatBRL(installment)}<span className="text-sm font-medium text-muted-foreground"> /mês</span></div>
                <div className="mt-1 text-[11px] text-muted-foreground">Simulação ilustrativa. Sujeita à análise de crédito.</div>
              </div>
              <Link to="/financiamento" className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-surface">
                Simulação completa
              </Link>
            </div>
          </div>
        </aside>
      </section>

      {/* SIMILAR */}
      <section className="mx-auto max-w-7xl container-px py-16">
        <h2 className="font-display text-2xl font-bold tracking-tight">Você também pode gostar</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.filter((c) => c.id !== car.id).slice(0, 3).map((c) => (
            <CarMini key={c.id} c={c} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function Spec({ I, l, v }: { I: typeof Calendar; l: string; v: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-surface-2"><I className="h-4 w-4 text-gold" /></div>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{l}</div>
        <div className="text-sm font-semibold text-foreground">{v}</div>
      </div>
    </div>
  );
}

