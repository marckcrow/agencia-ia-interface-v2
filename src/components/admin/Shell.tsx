import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { LayoutDashboard, Package, Bot, ShieldCheck, CalendarDays, Library, Clapperboard, Activity, Plug, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Painel central", icon: LayoutDashboard },
  { to: "/produtos", label: "Produtos", icon: Package },
  { to: "/agentes", label: "Agentes A1–A6", icon: Bot },
  { to: "/direcao", label: "Sala de Direção", icon: ShieldCheck },
  { to: "/calendario", label: "Calendário editorial", icon: CalendarDays },
  { to: "/biblioteca", label: "Biblioteca", icon: Library },
  { to: "/estudio", label: "Estúdio audiovisual", icon: Clapperboard },
  { to: "/execucao", label: "Execução e monitoramento", icon: Activity },
  { to: "/integracoes", label: "Integrações", icon: Plug },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen w-full">
      <aside className={cn("fixed inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center justify-between px-5 py-5">
          <div>
            <p className="font-display text-lg font-bold">Agência de IA</p>
            <p className="text-xs text-sidebar-primary">Autônoma · Interface V2</p>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Fechar menu"><X className="h-5 w-5" /></button>
        </div>
        <nav className="space-y-1 px-3">
          {nav.map((n) => {
            const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-sidebar-accent", active && "bg-sidebar-accent text-sidebar-primary")}>
                <n.icon className="h-4 w-4" />{n.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-foreground/40 lg:hidden" onClick={() => setOpen(false)} />}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b border-border bg-card px-4 lg:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu className="h-5 w-5" /></button>
          <span className="text-sm text-muted-foreground">Administração</span>
          <span className="ml-auto rounded-full bg-sim px-3 py-1 text-xs font-semibold text-accent-foreground">SIMULAÇÃO</span>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
