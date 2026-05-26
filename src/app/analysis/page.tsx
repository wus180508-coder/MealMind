"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AgentCard } from "@/components/AgentCard";
import { TagList } from "@/components/TagList";
import { ScoreBar } from "@/components/ScoreBar";
import { FoodCard } from "@/components/FoodCard";
import { ErrorState } from "@/components/ErrorState";
import { DevModePanel } from "@/components/DevModePanel";
import {
  User, MapPin, Heart, Sparkles, UtensilsCrossed, TrendingUp,
  MessageSquare, ArrowRight, AlertTriangle,
} from "lucide-react";
import {
  agentDefinitions,
  profileData as mockProfile,
  scenarioData as mockScenario,
  motivationData as mockMotivation,
  noveltyData as mockNovelty,
  candidateData as mockCandidate,
  decisionData as mockDecision,
  type ProfileData,
  type ScenarioData,
  type MotivationData,
  type NoveltyData,
  type DecisionData,
} from "@/lib/mockData";
import { runProfileAgent } from "@/lib/agents/profileAgent";
import { runScenarioAgent } from "@/lib/agents/scenarioAgent";
import { runMotivationAgent } from "@/lib/agents/motivationAgent";
import { runNoveltyAgent } from "@/lib/agents/noveltyAgent";
import { runCandidateAgent, type CandidateResult } from "@/lib/agents/candidateAgent";
import { runDecisionAgent } from "@/lib/agents/decisionAgent";
import { runRecommendationAgent, type RecommendationResult } from "@/lib/agents/recommendationAgent";

const iconMap: Record<string, React.ElementType> = {
  User, MapPin, Heart, Sparkles, UtensilsCrossed, TrendingUp, MessageSquare,
};

type Source = "deepseek" | "mock" | "rule_engine";

export default function AnalysisPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [showError, setShowError] = useState(false);
  const [checkTick, setCheckTick] = useState(0);

  const [apiResults, setApiResults] = useState<{
    profile: ProfileData | null;
    scenario: ScenarioData | null;
    motivation: MotivationData | null;
    novelty: NoveltyData | null;
    candidates: CandidateResult[] | null;
    decision: DecisionData | null;
    recommendation: RecommendationResult | null;
  }>({
    profile: null, scenario: null, motivation: null,
    novelty: null, candidates: null, decision: null, recommendation: null,
  });

  const [apiSources, setApiSources] = useState<Record<string, Source>>({
    profile: "deepseek", scenario: "deepseek", motivation: "deepseek",
    novelty: "deepseek", candidate: "rule_engine", decision: "deepseek",
    recommendation: "deepseek",
  });

  const [showFallbackBanner, setShowFallbackBanner] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Run entire 7-agent pipeline on mount ──
  useEffect(() => {
    let cancelled = false;

    async function runPipeline() {
      let input: Record<string, string | number> = {};
      try {
        const raw = localStorage.getItem("mealmind_input");
        if (raw) input = JSON.parse(raw);
      } catch { /* use defaults */ }

      const orderHistory = String(input.orderHistory || "");
      const scenarioStr = String(input.scenario || "追剧");
      const budget = Number(input.budget || 15);
      const mood = String(input.mood || "");
      const notes = String(input.notes || "");

      const markFallback = (s: Source) => {
        if (s !== "deepseek" && s !== "rule_engine") setShowFallbackBanner(true);
      };

      // 1. Profile + Scenario (parallel)
      const [pR, sR] = await Promise.allSettled([
        runProfileAgent(orderHistory),
        runScenarioAgent(scenarioStr, budget, mood, notes),
      ]);
      if (cancelled) return;
      const prof = pR.status === "fulfilled" ? pR.value : { data: { ...mockProfile }, source: "mock" as const };
      const scen = sR.status === "fulfilled" ? sR.value : { data: { ...mockScenario }, source: "mock" as const };
      setApiResults(prev => ({ ...prev, profile: prof.data, scenario: scen.data }));
      setApiSources(prev => ({ ...prev, profile: prof.source, scenario: scen.source }));
      markFallback(prof.source); markFallback(scen.source);

      // 2. Motivation
      if (cancelled) return;
      let mot: { data: MotivationData; source: "deepseek" | "mock" };
      try { mot = await runMotivationAgent(prof.data, scen.data); }
      catch { mot = { data: { ...mockMotivation }, source: "mock" }; }
      setApiResults(prev => ({ ...prev, motivation: mot.data }));
      setApiSources(prev => ({ ...prev, motivation: mot.source }));
      markFallback(mot.source);

      // 3. Novelty
      if (cancelled) return;
      let nov: { data: NoveltyData; source: "deepseek" | "mock" };
      try { nov = await runNoveltyAgent(prof.data, scen.data, mot.data); }
      catch { nov = { data: { ...mockNovelty }, source: "mock" }; }
      setApiResults(prev => ({ ...prev, novelty: nov.data }));
      setApiSources(prev => ({ ...prev, novelty: nov.source }));
      markFallback(nov.source);

      // 4. Candidate (rule-based, always succeeds)
      if (cancelled) return;
      const cand = await runCandidateAgent(prof.data, scen.data, mot.data, nov.data, budget);
      setApiResults(prev => ({ ...prev, candidates: cand.data.candidates }));
      setApiSources(prev => ({ ...prev, candidate: cand.source }));

      // 5. Decision
      if (cancelled) return;
      let dec: { data: DecisionData; source: "deepseek" | "mock" };
      try { dec = await runDecisionAgent(cand.data.candidates, prof.data, scen.data, mot.data, nov.data); }
      catch { dec = { data: { ...mockDecision }, source: "mock" }; }
      setApiResults(prev => ({ ...prev, decision: dec.data }));
      setApiSources(prev => ({ ...prev, decision: dec.source }));
      markFallback(dec.source);

      // 6. Recommendation
      if (cancelled) return;
      const winner = cand.data.candidates[0] || { name: "香菇滑鸡拌饭", category: "盖浇饭", price: 12.9, emoji: "🍚", score: 9 };
      let rec: { data: RecommendationResult; source: "deepseek" | "mock" };
      try { rec = await runRecommendationAgent(winner, dec.data, prof.data, scen.data, mot.data, cand.data.candidates); }
      catch { rec = { data: { name: winner.name, price: winner.price, score: 8.9, confidence: 85, image: winner.emoji, reasons: [], recommendationSummary: [], scores: dec.data.scores }, source: "mock" }; }
      setApiResults(prev => ({ ...prev, recommendation: rec.data }));
      setApiSources(prev => ({ ...prev, recommendation: rec.source }));
      markFallback(rec.source);

      // Cache results for recommendation/explanation pages
      try {
        localStorage.setItem("mealmind_pipeline", JSON.stringify({
          profile: prof.data, scenario: scen.data, motivation: mot.data,
          novelty: nov.data, candidates: cand.data.candidates,
          decision: dec.data, recommendation: rec.data,
        }));
      } catch { /* localStorage full */ }
    }

    runPipeline();
    return () => { cancelled = true; };
  }, []);

  const handleRetry = useCallback(() => {
    setCurrentIndex(0); setCompletedIds(new Set());
    setShowError(false); setCheckTick(0);
  }, []);

  const realAgentDataReady = useCallback(
    (id: string) => {
      switch (id) {
        case "profile": return apiResults.profile !== null;
        case "scenario": return apiResults.scenario !== null;
        case "motivation": return apiResults.motivation !== null;
        case "novelty": return apiResults.novelty !== null;
        case "decision": return apiResults.decision !== null;
        case "recommendation": return apiResults.recommendation !== null;
        default: return true; // candidate — always ready
      }
    },
    [apiResults]
  );

  // ── Animation driver ──
  useEffect(() => {
    if (showError) return;
    if (currentIndex >= agentDefinitions.length) {
      const timer = setTimeout(() => router.push("/recommendation"), 1000);
      return () => clearTimeout(timer);
    }
    const agentId = agentDefinitions[currentIndex]?.id;
    if (!agentId) return;

    const isAiAgent = agentId !== "candidate";
    const isReady = isAiAgent ? realAgentDataReady(agentId) : true;
    const delay = isReady ? 1000 : 300;

    timerRef.current = setTimeout(() => {
      if (!isReady) { setCheckTick(p => p + 1); return; }
      setCompletedIds(prev => new Set([...prev, agentId]));
      setCurrentIndex(prev => prev + 1);
    }, delay);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [currentIndex, apiResults, checkTick, showError, router, realAgentDataReady]);

  if (showError) return <ErrorState onRetry={handleRetry} />;

  const getStatus = (index: number) => {
    if (index < currentIndex) return "completed";
    if (index === currentIndex) return "analyzing";
    return "pending";
  };

  const progressValue = (currentIndex / agentDefinitions.length) * 100;

  const renderAgentContent = (id: string, index: number, currentIdx: number) => {
    const isAiAgent = id !== "candidate";
    if (index === currentIdx && isAiAgent && !realAgentDataReady(id)) return null;

    const fallbackBadge = (agentId: string) => {
      const src = apiSources[agentId];
      if (src === "mock") {
        return (
          <div className="text-xs text-amber-600 mb-3 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> AI分析失败，已切换到默认模式
          </div>
        );
      }
      return null;
    };

    switch (id) {
      case "profile": {
        const d = apiResults.profile || mockProfile;
        return <div className="space-y-3">{fallbackBadge("profile")}
          <div><p className="text-xs text-muted-foreground mb-1.5">偏好类别</p><TagList tags={d.favoriteCategories} variant="colored" colorClass="bg-blue-100 text-blue-700" /></div>
          <div className="flex gap-3"><div><p className="text-xs text-muted-foreground mb-1">预算区间</p><span className="text-sm font-medium">{d.budgetRange}</span></div><div><p className="text-xs text-muted-foreground mb-1">行为类型</p><TagList tags={d.behaviorType} variant="colored" colorClass="bg-cyan-100 text-cyan-700" size="sm" /></div></div>
        </div>;
      }
      case "scenario": {
        const d = apiResults.scenario || mockScenario;
        return <div className="space-y-3">{fallbackBadge("scenario")}
          <div><p className="text-xs text-muted-foreground mb-1.5">识别场景</p><span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">{d.scenario}</span></div>
          <div><p className="text-xs text-muted-foreground mb-1.5">场景需求</p><TagList tags={d.needs} variant="colored" colorClass="bg-emerald-100 text-emerald-700" /></div>
        </div>;
      }
      case "motivation": {
        const d = apiResults.motivation || mockMotivation;
        return <div>{fallbackBadge("motivation")}
          <div className="flex items-center justify-center py-4"><div className="text-center"><Heart className="w-10 h-10 text-pink-500 mx-auto mb-2" /><span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 text-2xl font-bold capitalize">{d.primary}</span></div></div>
        </div>;
      }
      case "novelty": {
        const d = apiResults.novelty || mockNovelty;
        return <div className="space-y-3">{fallbackBadge("novelty")}
          <div><p className="text-xs text-muted-foreground mb-1.5">探索意愿</p><div className="flex items-center gap-3"><Progress value={d.levelValue} className="w-32 h-2" /><span className="text-sm font-medium capitalize">{d.level}</span></div></div>
          <div><p className="text-xs text-muted-foreground mb-1.5">微调建议</p><TagList tags={d.encourage} variant="colored" colorClass="bg-violet-100 text-violet-700" /></div>
        </div>;
      }
      case "candidate": {
        const candidates = apiResults.candidates || mockCandidate.candidates;
        const topPick = apiResults.decision?.topPick || mockDecision.topPick;
        return <div className="overflow-x-auto pb-2 -mx-2 px-2"><div className="flex gap-3">
          {candidates.map((f: any) => <FoodCard key={f.name} name={f.name} category={f.category} price={f.price} emoji={f.emoji || "🍽️"} highlighted={f.name === topPick} />)}
        </div></div>;
      }
      case "decision": {
        const d = apiResults.decision || mockDecision;
        const colorMap: Record<string, string> = { motivation: "from-pink-500 to-rose-500", acceptance: "from-green-500 to-emerald-500", scenario: "from-blue-500 to-cyan-500", profile: "from-purple-500 to-violet-500", novelty: "from-orange-500 to-amber-500" };
        const labelMap: Record<string, string> = { motivation: "Motivation Fit", acceptance: "Acceptance Fit", scenario: "Scenario Fit", profile: "Profile Fit", novelty: "Novelty Fit" };
        return <div className="space-y-3">{fallbackBadge("decision")}
          {Object.entries(d.scores).map(([key, score], i) => <ScoreBar key={key} label={labelMap[key]} score={score} color={colorMap[key]} weight={d.weights[key as keyof typeof d.weights]} delay={i * 100} />)}
        </div>;
      }
      case "recommendation": {
        const d = apiResults.recommendation;
        if (!d) return null;
        return <div className="space-y-3">{fallbackBadge("recommendation")}
          <div className="text-center py-2"><p className="text-lg font-bold text-teal-600">{d.name}</p><p className="text-sm text-muted-foreground">AI Confidence: {d.confidence}%</p></div>
          <div className="space-y-1">{d.recommendationSummary.map((r, i) => <p key={i} className="text-xs flex items-start gap-1"><span className="text-green-500">✓</span> {r}</p>)}</div>
        </div>;
      }
      default: return null;
    }
  };

  return (
    <div className="space-y-5 py-6">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-bold">MealMind 正在分析...</h1>
        <Progress value={progressValue} className="w-48 mx-auto h-2" />
        <p className="text-sm text-muted-foreground">{currentIndex}/{agentDefinitions.length} 个Agent已完成</p>
      </div>

      {showFallbackBanner && (
        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
          <AlertTriangle className="w-4 h-4" /><span>AI分析失败，已切换到默认模式</span>
        </div>
      )}

      <div className="space-y-3">
        {agentDefinitions.map((agent, i) => {
          const Icon = iconMap[agent.iconName] || User;
          return (
            <AgentCard key={agent.id} agentId={agent.id} name={agent.name} icon={Icon} color={agent.color} status={getStatus(i)} completionMessage={agent.completionMessage}>
              {renderAgentContent(agent.id, i, currentIndex)}
            </AgentCard>
          );
        })}
      </div>

      {currentIndex >= agentDefinitions.length && (
        <div className="text-center space-y-3 pt-4">
          <Button onClick={() => router.push("/recommendation")} size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 rounded-full px-8">
            查看推荐结果<ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      <DevModePanel sources={apiSources} />

      <div className="text-center mt-8">
        <button onClick={() => setShowError(true)} className="text-xs text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors">模拟分析失败</button>
      </div>
    </div>
  );
}
