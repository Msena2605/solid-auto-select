import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CarCard } from "@/components/site/CarCard";
import { cars } from "@/data/cars";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo · Motora Premium Auto" },
      { name: "description", content: "Explore nosso estoque completo de veículos seminovos com procedência garantida." },
    ],
  }),
  component: CatalogPage,
});

const categories = [
  { id: "", label: "Todos" },
  { id: "economico", label: "Econômicos" },
  { id: "sedan", label: "Sedans" },
  { id: "suv", label: "SUVs" },
  { id: "seminovo", label: "Seminovos" },
  { id: "picape", label: "Picapes" },
];

function CatalogPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("");
  const [sort, setSort] = useState<"recent" | "low" | "high">("recent");
  const [maxPrice, setMaxPrice] = useState<number>(600000);

  const filtered = useMemo(() => {
    let list = cars.filter((c) => {
      const matchesQ = `${c.brand} ${c.model} ${c.version}`.toLowerCase().includes(q.toLowerCase());
      const matchesCat = cat ? c.category === cat : true;
      const matchesPrice = c.price <= maxPrice;
      return matchesQ && matchesCat && matchesPrice;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [q, cat, sort, maxPrice]);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl container-px py-12 md:py-16">
          <div className="text-xs uppercase tracking-[0.2em] text-gold">Estoque</div>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">Catálogo de veículos</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            {cars.length} veículos disponíveis · Todos revisados e com procedência verificada.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl container-px py-10">
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_auto]">
            <div className="flex items-center gap-2 rounded-md bg-background px-3 py-2.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar marca, modelo ou versão"
                className="w-full bg-transparent text-sm focus:outline-none"
              />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value as never)} className="rounded-md bg-background px-3 py-2.5 text-sm focus:outline-none">
              <option value="recent">Mais recentes</option>
              <option value="low">Menor preço</option>
              <option value="high">Maior preço</option>
            </select>
            <div className="hidden items-center gap-2 rounded-md bg-background px-3 py-2.5 text-xs text-muted-foreground md:flex">
              <SlidersHorizontal className="h-4 w-4" /> {filtered.length} resultados
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id || "all"}
                onClick={() => setCat(c.id)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${cat === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:text-foreground"}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4 md:flex-row md:items-center md:gap-6">
            <div className="text-xs font-medium text-muted-foreground">Preço máximo:</div>
            <input type="range" min={50000} max={600000} step={10000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[oklch(0.55_0.13_252)] md:max-w-md" />
            <div className="font-display text-sm font-semibold text-foreground">
              R$ {maxPrice.toLocaleString("pt-BR")}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <p className="text-sm text-muted-foreground">Nenhum veículo encontrado com esses filtros.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => <CarCard key={c.id} car={c} />)}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
