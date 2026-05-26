export function buildProfilePrompt(orderHistory: string): string {
  return `你是一个饮食偏好分析专家。根据用户的历史订单记录，分析用户的饮食画像。

用户历史订单：
${orderHistory || "无历史记录"}

请返回严格的JSON格式（不要markdown，不要解释文字）：
{
  "favorite_categories": ["类别1", "类别2"],
  "budget_range": "价格区间如10-15元",
  "taste_preference": "满足感型 | 尝鲜型 | 健康型 | 性价比型",
  "behavior_type": ["类型1", "类型2"]
}

要求：
- favorite_categories: 根据订单推断2-3个最常点的食物类别（中文）
- budget_range: 根据价格推断用户的预算区间，格式为"最低-最高元"
- taste_preference: 推断用户的口味偏好类型
- behavior_type: 推断用户的消费行为类型（如：满足感型、性价比型、尝鲜型、健康型等）

只返回JSON，不要任何其他文字。`;
}
