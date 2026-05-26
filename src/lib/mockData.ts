// ============================================================
// MealMind Demo V1 — Mock Data
// All mock data for the 6-agent AI decision pipeline
// ============================================================

// ---- Type Definitions ----

export interface ProfileData {
  favoriteCategories: string[];
  budgetRange: string;
  tastePreference: string;
  behaviorType: string[];
}

export interface ScenarioData {
  scenario: string;
  needs: string[];
}

export interface MotivationData {
  primary: string;
  secondary: string[];
}

export interface NoveltyData {
  level: string;
  levelValue: number;
  encourage: string[];
}

export interface Candidate {
  name: string;
  category: string;
  price: number;
}

export interface CandidateData {
  candidates: Candidate[];
}

export interface DecisionWeights {
  motivation: number;
  acceptance: number;
  scenario: number;
  profile: number;
  novelty: number;
}

export interface DecisionScores {
  motivation: number;
  acceptance: number;
  scenario: number;
  profile: number;
  novelty: number;
}

export interface DecisionData {
  scores: DecisionScores;
  weights: DecisionWeights;
  topPick: string;
}

export interface RecommendationData {
  name: string;
  price: number;
  score: number;
  confidence: number;
  image: string;
  reasons: string[];
  recommendationSummary: string[];
  scores: DecisionScores;
}

export interface AlternativeData {
  rank: number;
  name: string;
  price: number;
  score: number;
  image: string;
}

export interface AgentDefinition {
  id: string;
  name: string;
  iconName: string;
  color: string;
  completionMessage: string;
}

export interface TimelineStepData {
  step: number;
  agent: string;
  iconName: string;
  color: string;
  summary: string;
  details: string[];
}

export interface RankingRow {
  food: string;
  motivation: number;
  acceptance: number;
  scenario: number;
  profile: number;
  novelty: number;
  total: number;
  winner: boolean;
  emoji: string;
}

// ---- Mock Data Exports ----

export const profileData: ProfileData = {
  favoriteCategories: ["麻辣烫", "盖饭", "面食"],
  budgetRange: "10-15元",
  tastePreference: "满足感型",
  behaviorType: ["满足感型", "性价比型"],
};

export const scenarioData: ScenarioData = {
  scenario: "追剧",
  needs: ["方便食用", "满足感", "不影响观看"],
};

export const motivationData: MotivationData = {
  primary: "comfort",
  secondary: ["放松", "满足感"],
};

export const noveltyData: NoveltyData = {
  level: "low",
  levelValue: 33,
  encourage: ["高蛋白麻辣烫"],
};

export const candidateData: CandidateData = {
  candidates: [
    { name: "香菇滑鸡拌饭", category: "盖饭", price: 12.9 },
    { name: "红烧肉盖饭", category: "盖饭", price: 14.5 },
    { name: "麻辣香锅", category: "麻辣烫", price: 15.0 },
    { name: "番茄鸡蛋面", category: "面食", price: 10.0 },
    { name: "黄焖鸡米饭", category: "盖饭", price: 13.5 },
    { name: "酸菜鱼", category: "川菜", price: 18.0 },
    { name: "牛肉拉面", category: "面食", price: 12.0 },
    { name: "寿司拼盘", category: "日料", price: 20.0 },
    { name: "鸡排饭", category: "盖饭", price: 11.0 },
    { name: "牛油拌饭", category: "盖饭", price: 9.9 },
  ],
};

export const decisionData: DecisionData = {
  scores: {
    motivation: 85,
    acceptance: 88,
    scenario: 95,
    profile: 90,
    novelty: 82,
  },
  weights: {
    motivation: 0.3,
    acceptance: 0.25,
    scenario: 0.2,
    profile: 0.15,
    novelty: 0.1,
  },
  topPick: "香菇滑鸡拌饭",
};

export const recommendationData: RecommendationData = {
  name: "香菇滑鸡拌饭",
  price: 12.9,
  score: 8.9,
  confidence: 92,
  image: "🍚",
  recommendationSummary: [
    "与你最近7天的点餐习惯高度一致",
    "追剧场景下方便食用",
    "满足感优先而非探索新食物",
    "综合评分最高（8.9）",
  ],
  reasons: [
    "符合预算（¥12.9，在¥10-15范围内）",
    "符合追剧场景（方便食用、不影响观看）",
    "符合历史偏好（盖饭类、满足感型）",
    "接受度高（88%接受度评分）",
  ],
  scores: {
    motivation: 85,
    acceptance: 88,
    scenario: 95,
    profile: 90,
    novelty: 82,
  },
};

export const alternativeData: AlternativeData[] = [
  {
    rank: 2,
    name: "红烧肉盖饭",
    price: 14.5,
    score: 8.4,
    image: "🍖",
  },
  {
    rank: 3,
    name: "麻辣香锅",
    price: 15.0,
    score: 8.1,
    image: "🍲",
  },
];

export const agentDefinitions: AgentDefinition[] = [
  {
    id: "profile",
    name: "Profile Agent",
    iconName: "User",
    color: "from-blue-500 to-cyan-500",
    completionMessage: "✓ 已识别你的饮食偏好",
  },
  {
    id: "scenario",
    name: "Scenario Agent",
    iconName: "MapPin",
    color: "from-green-500 to-emerald-500",
    completionMessage: "✓ 已理解当前场景",
  },
  {
    id: "motivation",
    name: "Motivation Agent",
    iconName: "Heart",
    color: "from-pink-500 to-rose-500",
    completionMessage: "✓ 已分析决策动机",
  },
  {
    id: "novelty",
    name: "Novelty Agent",
    iconName: "Sparkles",
    color: "from-purple-500 to-violet-500",
    completionMessage: "✓ 已完成探索意愿评估",
  },
  {
    id: "candidate",
    name: "Candidate Agent",
    iconName: "UtensilsCrossed",
    color: "from-orange-500 to-amber-500",
    completionMessage: "✓ 已完成候选召回",
  },
  {
    id: "decision",
    name: "Decision Agent",
    iconName: "TrendingUp",
    color: "from-indigo-500 to-blue-500",
    completionMessage: "✓ 已完成综合评分",
  },
  {
    id: "recommendation",
    name: "Recommendation Agent",
    iconName: "MessageSquare",
    color: "from-teal-500 to-emerald-500",
    completionMessage: "✓ 已生成推荐解释",
  },
];

export const timelineStepData: TimelineStepData[] = [
  {
    step: 1,
    agent: "Profile Agent",
    iconName: "User",
    color: "from-blue-500 to-cyan-500",
    summary: "分析你的饮食画像",
    details: [
      "识别偏好类别：麻辣烫、盖饭、面食",
      "判断预算区间：¥10-15",
      "分析行为类型：满足感型、性价比型",
      "建立用户饮食画像完成",
    ],
  },
  {
    step: 2,
    agent: "Scenario Agent",
    iconName: "MapPin",
    color: "from-green-500 to-emerald-500",
    summary: "理解你的当前场景",
    details: [
      "识别场景：追剧",
      "分析场景需求：方便食用",
      "场景需求：满足感优先",
      "场景约束：不影响观看体验",
    ],
  },
  {
    step: 3,
    agent: "Motivation Agent",
    iconName: "Heart",
    color: "from-pink-500 to-rose-500",
    summary: "分析你的决策动机",
    details: [
      "主要动机：Comfort（舒适满足）",
      "次要动机：放松、满足感",
      "不是探索动机（Novelty Seeking Low）",
      "用户需要熟悉、安心的食物",
    ],
  },
  {
    step: 4,
    agent: "Novelty Agent",
    iconName: "Sparkles",
    color: "from-purple-500 to-violet-500",
    summary: "评估探索意愿",
    details: [
      "探索意愿等级：Low（33%）",
      "用户倾向于已知偏好",
      "在熟悉领域内推荐最优选项",
      "微调建议：高蛋白麻辣烫",
    ],
  },
  {
    step: 5,
    agent: "Candidate Agent",
    iconName: "UtensilsCrossed",
    color: "from-orange-500 to-amber-500",
    summary: "召回候选食物",
    details: [
      "基于画像召回10个候选",
      "覆盖盖饭、麻辣烫、面食类",
      "价格区间：¥9.9 - ¥20.0",
      "候选池已构建完成",
    ],
  },
  {
    step: 6,
    agent: "Decision Agent",
    iconName: "TrendingUp",
    color: "from-indigo-500 to-blue-500",
    summary: "综合评分决策",
    details: [
      "5维度加权评分完成",
      "权重分配：M(30%) A(25%) S(20%) P(15%) N(10%)",
      "Top 1：香菇滑鸡拌饭（8.9分）",
      "输出最终推荐结果",
    ],
  },
];

export const rankingTableData: RankingRow[] = [
  {
    food: "香菇滑鸡拌饭",
    motivation: 85,
    acceptance: 88,
    scenario: 95,
    profile: 90,
    novelty: 82,
    total: 88.1,
    winner: true,
    emoji: "🍚",
  },
  {
    food: "红烧肉盖饭",
    motivation: 80,
    acceptance: 85,
    scenario: 88,
    profile: 92,
    novelty: 75,
    total: 84.3,
    winner: false,
    emoji: "🍖",
  },
  {
    food: "麻辣香锅",
    motivation: 88,
    acceptance: 72,
    scenario: 70,
    profile: 95,
    novelty: 80,
    total: 80.8,
    winner: false,
    emoji: "🍲",
  },
  {
    food: "番茄鸡蛋面",
    motivation: 72,
    acceptance: 80,
    scenario: 85,
    profile: 78,
    novelty: 65,
    total: 77.0,
    winner: false,
    emoji: "🍜",
  },
  {
    food: "黄焖鸡米饭",
    motivation: 78,
    acceptance: 82,
    scenario: 80,
    profile: 85,
    novelty: 70,
    total: 79.6,
    winner: false,
    emoji: "🍗",
  },
];
