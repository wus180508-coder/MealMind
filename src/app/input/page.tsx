"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const scenarios = [
  { value: "学习", emoji: "📚" },
  { value: "追剧", emoji: "📺" },
  { value: "加班", emoji: "💻" },
  { value: "健身后", emoji: "🏋️" },
  { value: "聚会", emoji: "🎉" },
  { value: "奖励自己", emoji: "🎁" },
  { value: "旅行", emoji: "✈️" },
  { value: "不知道", emoji: "🤔" },
];

const moods = [
  { value: "开心", emoji: "😊" },
  { value: "疲惫", emoji: "😫" },
  { value: "放松", emoji: "😌" },
  { value: "压力大", emoji: "😰" },
  { value: "饥饿", emoji: "🤤" },
  { value: "兴奋", emoji: "🤩" },
];

export default function InputPage() {
  const router = useRouter();
  const [orderHistory, setOrderHistory] = useState("");
  const [scenario, setScenario] = useState("");
  const [budget, setBudget] = useState([15]);
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    localStorage.setItem(
      "mealmind_input",
      JSON.stringify({
        orderHistory,
        scenario,
        budget: budget[0],
        mood,
        notes,
      })
    );
    router.push("/analysis");
  };

  return (
    <div className="space-y-5 py-6">
      <div>
        <h1 className="text-2xl font-bold">告诉我你的需求</h1>
        <p className="text-muted-foreground text-sm mt-1">
          MealMind会根据你的信息进行AI分析
        </p>
      </div>

      {/* Order History */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">📋 订单历史</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={"2026-05-18 鸡排饭\n2026-05-19 麻辣烫\n2026-05-20 牛油拌饭"}
            value={orderHistory}
            onChange={(e) => setOrderHistory(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </CardContent>
      </Card>

      {/* Scenario */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">🎬 当前场景</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {scenarios.map((s) => (
              <button
                key={s.value}
                onClick={() => setScenario(s.value)}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-3 rounded-xl border-2 transition-all duration-200",
                  scenario === s.value
                    ? "border-orange-400 bg-gradient-to-br from-orange-50 to-pink-50 shadow-sm"
                    : "border-border hover:border-muted-foreground/30"
                )}
              >
                <span className="text-xl">{s.emoji}</span>
                <span className="text-xs font-medium">{s.value}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span>💰 预算</span>
            <span className="text-lg font-bold text-orange-500">¥{budget[0]}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>¥5</span>
            <span>¥50</span>
          </div>
          <Slider
            value={budget}
            onValueChange={(v) => setBudget(Array.isArray(v) ? v : [v])}
            min={5}
            max={50}
            step={1}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Mood */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">😊 当前状态</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {moods.map((m) => (
              <button
                key={m.value}
                onClick={() => setMood(m.value)}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-3 rounded-xl border-2 transition-all duration-200",
                  mood === m.value
                    ? "border-orange-400 bg-gradient-to-br from-orange-50 to-pink-50 shadow-sm"
                    : "border-border hover:border-muted-foreground/30"
                )}
              >
                <span className="text-xl">{m.emoji}</span>
                <span className="text-xs font-medium">{m.value}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">📝 补充说明</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={"已经买了水果\n想吃热的\n不想太辣"}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="resize-none"
          />
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 rounded-full h-14 text-lg"
          >
            开始分析
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
