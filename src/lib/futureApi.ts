// ============================================================
// MealMind V2 — Future API Integration Stubs
// Replace mock data with real AI API calls (OpenAI, DeepSeek, Claude, Coze, etc.)
// ============================================================

import type {
  ProfileData,
  ScenarioData,
  MotivationData,
  NoveltyData,
  CandidateData,
  DecisionData,
  RecommendationData,
} from "./mockData";

export async function getProfileAnalysis(
  orderHistory: string
): Promise<ProfileData> {
  // TODO V2: Call OpenAI / DeepSeek / Claude / Coze API
  throw new Error("Not implemented — use mockData for Demo V1");
}

export async function getScenarioAnalysis(
  scenario: string
): Promise<ScenarioData> {
  // TODO V2: Call OpenAI / DeepSeek / Claude / Coze API
  throw new Error("Not implemented — use mockData for Demo V1");
}

export async function getMotivationAnalysis(
  mood: string
): Promise<MotivationData> {
  // TODO V2: Call OpenAI / DeepSeek / Claude / Coze API
  throw new Error("Not implemented — use mockData for Demo V1");
}

export async function getNoveltyAnalysis(
  profile: ProfileData
): Promise<NoveltyData> {
  // TODO V2: Call OpenAI / DeepSeek / Claude / Coze API
  throw new Error("Not implemented — use mockData for Demo V1");
}

export async function getCandidates(
  preferences: ProfileData,
  scenario: ScenarioData
): Promise<CandidateData> {
  // TODO V2: Call OpenAI / DeepSeek / Claude / Coze API
  throw new Error("Not implemented — use mockData for Demo V1");
}

export async function getDecision(
  candidates: CandidateData,
  context: {
    scenario: ScenarioData;
    motivation: MotivationData;
    novelty: NoveltyData;
  }
): Promise<DecisionData> {
  // TODO V2: Call OpenAI / DeepSeek / Claude / Coze API
  throw new Error("Not implemented — use mockData for Demo V1");
}

export async function getRecommendation(
  decision: DecisionData,
  candidates: CandidateData
): Promise<RecommendationData> {
  // TODO V2: Call OpenAI / DeepSeek / Claude / Coze API
  throw new Error("Not implemented — use mockData for Demo V1");
}
