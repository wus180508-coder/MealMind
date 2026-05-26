"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp, Code2 } from "lucide-react";

interface DevModePanelProps {
  sources: Record<string, "deepseek" | "mock" | "rule_engine">;
}

const agentLabels: Record<string, string> = {
  profile: "Profile Agent",
  scenario: "Scenario Agent",
  motivation: "Motivation Agent",
  novelty: "Novelty Agent",
  candidate: "Candidate Agent",
  decision: "Decision Agent",
  recommendation: "Recommendation Agent",
};

export function DevModePanel({ sources }: DevModePanelProps) {
  const [open, setOpen] = useState(false);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="mt-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        className="text-xs text-muted-foreground gap-1.5 hover:text-foreground"
      >
        <Code2 className="w-3.5 h-3.5" />
        Dev: Data Sources
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </Button>

      {open && (
        <Card className="mt-2 border-dashed">
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Agent</TableHead>
                  <TableHead className="text-xs">Data Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(sources).map(([id, source]) => (
                  <TableRow key={id}>
                    <TableCell className="text-xs font-medium py-2">
                      {agentLabels[id] || id}
                    </TableCell>
                    <TableCell className="text-xs py-2">
                      {source === "deepseek" ? (
                        <Badge className="bg-green-100 text-green-700 border-0 text-xs gap-1">
                          <span className="text-green-500">✓</span>
                          DeepSeek API
                        </Badge>
                      ) : source === "rule_engine" ? (
                        <Badge className="bg-blue-100 text-blue-700 border-0 text-xs gap-1">
                          <span className="text-blue-500">⚙</span>
                          Rule Engine
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs gap-1">
                          Mock Data
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
