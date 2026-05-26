// ============================================================
// Candidate Agent — Rule-based Recall Engine (NO LLM)
// Searches foodKnowledgeBase by tag/scenario/motivation overlap
// ============================================================

import { foodKnowledgeBase, type FoodEntry } from "@/lib/knowledge/foodKnowledgeBase";
import type { ProfileData, ScenarioData, MotivationData, NoveltyData } from "@/lib/mockData";

export interface CandidateResult {
  name: string;
  category: string;
  price: number;
  emoji: string;
  score: number;
}

export async function runCandidateAgent(
  profile: ProfileData,
  scenario: ScenarioData,
  motivation: MotivationData,
  novelty: NoveltyData,
  budget: number
): Promise<{ data: { candidates: CandidateResult[] }; source: "rule_engine" }> {
  const avoidCategories = novelty.encourage || [];
  const profileCats = profile.favoriteCategories || [];
  const scenarioNeeds = scenario.needs || [];
  const motivationPrimary = motivation.primary;
  const motivationSecondary = motivation.secondary || [];

  // Determine avoid keywords (from novelty analysis or user notes)
  const avoidKeywords = new Set<string>();
  if (novelty.level === "low") {
    avoidKeywords.add("纯油炸");
    avoidKeywords.add("高糖饮料");
    avoidKeywords.add("日料");
  }

  const scored: { food: FoodEntry; score: number }[] = [];

  for (const food of foodKnowledgeBase) {
    // Budget filter
    if (food.price > budget + 5) continue;

    // Avoid filter
    const shouldAvoid = [...avoidKeywords].some(
      (kw) => food.category.includes(kw) || food.tags.includes(kw)
    );
    if (shouldAvoid) continue;

    let score = 0;

    // Scenario match: food.scenarios ∩ user scenario needs
    for (const tag of food.tags) {
      if (scenarioNeeds.some((n) => tag.includes(n) || n.includes(tag))) score += 3;
    }
    for (const s of food.scenarios) {
      if (scenario.scenario && s === scenario.scenario) score += 5;
    }

    // Motivation match
    if (food.motivations.includes(motivationPrimary)) score += 4;
    for (const m of motivationSecondary) {
      if (food.motivations.includes(m)) score += 2;
    }
    for (const m of food.motivations) {
      if (motivationSecondary.includes(m)) score += 2;
    }

    // Profile preference match
    for (const cat of profileCats) {
      if (food.category.includes(cat) || cat.includes(food.category)) score += 3;
    }
    for (const tag of food.tags) {
      if (profile.tastePreference && tag.includes(profile.tastePreference)) score += 2;
    }

    // Budget alignment: closer to budget average = higher score
    const budgetAvg = budget;
    const priceDiff = Math.abs(food.price - budgetAvg);
    if (priceDiff <= 2) score += 3;
    else if (priceDiff <= 5) score += 1;

    scored.push({ food, score });
  }

  // Sort by score descending, take top 10
  scored.sort((a, b) => b.score - a.score);
  const top10 = scored.slice(0, 10);

  const candidates: CandidateResult[] = top10.map(({ food, score }) => ({
    name: food.name,
    category: food.category,
    price: food.price,
    emoji: food.emoji,
    score: Math.min(10, Math.round(score / 3)),
  }));

  return { data: { candidates }, source: "rule_engine" };
}
