import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato · Motora Premium Auto" },
      { name: "description", content: "Fale com a Motora. WhatsApp, telefone, e-mail e endereço da concessionária." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl container-px py-14 md:py-20">
          <div className="text-xs uppercase tracking-[0.2em] text-gold">Contato</div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight md:text-5xl">Estamos prontos para te atender.</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Fale com nossos consultores pelo canal de sua preferência. Respondemos em até 30 minutos durante o horário comercial.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 container-px py-14 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          {[
            { I: MapPin, t: "Endereço", d: "Av. Brigadeiro Faria Lima, 2200\nSão Paulo · SP · 01451-000" },
            { I: Phone, t: "Telefone", d: "(11) 3000-0000" },
            { I: MessageCircle, t: "WhatsApp", d: "(11) 90000-0000" },
            { I: Mail, t: "E-mail", d: "contato@motora.com.br" },
            { I: Clock, t: "Horário", d: "Seg a Sex · 08h às 19h\nSáb · 09h às 17h · Dom · 10h às 14h" },
          ].map((c) => (
            <div key={c.t} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-2"><c.I className="h-5 w-5 text-gold" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.t}</div>
                <div className="mt-1 whitespace-pre-line text-sm font-medium text-foreground">{c.d}</div>
              </div>
            </div>
          ))}
          <div className="overflow-hidden rounded-xl border border-border">
            <iframe title="Mapa Motora" src="https://www.openstreetmap.org/export/embed.html?bbox=-46.6925%2C-23.5825%2C-46.6725%2C-23.5685&layer=mapnik" className="h-72 w-full grayscale-[40%]" loading="lazy" />
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-border bg-card p-6 shadow-elegant md:p-10">
          <h2 className="font-display text-2xl font-bold">Envie sua mensagem</h2>
          <p className="mt-1 text-sm text-muted-foreground">Preencha o formulário e te respondemos rapidinho.</p>
          <div className="mt-6 grid gap-3 text-sm md:grid-cols-2">
            <Input placeholder="Nome completo" />
            <Input placeholder="Telefone / WhatsApp" />
            <Input placeholder="E-mail" type="email" className="md:col-span-2" />
            <select className="md:col-span-2 rounded-md border border-border bg-background px-3.5 py-3 text-sm focus:border-primary focus:outline-none">
              <option>Sobre qual assunto?</option>
              <option>Quero comprar um veículo</option>
              <option>Quero vender meu carro</option>
              <option>Financiamento e crédito</option>
              <option>Pós-venda</option>
              <option>Outro assunto</option>
            </select>
            <textarea rows={5} placeholder="Sua mensagem" className="md:col-span-2 w-full rounded-md border border-border bg-background px-3.5 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
          </div>
          <button className="mt-5 inline-flex items-center justify-center gap-2 rounded-md gradient-premium px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
            <Send className="h-4 w-4" /> Enviar mensagem
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}

function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-md border border-border bg-background px-3.5 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none ${className}`} />;
}
