import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-text-muted/60 text-sm">
        <div className="flex items-center gap-1.5 order-2 md:order-1">
          <span>© {currentYear}</span>
          <span className="font-bold text-text-muted/80 tracking-tighter">
            lnk<span className="text-accent/50">.</span>
          </span>
          <span className="hidden md:inline">—</span>
          <span>All rights reserved.</span>
        </div>

        <div className="flex items-center gap-1.5 order-1 md:order-2">
          <span>Made by</span>
          <span className="text-text-base font-medium hover:text-accent transition-colors cursor-default">
            Jaimz🦖
          </span>
        </div>
      </div>
    </footer>
  );
}
