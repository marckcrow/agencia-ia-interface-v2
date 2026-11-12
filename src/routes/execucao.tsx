import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Badge, Stat, SimNotice } from "@/components/admin/ui";
import { execucoes } from "@/data/mock";
export const Route = createFileRoute("/execucao")({ head: () => ({ meta: [{ title: "Execução e monitoramento — Agência de IA V2" }, { name: "description", content: "Acompanhamento das execuções dos agentes." }, { property: "og:title", content: "Execução e monitoramento — Agência de IA V2" }, { property: "og:description", content: "Acompanhamento das execuções dos agentes." }] }), component: Page });
function Page() {
  return (<>
    <PageHeader title="Execução e monitoramento" subtitle="Fila e eventos dos agentes" />
    <SimNotice />
    <div className="mb-6 grid gap-4 sm:grid-cols-3"><Stat label="Execuções hoje" value={37} /><Stat label="Taxa de sucesso" value="92%" /><Stat label="Alertas" value={2} /></div>
    <Card><h2 className="mb-3 font-bold">Registro de eventos</h2><ul className="divide-y divide-border">{execucoes.map((e,i)=><li key={i} className="flex items-center gap-3 py-2.5 text-sm"><span className="w-12 text-xs text-muted-foreground">{e.hora}</span><Badge>{e.agente}</Badge><span className="flex-1">{e.evento}</span><Badge tone={e.nivel}>{e.nivel}</Badge></li>)}</ul></Card>
  </>);
}
