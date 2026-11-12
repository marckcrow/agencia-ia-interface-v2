import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Badge, Button, SimNotice } from "@/components/admin/ui";
import { integracoes } from "@/data/mock";
export const Route = createFileRoute("/integracoes")({ head: () => ({ meta: [{ title: "Integrações — Agência de IA V2" }, { name: "description", content: "Conexões futuras com o sistema original." }, { property: "og:title", content: "Integrações — Agência de IA V2" }, { property: "og:description", content: "Conexões futuras com o sistema original." }] }), component: Page });
function Page() {
  return (<>
    <PageHeader title="Integrações" subtitle="Conexões serão ativadas somente após aprovação" />
    <SimNotice />
    <div className="grid gap-4 md:grid-cols-2">{integracoes.map(i=>(
      <Card key={i.nome} className="flex items-center gap-4"><div className="flex-1"><p className="font-semibold">{i.nome}</p><p className="text-xs text-muted-foreground">{i.descricao}</p></div><Badge tone="pausado">Não conectado</Badge><Button variant="outline" disabled>Conectar</Button></Card>))}</div>
  </>);
}
