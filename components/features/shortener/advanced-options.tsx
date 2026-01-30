"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Settings2,
  ChevronDown,
  Dices,
  Type,
  Smile,
  Hash,
  CheckCircle2,
  Sparkles,
  Keyboard,
  Zap,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdvancedOptionsProps {
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;
  aliasType: string;
  setAliasType: (type: string) => void;
  customAlias: string;
  setCustomAlias: (alias: string | ((prev: string) => string)) => void;
  randomFlavor: string;
  setRandomFlavor: (flavor: string) => void;
}

const KAOMOJIS = [
  "( ͡° ͜ʖ ͡°)",
  "(¬‿¬)",
  "(ʘ‿ʘ)",
  "(ง •̀_•́)ง",
  "(╯°□°）╯︵ ┻━┻",
  "(✿◕‿◕)",
  "(⌐■_■)",
  "(◕‿◕✿)",
  "(╥﹏╥)",
  "༼ つ ◕_◕ ༽つ",
];
const EMOJIS = [
  "🔥",
  "🚀",
  "💀",
  "✨",
  "🌈",
  "🍦",
  "⚡",
  "💎",
  "🦄",
  "🍀",
  "🍕",
  "🎮",
];

interface AliasPreviewProps {
  alias: string;
  placeholder: string;
  onClear: () => void;
}

const AliasPreview = ({ alias, placeholder, onClear }: AliasPreviewProps) => (
  <div className="flex items-center justify-between p-3 bg-bg-base/50 rounded-2xl border border-accent/20 animate-in fade-in slide-in-from-top-2 duration-300">
    <span className="text-text-muted text-[10px] uppercase font-bold shrink-0">
      Live Preview:
    </span>
    <div className="flex items-center gap-2 overflow-hidden px-4">
      <span className="text-text-muted font-mono text-xs whitespace-nowrap">
        snappy.li/
      </span>
      <span className="text-text-base font-bold tracking-widest text-lg truncate">
        {alias || placeholder}
      </span>
    </div>
    <button
      type="button"
      onClick={onClear}
      className="text-[10px] uppercase font-bold text-text-muted hover:text-accent transition-colors cursor-pointer shrink-0"
    >
      Clear
    </button>
  </div>
);

export function AdvancedOptions({
  showAdvanced,
  setShowAdvanced,
  aliasType,
  setAliasType,
  customAlias,
  setCustomAlias,
  randomFlavor,
  setRandomFlavor,
}: AdvancedOptionsProps) {
  const [randomPreview, setRandomPreview] = React.useState("");

  const generateRandomPreview = (flavor: string) => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const emojis = EMOJIS;
    const kaomojis = KAOMOJIS;

    switch (flavor) {
      case "emoji":
        return Array.from(
          { length: 3 },
          () => emojis[Math.floor(Math.random() * emojis.length)],
        ).join("");
      case "kaomoji":
        return kaomojis[Math.floor(Math.random() * kaomojis.length)];
      case "mix":
        const rChar = chars[Math.floor(Math.random() * chars.length)];
        const rEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        return `${rChar}${rEmoji}${chars[Math.floor(Math.random() * chars.length)]}`;
      default: // text
        return Array.from(
          { length: 6 },
          () => chars[Math.floor(Math.random() * chars.length)],
        ).join("");
    }
  };

  React.useEffect(() => {
    if (aliasType === "random") {
      setRandomPreview(generateRandomPreview(randomFlavor));
    }
  }, [randomFlavor, aliasType]);

  return (
    <div className="space-y-4">
      {/* Advanced Options Toggle */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer",
            showAdvanced
              ? "text-accent bg-accent/10"
              : "text-text-muted hover:text-text-base",
          )}
        >
          <Settings2
            size={14}
            className={cn(
              "transition-transform duration-500",
              showAdvanced && "animate-spin-slow",
            )}
          />
          Advanced Options
          <ChevronDown
            size={14}
            className={cn(
              "transition-transform duration-300",
              showAdvanced && "rotate-180",
            )}
          />
        </button>
      </div>

      {/* Advanced Panel */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out",
          showAdvanced
            ? "max-h-[500px] opacity-100 mt-2"
            : "max-h-0 opacity-0 pointer-events-none",
        )}
      >
        <div className="bg-bg-base/40 border border-accent/20 rounded-3xl p-6 backdrop-blur-md shadow-inner">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider text-text-muted font-bold">
                Alias Strategy
              </label>

              <div className="grid grid-cols-2 gap-2 p-1 bg-bg-base/50 rounded-2xl border border-accent/10">
                <button
                  type="button"
                  onClick={() => {
                    setAliasType("random");
                    setCustomAlias("");
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all cursor-pointer",
                    aliasType === "random"
                      ? "bg-accent text-text-base shadow-lg scale-[1.02]"
                      : "text-text-muted hover:bg-white/5 hover:text-text-base",
                  )}
                >
                  <Dices size={16} />
                  <span className="text-[10px] font-bold tracking-wide">
                    Random ID
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAliasType("custom");
                    setCustomAlias("");
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all cursor-pointer",
                    aliasType === "custom"
                      ? "bg-accent text-text-base shadow-lg scale-[1.02]"
                      : "text-text-muted hover:bg-white/5 hover:text-text-base",
                  )}
                >
                  <Sparkles size={16} />
                  <span className="text-[10px] font-bold tracking-wide">
                    Custom Alias
                  </span>
                </button>
              </div>
            </div>

            {/* Contextual Inputs */}
            <div className="min-h-[140px]">
              <AnimatePresence mode="wait">
                {aliasType === "random" && (
                  <motion.div
                    key="random"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: "text", icon: <Type size={14} />, label: "Text" },
                        {
                          id: "emoji",
                          icon: <Smile size={14} />,
                          label: "Emoji",
                        },
                        {
                          id: "kaomoji",
                          icon: <Hash size={14} />,
                          label: "Kao",
                        },
                        { id: "mix", icon: <Zap size={14} />, label: "Mix" },
                      ].map((flavor) => (
                        <button
                          key={flavor.id}
                          type="button"
                          onClick={() => setRandomFlavor(flavor.id)}
                          className={cn(
                            "flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-[10px] font-bold uppercase tracking-tight border transition-all cursor-pointer",
                            randomFlavor === flavor.id
                              ? "border-accent/50 bg-accent/10 text-accent"
                              : "border-accent/10 bg-bg-base/20 text-text-muted hover:border-accent/30",
                          )}
                        >
                          {flavor.icon} {flavor.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-3 text-text-muted bg-bg-base/30 p-4 rounded-2xl border border-dashed border-accent/20">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-text-muted/50 mb-1">
                          Upcoming ID Style
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-text-muted/40 font-mono text-xs">
                            snappy.li/
                          </span>
                          <span className="text-text-base font-mono font-bold tracking-wide">
                            {randomPreview}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setRandomPreview(generateRandomPreview(randomFlavor))
                        }
                        className="p-2 hover:bg-white/5 rounded-full transition-colors text-text-muted hover:text-accent cursor-pointer"
                        title="Regenerate Preview"
                      >
                        <RefreshCcw size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {aliasType === "custom" && (
                  <motion.div
                    key="custom"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center bg-bg-base/50 rounded-2xl border border-accent/20 px-4 h-12 transition-all focus-within:border-accent/50">
                      <span className="text-text-muted font-mono text-sm mr-2 select-none">
                        snappy.li/
                      </span>
                      <input
                        type="text"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                        placeholder="text, emojis, or (╯°□°）╯"
                        className="bg-transparent outline-none w-full text-text-base font-mono text-sm placeholder:text-text-muted/30"
                      />
                    </div>

                    <AliasPreview
                      alias={customAlias}
                      placeholder="..."
                      onClear={() => setCustomAlias("")}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
