import { Link } from "@tanstack/react-router";
import { Fuel, Gauge, Settings2, ShieldCheck, ArrowRight } from "lucide-react";
import { type Car, formatBRL, formatKm } from "@/data/cars";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to="/veiculo/$id"
      params={{ id: car.id }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
          width={1024}
          height={704}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {car.badge && (
          <span className="absolute left-3 top-3 rounded-md gradient-gold px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold-foreground shadow-card">
            {car.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md border border-border bg-background/80 px-2 py-1 text-[11px] font-medium text-foreground backdrop-blur-md">
          <ShieldCheck className="h-3 w-3 text-gold" /> Procedência
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-lg font-semibold leading-tight">
              {car.brand} {car.model}
            </h3>
            <span className="text-xs text-muted-foreground">{car.year}</span>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{car.version}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-gold" />{formatKm(car.km)}</div>
          <div className="flex items-center gap-1.5"><Settings2 className="h-3.5 w-3.5 text-gold" />{car.transmission}</div>
          <div className="flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5 text-gold" />{car.fuel}</div>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">A partir de</div>
            <div className="font-display text-xl font-bold text-foreground">{formatBRL(car.price)}</div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-2 px-3 py-2 text-xs font-medium text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            Ver detalhes <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
