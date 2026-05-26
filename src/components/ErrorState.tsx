"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "分析失败",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-red-400" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">{message}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">
        请检查网络后重试
      </p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="lg"
          className="gap-2 rounded-full px-8"
        >
          <RefreshCw className="w-4 h-4" />
          重新分析
        </Button>
      )}
    </div>
  );
}
