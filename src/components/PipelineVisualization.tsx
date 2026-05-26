"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface PipelineNode {
  id: string;
  name: string;
  color: string;
}

interface PipelineVisualizationProps {
  nodes: PipelineNode[];
  activeIndex?: number;
}

export function PipelineVisualization({
  nodes,
  activeIndex = -1,
}: PipelineVisualizationProps) {
  return (
    <div className="overflow-x-auto pb-2 -mx-2 px-2">
      <div className="flex items-center gap-0 min-w-max justify-center">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex items-center gap-0">
            <div
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                i <= activeIndex
                  ? "opacity-100 scale-100"
                  : i === activeIndex + 1
                  ? "opacity-80 scale-95"
                  : "opacity-50 scale-90 grayscale"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold",
                  node.color
                )}
              >
                {i + 1}
              </div>
              <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">
                {node.name}
              </span>
            </div>
            {i < nodes.length - 1 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
