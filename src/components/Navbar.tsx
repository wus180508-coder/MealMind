"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChefHat, History, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-white" />
          </div>
          <span className="hidden sm:inline bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            MealMind
          </span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <Link href="/recommendation">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full",
                pathname === "/recommendation" && "bg-orange-50 text-orange-500"
              )}
            >
              <History className="w-5 h-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
