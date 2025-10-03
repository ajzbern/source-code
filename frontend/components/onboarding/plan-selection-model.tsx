"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { PricingPlans } from "@/app/lib/pricing-plans";

interface PlanSelectionPageProps {
  onPlanSelect: (planId: string) => void;
  isProcessing: boolean;
  selectedPlan: string | null;
  isYearly: boolean;
  onToggleYearly?: (value: boolean) => void; // Added prop to handle yearly toggle
}

export default function PlanSelectionPage({
  onPlanSelect,
  isProcessing,
  selectedPlan,
  isYearly,
  onToggleYearly,
}: PlanSelectionPageProps) {
  // Use the isYearly prop value, but also maintain local state if needed
  const [yearlyBilling, setYearlyBilling] = useState(isYearly);

  // Update local state when prop changes
  useEffect(() => {
    setYearlyBilling(isYearly);
  }, [isYearly]);

  // Handle toggle change
  const handleToggleChange = (value: boolean) => {
    setYearlyBilling(value);
    // If parent provided a callback, use it
    if (onToggleYearly) {
      onToggleYearly(value);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      
      <div className="flex min-h-screen flex-col items-center justify-start p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Choose Your Plan
            </h1>
            <p className="text-muted-foreground text-lg">
              Select the plan that best fits your team's needs to continue
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2 py-6">
            <Label
              htmlFor="page-pricing-toggle"
              className="text-sm font-medium"
            >
              Monthly
            </Label>
            <Switch
              id="page-pricing-toggle"
              checked={yearlyBilling}
              onCheckedChange={handleToggleChange}
            />
            <Label
              htmlFor="page-pricing-toggle"
              className="text-sm font-medium"
            >
              Yearly{" "}
              <Badge
                variant="outline"
                className="ml-1.5 bg-primary/10 text-primary"
              >
                Save 20%
              </Badge>
            </Label>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-4">
            {PricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </div>
                )}

                <Card
                  className={`h-full overflow-hidden transition-all ${
                    plan.popular
                      ? "border-primary shadow-lg"
                      : "border-border shadow-md"
                  } ${selectedPlan === plan.id ? "ring-2 ring-primary" : ""}`}
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">
                        ₹{yearlyBilling ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground">
                        {yearlyBilling ? "/year" : "/month"}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      className="w-full"
                      onClick={() => onPlanSelect(plan.id)}
                      disabled={isProcessing}
                    >
                      {isProcessing && plan.id === selectedPlan ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Processing...
                        </span>
                      ) : (
                        "Select Plan"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center text-muted-foreground mt-8 mb-4">
            <p>You must select a plan to continue using our service</p>
          </div>
        </div>
      </div>
    </div>
  );
}
