import { callDeepSeek } from "@/lib/deepseek";
import { buildNoveltyPrompt } from "@/lib/prompts/noveltyPrompt";
import { noveltyData as mockData, type NoveltyData, type ProfileData, type ScenarioData, type MotivationData } from "@/lib/mockData";

function extractJson(text: string): unknown {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
  }
  return JSON.parse(cleaned);
}

function mapToNoveltyData(parsed: Record<string, unknown>): NoveltyData {
  const level = (parsed.novelty_level as string) || "low";
  const levelMap: Record<string, number> = { low: 33, medium: 60, high: 85 };
  return {
    level,
    levelValue: levelMap[level] ?? 33,
    encourage: (parsed.encourage_categories || parsed.encourageCategories || mockData.encourage) as string[],
  };
}

export async function runNoveltyAgent(
  profile: ProfileData,
  scenario: ScenarioData,
  motivation: MotivationData
): Promise<{ data: NoveltyData; source: "deepseek" | "mock" }> {
  try {
    const prompt = buildNoveltyPrompt(
      JSON.stringify(profile),
      JSON.stringify(scenario),
      JSON.stringify(motivation)
    );
    const raw = await callDeepSeek(prompt);
    const json = extractJson(raw) as Record<string, unknown>;
    const mapped = mapToNoveltyData(json);
    if (!mapped.level || mapped.encourage.length === 0) {
      throw new Error("Invalid novelty data");
    }
    return { data: mapped, source: "deepseek" };
  } catch {
    return { data: { ...mockData }, source: "mock" };
  }
}
