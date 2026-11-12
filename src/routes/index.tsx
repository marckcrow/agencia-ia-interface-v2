import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Stat, Card, Badge, SimNotice } from "@/components/admin/ui";
import { produtos, agentes, aprovacoes, execucoes } from "@/data/mock";
export const Route = createFileRoute("/")({ head: () => ({ meta: [{ title: "Painel central — Agência de IA V2" }, { name: "description", content: "Visão geral de produtos, agentes e aprovações." }, { property: "og:title", content: "Painel central — Agência de IA V2" }, { property: "og:description", content: "Visão geral de produtos, agentes e aprovações." }] }), component: Page });
function Page() {
  return (<>
    <PageHeader title="Painel central" subtitle="Visão geral da operação da agência" />
    <SimNotice />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Stat label="Produtos" value={produtos.length} />
      <Stat label="Agentes ativos" value={agentes.filter(a=>a.status==="ativo").length + "/6"} />
      <Stat label="Aguardando aprovação" value={aprovacoes.length} hint="Sala de Direção" />
      <Stat label="Peças na biblioteca" value={produtos.reduce((s,p)=>s+p.pecas,0)} />
    </div>
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <Card><div className="mb-3 flex justify-between"><h2 className="font-bold">Pendências de aprovação</h2><Link to="/direcao" className="text-sm font-semibold text-primary">Abrir Sala de Direção →</Link></div>
        <ul className="divide-y divide-border">{aprovacoes.map(a=><li key={a.id} className="py-2.5 text-sm"><p className="font-medium">{a.titulo}</p><p className="text-xs text-muted-foreground">{a.produto} · {a.tipo} · {a.agente}</p></li>)}</ul></Card>
      <Card><div className="mb-3 flex justify-between"><h2 className="font-bold">Atividade recente</h2><Link to="/execucao" className="text-sm font-semibold text-primary">Ver tudo →</Link></div>
        <ul className="divide-y divide-border">{execucoes.map((e,i)=><li key={i} className="flex items-center gap-3 py-2.5 text-sm"><span className="w-12 text-xs text-muted-foreground">{e.hora}</span><Badge>{e.agente}</Badge><span className="flex-1">{e.evento}</span><Badge tone={e.nivel}>{e.nivel}</Badge></li>)}</ul></Card>
    </div>
  </>);
}
