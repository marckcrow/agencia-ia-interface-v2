import { createFileRoute } from "@tanstack/react-router";
import { Film, Mic, Image } from "lucide-react";
import { PageHeader, Card, Button, SimNotice } from "@/components/admin/ui";
export const Route = createFileRoute("/estudio")({ head: () => ({ meta: [{ title: "Estúdio audiovisual — Agência de IA V2" }, { name: "description", content: "Produção de vídeos, áudios e artes." }, { property: "og:title", content: "Estúdio audiovisual — Agência de IA V2" }, { property: "og:description", content: "Produção de vídeos, áudios e artes." }] }), component: Page });
function Page() {
  return (<>
    <PageHeader title="Estúdio audiovisual" subtitle="Vídeos, narrações e artes" />
    <SimNotice />
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2"><div className="grid aspect-video place-items-center rounded-lg bg-sidebar text-sidebar-foreground"><Film className="h-12 w-12 opacity-60" /></div>
        <p className="mt-3 font-semibold">Pré-visualização: "Como usar o WhatsApp com segurança"</p>
        <div className="mt-3 h-2 rounded-full bg-muted"><div className="h-2 w-2/3 rounded-full bg-primary" /></div><p className="mt-1 text-xs text-muted-foreground">Renderização simulada: 66%</p></Card>
      <div className="space-y-4">{[{i:Film,t:"Montagem de vídeo",a:"A5"},{i:Mic,t:"Narração",a:"A5"},{i:Image,t:"Artes e miniaturas",a:"A4"}].map(x=>(
        <Card key={x.t} className="flex items-center gap-3"><x.i className="h-5 w-5 text-primary" /><div className="flex-1"><p className="font-semibold">{x.t}</p><p className="text-xs text-muted-foreground">Agente {x.a}</p></div><Button variant="outline" disabled>Abrir</Button></Card>))}</div>
    </div>
  </>);
}
