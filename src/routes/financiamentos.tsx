import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { FinancingBadge } from "@/components/StatusBadge";
import { customers } from "@/lib/crm-data";

export const Route = createFileRoute("/financiamentos")({
  head: () => ({
    meta: [
      { title: "Financiamentos | Saradão Veículos" },
      {
        name: "description",
        content: "Acompanhe propostas de financiamento em análise, aprovadas e recusadas dos clientes.",
      },
      { property: "og:title", content: "Financiamentos | Saradão Veículos" },
      { property: "og:description", content: "Situação do crédito de cada cliente da Saradão Veículos." },
    ],
  }),
  component: Financiamentos,
});

function Financiamentos() {
  const rows = customers.filter((c) => c.financing !== "Não iniciado");

  return (
    <AppShell title="Financiamentos" subtitle={`${rows.length} propostas em andamento`}>
      <div className="shadow-card overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 text-left text-xs tracking-wide text-muted-foreground uppercase">
              <th className="px-5 py-3 font-semibold">Cliente</th>
              <th className="px-5 py-3 font-semibold">Veículo</th>
              <th className="px-5 py-3 font-semibold">Valor</th>
              <th className="px-5 py-3 font-semibold">Situação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((c) => (
              <tr key={c.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-5 py-4 font-semibold">{c.name}</td>
                <td className="px-5 py-4">{c.interest}</td>
                <td className="px-5 py-4">{c.budget}</td>
                <td className="px-5 py-4">
                  <FinancingBadge status={c.financing} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
