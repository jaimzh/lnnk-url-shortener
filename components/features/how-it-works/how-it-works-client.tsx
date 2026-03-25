"use client";

import { useState } from "react";
import { Globe, Zap, Shield, BarChart3, Binary, User } from "lucide-react";
import MarkdownRenderer from "@/components/shared/markdown-renderer";

interface HowItWorksClientProps {
  markdownContent: string;
}

export default function HowItWorksClient({
  markdownContent,
}: HowItWorksClientProps) {
 
  const [view, setView] = useState<"user" | "technical">("user");


  const steps = [
    {
      title: "Paste your link",
      description: "Enter any long URL into the input field on the home page.",
    },
    {
      title: "Shorten & Customize",
      description: "Click shorten or provide a custom alias to make your link unique.",
    },
    {
      title: "Share Securely",
      description: "Copy your new link and share it anywhere. Your links are safe and fast.",
    },
    {
      title: "Track Analytics",
      description: "Monitor your link's performance with real-time click tracking.",
    },
  ];

  return (
    <div className="space-y-12">
     
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-bg-base/50 border border-white/5 backdrop-blur-md rounded-2xl">
          <button
            onClick={() => setView("user")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              view === "user"
                ? "bg-accent text-white shadow-lg shadow-accent/25"
                : "text-text-muted hover:text-text-base hover:bg-white/5"
            }`}
          >
            <User size={16} />
            User Guide
          </button>

          <button
            onClick={() => setView("technical")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              view === "technical"
                ? "bg-accent text-white shadow-lg shadow-accent/25"
                : "text-text-muted hover:text-text-base hover:bg-white/5"
            }`}
          >
            <Binary size={16} />
            My Docs
          </button>
        </div>
      </div>

      {/* --- THE CONTENT VIEW --- */}
      {view === "user" ? (
        <div className="max-w-3xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-10 group">
              {/* Vertical Stepper Column */}
              <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                <div className="w-11 h-11 rounded-full border-2 border-accent/20 bg-accent/10 flex items-center justify-center text-sm font-mono font-black text-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] group-hover:border-accent/50 group-hover:bg-accent/20 transition-all duration-300">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>
                {idx !== steps.length - 1 && (
                  <div className="w-[2px] flex-1 bg-gradient-to-b from-accent/30 to-transparent my-3 transition-colors" />
                )}
              </div>

              {/* Content Column */}
              <div className={`${idx !== steps.length - 1 ? 'pb-16' : 'pb-0'} pt-1`}>
                <h3 className="text-xl font-semibold text-text-base mb-3 tracking-tight group-hover:text-accent transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-text-muted text-base leading-relaxed font-light max-w-xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 md:p-12 rounded-[2.5rem] bg-bg-base/30 border border-white/5 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        

        <MarkdownRenderer content={markdownContent} />

          
        </div>
      )}
    </div>
  );
}
