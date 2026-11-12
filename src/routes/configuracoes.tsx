import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, SimNotice } from "@/components/admin/ui";
export const Route = createFileRoute("/configuracoes")({ head: () => ({ meta: [{ title: "Configurações — Agência de IA V2" }, { name: "description", content: "Preferências gerais do painel." }, { property: "og:title", content: "Configurações — Agência de IA V2" }, { property: "og:description", content: "Preferências gerais do painel." }] }), component: Page });
function Page() {
  const op = [["Aprovação humana obrigatória","Sempre ativa — não pode ser desligada",true],["Publicação automática","Desativada nesta versão",false],["Notificações por e-mail","Disponível após integração",false]] as const;
  return (<>
    <PageHeader title="Configurações" subtitle="Preferências gerais" />
    <SimNotice />
    <Card className="divide-y divide-border p-0">{op.map(([t,d,on])=>(
      <div key={t} className="flex items-center justify-between p-4"><div><p className="font-semibold">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div>
        <span className={"h-6 w-11 rounded-full p-0.5 "+(on?"bg-primary":"bg-muted")}><span className={"block h-5 w-5 rounded-full bg-card shadow transition "+(on?"translate-x-5":"")} /></span></div>))}</Card>
  </>);
}
