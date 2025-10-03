"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setEmail("")

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="container px-4 md:px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Coming Soon Content */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
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

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center max-w-[600px] mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6"
              >
                Coming Soon
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
              >
                We're Working on Something{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  Amazing
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-8"
              >
                This page is under construction. We're working hard to bring you an exceptional experience. Stay tuned!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full max-w-md"
              >
                <div className="space-y-2">
                  <h2 className="text-lg font-medium">Get notified when we launch</h2>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        disabled={isSubmitting || isSubmitted}
                      />
                      {error && <p className="text-red-500 text-sm mt-1 text-left">{error}</p>}
                    </div>
                    <Button
                      type="submit"
                      className="rounded-full bg-gradient-to-r from-primary to-primary/80"
                      disabled={isSubmitting || isSubmitted}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Subscribed
                        </>
                      ) : (
                        "Notify Me"
                      )}
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground">
                    We'll notify you when this page is ready. No spam, we promise.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12"
              >
                <p className="text-muted-foreground mb-4">In the meantime, check out our other pages</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <Link href="/">Home</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <Link href="/about">About</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <Link href="/contact">Contact</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TaskPilot Labs. All rights reserved.
            </p>
            {/* <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  )
}

