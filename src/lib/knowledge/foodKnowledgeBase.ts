// ============================================================
// MealMind V2 — Food Knowledge Base
// 55 foods with structured tags for rule-based candidate recall
// ============================================================

export interface FoodEntry {
  id: string;
  name: string;
  category: string;
  price: number;
  emoji: string;
  tags: string[];
  scenarios: string[];
  motivations: string[];
}

export const foodKnowledgeBase: FoodEntry[] = [
  // ── 盖浇饭 (Rice Bowls) ──
  {
    id: "food_001", name: "香菇滑鸡拌饭", category: "盖浇饭", price: 12.9, emoji: "🍚",
    tags: ["高蛋白", "方便食用", "高满足感", "低油脂", "咸鲜"],
    scenarios: ["学习", "追剧", "加班", "健身后"],
    motivations: ["满足感", "性价比", "comfort"],
  },
  {
    id: "food_002", name: "红烧肉盖饭", category: "盖浇饭", price: 14.5, emoji: "🍖",
    tags: ["高满足感", "甜咸", "高热量", "经典口味"],
    scenarios: ["奖励自己", "聚会", "加班"],
    motivations: ["满足感", "indulgence", "comfort"],
  },
  {
    id: "food_003", name: "黄焖鸡米饭", category: "盖浇饭", price: 13.5, emoji: "🍗",
    tags: ["高蛋白", "咸鲜", "高满足感", "微辣"],
    scenarios: ["学习", "加班", "追剧"],
    motivations: ["满足感", "性价比", "comfort"],
  },
  {
    id: "food_004", name: "鸡排饭", category: "盖浇饭", price: 11.0, emoji: "🍘",
    tags: ["高蛋白", "酥脆", "方便食用", "高满足感"],
    scenarios: ["学习", "加班", "健身后"],
    motivations: ["满足感", "性价比"],
  },
  {
    id: "food_005", name: "牛油拌饭", category: "盖浇饭", price: 9.9, emoji: "🥩",
    tags: ["高热量", "高满足感", "咸鲜", "经济实惠"],
    scenarios: ["加班", "奖励自己"],
    motivations: ["满足感", "性价比", "indulgence"],
  },
  {
    id: "food_006", name: "鱼香肉丝盖饭", category: "盖浇饭", price: 11.5, emoji: "🐟",
    tags: ["酸甜", "微辣", "经典口味", "方便食用"],
    scenarios: ["学习", "追剧", "加班"],
    motivations: ["满足感", "性价比", "comfort"],
  },
  {
    id: "food_007", name: "宫保鸡丁盖饭", category: "盖浇饭", price: 12.0, emoji: "🥜",
    tags: ["微辣", "高蛋白", "经典口味"],
    scenarios: ["学习", "加班"],
    motivations: ["满足感", "comfort"],
  },
  {
    id: "food_008", name: "番茄鸡蛋盖饭", category: "盖浇饭", price: 9.0, emoji: "🍅",
    tags: ["低油脂", "酸甜", "健康", "清淡"],
    scenarios: ["学习", "健身后"],
    motivations: ["health", "性价比", "convenience"],
  },

  // ── 麻辣烫/冒菜 ──
  {
    id: "food_009", name: "麻辣烫", category: "麻辣烫", price: 10.6, emoji: "🍲",
    tags: ["麻辣", "高满足感", "自由搭配", "热食"],
    scenarios: ["追剧", "聚会", "奖励自己"],
    motivations: ["满足感", "exploration", "social"],
  },
  {
    id: "food_010", name: "麻辣香锅", category: "麻辣烫", price: 15.0, emoji: "🥘",
    tags: ["麻辣", "高满足感", "重口味", "社交"],
    scenarios: ["聚会", "奖励自己"],
    motivations: ["social", "indulgence", "exploration"],
  },
  {
    id: "food_011", name: "冒菜", category: "麻辣烫", price: 12.0, emoji: "🍜",
    tags: ["麻辣", "热食", "自由搭配", "高满足感"],
    scenarios: ["追剧", "加班"],
    motivations: ["满足感", "comfort"],
  },
  {
    id: "food_012", name: "高蛋白麻辣烫", category: "麻辣烫", price: 14.0, emoji: "🥬",
    tags: ["高蛋白", "麻辣", "健康", "自由搭配"],
    scenarios: ["健身后", "加班"],
    motivations: ["health", "exploration", "满足感"],
  },

  // ── 面食 ──
  {
    id: "food_013", name: "牛肉拉面", category: "面食", price: 12.0, emoji: "🍝",
    tags: ["高蛋白", "热食", "咸鲜", "经典口味"],
    scenarios: ["学习", "加班", "旅行"],
    motivations: ["满足感", "comfort", "convenience"],
  },
  {
    id: "food_014", name: "番茄鸡蛋面", category: "面食", price: 10.0, emoji: "🥚",
    tags: ["清淡", "酸甜", "低油脂", "健康"],
    scenarios: ["学习", "健身后", "旅行"],
    motivations: ["health", "性价比", "convenience"],
  },
  {
    id: "food_015", name: "炸酱面", category: "面食", price: 11.0, emoji: "🫘",
    tags: ["咸鲜", "经典口味", "高满足感"],
    scenarios: ["追剧", "加班", "旅行"],
    motivations: ["满足感", "comfort"],
  },
  {
    id: "food_016", name: "片儿川", category: "面食", price: 8.0, emoji: "🥬",
    tags: ["清淡", "咸鲜", "经济实惠", "热食"],
    scenarios: ["学习", "旅行"],
    motivations: ["性价比", "convenience"],
  },
  {
    id: "food_017", name: "担担面", category: "面食", price: 10.0, emoji: "🌶️",
    tags: ["麻辣", "重口味", "高满足感"],
    scenarios: ["奖励自己", "聚会"],
    motivations: ["exploration", "满足感"],
  },
  {
    id: "food_018", name: "葱油拌面", category: "面食", price: 7.0, emoji: "🧅",
    tags: ["咸鲜", "经济实惠", "方便食用"],
    scenarios: ["学习", "加班", "旅行"],
    motivations: ["性价比", "convenience"],
  },

  // ── 川菜 ──
  {
    id: "food_019", name: "酸菜鱼", category: "川菜", price: 18.0, emoji: "🐠",
    tags: ["酸辣", "高蛋白", "热食", "社交"],
    scenarios: ["聚会", "奖励自己"],
    motivations: ["social", "indulgence", "exploration"],
  },
  {
    id: "food_020", name: "水煮肉片", category: "川菜", price: 16.0, emoji: "🥵",
    tags: ["麻辣", "重口味", "高蛋白", "高满足感"],
    scenarios: ["聚会", "奖励自己"],
    motivations: ["indulgence", "social", "exploration"],
  },
  {
    id: "food_021", name: "回锅肉", category: "川菜", price: 14.0, emoji: "🥓",
    tags: ["微辣", "经典口味", "高满足感"],
    scenarios: ["加班", "聚会"],
    motivations: ["满足感", "social"],
  },
  {
    id: "food_022", name: "麻婆豆腐饭", category: "川菜", price: 10.0, emoji: "🫘",
    tags: ["麻辣", "经济实惠", "高蛋白"],
    scenarios: ["学习", "加班"],
    motivations: ["性价比", "comfort"],
  },

  // ── 日料 ──
  {
    id: "food_023", name: "寿司拼盘", category: "日料", price: 20.0, emoji: "🍣",
    tags: ["高蛋白", "清淡", "精致", "冷食"],
    scenarios: ["奖励自己", "聚会", "旅行"],
    motivations: ["indulgence", "social", "exploration"],
  },
  {
    id: "food_024", name: "日式拉面", category: "日料", price: 15.0, emoji: "🍥",
    tags: ["高蛋白", "热食", "咸鲜", "高满足感"],
    scenarios: ["追剧", "加班", "旅行"],
    motivations: ["满足感", "comfort", "indulgence"],
  },
  {
    id: "food_025", name: "照烧鸡腿饭", category: "日料", price: 13.0, emoji: "🍱",
    tags: ["高蛋白", "甜咸", "健康", "精致"],
    scenarios: ["学习", "健身后"],
    motivations: ["health", "comfort", "满足感"],
  },
  {
    id: "food_026", name: "咖喱猪排饭", category: "日料", price: 14.0, emoji: "🍛",
    tags: ["高满足感", "酥脆", "咸鲜"],
    scenarios: ["加班", "奖励自己", "旅行"],
    motivations: ["满足感", "indulgence"],
  },

  // ── 快餐 ──
  {
    id: "food_027", name: "劲脆鸡排饭", category: "快餐", price: 11.8, emoji: "🍗",
    tags: ["高蛋白", "酥脆", "方便食用", "高满足感"],
    scenarios: ["加班", "学习", "追剧"],
    motivations: ["满足感", "convenience", "性价比"],
  },
  {
    id: "food_028", name: "汉堡套餐", category: "快餐", price: 15.0, emoji: "🍔",
    tags: ["高热量", "方便食用", "高满足感"],
    scenarios: ["加班", "追剧", "旅行"],
    motivations: ["convenience", "满足感"],
  },
  {
    id: "food_029", name: "炸鸡翅桶", category: "快餐", price: 18.0, emoji: "🍖",
    tags: ["高热量", "酥脆", "高满足感", "社交"],
    scenarios: ["聚会", "追剧", "奖励自己"],
    motivations: ["indulgence", "social", "满足感"],
  },
  {
    id: "food_030", name: "鸡肉卷", category: "快餐", price: 9.0, emoji: "🌯",
    tags: ["方便食用", "高蛋白", "经济实惠"],
    scenarios: ["加班", "旅行", "学习"],
    motivations: ["convenience", "性价比"],
  },

  // ── 汤/粥 ──
  {
    id: "food_031", name: "皮蛋瘦肉粥", category: "汤粥", price: 8.0, emoji: "🥣",
    tags: ["清淡", "热食", "易消化", "健康"],
    scenarios: ["健身后", "学习"],
    motivations: ["health", "comfort"],
  },
  {
    id: "food_032", name: "海鲜粥", category: "汤粥", price: 12.0, emoji: "🦐",
    tags: ["高蛋白", "清淡", "热食", "健康"],
    scenarios: ["健身后", "奖励自己"],
    motivations: ["health", "comfort"],
  },
  {
    id: "food_033", name: "酸辣汤", category: "汤粥", price: 6.0, emoji: "🥄",
    tags: ["酸辣", "热食", "开胃", "经济实惠"],
    scenarios: ["学习", "加班"],
    motivations: ["性价比", "exploration"],
  },
  {
    id: "food_034", name: "紫菜蛋花汤", category: "汤粥", price: 5.0, emoji: "🍵",
    tags: ["清淡", "低热量", "健康", "经济实惠"],
    scenarios: ["健身后", "学习"],
    motivations: ["health", "性价比"],
  },

  // ── 健康/沙拉 ──
  {
    id: "food_035", name: "鸡胸肉沙拉", category: "健康餐", price: 16.0, emoji: "🥗",
    tags: ["高蛋白", "低热量", "健康", "清淡"],
    scenarios: ["健身后", "学习"],
    motivations: ["health", "convenience"],
  },
  {
    id: "food_036", name: "牛油果鸡肉碗", category: "健康餐", price: 18.0, emoji: "🥑",
    tags: ["高蛋白", "健康", "精致", "低热量"],
    scenarios: ["健身后", "奖励自己"],
    motivations: ["health", "indulgence"],
  },
  {
    id: "food_037", name: "全麦三明治", category: "健康餐", price: 10.0, emoji: "🥪",
    tags: ["健康", "方便食用", "低油脂"],
    scenarios: ["学习", "加班", "旅行"],
    motivations: ["health", "convenience"],
  },

  // ── 炒菜类 ──
  {
    id: "food_038", name: "青椒肉丝", category: "炒菜", price: 12.0, emoji: "🫑",
    tags: ["咸鲜", "经典口味", "高蛋白"],
    scenarios: ["加班", "学习"],
    motivations: ["comfort", "满足感"],
  },
  {
    id: "food_039", name: "糖醋里脊", category: "炒菜", price: 14.0, emoji: "🍖",
    tags: ["酸甜", "酥脆", "高满足感"],
    scenarios: ["奖励自己", "聚会", "追剧"],
    motivations: ["indulgence", "满足感"],
  },
  {
    id: "food_040", name: "蒜蓉西兰花", category: "炒菜", price: 8.0, emoji: "🥦",
    tags: ["健康", "低热量", "清淡"],
    scenarios: ["健身后", "学习"],
    motivations: ["health", "性价比"],
  },
  {
    id: "food_041", name: "地三鲜", category: "炒菜", price: 10.0, emoji: "🍆",
    tags: ["咸鲜", "经典口味", "素食"],
    scenarios: ["学习", "加班", "旅行"],
    motivations: ["comfort", "性价比"],
  },
  {
    id: "food_042", name: "干煸四季豆", category: "炒菜", price: 9.0, emoji: "🫘",
    tags: ["微辣", "咸鲜", "素食"],
    scenarios: ["学习", "加班"],
    motivations: ["comfort", "性价比"],
  },

  // ── 火锅/干锅 ──
  {
    id: "food_043", name: "小火锅", category: "火锅", price: 20.0, emoji: "🫕",
    tags: ["热食", "高满足感", "社交", "自由搭配"],
    scenarios: ["聚会", "奖励自己", "旅行"],
    motivations: ["social", "indulgence", "满足感"],
  },
  {
    id: "food_044", name: "干锅牛蛙", category: "干锅", price: 18.0, emoji: "🐸",
    tags: ["麻辣", "重口味", "高蛋白", "社交"],
    scenarios: ["聚会", "奖励自己"],
    motivations: ["exploration", "social", "indulgence"],
  },
  {
    id: "food_045", name: "干锅花菜", category: "干锅", price: 10.0, emoji: "🥬",
    tags: ["微辣", "素食", "咸鲜"],
    scenarios: ["加班", "学习"],
    motivations: ["comfort", "性价比"],
  },

  // ── 米粉/米线 ──
  {
    id: "food_046", name: "过桥米线", category: "米粉", price: 11.0, emoji: "🍲",
    tags: ["热食", "清淡", "高蛋白", "经典口味"],
    scenarios: ["追剧", "旅行", "加班"],
    motivations: ["comfort", "满足感"],
  },
  {
    id: "food_047", name: "螺蛳粉", category: "米粉", price: 10.0, emoji: "🐌",
    tags: ["重口味", "酸辣", "热食", "独特风味"],
    scenarios: ["追剧", "奖励自己", "旅行"],
    motivations: ["exploration", "满足感"],
  },
  {
    id: "food_048", name: "酸辣粉", category: "米粉", price: 8.0, emoji: "🍜",
    tags: ["酸辣", "热食", "开胃", "经济实惠"],
    scenarios: ["追剧", "加班", "旅行"],
    motivations: ["exploration", "性价比"],
  },

  // ── 饺子/馄饨 ──
  {
    id: "food_049", name: "猪肉白菜水饺", category: "饺子", price: 10.0, emoji: "🥟",
    tags: ["经典口味", "热食", "高满足感", "方便食用"],
    scenarios: ["追剧", "加班", "学习", "旅行"],
    motivations: ["comfort", "convenience", "性价比"],
  },
  {
    id: "food_050", name: "虾仁馄饨", category: "馄饨", price: 11.0, emoji: "🦐",
    tags: ["高蛋白", "清淡", "热食", "易消化"],
    scenarios: ["学习", "健身后", "旅行"],
    motivations: ["health", "comfort"],
  },
  {
    id: "food_051", name: "煎饺", category: "饺子", price: 9.0, emoji: "🥟",
    tags: ["酥脆", "经典口味", "高满足感", "方便食用"],
    scenarios: ["追剧", "加班", "旅行"],
    motivations: ["满足感", "convenience"],
  },

  // ── 轻食/小吃 ──
  {
    id: "food_052", name: "肉夹馍", category: "小吃", price: 8.0, emoji: "🥙",
    tags: ["高蛋白", "经典口味", "方便食用", "经济实惠"],
    scenarios: ["加班", "旅行", "学习"],
    motivations: ["convenience", "性价比", "满足感"],
  },
  {
    id: "food_053", name: "煎饼果子", category: "小吃", price: 6.0, emoji: "🥞",
    tags: ["方便食用", "经济实惠", "经典口味"],
    scenarios: ["加班", "旅行", "学习"],
    motivations: ["convenience", "性价比"],
  },
  {
    id: "food_054", name: "凉皮", category: "小吃", price: 7.0, emoji: "🍝",
    tags: ["冷食", "酸辣", "清爽", "经济实惠"],
    scenarios: ["旅行", "追剧"],
    motivations: ["exploration", "性价比"],
  },
  {
    id: "food_055", name: "炒年糕", category: "小吃", price: 9.0, emoji: "🍡",
    tags: ["甜辣", "高满足感", "独特风味"],
    scenarios: ["追剧", "奖励自己"],
    motivations: ["exploration", "indulgence", "满足感"],
  },
];
