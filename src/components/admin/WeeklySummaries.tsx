import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { Sparkles, LoaderCircle, ShieldCheck } from "lucide-react";
import { Button, Badge, Card } from "./ui";
import { generateWeeklySummaries } from "@/lib/weekly-summary.functions";
import type { WeeklyReport } from "@/lib/weekly-summary";

export function WeeklySummaries() {
  const queryClient = useQueryClient();
  const [report, setReport] = useState(() => queryClient.getQueryData<WeeklyReport>(["weekly-summaries"]) ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const generate = useServerFn(generateWeeklySummaries);

  async function handleGenerate() {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generate();
      if (result.report) {
        queryClient.setQueryData(["weekly-summaries"], result.report);
        setReport(result.report);
      } else setError(result.error);
    } catch {
      setError("Não foi possível confirmar a geração. Confira o histórico de IA antes de solicitar novamente.");
    } finally { setLoading(false); }
  }

  return <section className="mt-6" aria-labelledby="weekly-title" aria-busy={loading}>
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div><h2 id="weekly-title" className="text-lg font-bold">Resumos semanais por produto</h2>
        <p className="mt-1 text-xs text-muted-foreground">Dados de simulação · retrato acumulado, sem histórico semanal datado</p></div>
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" /> : <Sparkles className="h-4 w-4" />}
        {loading ? "Gerando resumos…" : report ? "Atualizar resumos com IA" : "Gerar resumos com IA"}
      </Button>
    </div>
    {error && <p role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
    <div aria-live="polite">
      {report ? <>
        <p className="mb-3 text-xs text-muted-foreground">Gerado via AI Gateway em {new Date(report.geradoEm).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })} · horário de Brasília</p>
        <div className="grid gap-4 xl:grid-cols-3">{report.resumos.map((item) => <Card key={item.produtoId}>
          <div className="mb-3 flex flex-wrap items-center gap-2"><h3 className="font-bold">{item.produto}</h3><Badge>Simulação</Badge></div>
          <p className="text-sm leading-relaxed">{item.resumo}</p>
          <div className="mt-4 border-t border-border pt-3"><p className="mb-1 text-xs font-semibold text-muted-foreground">Ponto de atenção</p><p className="text-sm leading-relaxed">{item.atencao}</p></div>
          <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted-foreground"><ShieldCheck className="h-4 w-4 shrink-0" />Aprovação humana obrigatória</p>
        </Card>)}</div>
      </> : <p className="border-y border-border py-5 text-sm text-muted-foreground">{loading ? "Preparando os resumos dos três produtos…" : "Nenhum resumo gerado nesta sessão."}</p>}
    </div>
    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
      <span>Rascunhos internos · nenhuma publicação automática</span>
      <Link to="/direcao" className="font-semibold text-primary">Sala de Direção →</Link>
    </div>
  </section>;
}