import { createFileRoute } from "@tanstack/react-router";
import { Car, Gauge } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { inventory } from "@/lib/crm-data";

export const Route = createFileRoute("/estoque")({
  head: () => ({
    meta: [
      { title: "Estoque de Veículos | Saradão Veículos" },
      {
        name: "description",
        content: "Veículos disponíveis, reservados e vendidos no estoque da Saradão Veículos.",
      },
      { property: "og:title", content: "Estoque de Veículos | Saradão Veículos" },
      { property: "og:description", content: "Modelos, quilometragem, preços e disponibilidade do estoque." },
    ],
  }),
  component: Estoque,
});

const statusClass: Record<string, string> = {
  Disponível: "bg-success/12 text-success border-success/25",
  Reservado: "bg-warning/15 text-warning-foreground border-warning/30",
  Vendido: "bg-muted text-muted-foreground border-border",
};

function Estoque() {
  return (
    <AppShell title="Estoque" subtitle={`${inventory.length} veículos no pátio`}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {inventory.map((v) => (
          <article
            key={v.id}
            className="shadow-card group rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30"
          >
            <div className="flex items-start justify-between">
              <div className="bg-accent text-accent-foreground group-hover:bg-gradient-brand flex size-10 items-center justify-center rounded-lg transition-colors group-hover:text-primary-foreground">
                <Car className="size-5" />
              </div>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusClass[v.status]}`}
              >
                {v.status}
              </span>
            </div>
            <h2 className="mt-4 text-lg font-bold">{v.model}</h2>
            <p className="text-sm text-muted-foreground">Ano {v.year}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Gauge className="size-4" /> {v.km}
              </span>
              <span className="text-primary font-display text-lg font-bold">{v.price}</span>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
