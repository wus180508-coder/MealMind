"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreBar } from "./ScoreBar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";
import type { DecisionScores } from "@/lib/mockData";

interface RecommendationCardProps {
  name: string;
  price: number;
  score: number;
  confidence: number;
  image: string;
  recommendationSummary: string[];
  reasons: string[];
  scores: DecisionScores;
  weights?: { motivation: number; acceptance: number; scenario: number; profile: number; novelty: number };
  onOrder?: () => void;
  onExplain?: () => void;
}

export function RecommendationCard({
  name,
  price,
  score,
  confidence,
  image,
  recommendationSummary,
  reasons,
  scores: scoreData,
  weights = { motivation: 0.3, acceptance: 0.25, scenario: 0.2, profile: 0.15, novelty: 0.1 },
}: RecommendationCardProps) {
  const weightedTotal =
    scoreData.motivation * weights.motivation +
    scoreData.acceptance * weights.acceptance +
    scoreData.scenario * weights.scenario +
    scoreData.profile * weights.profile +
    scoreData.novelty * weights.novelty;

  const confidenceStars = confidence >= 90 ? 5 : confidence >= 80 ? 4 : confidence >= 70 ? 3 : 2;

  return (
    <div className="space-y-5">
      {/* Hero Card */}
      <Card className="relative overflow-hidden border-2 border-orange-300 bg-gradient-to-br from-white to-orange-50">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-200/50 to-transparent rounded-bl-full" />
        <CardContent className="p-6 relative">
          <Badge className="mb-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
            <Trophy className="w-3 h-3 mr-1" />
            #1 推荐
          </Badge>
          <div className="flex items-start gap-4">
            <div className="text-6xl">{image}</div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-foreground mb-1">{name}</h2>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="text-xl font-semibold text-orange-600">¥{price}</span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">{score.toFixed(1)}</span>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why This Recommendation */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-3">
            为什么推荐{name}？
          </h3>
          <div className="space-y-2">
            {recommendationSummary.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Confidence */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">AI Confidence</span>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-1">{confidence}%</div>
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < confidenceStars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-blue-600/70">{confidence}%匹配你的当前需求</p>
        </CardContent>
      </Card>

      {/* Reasons Checklist */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-3">推荐理由</h3>
          <div className="space-y-2">
            {reasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown with Weights */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-4">评分组成</h3>
          <div className="space-y-3">
            <ScoreBar label="Motivation Fit" score={scoreData.motivation} color="from-pink-500 to-rose-500" weight={weights.motivation} delay={0} />
            <ScoreBar label="Acceptance Fit" score={scoreData.acceptance} color="from-green-500 to-emerald-500" weight={weights.acceptance} delay={100} />
            <ScoreBar label="Scenario Fit" score={scoreData.scenario} color="from-blue-500 to-cyan-500" weight={weights.scenario} delay={200} />
            <ScoreBar label="Profile Fit" score={scoreData.profile} color="from-purple-500 to-violet-500" weight={weights.profile} delay={300} />
            <ScoreBar label="Novelty Fit" score={scoreData.novelty} color="from-orange-500 to-amber-500" weight={weights.novelty} delay={400} />
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">加权总分</span>
            <span className="text-lg font-bold text-orange-600">
              {weightedTotal.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total = M×{Math.round(weights.motivation * 100)}% + A×{Math.round(weights.acceptance * 100)}% + S×{Math.round(weights.scenario * 100)}% + P×{Math.round(weights.profile * 100)}% + N×{Math.round(weights.novelty * 100)}%
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/explanation" className="flex-1">
          <Button variant="outline" className="w-full rounded-full" size="lg">
            为什么推荐它
          </Button>
        </Link>
        <Link href="/input" className="flex-1">
          <Button className="w-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600" size="lg">
            重新推荐
          </Button>
        </Link>
      </div>
    </div>
  );
}
