export function buildScenarioPrompt(
  scenario: string,
  budget: number,
  mood: string,
  notes: string
): string {
  return `你是一个场景理解专家。分析用户当前的用餐场景和需求。

用户信息：
- 场景：${scenario || "未指定"}
- 预算：¥${budget}
- 心情：${mood || "未指定"}
- 补充说明：${notes || "无"}

请返回严格的JSON格式（不要markdown，不要解释文字）：
{
  "scenario": "场景名称",
  "needs": ["需求1", "需求2", "需求3"]
}

要求：
- scenario: 识别并返回场景名称（中文）
- needs: 根据场景、预算、心情推断3-5个隐性需求（中文）。例如：方便食用、高性价比、满足感、热食、不影响工作等

只返回JSON，不要任何其他文字。`;
}
