import { getMotivationAnalysis as fetchMotivation } from "@/lib/services/motivationService";
import { motivationData as mockData, type MotivationData, type ProfileData, type ScenarioData } from "@/lib/mockData";

export async function runMotivationAgent(
  profile: ProfileData,
  scenario: ScenarioData
): Promise<{ data: MotivationData; source: "deepseek" | "mock" }> {
  try {
    const result = await fetchMotivation(profile, scenario);
    return result;
  } catch {
    return { data: { ...mockData }, source: "mock" };
  }
}
