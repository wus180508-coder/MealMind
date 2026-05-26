export function buildNoveltyPrompt(
  profileStr: string,
  scenarioStr: string,
  motivationStr: string
): string {
  return `你是一个饮食探索意愿分析专家。根据用户的饮食画像、当前场景和决策动机，评估用户的探索意愿。

用户饮食画像：
${profileStr}

当前场景：
${scenarioStr}

决策动机：
${motivationStr}

请返回严格的JSON格式（不要markdown，不要解释文字）：
{
  "novelty_level": "low | medium | high",
  "avoid_categories": ["需要避开的品类1", "品类2"],
  "encourage_categories": ["建议尝试的品类1", "品类2"]
}

要求：
- novelty_level: 评估用户的探索意愿等级（low=倾向熟悉食物，medium=适度开放，high=愿意尝试新食物）
- avoid_categories: 根据用户偏好和场景，列出2-4个应避开的食物品类或特征（中文）
- encourage_categories: 在用户偏好范围内，列出2-4个建议优先考虑的品类或具体食物（中文）

只返回JSON，不要任何其他文字。`;
}
