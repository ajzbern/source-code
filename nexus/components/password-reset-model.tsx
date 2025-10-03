"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";
import { apiRequest } from "@/app/lib/server_config";


interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PasswordResetModal({
  isOpen,
  onClose,
}: PasswordResetModalProps) {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await apiRequest("/employees/reset-password", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });

      setSuccess(true);
      // Reset form
      setEmail("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Close modal after 3 seconds on success
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError("Failed to reset password. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-md p-6 relative animate-in fade-in slide-in-from-bottom-10 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-medium mb-2">Reset Password</h2>
          <p className="text-zinc-500 text-sm">
            Enter your details to reset your password
          </p>
        </div>

        {success ? (
          <div className="p-4 mb-6 text-sm bg-green-500/10 border border-green-500/20 text-green-400 rounded">
            Password reset successfully! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-400/10 rounded border border-red-400/20">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <Label
                htmlFor="reset-email"
                className="text-xs text-zinc-400 font-normal"
              >
                Email
              </Label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="h-12 bg-zinc-900 border-zinc-800 focus:border-indigo-500 rounded-none focus:ring-0 text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="old-password"
                className="text-xs text-zinc-400 font-normal"
              >
                Current Password
              </Label>
              <Input
                id="old-password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="h-12 bg-zinc-900 border-zinc-800 focus:border-indigo-500 rounded-none focus:ring-0 text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="new-password"
                className="text-xs text-zinc-400 font-normal"
              >
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-12 bg-zinc-900 border-zinc-800 focus:border-indigo-500 rounded-none focus:ring-0 text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="confirm-password"
                className="text-xs text-zinc-400 font-normal"
              >
                Confirm New Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 bg-zinc-900 border-zinc-800 focus:border-indigo-500 rounded-none focus:ring-0 text-sm"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white text-sm font-medium rounded-none transition-opacity mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
