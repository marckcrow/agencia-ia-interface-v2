import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Button, SimNotice } from "@/components/admin/ui";
import { produtos } from "@/data/mock";
export const Route = createFileRoute("/produtos")({ head: () => ({ meta: [{ title: "Produtos — Agência de IA V2" }, { name: "description", content: "Gestão de IA na Prática, Você Sabia? e Poder 50+." }, { property: "og:title", content: "Produtos — Agência de IA V2" }, { property: "og:description", content: "Gestão de IA na Prática, Você Sabia? e Poder 50+." }] }), component: Page });
function Page() {
  return (<>
    <PageHeader title="Produtos" subtitle="Gestão das três linhas editoriais" />
    <SimNotice />
    <div className="grid gap-6 md:grid-cols-3">{produtos.map(p=>(
      <Card key={p.id} className="flex flex-col">
        <h2 className="text-xl font-bold">{p.nome}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{p.descricao}</p>
        <p className="mt-3 text-xs"><strong>Público:</strong> {p.publico}</p>
        <div className="my-4 grid grid-cols-2 gap-3 text-center"><div className="rounded-lg bg-muted p-3"><p className="text-2xl font-bold">{p.pecas}</p><p className="text-xs text-muted-foreground">peças</p></div><div className="rounded-lg bg-muted p-3"><p className="text-2xl font-bold">{p.pendentes}</p><p className="text-xs text-muted-foreground">pendentes</p></div></div>
        <Button variant="outline" className="mt-auto justify-center" disabled>Configurar (em breve)</Button>
      </Card>))}</div>
  </>);
}
