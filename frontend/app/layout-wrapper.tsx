"use client";

import React from "react";
import { usePathname } from "next/navigation";
import DashboardLayout  from "@/components/dashboard-layout";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage =
    pathname === "/" ||
    pathname === "" ||
    pathname === "/features" ||
    pathname === "/integrations" ||
    pathname === "/docs" ||
    pathname === "/careers" ||
    pathname === "/contact" ||
    pathname === "/" ||
    pathname === "/coming-soon" ||
    pathname === "/about" ||
    pathname === "/status" ||
    pathname === "/blog" ||
    pathname === "/checkout" ||
    pathname === "/privacy" ||
    pathname === "/onboarding" ||
    pathname === "/subscribe" ||
    pathname === "/onboarding/success" ||
    pathname === "/terms";
  if (isLandingPage) {
    return <>{children}</>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
