import { callDeepSeek } from "@/lib/deepseek";
import { buildMotivationPrompt } from "@/lib/prompts/motivationPrompt";
import { motivationData, type MotivationData } from "@/lib/mockData";
import type { ProfileData, ScenarioData } from "@/lib/mockData";

function extractJson(text: string): unknown {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
  }
  return JSON.parse(cleaned);
}

function mapToMotivationData(parsed: Record<string, unknown>): MotivationData {
  return {
    primary: (parsed.primary as string) || "comfort",
    secondary: (parsed.secondary as string[]) || [],
  };
}

export async function getMotivationAnalysis(
  profile: ProfileData,
  scenario: ScenarioData
): Promise<{ data: MotivationData; source: "deepseek" | "mock" }> {
  try {
    const profileStr = JSON.stringify(profile, null, 2);
    const scenarioStr = JSON.stringify(scenario, null, 2);
    const prompt = buildMotivationPrompt(profileStr, scenarioStr);
    const raw = await callDeepSeek(prompt);
    const json = extractJson(raw) as Record<string, unknown>;
    const mapped = mapToMotivationData(json);

    if (!mapped.primary) {
      throw new Error("Invalid motivation data");
    }

    return { data: mapped, source: "deepseek" };
  } catch {
    return { data: { ...motivationData }, source: "mock" };
  }
}
