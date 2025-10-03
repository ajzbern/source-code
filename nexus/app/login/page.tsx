"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { apiRequest } from "../lib/server_config";
import PasswordResetModal from "@/components/password-reset-model";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      var response = await apiRequest("/employees/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      console.log(response);
      localStorage.setItem("authToken", response.data.accessToken);
      localStorage.setItem("employeeId", response.data.employee.id);
      localStorage.setItem("employeeName", response.data.employee.name);
      localStorage.setItem("employeeEmail", response.data.employee.email);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Left side - Branding */}
      <div className="w-full md:w-2/5 bg-zinc-900 flex flex-col justify-between p-8 md:p-12">
        <div>
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-white rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-xs">TP</span>
            </div>
            <span className="text-xs tracking-widest text-zinc-400">
              TASKPILOT
            </span>
          </div>
        </div>

        <div className="my-auto py-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              nexus
            </span>
          </h1>
          <p className="mt-4 text-zinc-400 text-sm md:text-base max-w-xs">
            Where tasks converge. Simple, focused, and designed for flow.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-zinc-500">
            <span>Centralize</span>
            <span>Connect</span>
            <span>Analyze</span>
            <span>Execute</span>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-8 md:p-12 bg-zinc-950">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-xl font-medium mb-2">Sign in</h2>
            <p className="text-zinc-500 text-sm">Access your workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-400/10 rounded border border-red-400/20">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="text-xs text-zinc-400 font-normal"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-zinc-900 border-zinc-800 focus:border-indigo-500 rounded-none focus:ring-0 text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs text-zinc-400 font-normal"
                >
                  Password
                </Label>
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs text-zinc-400 hover:text-white"
                  type="button"
                  onClick={() => setIsResetModalOpen(true)}
                >
                  Forgot?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-zinc-900 border-zinc-800 focus:border-indigo-500 rounded-none focus:ring-0 text-sm"
                required
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full h-12 bg-white hover:bg-zinc-200 text-black text-sm font-medium rounded-none transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
              <div className="border-t border-zinc-800 pt-6 mt-8">
                <p className="text-xs text-zinc-500">
                  A{" "}
                  <a
                    href="#"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Taskpilot
                  </a>{" "}
                  ecosystem product
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Password Reset Modal */}
      <PasswordResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}
