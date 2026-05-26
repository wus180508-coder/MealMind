import { callDeepSeek } from "@/lib/deepseek";
import { buildRecommendationPrompt } from "@/lib/prompts/recommendationPrompt";
import type { DecisionData, ProfileData, ScenarioData, MotivationData } from "@/lib/mockData";
import type { CandidateResult } from "./candidateAgent";

function extractJson(text: string): unknown {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
  }
  return JSON.parse(cleaned);
}

export interface RecommendationResult {
  name: string;
  price: number;
  score: number;
  confidence: number;
  image: string;
  reasons: string[];
  recommendationSummary: string[];
  scores: DecisionData["scores"];
}

export async function runRecommendationAgent(
  winner: CandidateResult,
  decision: DecisionData,
  profile: ProfileData,
  scenario: ScenarioData,
  motivation: MotivationData,
  candidates: CandidateResult[]
): Promise<{ data: RecommendationResult; source: "deepseek" | "mock" }> {
  try {
    const prompt = buildRecommendationPrompt(
      JSON.stringify(winner),
      JSON.stringify(decision),
      JSON.stringify(profile),
      JSON.stringify(scenario),
      JSON.stringify(motivation)
    );
    const raw = await callDeepSeek(prompt);
    const json = extractJson(raw) as {
      summary?: string;
      why?: string[];
      confidence?: number;
    };

    const summary = json.summary || `推荐${winner.name}`;
    const why = json.why?.slice(0, 4) || [
      "与你最近7天的点餐习惯高度一致",
      "当前场景下方便食用",
      "满足感优先而非探索新食物",
      "综合评分最高",
    ];
    const confidence = typeof json.confidence === "number" ? json.confidence : 92;

    return {
      data: {
        name: winner.name,
        price: winner.price,
        score: decision.scores.motivation * 0.3 + decision.scores.acceptance * 0.25 + decision.scores.scenario * 0.2 + decision.scores.profile * 0.15 + decision.scores.novelty * 0.1,
        confidence: Math.min(100, Math.max(0, Math.round(confidence))),
        image: winner.emoji,
        reasons: [
          `符合预算（¥${winner.price}）`,
          `符合${scenario.scenario}场景`,
          `符合${profile.tastePreference}偏好`,
          `综合评分最高`,
        ],
        recommendationSummary: why,
        scores: decision.scores,
      },
      source: "deepseek",
    };
  } catch {
    // Fallback: build from available data
    const weightedScore =
      decision.scores.motivation * 0.3 +
      decision.scores.acceptance * 0.25 +
      decision.scores.scenario * 0.2 +
      decision.scores.profile * 0.15 +
      decision.scores.novelty * 0.1;

    return {
      data: {
        name: winner.name,
        price: winner.price,
        score: Math.round(weightedScore * 10) / 10,
        confidence: 85,
        image: winner.emoji,
        reasons: [
          `符合预算（¥${winner.price}）`,
          `符合${scenario.scenario}场景`,
          `符合${profile.tastePreference}偏好`,
          `综合评分最高`,
        ],
        recommendationSummary: [
          "与你最近7天的点餐习惯高度一致",
          `${scenario.scenario}场景下方便食用`,
          "满足感优先而非探索新食物",
          `综合评分最高（${Math.round(weightedScore * 10) / 10}）`,
        ],
        scores: decision.scores,
      },
      source: "mock",
    };
  }
}
