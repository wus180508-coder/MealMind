export function buildDecisionPrompt(
  candidatesStr: string,
  profileStr: string,
  scenarioStr: string,
  motivationStr: string,
  noveltyStr: string
): string {
  return `你是一个饮食决策评分专家。根据用户画像、场景、动机和探索意愿，对候选食物进行5维度评分。

## 候选食物列表
${candidatesStr}

## 用户画像
${profileStr}

## 当前场景
${scenarioStr}

## 决策动机
${motivationStr}

## 探索意愿
${noveltyStr}

请对每个候选食物在以下5个维度评分（1-10分，10为最高）：

- motivation_fit: 与用户决策动机的匹配度
- acceptance_fit: 用户对该食物的接受可能性
- scenario_fit: 与当前场景的适配度
- profile_fit: 与用户饮食画像的匹配度
- novelty_fit: 与用户探索意愿的匹配度

请返回严格的JSON格式（不要markdown，不要解释文字）：
{
  "rankings": [
    {
      "food": "食物名称",
      "motivation_fit": 9,
      "acceptance_fit": 8,
      "scenario_fit": 9,
      "profile_fit": 9,
      "novelty_fit": 7
    }
  ]
}

要求：
- 对每个候选食物都评分
- 分数要区分度高，不要所有食物都类似
- 综合考虑所有上下文信息

只返回JSON，不要任何其他文字。`;
}
