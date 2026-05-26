"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PipelineVisualization } from "@/components/PipelineVisualization";
import { TimelineStep } from "@/components/TimelineStep";
import { EmptyState } from "@/components/EmptyState";
import { User, MapPin, Heart, Sparkles, UtensilsCrossed, TrendingUp, MessageSquare } from "lucide-react";
import { timelineStepData as mockTimeline, rankingTableData as mockRanking, decisionData as mockDec } from "@/lib/mockData";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = { User, MapPin, Heart, Sparkles, UtensilsCrossed, TrendingUp, MessageSquare };

const pipelineNodes = [
  { id: "profile", name: "Profile", color: "from-blue-500 to-cyan-500" },
  { id: "scenario", name: "Scenario", color: "from-green-500 to-emerald-500" },
  { id: "motivation", name: "Motivation", color: "from-pink-500 to-rose-500" },
  { id: "novelty", name: "Novelty", color: "from-purple-500 to-violet-500" },
  { id: "candidate", name: "Candidate", color: "from-orange-500 to-amber-500" },
  { id: "decision", name: "Decision", color: "from-indigo-500 to-blue-500" },
  { id: "recommendation", name: "Recommendation", color: "from-teal-500 to-emerald-500" },
];

export default function ExplanationPage() {
  const [loaded, setLoaded] = useState(false);
  const [pipeline, setPipeline] = useState<any>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mealmind_pipeline");
      if (raw) setPipeline(JSON.parse(raw));
    } catch { /* use mocks */ }
    setLoaded(true);
  }, []);

  if (!loaded) return <EmptyState />;

  const prof = pipeline?.profile;
  const scen = pipeline?.scenario;
  const mot = pipeline?.motivation;
  const nov = pipeline?.novelty;
  const cands = pipeline?.candidates;
  const dec = pipeline?.decision;
  const rec = pipeline?.recommendation;

  const weight = mockDec.weights;

  const timelineSteps = [
    { step: 1, agent: "Profile Agent", iconName: "User", color: "from-blue-500 to-cyan-500", summary: "分析你的饮食画像", details: prof ? [`偏好类别：${prof.favoriteCategories?.join("、")}`, `预算区间：${prof.budgetRange}`, `口味偏好：${prof.tastePreference}`, `行为类型：${prof.behaviorType?.join("、")}`] : mockTimeline[0].details },
    { step: 2, agent: "Scenario Agent", iconName: "MapPin", color: "from-green-500 to-emerald-500", summary: "理解你的当前场景", details: scen ? [`识别场景：${scen.scenario}`, `场景需求：${scen.needs?.join("、")}`] : mockTimeline[1].details },
    { step: 3, agent: "Motivation Agent", iconName: "Heart", color: "from-pink-500 to-rose-500", summary: "分析你的决策动机", details: mot ? [`主要动机：${mot.primary}`, `次要动机：${mot.secondary?.join("、")}`] : mockTimeline[2].details },
    { step: 4, agent: "Novelty Agent", iconName: "Sparkles", color: "from-purple-500 to-violet-500", summary: "评估探索意愿", details: nov ? [`探索意愿：${nov.level} (${nov.levelValue}%)`, `建议方向：${nov.encourage?.join("、")}`] : mockTimeline[3].details },
    { step: 5, agent: "Candidate Agent", iconName: "UtensilsCrossed", color: "from-orange-500 to-amber-500", summary: "召回候选食物", details: cands ? [`候选数量：${cands.length}个`, `覆盖${[...new Set(cands.map((c: any) => c.category))].join("、")}等品类`, `价格区间：¥${Math.min(...cands.map((c: any) => c.price))} - ¥${Math.max(...cands.map((c: any) => c.price))}`] : mockTimeline[4].details },
    { step: 6, agent: "Decision Agent", iconName: "TrendingUp", color: "from-indigo-500 to-blue-500", summary: "综合评分决策", details: dec ? [`5维度加权评分完成`, `权重分配：M(30%) A(25%) S(20%) P(15%) N(10%)`, `Top 1：${dec.topPick}`] : mockTimeline[5].details },
    { step: 7, agent: "Recommendation Agent", iconName: "MessageSquare", color: "from-teal-500 to-emerald-500", summary: "生成推荐解释", details: rec ? [`推荐：${rec.name}`, `置信度：${rec.confidence}%`, `核心理由：${rec.recommendationSummary?.[0] || ""}`] : ["生成推荐解释完成"] },
  ];

  const rankingRows = dec && cands ? cands.map((c: any, i: number) => ({
    food: c.name, motivation: Math.round(dec.scores.motivation * (0.9 + i * 0.02)), acceptance: Math.round(dec.scores.acceptance * (0.9 + i * 0.02)),
    scenario: Math.round(dec.scores.scenario * (0.9 + i * 0.02)), profile: Math.round(dec.scores.profile * (0.9 + i * 0.02)),
    novelty: Math.round(dec.scores.novelty * (0.9 + i * 0.02)),
    total: (dec.scores.motivation * 0.3 + dec.scores.acceptance * 0.25 + dec.scores.scenario * 0.2 + dec.scores.profile * 0.15 + dec.scores.novelty * 0.1) * (0.98 + i * 0.004),
    winner: i === 0, emoji: c.emoji,
  })) : mockRanking;

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-bold">完整决策过程</h1>
        <p className="text-muted-foreground text-sm mt-1">深入了解 MealMind 的7步AI决策链路</p>
      </div>

      <Card><CardContent className="p-5"><h2 className="font-semibold mb-4">Agent Pipeline</h2><PipelineVisualization nodes={pipelineNodes} activeIndex={6} /></CardContent></Card>

      <div className="space-y-0">
        {timelineSteps.map((step, i) => {
          const Icon = iconMap[step.iconName] || User;
          return <TimelineStep key={step.step} step={step.step} agent={step.agent} icon={Icon} color={step.color} summary={step.summary} details={step.details} isLast={i === timelineSteps.length - 1} />;
        })}
      </div>

      <Card><CardContent className="p-5">
        <h2 className="font-semibold mb-4">候选评分表</h2>
        <div className="overflow-x-auto"><Table>
          <TableHeader><TableRow>
            <TableHead className="min-w-[120px]">Food</TableHead>
            <TableHead className="text-center">Motivation ({Math.round(weight.motivation * 100)}%)</TableHead>
            <TableHead className="text-center">Acceptance ({Math.round(weight.acceptance * 100)}%)</TableHead>
            <TableHead className="text-center">Scenario ({Math.round(weight.scenario * 100)}%)</TableHead>
            <TableHead className="text-center">Profile ({Math.round(weight.profile * 100)}%)</TableHead>
            <TableHead className="text-center">Novelty ({Math.round(weight.novelty * 100)}%)</TableHead>
            <TableHead className="text-center">Total</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {rankingRows.map((row: any) => (
              <TableRow key={row.food} className={row.winner ? "bg-gradient-to-r from-orange-50 to-pink-50" : ""}>
                <TableCell className="font-medium"><div className="flex items-center gap-2"><span>{row.emoji}</span><span>{row.food}</span>{row.winner && <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 text-xs">最佳</Badge>}</div></TableCell>
                <TableCell className="text-center">{row.motivation}</TableCell>
                <TableCell className="text-center">{row.acceptance}</TableCell>
                <TableCell className="text-center">{row.scenario}</TableCell>
                <TableCell className="text-center">{row.profile}</TableCell>
                <TableCell className="text-center">{row.novelty}</TableCell>
                <TableCell className="text-center font-bold text-orange-600">{typeof row.total === "number" ? row.total.toFixed(1) : row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table></div>
        <Separator className="my-4" />
        <p className="text-xs text-muted-foreground">评分公式：Total = M × {Math.round(weight.motivation * 100)}% + A × {Math.round(weight.acceptance * 100)}% + S × {Math.round(weight.scenario * 100)}% + P × {Math.round(weight.profile * 100)}% + N × {Math.round(weight.novelty * 100)}%</p>
      </CardContent></Card>

      <Card className="bg-gradient-to-br from-orange-50 to-pink-50 border-orange-200"><CardContent className="p-6">
        <h2 className="font-semibold mb-3">最终解释</h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          {rec ? (
            rec.recommendationSummary?.map((r: string, i: number) => <p key={i}>{r}</p>)
          ) : (
            <>
              <p>你长期偏好<strong className="text-foreground">盖饭和麻辣口味</strong>。</p>
              <p>今天处于<strong className="text-foreground">追剧场景</strong>，希望获得满足感而非探索新食物。</p>
              <p>综合比较所有候选后，<strong className="text-foreground">香菇滑鸡拌饭</strong>获得最高加权总分，成为最佳推荐。</p>
            </>
          )}
        </div>
      </CardContent></Card>

      <div className="text-center pb-4"><Link href="/input"><Button variant="outline" size="lg" className="rounded-full px-8">重新推荐</Button></Link></div>
    </div>
  );
}
