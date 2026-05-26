import { callDeepSeek } from "@/lib/deepseek";
import { buildDecisionPrompt } from "@/lib/prompts/decisionPrompt";
import { decisionData as mockData, type DecisionData, type ProfileData, type ScenarioData, type MotivationData } from "@/lib/mockData";
import type { CandidateResult } from "./candidateAgent";

function extractJson(text: string): unknown {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
  }
  return JSON.parse(cleaned);
}

interface DeepSeekRanking {
  food: string;
  motivation_fit: number;
  acceptance_fit: number;
  scenario_fit: number;
  profile_fit: number;
  novelty_fit: number;
}

function mapToDecisionData(
  rankings: DeepSeekRanking[]
): DecisionData {
  if (!rankings || rankings.length === 0) return { ...mockData };

  // Use the first (top-ranked) food's scores
  const top = rankings[0];
  const scores = {
    motivation: Math.round(top.motivation_fit * 10),
    acceptance: Math.round(top.acceptance_fit * 10),
    scenario: Math.round(top.scenario_fit * 10),
    profile: Math.round(top.profile_fit * 10),
    novelty: Math.round(top.novelty_fit * 10),
  };

  return {
    scores,
    weights: mockData.weights,
    topPick: top.food,
  };
}

export async function runDecisionAgent(
  candidates: CandidateResult[],
  profile: ProfileData,
  scenario: ScenarioData,
  motivation: MotivationData,
  novelty: { level: string }
): Promise<{ data: DecisionData; source: "deepseek" | "mock" }> {
  try {
    const prompt = buildDecisionPrompt(
      JSON.stringify(candidates),
      JSON.stringify(profile),
      JSON.stringify(scenario),
      JSON.stringify(motivation),
      JSON.stringify(novelty)
    );
    const raw = await callDeepSeek(prompt);
    const json = extractJson(raw) as { rankings?: DeepSeekRanking[] };
    const rankings = json.rankings || [];
    const data = mapToDecisionData(rankings);
    return { data, source: "deepseek" };
  } catch {
    return { data: { ...mockData }, source: "mock" };
  }
}
