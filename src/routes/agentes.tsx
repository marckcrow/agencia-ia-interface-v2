import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Badge, Button, SimNotice } from "@/components/admin/ui";
import { agentes } from "@/data/mock";
export const Route = createFileRoute("/agentes")({ head: () => ({ meta: [{ title: "Agentes A1–A6 — Agência de IA V2" }, { name: "description", content: "Painéis dos seis agentes de IA." }, { property: "og:title", content: "Agentes A1–A6 — Agência de IA V2" }, { property: "og:description", content: "Painéis dos seis agentes de IA." }] }), component: Page });
function Page() {
  return (<>
    <PageHeader title="Agentes de IA" subtitle="Painéis dos agentes A1 a A6" />
    <SimNotice />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{agentes.map(a=>(
      <Card key={a.id}>
        <div className="flex items-start justify-between"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-lg bg-primary font-display font-bold text-primary-foreground">{a.id}</span><div><h2 className="font-bold">{a.nome}</h2><p className="text-xs text-muted-foreground">{a.funcao}</p></div></div><Badge tone={a.status}>{a.status}</Badge></div>
        <p className="mt-4 text-sm">{a.tarefas} tarefas na fila</p>
        <div className="mt-4 flex gap-2"><Button variant="outline" disabled>Pausar</Button><Button variant="outline" disabled>Ver logs</Button></div>
      </Card>))}</div>
  </>);
}
