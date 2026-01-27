"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import LoadingSpinner from "./LoadingSpinner";
import SuccessCard from "./url-card";
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-base/80 backdrop-blur-md p-4"
        >
          <div className="relative w-full max-w-md">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingSpinner key="loading" />
              ) : result ? (

                
                <UrlCard key="success" result={result} onClose={onClose} />
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
