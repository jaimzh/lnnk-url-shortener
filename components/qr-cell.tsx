"use client";

import { QrCode } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import UrlCard from "./url-card";

interface QrCellProps {
  originalUrl: string;
  shortUrl: string;
}

export function QrCell({ originalUrl, shortUrl }: QrCellProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center w-full px-4">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-text-muted hover:text-text-base flex items-center justify-center"
        title="View QR Code"
      >
        <QrCode size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <div className="relative z-10">
              <UrlCard
                result={{ originalUrl, shortUrl }}
                onClose={() => setIsOpen(false)}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
