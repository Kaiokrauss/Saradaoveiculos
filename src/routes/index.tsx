import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Handshake, CalendarClock, TrendingUp, ArrowRight, Phone, MessageCircle, Mail } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { customers, metrics } from "@/lib/crm-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | Saradão Veículos CRM" },
      {
        name: "description",
        content:
          "Painel de vendas da Saradão Veículos em Presidente Prudente: clientes, negociações, test drives e vendas do mês.",
      },
      { property: "og:title", content: "Dashboard | Saradão Veículos CRM" },
      {
        property: "og:description",
        content: "Acompanhe leads, negociações e vendas da Saradão Veículos em tempo real.",
      },
    ],
  }),
  component: Dashboard,
});

const icons = [Users, Handshake, CalendarClock, TrendingUp];

function Dashboard() {
  const recent = customers.slice(0, 5);

  return (
    <AppShell title="Bem-vindo de volta, equipe Saradão" subtitle="Presidente Prudente, SP · visão geral de hoje">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m, i) => {
          const Icon = icons[i] ?? Users;
          return (
            <div
              key={m.label}
              className="shadow-card group rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-muted-foreground">{m.label}</p>
                <div className="bg-accent text-accent-foreground group-hover:bg-gradient-brand flex size-9 items-center justify-center rounded-lg transition-colors duration-200 group-hover:text-primary-foreground">
                  <Icon className="size-[18px]" />
                </div>
              </div>
              <p className="font-display mt-3 text-3xl font-bold">{m.value}</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">{m.delta}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="shadow-card rounded-xl border border-border bg-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-lg font-bold">Últimos Contatos</h2>
              <p className="text-sm text-muted-foreground">Interações mais recentes com clientes</p>
            </div>
            <Link
              to="/clientes"
              className="text-primary inline-flex items-center gap-1 text-sm font-semibold transition-transform hover:translate-x-0.5"
            >
              Ver todos <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {recent.map((c) => (
              <li key={c.id}>
                <Link
                  to="/clientes/$id"
                  params={{ id: c.id }}
                  className="hover:bg-muted/60 flex items-center gap-4 px-5 py-4 transition-colors"
                >
                  <div className="bg-gradient-slate flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-sidebar-accent-foreground">
                    {c.name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{c.name}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {c.interest} · {c.interactions[0]?.note}
                    </p>
                  </div>
                  <div className="hidden shrink-0 items-center gap-3 sm:flex">
                    <StatusBadge status={c.status} />
                    <span className="w-24 text-right text-xs text-muted-foreground">{c.lastContact}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="shadow-card rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-bold">Agenda de hoje</h2>
          <p className="text-sm text-muted-foreground">Compromissos da equipe comercial</p>
          <ul className="mt-4 space-y-3">
            {[
              { time: "10:30", icon: Phone, text: "Ligar para Marcos Vinícius (Toro Volcano)" },
              { time: "13:00", icon: CalendarClock, text: "Test drive – Corolla XEI com Ricardo" },
              { time: "15:30", icon: MessageCircle, text: "Follow-up WhatsApp – Patrícia Nogueira" },
              { time: "17:00", icon: Mail, text: "Reenviar proposta – Diego Ferraz" },
            ].map((item) => (
              <li
                key={item.time}
                className="hover:border-primary/30 hover:bg-accent/40 flex items-start gap-3 rounded-lg border border-border p-3 transition-colors"
              >
                <div className="bg-accent text-accent-foreground flex size-8 shrink-0 items-center justify-center rounded-md">
                  <item.icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.time}</p>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
