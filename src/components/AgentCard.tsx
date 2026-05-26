"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2, Clock } from "lucide-react";

interface AgentCardProps {
  agentId: string;
  name: string;
  icon: React.ElementType;
  color: string;
  status: "pending" | "analyzing" | "completed";
  completionMessage?: string;
  children?: ReactNode;
}

export function AgentCard({
  agentId,
  name,
  icon: Icon,
  color,
  status,
  completionMessage,
  children,
}: AgentCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-500",
        status === "pending" && "opacity-50",
        status === "analyzing" && "ring-2 ring-orange-300 shadow-lg shadow-orange-100",
        status === "completed" && "ring-1 ring-green-200"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br text-white",
                color
              )}
            >
              <Icon className="w-4 h-4" />
            </div>
            <CardTitle className="text-base font-semibold">{name}</CardTitle>
          </div>
          <div>
            {status === "pending" && (
              <Badge variant="outline" className="gap-1">
                <Clock className="w-3 h-3" />
                等待中
              </Badge>
            )}
            {status === "analyzing" && (
              <Badge className="gap-1 bg-orange-100 text-orange-700 border-0">
                <Loader2 className="w-3 h-3 animate-spin" />
                分析中
              </Badge>
            )}
            {status === "completed" && (
              <Badge className="gap-1 bg-green-100 text-green-700 border-0">
                <CheckCircle2 className="w-3 h-3" />
                完成
              </Badge>
            )}
          </div>
        </div>
        {completionMessage && status === "completed" && (
          <p className="text-sm text-green-600 mt-2 ml-12 animate-in fade-in slide-in-from-left-2">
            {completionMessage}
          </p>
        )}
      </CardHeader>
      {status !== "pending" && children && (
        <CardContent>{children}</CardContent>
      )}
    </Card>
  );
}
