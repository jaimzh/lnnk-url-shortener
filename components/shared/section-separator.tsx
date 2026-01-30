import React from "react";
import { cn } from "@/lib/utils";

interface SectionSeparatorProps {
  label?: string;
  className?: string;
}

export function SectionSeparator({ label, className }: SectionSeparatorProps) {
  return (
    <div
      className={cn(
        "w-full max-w-4xl mx-auto px-6 py-8 flex items-center gap-6",
        className,
      )}
    >
      <div className="h-[1px] flex-1 bg-linear-to-r from-transparent via-border to-transparent opacity-50" />
      {label && (
        <span className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-[0.2em] whitespace-nowrap">
          {label}
        </span>
      )}
      <div className="h-[1px] flex-1 bg-linear-to-r from-transparent via-border to-transparent opacity-50" />
    </div>
  );
}
