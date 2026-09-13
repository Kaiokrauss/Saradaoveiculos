import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Plus, Eye, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { customers as seed, type Customer, type CustomerStatus } from "@/lib/crm-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/clientes/")({
  head: () => ({
    meta: [
      { title: "Gestão de Clientes | Saradão Veículos" },
      {
        name: "description",
        content: "Cadastro e acompanhamento de clientes, veículos de interesse e status de negociação.",
      },
      { property: "og:title", content: "Gestão de Clientes | Saradão Veículos" },
      { property: "og:description", content: "Leads, negociações e propostas dos clientes da Saradão Veículos." },
    ],
  }),
  component: Clientes,
});

const filters: (CustomerStatus | "Todos")[] = ["Todos", "Lead", "Em Negociação", "Proposta Enviada", "Vendido"];

function Clientes() {
  const [list, setList] = useState<Customer[]>(seed);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: "", notes: "" });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return list.filter(
      (c) =>
        (filter === "Todos" || c.status === filter) &&
        (!q || c.name.toLowerCase().includes(q) || c.interest.toLowerCase().includes(q)),
    );
  }, [list, query, filter]);

  function submit() {
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Informe pelo menos nome e telefone.");
      return;
    }
    const novo: Customer = {
      id: String(Date.now()),
      name: form.name,
      phone: form.phone,
      email: form.email,
      city: "Presidente Prudente, SP",
      interest: form.interest || "A definir",
      status: "Lead",
      financing: "Não iniciado",
      budget: "—",
      lastContact: "Agora",
      notes: form.notes,
      interactions: [{ id: "n1", kind: "WhatsApp", date: "Agora", note: form.notes || "Cliente cadastrado no CRM." }],
    };
    setList((prev) => [novo, ...prev]);
    setForm({ name: "", phone: "", email: "", interest: "", notes: "" });
    setOpen(false);
    toast.success(`${novo.name} adicionado como novo lead.`);
  }

  return (
    <AppShell title="Gestão de Clientes" subtitle={`${list.length} clientes cadastrados`}>
      <div className="shadow-card rounded-xl border border-border bg-card">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome ou veículo de interesse..."
              className="pl-9"
            />
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-brand hover:shadow-brand text-primary-foreground transition-all duration-200">
                <Plus className="size-4" /> Adicionar Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Cliente</DialogTitle>
                <DialogDescription>Cadastre o lead e acompanhe a negociação pelo CRM.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ex.: João Batista"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Telefone / WhatsApp</Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(18) 99999-0000"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="cliente@email.com"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="interest">Veículo de interesse</Label>
                  <Input
                    id="interest"
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    placeholder="Ex.: Toyota Corolla 2022"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Preferências, forma de pagamento, melhor horário de contato..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={submit} className="bg-gradient-brand text-primary-foreground">
                  Salvar cliente
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-border px-4 py-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-200 " +
                (filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground")
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left text-xs tracking-wide text-muted-foreground uppercase">
                <th className="px-5 py-3 font-semibold">Cliente</th>
                <th className="px-5 py-3 font-semibold">Telefone / WhatsApp</th>
                <th className="px-5 py-3 font-semibold">Veículo de Interesse</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.city}</p>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">{c.phone}</td>
                  <td className="px-5 py-4">{c.interest}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`https://wa.me/55${c.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:border-primary/40 hover:text-primary rounded-md border border-border p-2 transition-colors"
                        aria-label={`Enviar WhatsApp para ${c.name}`}
                      >
                        <MessageCircle className="size-4" />
                      </a>
                      <Link
                        to="/clientes/$id"
                        params={{ id: c.id }}
                        className="hover:border-primary/40 hover:text-primary rounded-md border border-border p-2 transition-colors"
                        aria-label={`Ver detalhes de ${c.name}`}
                      >
                        <Eye className="size-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                    Nenhum cliente encontrado para esta busca.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
