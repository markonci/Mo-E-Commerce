// components/SplashLoader.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Splashloding() {
  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.8, ease: "linear" }}
            className="flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/8 backdrop-blur-md shadow-2xl"
          >
            <svg
              className="w-16 h-16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.9"
              />
              <path
                d="M8 12h8"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeOpacity="0.95"
              />
            </svg>
          </motion.div>

          <div className="text-center">
            <motion.h1
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            >
              Eng.mark onci
            </motion.h1>

            <motion.p
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 0.85 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-2 text-sm sm:text-base text-slate-300"
            >
              Front-End Web Developer|Front-End React |Front-End Next.js
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "3.25rem" }}
              transition={{ delay: 1.05, duration: 0.6, ease: "easeOut" }}
              className="h-0.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mx-auto mt-4 rounded"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="absolute bottom-8 right-8 text-xs text-slate-400"
        >
          @copyright mark onci
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
