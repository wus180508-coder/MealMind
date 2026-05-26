import { getProfileAnalysis as fetchProfile } from "@/lib/services/profileService";
import { profileData as mockData, type ProfileData } from "@/lib/mockData";

export async function runProfileAgent(
  orderHistory: string
): Promise<{ data: ProfileData; source: "deepseek" | "mock" }> {
  try {
    const result = await fetchProfile(orderHistory);
    return result;
  } catch {
    return { data: { ...mockData }, source: "mock" };
  }
}
