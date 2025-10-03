"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Menu,
  Moon,
  Sun,
  X,
  CreditCard,
  Lock,
  ChevronRight,
  Check,
  Shield,
  Zap,
  Users,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function PricingCheckoutPage() {
  const { setTheme, theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"pricing" | "checkout">(
    "pricing"
  );
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.data) {
      localStorage.setItem("adminId", session.data.user.id as string);
      localStorage.setItem("adminEmail", session.data.user.email as string);
      localStorage.setItem("adminName", session.data.user.name as string);
    }
  }, [session]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pricingPlans = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for small teams and individual developers.",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "AI-Generated Documentation",
        "Basic Task Assignment",
        "Up to 5 team members",
        "3 projects",
        "Email support",
      ],
      popular: false,
    },
    {
      id: "pro",
      name: "Professional",
      description:
        "Ideal for growing development teams with multiple projects.",
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        "Everything in Starter",
        "Advanced Task Assignment",
        "Intelligent Requirement Gathering",
        "Up to 15 team members",
        "10 projects",
        "Priority support",
        "GitHub & Jira Integration",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations with complex development needs.",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "Unlimited projects",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone & email support",
        "Advanced analytics & reporting",
        "Custom AI training",
      ],
      popular: false,
    },
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setCheckoutStep("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToPricing = () => {
    setCheckoutStep("pricing");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${
          isScrolled ? "bg-background/95 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <motion.div
                className="text-xl md:text-2xl font-bold tracking-tight flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  className="text-primary mr-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  Task
                </motion.span>
                Pilot Labs
              </motion.div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <div className="hidden md:flex items-center gap-2">
              {session.status === "authenticated" ? (
                <Button
                  className="rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-md hover:shadow-lg transition-all"
                  onClick={() => router.push("/dashboard")}
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  className="rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-md hover:shadow-lg transition-all"
                  onClick={() => signIn("google")}
                >
                  Sign In
                </Button>
              )}
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold tracking-tight">
                        <span className="text-primary">Task</span>Pilot
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-full"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <nav className="flex flex-col gap-4">
                    <Link
                      href="/#features"
                      className="text-sm font-medium hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Features
                    </Link>
                    <Link
                      href="/#how-it-works"
                      className="text-sm font-medium hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      How It Works
                    </Link>
                    <Link
                      href="/#about"
                      className="text-sm font-medium hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link
                      href="/pricing"
                      className="text-sm font-medium text-primary transition-colors px-2 py-1 rounded-lg hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pricing
                    </Link>
                    <Link
                      href="/#faq"
                      className="text-sm font-medium hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      FAQ
                    </Link>
                  </nav>

                  <div className="flex flex-col gap-2 mt-4">
                    {session.status === "authenticated" ? (
                      <Button
                        className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80"
                        onClick={() => {
                          router.push("/dashboard");
                          setMobileMenuOpen(false);
                        }}
                      >
                        Dashboard
                      </Button>
                    ) : (
                      <Button
                        className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80"
                        onClick={() => signIn("google")}
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="flex-1">
        <AnimatePresence mode="wait">
          {checkoutStep === "pricing" ? (
            <PricingSection
              isYearly={isYearly}
              setIsYearly={setIsYearly}
              pricingPlans={pricingPlans}
              handlePlanSelect={handlePlanSelect}
            />
          ) : (
            <CheckoutSection
              selectedPlan={pricingPlans.find(
                (plan) => plan.id === selectedPlan
              )}
              isYearly={isYearly}
              handleBackToPricing={handleBackToPricing}
            />
          )}
        </AnimatePresence>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 bg-muted/50">
        <div className="container">
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Taskpilot Labs. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/coming-soon"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/coming-soon"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/coming-soon"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PricingSection({
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
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        <span className="text-muted-foreground text-base font-normal">
                          {isYearly ? "/year" : "/month"}
                        </span>
                      </p>
                      {isYearly && (
                        <p className="text-sm text-primary mt-1">
                          ${Math.round(plan.yearlyPrice / 12)} per month, billed
                          annually
                        </p>
                      )}
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature: any, i: React.Key | null | undefined) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
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

      {/* Enterprise Section */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-[1000px] mx-auto bg-background rounded-xl p-8 md:p-12 shadow-lg border border-border/50">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  Enterprise
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Need a custom solution?
                </h2>
                <p className="text-muted-foreground mb-6">
                  We offer tailored plans for large organizations with specific
                  requirements. Get in touch with our sales team to discuss your
                  needs.
                </p>
                <Button className="rounded-full" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
              <div className="bg-muted/50 p-6 rounded-xl">
                <h3 className="text-xl font-medium mb-4">
                  Enterprise features include:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span>Advanced security & compliance</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span>Unlimited users & projects</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span>Custom AI model training</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="text-center max-w-[800px] mx-auto mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              FAQ
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="max-w-[800px] mx-auto">
            <div className="grid gap-4">
              {[
                {
                  question: "Can I switch plans later?",
                  answer:
                    "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
                },
                {
                  question: "Is there a free trial?",
                  answer:
                    "We offer a 14-day free trial on all plans. No credit card required to start.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
                },
                {
                  question: "Can I cancel my subscription?",
                  answer:
                    "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.",
                },
                {
                  question:
                    "Do you offer discounts for startups or non-profits?",
                  answer:
                    "Yes, we offer special pricing for eligible startups, non-profits, and educational institutions. Please contact our sales team for more information.",
                },
              ].map((faq, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader className="py-4">
                    <CardTitle className="text-lg font-medium">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />

        <div className="container relative">
          <div className="max-w-[800px] mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Transform Your Development Process?
            </motion.h2>
            <motion.p
              className="text-xl opacity-90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join thousands of teams using Taskpilot Labs to automate workflows
              and build software faster.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                size="lg"
                variant="secondary"
                className="text-lg"
                onClick={() =>
                  document
                    .getElementById("pricing-cards")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Choose Your Plan
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function CheckoutSection({
  selectedPlan,
  isYearly,
  handleBackToPricing,
}: {
  selectedPlan: any;
  isYearly: boolean;
  handleBackToPricing: () => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);

      // Redirect to dashboard after successful payment
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }, 2000);
  };

  if (!selectedPlan) {
    return (
      <div className="container py-20 text-center">
        <p>No plan selected. Please choose a plan first.</p>
        <Button onClick={handleBackToPricing} className="mt-4">
          Back to Pricing
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      key="checkout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="container py-12 md:py-20"
    >
      {isComplete ? (
        <div className="max-w-[600px] mx-auto text-center py-12">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. You now have access to the{" "}
            {selectedPlan.name} plan.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-gradient-to-r from-primary to-primary/80"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-5 gap-8 max-w-[1200px] mx-auto">
          <div className="md:col-span-3">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6"
              onClick={handleBackToPricing}
            >
              <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
              Back to pricing
            </Button>

            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Account Information
                </h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" placeholder="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name (Optional)</Label>
                        <Input id="company" placeholder="Acme Inc." />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <Card>
                  <CardContent className="pt-6">
                    <Tabs
                      defaultValue="credit-card"
                      onValueChange={setPaymentMethod}
                    >
                      <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger value="credit-card">
                          Credit Card
                        </TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      </TabsList>

                      <TabsContent value="credit-card" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name-on-card">Name on Card</Label>
                          <Input id="name-on-card" placeholder="John Doe" />
                        </div>
                      </TabsContent>

                      <TabsContent value="paypal" className="py-4 text-center">
                        <p className="mb-4 text-muted-foreground">
                          You will be redirected to PayPal to complete your
                          purchase securely.
                        </p>
                        <Button className="w-full">Continue with PayPal</Button>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" placeholder="United States" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" placeholder="123 Main St" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="San Francisco" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" placeholder="CA" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" placeholder="94103" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button
                className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-md hover:shadow-lg"
                size="lg"
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  <>Complete Purchase</>
                )}
              </Button>

              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Lock className="h-4 w-4 mr-2" />
                Secure checkout powered by Stripe
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          {selectedPlan.name} Plan
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {isYearly ? "Annual billing" : "Monthly billing"}
                        </p>
                      </div>
                      <p className="font-medium">
                        $
                        {isYearly
                          ? selectedPlan.yearlyPrice
                          : selectedPlan.monthlyPrice}
                      </p>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <p className="font-medium">Subtotal</p>
                      <p className="font-medium">
                        $
                        {isYearly
                          ? selectedPlan.yearlyPrice
                          : selectedPlan.monthlyPrice}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <p>Tax</p>
                      <p>$0.00</p>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center text-lg font-bold">
                      <p>Total</p>
                      <p>
                        $
                        {isYearly
                          ? selectedPlan.yearlyPrice
                          : selectedPlan.monthlyPrice}
                      </p>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">What's included:</h4>
                      <ul className="space-y-2">
                        {selectedPlan.features
                          .slice(0, 5)
                          .map((feature: string, i: number) => (
                            <li key={i} className="flex items-start text-sm">
                              <Check className="h-4 w-4 text-primary shrink-0 mr-2 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        {selectedPlan.features.length > 5 && (
                          <li className="text-sm text-primary">
                            +{selectedPlan.features.length - 5} more features
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 mr-2" />
                      30-day money-back guarantee
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Secure payment
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-10 bg-muted rounded"></div>
                    <div className="h-6 w-10 bg-muted rounded"></div>
                    <div className="h-6 w-10 bg-muted rounded"></div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  By completing your purchase, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-primary underline underline-offset-2"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
