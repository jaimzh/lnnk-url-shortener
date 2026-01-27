"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import LoadingSpinner from "./LoadingSpinner";
import UrlCard from "./url-card";

interface LoadingModalProps {
  isLoading: boolean;
  result: {
    originalUrl: string;
    shortUrl: string;
  } | null;
  onClose: () => void;
}

export default function LoadingModal({
  isLoading,
  result,
  onClose,
}: LoadingModalProps) {
  const showModal = isLoading || !!result;

  return (
    <AnimatePresence>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-base/80 backdrop-blur-md"
          />

          {/* Modal content (sibling, not clickable backdrop) */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            className="relative z-10 w-full max-w-md"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingSpinner key="loading" />
              ) : result ? (
                <UrlCard key="success" result={result} onClose={onClose} />
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
