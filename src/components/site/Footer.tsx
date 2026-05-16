import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Instagram, Facebook, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 container-px py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md gradient-premium">
              <span className="font-display font-bold text-primary-foreground">M</span>
            </div>
            <div className="leading-none">
              <div className="font-display font-semibold">Motora</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Premium Auto</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Há mais de 18 anos oferecendo veículos revisados, com procedência garantida e condições para todos os perfis.
          </p>
          <div className="mt-5 flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-gold" />
            Garantia Motora em todos os veículos
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold">Navegação</div>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Início</Link></li>
            <li><Link to="/catalogo" className="hover:text-foreground">Catálogo</Link></li>
            <li><Link to="/financiamento" className="hover:text-foreground">Financiamento</Link></li>
            <li><Link to="/institucional" className="hover:text-foreground">A Empresa</Link></li>
            <li><Link to="/contato" className="hover:text-foreground">Contato</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold">Contato</div>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 text-gold" /> Av. Brigadeiro Faria Lima, 2200<br/>São Paulo · SP</li>
            <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-gold" /> (11) 3000-0000</li>
            <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-gold" /> contato@motora.com.br</li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold">Horário</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Seg a Sex · 08h às 19h</li>
            <li>Sábado · 09h às 17h</li>
            <li>Domingo · 10h às 14h</li>
          </ul>
          <div className="mt-5 flex gap-2">
            <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:bg-surface-2"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:bg-surface-2"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 container-px py-5 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Motora Premium Auto · CNPJ 00.000.000/0001-00</div>
          <div>Todos os direitos reservados</div>
        </div>
      </div>
    </footer>
  );
}
