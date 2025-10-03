"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { toast } from "@/components/ui/use-toast";
import { PricingPlans } from "@/app/lib/pricing-plans";
import { signIn, useSession } from "next-auth/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  selectedPlan: string | null;
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  selectedPlan,
}: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const session = useSession();
  const [checkInterval, setCheckInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const selectedPlanDetails = selectedPlan
    ? PricingPlans.find((plan) => plan.id === selectedPlan)
    : null;

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, [checkInterval]);

  // Handle Google sign-in popup
  const handleGoogleSignIn = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      if (session.status === "unauthenticated") {
        signIn("google", {
          redirect: false,
          callbackUrl: "/",
        });
        onSuccess();
        onClose();
      } else {
        toast({
          title: "Already signed in",
          description: "You are already signed in.",
          variant: "default",
        });
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isLoading) {
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {selectedPlan
              ? "One step away from your plan"
              : "Welcome to TaskPilot Labs"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {selectedPlan
              ? `Sign in with Google to continue with the ${selectedPlanDetails?.name} plan.`
              : "Sign in with Google to get started."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-4">
          <Button
            className="w-full flex items-center gap-2 h-12 bg-white text-black hover:bg-gray-100 border shadow-sm"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <FcGoogle className="h-5 w-5" />
            {isLoading ? "Signing in..." : "Continue with Google"}
          </Button>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          {isLoading && (
            <div className="text-center text-sm text-muted-foreground">
              <p>Complete the sign-in process in the popup window.</p>
              <p className="mt-1">
                If you don't see it, check if it was blocked by your browser.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
