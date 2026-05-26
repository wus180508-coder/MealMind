export function buildMotivationPrompt(
  profileStr: string,
  scenarioStr: string
): string {
  return `你是一个决策动机分析专家。根据用户的饮食画像和当前场景，分析用户的核心决策动机。

用户饮食画像：
${profileStr}

当前场景分析：
${scenarioStr}

请返回严格的JSON格式（不要markdown，不要解释文字）：
{
  "primary": "comfort | exploration | health | convenience | social | indulgence",
  "secondary": ["次要动机1", "次要动机2"]
}

要求：
- primary: 从以下选项中选择最匹配的主要动机：
  - comfort: 舒适满足（熟悉、安心的食物）
  - exploration: 探索尝鲜（想尝试新食物）
  - health: 健康优先（低脂、高蛋白等）
  - convenience: 方便快捷（快速解决）
  - social: 社交需求（聚会、分享）
  - indulgence: 放纵奖励（犒劳自己）
- secondary: 2-3个次要动机（中文）

只返回JSON，不要任何其他文字。`;
}
