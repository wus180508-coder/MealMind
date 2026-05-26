export function buildRecommendationPrompt(
  winnerStr: string,
  decisionStr: string,
  profileStr: string,
  scenarioStr: string,
  motivationStr: string
): string {
  return `你是一个饮食推荐解释专家。根据评分最高的食物和完整的决策结果，生成人性化的推荐解释。

## 获胜食物
${winnerStr}

## 决策评分结果
${decisionStr}

## 用户画像
${profileStr}

## 当前场景
${scenarioStr}

## 决策动机
${motivationStr}

请返回严格的JSON格式（不要markdown，不要解释文字）：
{
  "summary": "一句话推荐总结",
  "why": [
    "推荐理由1",
    "推荐理由2",
    "推荐理由3",
    "推荐理由4"
  ],
  "confidence": 92
}

要求：
- summary: 用中文写一句推荐总结（10-20字）
- why: 4条具体的推荐理由，基于用户画像、场景、动机和评分维度（中文，每条15-30字）
- confidence: 基于所有评分维度的综合置信度（1-100的整数）

只返回JSON，不要任何其他文字。`;
}
