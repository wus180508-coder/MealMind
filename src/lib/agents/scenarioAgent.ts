import { getScenarioAnalysis as fetchScenario } from "@/lib/services/scenarioService";
import { scenarioData as mockData, type ScenarioData } from "@/lib/mockData";

export async function runScenarioAgent(
  scenario: string,
  budget: number,
  mood: string,
  notes: string
): Promise<{ data: ScenarioData; source: "deepseek" | "mock" }> {
  try {
    const result = await fetchScenario(scenario, budget, mood, notes);
    return result;
  } catch {
    return { data: { ...mockData }, source: "mock" };
  }
}
