import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações | Saradão Veículos" },
      { name: "description", content: "Dados da loja, equipe e preferências de notificação do CRM Saradão Veículos." },
      { property: "og:title", content: "Configurações | Saradão Veículos" },
      { property: "og:description", content: "Ajuste dados da loja e alertas do CRM da Saradão Veículos." },
    ],
  }),
  component: Configuracoes,
});

function Configuracoes() {
  return (
    <AppShell title="Configurações" subtitle="Dados da loja e preferências do CRM">
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="shadow-card space-y-4 rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-bold">Dados da loja</h2>
          <div className="grid gap-2">
            <Label htmlFor="loja">Nome</Label>
            <Input id="loja" defaultValue="Saradão Veículos" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cidade">Cidade</Label>
            <Input id="cidade" defaultValue="Presidente Prudente, SP" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tel">Telefone comercial</Label>
            <Input id="tel" defaultValue="(18) 3222-0000" />
          </div>
          <Button className="bg-gradient-brand hover:shadow-brand text-primary-foreground transition-all">
            Salvar alterações
          </Button>
        </section>

        <section className="shadow-card space-y-4 rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-bold">Notificações</h2>
          {[
            { label: "Novo lead recebido", desc: "Alerta imediato para a equipe comercial" },
            { label: "Test drive agendado", desc: "Lembrete 1 hora antes do horário" },
            { label: "Financiamento aprovado", desc: "Aviso quando o banco retornar" },
            { label: "Resumo diário por e-mail", desc: "Enviado às 19h para os gestores" },
          ].map((n) => (
            <div
              key={n.label}
              className="hover:border-primary/30 flex items-center justify-between rounded-lg border border-border p-4 transition-colors"
            >
              <div>
                <p className="text-sm font-semibold">{n.label}</p>
                <p className="text-sm text-muted-foreground">{n.desc}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
