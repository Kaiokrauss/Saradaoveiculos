import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Phone, Mail, MapPin, Car, Wallet, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { FinancingBadge, StatusBadge } from "@/components/StatusBadge";
import { customers } from "@/lib/crm-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/clientes/$id")({
  head: () => ({
    meta: [
      { title: "Ficha do Cliente | Saradão Veículos" },
      {
        name: "description",
        content: "Histórico de interações, veículo de interesse e status de financiamento do cliente.",
      },
      { property: "og:title", content: "Ficha do Cliente | Saradão Veículos" },
      { property: "og:description", content: "Timeline de contatos e situação do financiamento do cliente." },
    ],
  }),
  component: CustomerDetail,
});

function CustomerDetail() {
  const { id } = Route.useParams();
  const customer = customers.find((c) => c.id === id) ?? customers[0]!;

  return (
    <AppShell title={customer.name} subtitle={`Interesse: ${customer.interest}`}>
      <Link
        to="/clientes"
        className="hover:text-primary mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors"
      >
        <ArrowLeft className="size-4" /> Voltar para clientes
      </Link>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="shadow-card space-y-5 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-slate flex size-14 items-center justify-center rounded-full text-base font-bold text-sidebar-accent-foreground">
              {customer.name
                .split(" ")
                .slice(0, 2)
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h2 className="text-xl font-bold">{customer.name}</h2>
              <StatusBadge status={customer.status} className="mt-1" />
            </div>
          </div>

          <ul className="space-y-3 text-sm">
            {[
              { icon: Phone, value: customer.phone },
              { icon: Mail, value: customer.email },
              { icon: MapPin, value: customer.city },
              { icon: Car, value: customer.interest },
              { icon: Wallet, value: `Orçamento: ${customer.budget}` },
            ].map((row, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="bg-accent text-accent-foreground flex size-8 items-center justify-center rounded-md">
                  <row.icon className="size-4" />
                </span>
                <span className="text-muted-foreground">{row.value}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-lg border border-border p-4">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Status do Financiamento
            </p>
            <div className="mt-2">
              <FinancingBadge status={customer.financing} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{customer.notes}</p>
          </div>

          <div className="flex gap-2">
            <Button className="bg-gradient-brand hover:shadow-brand flex-1 text-primary-foreground transition-all">
              <MessageCircle className="size-4" /> WhatsApp
            </Button>
            <Button variant="outline" className="flex-1">
              <Phone className="size-4" /> Ligar
            </Button>
          </div>
        </section>

        <section className="shadow-card rounded-xl border border-border bg-card lg:col-span-2">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-lg font-bold">Histórico de Interações</h2>
            <p className="text-sm text-muted-foreground">Ligações, mensagens e visitas registradas</p>
          </div>
          <ol className="space-y-6 p-5">
            {customer.interactions.map((it, i) => (
              <li key={it.id} className="relative pl-8">
                <span className="bg-gradient-brand absolute top-1 left-0 size-3 rounded-full ring-4 ring-accent" />
                {i < customer.interactions.length - 1 && (
                  <span className="absolute top-5 left-[5px] h-full w-0.5 bg-border" />
                )}
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{it.kind}</p>
                  <span className="text-xs text-muted-foreground">{it.date}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{it.note}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </AppShell>
  );
}
