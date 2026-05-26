"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagListProps {
  tags: string[];
  variant?: "default" | "outline" | "colored";
  colorClass?: string;
  size?: "sm" | "default";
}

export function TagList({
  tags,
  variant = "default",
  colorClass,
  size = "default",
}: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={variant === "outline" ? "outline" : "secondary"}
          className={cn(
            size === "sm" && "text-xs px-2 py-0",
            variant === "colored" && colorClass,
            variant === "colored" && "border-0"
          )}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
