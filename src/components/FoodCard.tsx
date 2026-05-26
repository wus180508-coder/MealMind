"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FoodCardProps {
  name: string;
  category: string;
  price: number;
  emoji?: string;
  score?: number;
  rank?: number;
  highlighted?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

export function FoodCard({
  name,
  category,
  price,
  emoji = "🍽️",
  score,
  rank,
  highlighted = false,
  fullWidth = false,
  onClick,
}: FoodCardProps) {
  return (
    <Card
      className={cn(
        "p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
        fullWidth ? "w-full" : "flex-shrink-0 w-36 p-3",
        highlighted && "ring-2 ring-orange-400 bg-orange-50/50"
      )}
      onClick={onClick}
    >
      {rank && (
        <Badge
          variant="secondary"
          className={cn("text-xs", fullWidth ? "mb-3" : "mb-2")}
        >
          #{rank}
        </Badge>
      )}
      <div className={cn("text-center mb-2", fullWidth ? "text-5xl" : "text-3xl")}>{emoji}</div>
      <div className={cn("font-medium truncate text-center", fullWidth ? "text-base" : "text-sm")}>{name}</div>
      {category ? (
        <div className="flex items-center justify-between mt-1.5">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <span className="text-sm font-semibold text-orange-600">
            ¥{price}
          </span>
        </div>
      ) : (
        <div className="text-center mt-1.5">
          <span className={cn("font-semibold text-orange-600", fullWidth ? "text-lg" : "text-sm")}>
            ¥{price}
          </span>
        </div>
      )}
      {score !== undefined && (
        <div className="mt-1.5 flex items-center justify-center gap-1">
          <span className="text-xs text-yellow-500">★</span>
          <span className="text-xs font-medium">{score.toFixed(1)}</span>
        </div>
      )}
    </Card>
  );
}
