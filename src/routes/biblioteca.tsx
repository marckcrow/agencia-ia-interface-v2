import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Card, Badge, SimNotice } from "@/components/admin/ui";
import { biblioteca } from "@/data/mock";
export const Route = createFileRoute("/biblioteca")({ head: () => ({ meta: [{ title: "Biblioteca de conteúdos — Agência de IA V2" }, { name: "description", content: "Acervo de conteúdos produzidos." }, { property: "og:title", content: "Biblioteca de conteúdos — Agência de IA V2" }, { property: "og:description", content: "Acervo de conteúdos produzidos." }] }), component: Page });
function Page() {
  const [q, setQ] = useState("");
  const itens = biblioteca.filter(b=>b.titulo.toLowerCase().includes(q.toLowerCase()));
  return (<>
    <PageHeader title="Biblioteca de conteúdos" subtitle="Acervo de todos os produtos" />
    <SimNotice />
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar conteúdo..." className="mb-4 w-full max-w-sm rounded-lg border border-border bg-card px-3 py-2 text-sm" />
    <Card className="overflow-x-auto p-0"><table className="w-full text-sm"><thead className="bg-muted text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Título</th><th className="p-3">Produto</th><th className="p-3">Formato</th><th className="p-3">Status</th></tr></thead>
      <tbody>{itens.map(b=><tr key={b.titulo} className="border-t border-border"><td className="p-3 font-medium">{b.titulo}</td><td className="p-3">{b.produto}</td><td className="p-3">{b.formato}</td><td className="p-3"><Badge tone={b.status}>{b.status}</Badge></td></tr>)}</tbody></table></Card>
  </>);
}
