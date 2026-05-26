import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, MapPin, Lightbulb, Upload, FileText, Search, ThumbsUp, ChevronRight } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI饮食画像",
    description: "分析历史点餐习惯，建立你的专属口味模型",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: MapPin,
    title: "场景理解",
    description: "理解你今天的状态，推荐最适合当下场景的食物",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Lightbulb,
    title: "智能决策",
    description: "解释为什么推荐，让你理解AI的决策逻辑",
    gradient: "from-purple-500 to-violet-500",
  },
];

const steps = [
  { icon: Upload, label: "上传订单", desc: "粘贴近期外卖记录" },
  { icon: FileText, label: "输入需求", desc: "选择场景和预算" },
  { icon: Search, label: "AI分析", desc: "六个Agent协同分析" },
  { icon: ThumbsUp, label: "获得推荐", desc: "查看最佳匹配结果" },
];

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero */}
      <section className="text-center pt-8 sm:pt-16 space-y-6">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            今晚吃什么？
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-md mx-auto">
          别再刷20分钟外卖了
          <br />
          30秒找到最适合你的晚餐
        </p>
        <Link href="/input">
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 rounded-full px-10 text-lg h-14"
          >
            开始推荐
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6">为什么选择 MealMind</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feat) => (
            <Card key={feat.title} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 space-y-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center`}
                >
                  <feat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{feat.title}</h3>
                <p className="text-sm text-muted-foreground">{feat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6">如何使用</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="text-center space-y-2 relative">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-50 flex items-center justify-center">
                <step.icon className="w-7 h-7 text-orange-500" />
              </div>
              <div className="font-semibold text-sm">{step.label}</div>
              <div className="text-xs text-muted-foreground">{step.desc}</div>
              {i < steps.length - 1 && (
                <ChevronRight className="hidden sm:block absolute top-5 -right-2 w-5 h-5 text-muted-foreground/30" />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
