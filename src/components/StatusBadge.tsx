import { cn } from "@/lib/utils";
import type { CustomerStatus, FinancingStatus } from "@/lib/crm-data";

const statusStyles: Record<CustomerStatus, string> = {
  Lead: "bg-info/10 text-info border-info/20",
  "Em Negociação": "bg-warning/15 text-warning-foreground border-warning/30",
  "Proposta Enviada": "bg-primary/10 text-primary border-primary/25",
  Vendido: "bg-success/12 text-success border-success/25",
};

const financingStyles: Record<FinancingStatus, string> = {
  "Não iniciado": "bg-muted text-muted-foreground border-border",
  "Em análise": "bg-warning/15 text-warning-foreground border-warning/30",
  Aprovado: "bg-success/12 text-success border-success/25",
  Recusado: "bg-destructive/10 text-destructive border-destructive/25",
};

export function StatusBadge({ status, className }: { status: CustomerStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        statusStyles[status],
        className,
      )}
    >
      {status}
    </span>
  );
}

export function FinancingBadge({ status, className }: { status: FinancingStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        financingStyles[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
