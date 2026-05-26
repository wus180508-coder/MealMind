"use client";

import { Utensils } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-6">
        <Utensils className="w-10 h-10 text-orange-400" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        今天还没决定吃什么
      </h2>
      <p className="text-muted-foreground mb-6 max-w-sm">
        开始一次AI推荐吧，让MealMind帮你做出最佳选择
      </p>
      <Link href="/input">
        <Button
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 rounded-full px-8"
        >
          开始推荐
        </Button>
      </Link>
    </div>
  );
}
