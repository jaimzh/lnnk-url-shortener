"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, ExternalLink, Sparkles, X } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

interface SuccessCardProps {
  result: {
    originalUrl: string;
    shortUrl: string;
  };
  onClose: () => void;
}

export default function SuccessCard({ result, onClose }: SuccessCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (result?.shortUrl) {
      try {
        await navigator.clipboard.writeText(result.shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <motion.div
        key="success-card"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full"
      >
        {/* Glassmorphism Background with Layered Shadows */}
        <div className="absolute inset-0 bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-0" />

        {/* Dynamic Glow Effects */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse z-0 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] animate-pulse z-0 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content Container */}
        <div className="relative z-10 p-8 flex flex-col items-center">
          {/* Top Decorative Bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 rounded-full" />

          {/* Icon Header */}
          <div className="relative mb-8 mt-2">
            <motion.div
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-xl shadow-indigo-500/20"
            >
              <Check size={38} className="text-white" strokeWidth={3} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-3 -right-3 text-amber-400"
            >
              <Sparkles size={24} fill="currentColor" />
            </motion.div>
          </div>

          {/* Text Section */}
          <div className="text-center space-y-2 mb-8 w-full">
            <h2 className="text-3xl font-black text-white tracking-tight">
              Link Ready!
            </h2>
            <p className="text-zinc-500 text-xs font-medium truncate w-full px-4 opacity-80">
              {result.originalUrl}
            </p>
          </div>

          {/* QR Code Presentation */}
          <motion.div
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="relative p-1 mb-10 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] shadow-2xl"
          >
            <div className="bg-white p-4 rounded-[1.8rem] shadow-inner">
              <QRCodeCanvas
                value={result.shortUrl}
                size={150}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
                marginSize={0}
              />
            </div>
          </motion.div>

          {/* URL Display Area */}
          <div
            onClick={handleCopy}
            className="w-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-2xl p-4 mb-4 flex items-center justify-between transition-all cursor-pointer group"
          >
            <div className="flex flex-col overflow-hidden mr-3">
              <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-1">
                Access Link
              </span>
              <span className="text-indigo-400 font-bold truncate text-base">
                {result.shortUrl.replace(/^https?:\/\//, "")}
              </span>
            </div>
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform flex-shrink-0">
              <Copy size={18} />
            </div>
          </div>

          {/* Primary Actions */}
          <div className="flex w-full gap-3">
            <button
              onClick={handleCopy}
              className={`flex-[2] relative h-14 rounded-2xl font-bold transition-all active:scale-95 overflow-hidden ${
                copied
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                  : "bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={copied ? "copied" : "copy"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2 w-full h-full"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                  <span>{copied ? "Copied" : "Copy Link"}</span>
                </motion.div>
              </AnimatePresence>
            </button>

            <a
              href={result.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 min-w-[60px] bg-zinc-900 border border-white/10 hover:border-white/20 text-white rounded-2xl flex items-center justify-center transition-all hover:bg-zinc-800"
            >
              <ExternalLink size={22} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
