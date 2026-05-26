"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  score: number;
  maxScore?: number;
  color?: string;
  weight?: number;
  animated?: boolean;
  delay?: number;
}

export function ScoreBar({
  label,
  score,
  maxScore = 100,
  color = "from-orange-500 to-pink-500",
  weight,
  animated = true,
  delay = 0,
}: ScoreBarProps) {
  const [width, setWidth] = useState(animated ? 0 : score);

  useEffect(() => {
    if (!animated) return;
    const timer = setTimeout(() => setWidth(score), delay + 100);
    return () => clearTimeout(timer);
  }, [score, animated, delay]);

  const percentage = Math.round((score / maxScore) * 100);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{percentage}%</span>
          {weight !== undefined && (
            <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              权重 {Math.round(weight * 100)}%
            </span>
          )}
        </div>
      </div>
      <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out",
            color
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
