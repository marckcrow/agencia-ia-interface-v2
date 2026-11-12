import { createServerFn } from "@tanstack/react-start";
import { generateResponse, GatewayError } from "@lovable.dev/ai-gateway";
import { getSummaryInputs, parseSummaries, type WeeklyReport } from "./weekly-summary";

type Result = { report: WeeklyReport; error: null } | { report: null; error: string };

// Public by design: only the fixed, non-sensitive simulation dataset is accepted.
// No user prompt, publication action, real API, or database is reachable here.
export const generateWeeklySummaries = createServerFn({ method: "POST" }).handler(async (): Promise<Result> => {
  try {
    const response = await generateResponse({
      model: "openai/gpt-6-astra",
      reasoning: { effort: "low" },
      instructions: "Escreva em português brasileiro um resumo editorial semanal para cada produto usando EXCLUSIVAMENTE os dados de simulação fornecidos. São um retrato demonstrativo sem datas completas: não afirme que peças foram produzidas, publicadas ou tiveram resultados nesta semana. Os totais de peças e pendências são acumulados, e a lista da biblioteca é apenas uma amostra. Não invente métricas, fontes, desempenho ou datas. Produza 2–3 frases por resumo e uma frase de atenção com próximos passos sugeridos. Qualquer publicação exige aprovação humana; geração de texto não concede aprovação. Não execute ações nem solicite ferramentas.",
      input: JSON.stringify({ dados: getSummaryInputs() }),
      text: { format: {
        type: "json_schema", name: "resumos_semanais", strict: true,
        schema: { type: "object", additionalProperties: false, required: ["resumos"], properties: {
          resumos: { type: "array", minItems: 3, maxItems: 3, items: {
            type: "object", additionalProperties: false, required: ["produtoId", "resumo", "atencao"], properties: {
              produtoId: { type: "string", enum: ["ia-na-pratica", "voce-sabia", "poder-50"] },
              resumo: { type: "string" }, atencao: { type: "string" },
            },
          } },
        } },
      } },
    });
    if (response.status !== "completed") return { report: null, error: "A IA não concluiu os resumos. Nenhum conteúdo foi aprovado ou publicado." };
    const messages = response.output.filter((item) => item.type === "message");
    if (messages.some((item) => item.content.some((part) => part.type === "refusal"))) {
      return { report: null, error: "A IA recusou gerar este resumo. Nenhum conteúdo foi publicado." };
    }
    const text = messages.flatMap((item) => item.content.flatMap((part) => part.type === "output_text" ? [part.text] : [])).join("");
    return { report: { resumos: parseSummaries(text), geradoEm: new Date().toISOString() }, error: null };
  } catch (error) {
    if (error instanceof GatewayError) {
      console.error("weekly-summary", { code: error.code, httpStatus: error.httpStatus, outcome: error.outcome, recovery: error.recovery, remote: error.remote, ids: error.ids });
      const message = error.code === "payment_required" ? "Créditos de IA insuficientes. Adicione créditos para gerar os resumos." :
        error.code === "permission_denied" ? "A geração foi bloqueada pelas permissões de IA. Um administrador precisa liberar o acesso." :
        error.code === "rate_limited" ? "O limite de IA foi atingido. Aguarde antes de tentar novamente." :
        error.outcome === "unknown" ? "Não foi possível confirmar a geração. Confira o histórico de IA antes de solicitar novamente." :
        "Não foi possível gerar os resumos agora. Nenhum conteúdo foi aprovado ou publicado.";
      return { report: null, error: message };
    }
    console.error("weekly-summary: invalid result", error);
    return { report: null, error: "A resposta da IA não pôde ser validada. Nenhum conteúdo foi publicado." };
  }
});