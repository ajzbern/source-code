"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="relative">
      {/* Progress bar background */}
      <div className="absolute top-5 left-0 right-0 h-1 bg-muted" />

      {/* Active progress bar */}
      <motion.div
        className="absolute top-5 left-0 h-1 bg-slate-800 dark:bg-slate-700"
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step} className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                  scale: isActive ? 1 : 0.8,
                  opacity: isActive ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 z-10 transition-all",
                  isActive
                    ? "border-black bg-slate-800 hover:bg-slate-700 text-white dark:bg-slate-700 dark:hover:bg-slate-600"
                    : "border-muted-foreground/30 bg-background text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </motion.div>
              <motion.span
                initial={{ opacity: 0.5 }}
                animate={{
                  opacity: isActive ? 1 : 0.5,
                  fontWeight: isCurrent ? 600 : 400,
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "mt-2 text-xs text-center max-w-[80px] transition-all",
                  "text-black dark:text-slate-400"
                )}
              >
                {step}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
