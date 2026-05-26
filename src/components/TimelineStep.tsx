"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineStepProps {
  step: number;
  agent: string;
  icon: React.ElementType;
  color: string;
  summary: string;
  details: string[];
  isLast?: boolean;
}

export function TimelineStep({
  step,
  agent,
  icon: Icon,
  color,
  summary,
  details,
  isLast = false,
}: TimelineStepProps) {
  return (
    <div className="flex gap-4">
      {/* Timeline line and node */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br text-white flex-shrink-0",
            color
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-muted-foreground/20 to-muted-foreground/10 my-1" />
        )}
      </div>

      {/* Content */}
      <Card className={cn("flex-1 mb-4", isLast && "mb-0")}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              Step {step}
            </span>
            <h3 className="font-semibold text-sm">{agent}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{summary}</p>
          <ul className="space-y-1">
            {details.map((detail, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
