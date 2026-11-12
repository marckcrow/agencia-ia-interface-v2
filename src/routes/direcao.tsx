import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Card, Badge, Button, SimNotice } from "@/components/admin/ui";
import { aprovacoes } from "@/data/mock";
export const Route = createFileRoute("/direcao")({ head: () => ({ meta: [{ title: "Sala de Direção — Agência de IA V2" }, { name: "description", content: "Aprovação humana obrigatória de conteúdos." }, { property: "og:title", content: "Sala de Direção — Agência de IA V2" }, { property: "og:description", content: "Aprovação humana obrigatória de conteúdos." }] }), component: Page });
function Page() {
  const [dec, setDec] = useState<Record<number,string>>({});
  return (<>
    <PageHeader title="Sala de Direção" subtitle="Nenhum conteúdo avança sem aprovação humana" />
    <SimNotice />
    <div className="space-y-3">{aprovacoes.map(a=>(
      <Card key={a.id} className="flex flex-wrap items-center gap-4">
        <div className="min-w-0 flex-1"><p className="font-semibold">{a.titulo}</p><p className="text-xs text-muted-foreground">{a.produto} · {a.tipo} · gerado por {a.agente}</p></div>
        {dec[a.id] ? <Badge tone={dec[a.id]==="Aprovado"?"Aprovado":"erro"}>{dec[a.id]} (simulado)</Badge> : <div className="flex gap-2">
          <Button onClick={()=>setDec({...dec,[a.id]:"Aprovado"})}>Aprovar</Button>
          <Button variant="outline" onClick={()=>setDec({...dec,[a.id]:"Ajustes solicitados"})}>Pedir ajustes</Button>
          <Button variant="danger" onClick={()=>setDec({...dec,[a.id]:"Rejeitado"})}>Rejeitar</Button></div>}
      </Card>))}</div>
    <p className="mt-4 text-xs text-muted-foreground">As decisões nesta versão são locais e não são enviadas a nenhum sistema.</p>
  </>);
}
