import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border border-border bg-card p-5 shadow-sm", className)}>{children}</div>;
}
export function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </Card>
  );
}
const tones: Record<string, string> = {
  ok: "bg-success/15 text-success", ativo: "bg-success/15 text-success", Aprovado: "bg-success/15 text-success",
  alerta: "bg-warning/20 text-accent-foreground", aguardando: "bg-warning/20 text-accent-foreground", "Em revisão": "bg-warning/20 text-accent-foreground",
  erro: "bg-destructive/15 text-destructive", pausado: "bg-muted text-muted-foreground", Rascunho: "bg-muted text-muted-foreground",
};
export function Badge({ children, tone }: { children: ReactNode; tone?: string }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold", tones[tone ?? ""] ?? "bg-secondary text-secondary-foreground")}>{children}</span>;
}
export function Button({ children, variant = "primary", ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "danger" }) {
  const v = { primary: "bg-primary text-primary-foreground hover:opacity-90", outline: "border border-border bg-card hover:bg-muted", danger: "bg-destructive/10 text-destructive hover:bg-destructive/20" }[variant];
  return <button {...p} className={cn("inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition disabled:opacity-50", v, p.className)}>{children}</button>;
}
export function SimNotice() {
  return (
    <div className="mb-6 rounded-lg border border-accent/50 bg-sim px-4 py-2.5 text-sm text-accent-foreground">
      <strong>Modo simulação:</strong> todos os dados exibidos são demonstrativos. Nenhuma integração real está ativa.
    </div>
  );
}
