import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, SimNotice } from "@/components/admin/ui";
import { calendario } from "@/data/mock";
export const Route = createFileRoute("/calendario")({ head: () => ({ meta: [{ title: "Calendário editorial — Agência de IA V2" }, { name: "description", content: "Planejamento mensal de publicações." }, { property: "og:title", content: "Calendário editorial — Agência de IA V2" }, { property: "og:description", content: "Planejamento mensal de publicações." }] }), component: Page });
const cor: Record<string,string> = { "IA na Prática": "bg-primary/15 text-primary", "Você Sabia?": "bg-accent/30 text-accent-foreground", "Poder 50+": "bg-success/15 text-success" };
function Page() {
  return (<>
    <PageHeader title="Calendário editorial" subtitle="Mês de exemplo" />
    <SimNotice />
    <Card className="overflow-x-auto p-3"><div className="grid min-w-[700px] grid-cols-7 gap-2">
      {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map(d=><p key={d} className="text-center text-xs font-semibold text-muted-foreground">{d}</p>)}
      {Array.from({length:30},(_,i)=>i+1).map(d=>(
        <div key={d} className="min-h-24 rounded-lg border border-border p-1.5"><p className="text-xs font-semibold">{d}</p>
          {calendario.filter(c=>c.dia===d).map(c=><p key={c.titulo} className={"mt-1 rounded px-1.5 py-1 text-[11px] font-medium "+cor[c.produto]}>{c.titulo}</p>)}</div>))}
    </div></Card>
  </>);
}
