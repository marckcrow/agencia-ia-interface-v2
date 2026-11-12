import { describe, expect, it } from "vitest";
import { getSummaryInputs, parseSummaries, publicationPolicy } from "@/lib/weekly-summary";

describe("Weekly simulation summaries", () => {
  it("includes IA na Prática, Você Sabia? and Poder 50+ with their own simulation data", () => {
    const inputs = getSummaryInputs();
    expect(inputs.map((item) => item.nome)).toEqual(["IA na Prática", "Você Sabia?", "Poder 50+"]);
    expect(inputs.map((item) => item.pecas)).toEqual([42, 87, 29]);
    expect(inputs.map((item) => item.aprovacoes.length)).toEqual([2, 1, 1]);
    for (const item of inputs) expect(item.conteudos.every((content) => content.produto === item.nome)).toBe(true);
  });
  it("requires human approval and never enables automatic publication, even if AI claims otherwise", () => {
    const report = parseSummaries(JSON.stringify({ resumos: ["ia-na-pratica", "voce-sabia", "poder-50"].map((produtoId) => ({ produtoId, resumo: "Resumo", atencao: "Revisar", humanApprovalRequired: false, automaticPublicationEnabled: true })) }));
    expect(publicationPolicy).toEqual({ humanApprovalRequired: true, automaticPublicationEnabled: false });
    for (const item of report) {
      expect(item.humanApprovalRequired).toBe(true);
      expect(item.automaticPublicationEnabled).toBe(false);
    }
  });
  it("rejects missing or duplicate product summaries", () => {
    expect(() => parseSummaries(JSON.stringify({ resumos: Array.from({ length: 3 }, () => ({ produtoId: "ia-na-pratica", resumo: "Resumo", atencao: "Revisar" })) }))).toThrow();
    expect(() => parseSummaries('{"resumos":[]}')).toThrow();
  });
});