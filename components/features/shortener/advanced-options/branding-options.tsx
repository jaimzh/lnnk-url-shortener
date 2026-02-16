import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Type,
  AlignLeft,
  Image as ImageIcon,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandingOptionsProps {
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  imageUrl: string;
  setImageUrl: (val: string) => void;
}

export const BrandingOptions = ({
  title,
  setTitle,
  description,
  setDescription,
  imageUrl,
  setImageUrl,
}: BrandingOptionsProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-x-0 -bottom-2 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center gap-3 bg-bg-base/40 rounded-2xl border border-white/5 p-3 focus-within:border-accent/30 transition-all">
            <div className="w-8 h-8 rounded-xl bg-accent/5 flex items-center justify-center shrink-0">
              <Type size={14} className="text-accent/60" />
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Social Preview Title"
              className="bg-transparent outline-none w-full text-text-base text-sm placeholder:text-text-muted/20"
            />
          </div>
        </div>

        <div className="relative group">
          <div className="flex items-start gap-3 bg-bg-base/40 rounded-2xl border border-white/5 p-3 focus-within:border-accent/30 transition-all">
            <div className="w-8 h-8 rounded-xl bg-accent/5 flex items-center justify-center shrink-0 mt-0.5">
              <AlignLeft size={14} className="text-accent/60" />
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description that grabs attention..."
              rows={2}
              className="bg-transparent outline-none w-full text-text-base text-sm placeholder:text-text-muted/20 resize-none py-1"
            />
          </div>
        </div>

        <div className="relative group">
          <div className="flex items-center gap-3 bg-bg-base/40 rounded-2xl border border-white/5 p-3 focus-within:border-accent/30 transition-all">
            <div className="w-8 h-8 rounded-xl bg-accent/5 flex items-center justify-center shrink-0">
              <ImageIcon size={14} className="text-accent/60" />
            </div>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.png"
              className="bg-transparent outline-none w-full text-text-base text-xs font-mono placeholder:text-text-muted/20"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted/40 flex items-center gap-2">
            <Sparkles size={10} className="text-accent" />
            Live Preview
          </span>
          <span className="text-[10px] text-text-muted/20 font-mono">
            SOCIAL RENDERING
          </span>
        </div>

        <div className="relative group/card overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-bg-base to-bg-base/80 h-[220px] transition-all hover:border-accent/20">
          {imageUrl ? (
            <div className="h-2/3 w-full relative overflow-hidden bg-white/5">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-cover opacity-80 group-hover/card:scale-105 transition-transform duration-1000"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          ) : (
            <div className="h-2/3 w-full bg-white/[0.02] flex items-center justify-center border-b border-white/5">
              <ImageIcon size={32} className="text-white/5" />
            </div>
          )}

          <div className="p-4 space-y-1">
            <h4
              className={cn(
                "text-sm font-bold truncate transition-colors",
                title ? "text-text-base" : "text-text-muted/40 italic",
              )}
            >
              {title || "Link preview title goes here..."}
            </h4>
            <p
              className={cn(
                "text-xs line-clamp-2 leading-relaxed h-8 transition-colors",
                description
                  ? "text-text-muted/70"
                  : "text-text-muted/20 italic",
              )}
            >
              {description ||
                "The description of the shared link will appear here. Keep it snappy and engaging."}
            </p>
          </div>

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-accent/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
        </div>
      </div>
    </div>
  );
};
