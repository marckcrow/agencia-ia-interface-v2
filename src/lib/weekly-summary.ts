import { z } from "zod";
import { produtos, aprovacoes, biblioteca, calendario } from "@/data/mock";

export const publicationPolicy = Object.freeze({ humanApprovalRequired: true, automaticPublicationEnabled: false });

export function getSummaryInputs() {
  return produtos.map((produto) => ({
    ...produto,
    conteudos: biblioteca.filter((item) => item.produto === produto.nome),
    aprovacoes: aprovacoes.filter((item) => item.produto === produto.nome),
    planejamento: calendario.filter((item) => item.produto === produto.nome),
  }));
}

const summarySchema = z.object({
  resumos: z.array(z.object({
    produtoId: z.enum(["ia-na-pratica", "voce-sabia", "poder-50"]),
    resumo: z.string().min(1).max(2000),
    atencao: z.string().min(1).max(1000),
  })).length(3),
}).superRefine(({ resumos }, context) => {
  if (new Set(resumos.map((item) => item.produtoId)).size !== 3) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "Um resumo por produto é obrigatório." });
  }
});

export function parseSummaries(text: string) {
  const { resumos } = summarySchema.parse(JSON.parse(text));
  return produtos.map((produto) => {
    const result = resumos.find((item) => item.produtoId === produto.id);
    if (!result) throw new Error("Resumo ausente");
    return { ...result, produto: produto.nome, ...publicationPolicy };
  });
}

export type WeeklyReport = { resumos: ReturnType<typeof parseSummaries>; geradoEm: string };