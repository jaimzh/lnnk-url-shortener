"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link2, ArrowRight, ClipboardPaste } from "lucide-react";

type UrlInputProps = {
  onShorten?: (url: string) => void | Promise<void>;
  className?: string;
};

export default function UrlInput({ onShorten, className = "" }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleShorten = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;

    if (onShorten) await onShorten(trimmed);
    else console.log("Shortening:", trimmed);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: trimmed }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to shorten URL");
      }

      const data = await response.json();
      console.log("Success:", data);
      setUrl("");
    } catch (error) {
      console.error("Failed to shorten URL:", error);
      // TODO: Show error message to user
    }
  };

  const handlePaste = async () => {
    const copiedText = await navigator.clipboard.readText();
    try {
      if (copiedText) {
        setUrl(copiedText);
        inputRef.current?.focus();
      }
    } catch (error) {
      console.error("Failed to read clipboard:", error);
    }
  };

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      <div className="group relative flex items-center h-12 md:h-16 w-full rounded-full border border-border/20 bg-bg-light/10 backdrop-blur-sm transition-all duration-300 ease-in-out focus-within:border-accent/40 focus-within:bg-bg-light/20 p-1 md:p-1.5">
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
              required
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Drop your long link here..."
              className="w-full bg-transparent text-text-base placeholder:text-text-muted/20 outline-none text-sm md:text-base font-light tracking-wide py-1 caret-accent"
            />
          </div>

          <button
            type="submit"
            disabled={!url.trim()}
            className="h-full px-2 md:px-4 bg-accent hover:brightness-110 active:scale-95 text-text-base  rounded-full transition-all flex items-center justify-center min-w-[40px] md:min-w-[140px] gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="hidden md:block text-sm uppercase">Shorten</span>
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </form>
      </div>
    </div>
  );
}
