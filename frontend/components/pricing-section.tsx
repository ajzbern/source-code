"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export function PricingSection({
  isYearly,
  setIsYearly,
  pricingPlans,
  handlePlanSelect,
}: {
  isYearly: boolean;
  setIsYearly: (value: boolean) => void;
  pricingPlans: any[];
  handlePlanSelect: (planId: string) => void;
}) {
  return (
    <motion.div
      key="pricing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Pricing Hero */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-background via-background to-muted/30">
        <div className="absolute inset-0 bg-grid-small-pattern opacity-[0.03] dark:opacity-[0.05]"></div>

        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />

        <div className="container relative">
          <div className="max-w-[800px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6"
            >
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              <span>Choose Your Plan</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight"
            >
              Simple, Transparent{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Pricing
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-[800px] mx-auto mb-12"
            >
              Choose the perfect plan for your team's development needs
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mb-12"
            >
              <div className="bg-muted/50 p-1 rounded-full flex items-center">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    !isYearly
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isYearly
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Yearly <span className="text-xs text-primary">Save 20%</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <Badge className="bg-primary text-primary-foreground border-none">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full overflow-hidden ${
                    plan.popular
                      ? "border-primary shadow-lg"
                      : "border-border shadow-md"
                  }`}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="mb-6">
                      <p className="text-4xl font-bold">
                        ₹{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        <span className="text-muted-foreground text-base font-normal">
                          {isYearly ? "/year" : "/month"}
                        </span>
                      </p>
                      {isYearly && (
                        <p className="text-sm text-primary mt-1">
                          ₹{Math.round(plan.yearlyPrice / 12)} per month, billed
                          annually
                        </p>
                      )}
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map(
                        (feature: any, i: React.Key | null | undefined) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full rounded-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-primary/80 shadow-md hover:shadow-lg"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      Choose {plan.name}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
