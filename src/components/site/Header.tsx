import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Início" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/financiamento", label: "Financiamento" },
  { to: "/institucional", label: "A Empresa" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between container-px md:h-20">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md gradient-premium shadow-glow">
            <span className="font-display text-base font-bold text-primary-foreground">M</span>
          </div>
          <div className="leading-none">
            <div className="font-display text-base font-semibold tracking-tight">Motora</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Premium Auto</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              activeProps={{ className: "text-foreground bg-surface" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+551130000000"
            className="hidden items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-2 md:flex"
          >
            <Phone className="h-4 w-4 text-gold" />
            (11) 3000-0000
          </a>
          <Link
            to="/financiamento"
            className="hidden rounded-md gradient-premium px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] md:inline-flex"
          >
            Financiar Agora
          </Link>
          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background md:hidden",
          open ? "max-h-96" : "max-h-0",
          "transition-[max-height] duration-300"
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
              activeProps={{ className: "text-foreground bg-surface" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/financiamento"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md gradient-premium px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
          >
            Financiar Agora
          </Link>
        </div>
      </div>
    </header>
  );
}
