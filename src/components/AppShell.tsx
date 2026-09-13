import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Car,
  Landmark,
  Settings,
  Menu,
  X,
  Search,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const nav = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Clientes", to: "/clientes", icon: Users },
  { label: "Estoque", to: "/estoque", icon: Car },
  { label: "Financiamentos", to: "/financiamentos", icon: Landmark },
  { label: "Configurações", to: "/configuracoes", icon: Settings },
] as const;

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex h-full flex-col bg-gradient-slate">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="bg-gradient-brand shadow-brand flex size-10 items-center justify-center rounded-xl">
          <Car className="size-5 text-primary-foreground" />
        </div>
        <div className="leading-tight">
          <p className="font-display text-lg font-bold tracking-wide text-sidebar-accent-foreground uppercase">
            Saradão
          </p>
          <p className="text-[11px] font-medium tracking-[0.18em] text-sidebar-foreground/60 uppercase">
            Veículos
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-brand"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:translate-x-0.5",
              )}
            >
              <item.icon className="size-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-xl border border-sidebar-border bg-sidebar-accent/60 p-4">
        <p className="text-xs font-semibold text-sidebar-accent-foreground">Meta do mês</p>
        <p className="mt-1 text-xs text-sidebar-foreground/60">18 de 25 veículos vendidos</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sidebar-border">
          <div className="bg-gradient-brand h-full w-[72%] rounded-full transition-all duration-500" />
        </div>
      </div>
    </div>
  );
}

export function AppShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border lg:block">
        <SidebarContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
          />
          <div className="animate-in slide-in-from-left absolute inset-y-0 left-0 w-64 duration-200">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="bg-card/85 sticky top-0 z-20 border-b border-border backdrop-blur">
          <div className="flex items-center gap-4 px-4 py-3 sm:px-6">
            <button
              onClick={() => setOpen((v) => !v)}
              className="hover:bg-muted rounded-lg p-2 transition-colors lg:hidden"
              aria-label="Abrir menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-xl font-bold">{title}</h1>
              {subtitle && <p className="truncate text-sm text-muted-foreground">{subtitle}</p>}
            </div>

            <div className="relative hidden md:block">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar no CRM..." className="w-56 pl-9 transition-shadow focus-visible:shadow-card" />
            </div>

            <button
              className="hover:bg-muted relative rounded-lg p-2 transition-colors"
              aria-label="Notificações"
            >
              <Bell className="size-5" />
              <span className="bg-primary absolute top-1.5 right-1.5 size-2 rounded-full" />
            </button>

            <div className="bg-gradient-slate flex size-9 items-center justify-center rounded-full text-xs font-bold text-sidebar-accent-foreground">
              SV
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
