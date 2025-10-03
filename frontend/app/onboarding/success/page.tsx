"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { PricingPlans } from "@/app/lib/pricing-plans";

// Define types for PricingPlan (adjust based on your PricingPlans structure)
interface PricingPlan {
  id: string;
  name: string;
  // Add other properties as needed
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);

  const reference = searchParams.get("reference");
  const planId = searchParams.get("plan");

  const plan = planId
    ? (PricingPlans.find((p) => p.id === planId) as PricingPlan | undefined)
    : null;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md w-full shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>
              Thank you for subscribing to TaskPilot Labs
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Payment Reference</p>
              <p className="font-medium">{reference || "N/A"}</p>
            </div>

            {plan && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="font-medium">{plan.name}</p>
              </div>
            )}

            <div className="bg-muted p-4 rounded-lg mt-6">
              <p className="text-sm">
                You will be redirected to your dashboard in {countdown}{" "}
                seconds...
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full gap-2"
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
