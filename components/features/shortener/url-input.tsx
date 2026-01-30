"use client";

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { ClipboardPaste } from "lucide-react";
import { useHeroContext } from "@/context/HeroContext";
import LoadingModal from "@/components/features/shortener/LoadingModal";
import { readFromClipboard, cn } from "@/lib/utils";
import { ShortenButton } from "@/components/ui/shorten-button";
import { urlSchema } from "@/schemas/url";
import { AdvancedOptions } from "./advanced-options";

export default function UrlInput() {
  const { isHeroShortened, setIsHeroShortened } = useHeroContext();

  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    originalUrl: string;
    shortUrl: string;
  } | null>(null);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [aliasType, setAliasType] = useState("random"); // random, custom
  const [customAlias, setCustomAlias] = useState("");
  const [randomFlavor, setRandomFlavor] = useState("text"); // text, emoji, kaomoji, mix

  const inputRef = useRef<HTMLInputElement>(null);

  const handleShorten = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const trimmed = url.trim();

    // Determine the alias to send
    let aliasToSend = "";
    if (aliasType === "custom" && customAlias.trim()) {
      aliasToSend = customAlias.trim();
    } else if (aliasType === "random" && randomFlavor !== "text") {
      // For special random flavors, generate them on the frontend
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
      const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

      if (randomFlavor === "emoji") {
        aliasToSend = Array.from(
          { length: 3 },
          () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        ).join("");
      } else if (randomFlavor === "kaomoji") {
        aliasToSend = KAOMOJIS[Math.floor(Math.random() * KAOMOJIS.length)];
      } else if (randomFlavor === "mix") {
        const rChar = chars[Math.floor(Math.random() * chars.length)];
        const rEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        aliasToSend = `${rChar}${rEmoji}${chars[Math.floor(Math.random() * chars.length)]}`;
      }
    }

    // Validate with Zod before doing anything else
    const validation = urlSchema.safeParse({
      url: trimmed,
      alias: aliasToSend,
    });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: validation.data.url,
          alias: validation.data.alias,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to shorten URL");
      }

      const data = await response.json();
      console.log("Success:", data);

      await new Promise((resolve) => setTimeout(resolve, 600));

      setResult(data);
      setIsLoading(false);
      setUrl("");
      setCustomAlias("");
    } catch (error: any) {
      console.error("Failed to shorten URL:", error);
      setError(error.message || "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setResult(null);
    setIsLoading(false);
  };

  const handlePaste = async () => {
    const copiedText = await readFromClipboard();
    if (copiedText) {
      setUrl(copiedText);
      setError(null);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <LoadingModal
        isLoading={isLoading}
        result={result}
        onClose={handleCloseModal}
      />
      <div className={"relative w-full max-w-2xl mx-auto space-y-4"}>
        <div
          className={cn(
            "group relative flex items-center h-12 md:h-16 w-full rounded-full border bg-bg-base/80 backdrop-blur-xl transition-all duration-300 ease-in-out p-1 md:p-1.5 shadow-2xl",
            error
              ? "border-destructive/50 focus-within:border-destructive"
              : "border-accent/50 focus-within:border-accent",
          )}
        >
          <div
            className={cn(
              "absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent to-transparent opacity-80",
              error ? "via-destructive/50" : "via-accent/50",
            )}
          />

          <form
            onSubmit={handleShorten}
            className="flex items-center w-full h-full"
          >
            <div className="flex items-center flex-1 pl-4 md:pl-6 pr-2 md:pr-4 gap-3 md:gap-4 min-w-0">
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePaste}
                className="shrink-0 text-text-muted hover:text-accent transition-colors p-1 cursor-pointer"
                title="Paste from clipboard"
              >
                <ClipboardPaste
                  size={18}
                  strokeWidth={1.5}
                  className="md:w-5 md:h-5"
                />
              </motion.button>

              <input
                ref={inputRef}
                type="text"
                value={url}
                onFocus={() => setIsHeroShortened(true)}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Drop your long link here..."
                className="w-full bg-transparent text-text-base placeholder:text-text-muted/20 outline-none text-sm md:text-base font-light tracking-wide py-1 caret-accent"
              />
            </div>

            <ShortenButton
              type="submit"
              disabled={!url.trim() || isLoading}
              isLoading={isLoading}
              className="h-full px-2 md:px-4 min-w-[40px] md:min-w-[140px]"
            />
          </form>
        </div>

        <AdvancedOptions
          showAdvanced={showAdvanced}
          setShowAdvanced={setShowAdvanced}
          aliasType={aliasType}
          setAliasType={setAliasType}
          customAlias={customAlias}
          setCustomAlias={setCustomAlias}
          randomFlavor={randomFlavor}
          setRandomFlavor={setRandomFlavor}
        />

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-xs md:text-sm mt-3 ml-6 font-medium"
          >
            {error}
          </motion.p>
        )}
      </div>
    </>
  );
}
