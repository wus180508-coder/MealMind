"use client";

import { useState, useEffect } from "react";
import { RecommendationCard } from "@/components/RecommendationCard";
import { FoodCard } from "@/components/FoodCard";
import { EmptyState } from "@/components/EmptyState";
import { recommendationData as mockRec, alternativeData as mockAlt, decisionData as mockDec } from "@/lib/mockData";
import type { RecommendationResult } from "@/lib/agents/recommendationAgent";
import type { CandidateResult } from "@/lib/agents/candidateAgent";

export default function RecommendationPage() {
  const [data, setData] = useState<RecommendationResult | null>(null);
  const [alternatives, setAlternatives] = useState<CandidateResult[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mealmind_pipeline");
      if (raw) {
        const cached = JSON.parse(raw);
        if (cached.recommendation) {
          setData(cached.recommendation);
        }
        if (cached.candidates) {
          // Alternatives = candidates 2-3 (skip winner at index 0)
          setAlternatives(cached.candidates.slice(1, 3));
        }
      }
    } catch { /* use mock */ }
    setLoaded(true);
  }, []);

  if (!loaded) return <EmptyState />;

  const rec = data || {
    name: mockRec.name, price: mockRec.price, score: mockRec.score,
    confidence: mockRec.confidence, image: mockRec.image,
    recommendationSummary: mockRec.recommendationSummary,
    reasons: mockRec.reasons, scores: mockRec.scores,
  };

  const altCards = alternatives.length >= 2 ? alternatives : [
    { name: mockAlt[0].name, category: "", price: mockAlt[0].price, emoji: mockAlt[0].image, score: mockAlt[0].score, rank: 2 } as any,
    { name: mockAlt[1].name, category: "", price: mockAlt[1].price, emoji: mockAlt[1].image, score: mockAlt[1].score, rank: 3 } as any,
  ];

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-bold">你的晚餐推荐</h1>
        <p className="text-muted-foreground text-sm mt-1">基于7个AI Agent的协同分析</p>
      </div>

      <RecommendationCard
        name={rec.name}
        price={rec.price}
        score={rec.score}
        confidence={rec.confidence}
        image={rec.image}
        recommendationSummary={rec.recommendationSummary}
        reasons={rec.reasons}
        scores={rec.scores}
        weights={mockDec.weights}
      />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">其他推荐</h2>
        <div className="grid grid-cols-2 gap-4">
          {altCards.map((alt: any, i: number) => (
            <FoodCard key={i} name={alt.name} category="" price={alt.price} emoji={alt.emoji} score={alt.score} rank={alt.rank || i + 2} fullWidth />
          ))}
        </div>
      </div>
    </div>
  );
}
