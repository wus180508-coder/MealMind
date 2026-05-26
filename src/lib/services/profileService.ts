import { callDeepSeek } from "@/lib/deepseek";
import { buildProfilePrompt } from "@/lib/prompts/profilePrompt";
import { profileData, type ProfileData } from "@/lib/mockData";

function extractJson(text: string): unknown {
  let cleaned = text.trim();
  // Strip markdown code fences
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
  }
  return JSON.parse(cleaned);
}

function mapToProfileData(parsed: Record<string, unknown>): ProfileData {
  return {
    favoriteCategories: ((parsed.favorite_categories || parsed.favoriteCategories) as string[]) || [],
    budgetRange: ((parsed.budget_range || parsed.budgetRange) as string) || "10-15元",
    tastePreference: ((parsed.taste_preference || parsed.tastePreference) as string) || "满足感型",
    behaviorType: ((parsed.behavior_type || parsed.behaviorType) as string[]) || ["满足感型"],
  };
}

export async function getProfileAnalysis(
  orderHistory: string
): Promise<{ data: ProfileData; source: "deepseek" | "mock" }> {
  try {
    const prompt = buildProfilePrompt(orderHistory);
    const raw = await callDeepSeek(prompt);
    const json = extractJson(raw) as Record<string, unknown>;
    const mapped = mapToProfileData(json);

    if (!mapped.favoriteCategories || mapped.favoriteCategories.length === 0) {
      throw new Error("Invalid profile data: empty categories");
    }

    return { data: mapped, source: "deepseek" };
  } catch {
    return { data: { ...profileData }, source: "mock" };
  }
}
