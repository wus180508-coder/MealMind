import { callDeepSeek } from "@/lib/deepseek";
import { buildScenarioPrompt } from "@/lib/prompts/scenarioPrompt";
import { scenarioData, type ScenarioData } from "@/lib/mockData";

function extractJson(text: string): unknown {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
  }
  return JSON.parse(cleaned);
}

function mapToScenarioData(parsed: Record<string, unknown>): ScenarioData {
  return {
    scenario: (parsed.scenario as string) || "追剧",
    needs: (parsed.needs as string[]) || [],
  };
}

export async function getScenarioAnalysis(
  scenario: string,
  budget: number,
  mood: string,
  notes: string
): Promise<{ data: ScenarioData; source: "deepseek" | "mock" }> {
  try {
    const prompt = buildScenarioPrompt(scenario, budget, mood, notes);
    const raw = await callDeepSeek(prompt);
    const json = extractJson(raw) as Record<string, unknown>;
    const mapped = mapToScenarioData(json);

    if (!mapped.scenario || mapped.needs.length === 0) {
      throw new Error("Invalid scenario data");
    }

    return { data: mapped, source: "deepseek" };
  } catch {
    return { data: { ...scenarioData }, source: "mock" };
  }
}
