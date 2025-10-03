import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins, Style_Script } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LayoutWrapper from "./layout-wrapper";
import { AuthProvider } from "@/components/providers";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { Toaster } from "@/components/ui/toast-provider";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo.ico",
    shortcut: "logo.ico",
    apple: "logo.ico",
  },
  title:
    "TaskPilot Labs | AI-Powered Project Management for Software Development",
  description:
    "Revolutionize your software development with AI-powered documentation, requirement extraction, task assignment, and predictive analytics. Start free today.",
  keywords:
    "AI project management, software development automation, AI documentation, task assignment, predictive analytics, project requirements",
  openGraph: {
    title: "TaskPilot Labs | AI-Powered Project Management",
    description:
      "Automate documentation, extract requirements, assign tasks intelligently, and get predictive analytics for your software projects.",
    url: "https://taskpilot.xyz",
    siteName: "TaskPilot Labs",
    images: [
      {
        url: "https://github.com/TaskPilot-AI/logos/blob/main/twitter.png?raw=true",
        width: 1200,
        height: 630,
        alt: "TaskPilot Labs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskPilot Labs | AI-Powered Project Management",
    description:
      "Automate documentation, extract requirements, assign tasks intelligently, and get predictive analytics for your software projects.",
    images: [
      "https://github.com/TaskPilot-AI/logos/blob/main/logo.png?raw=true",
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://taskpilot.xyz" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "TaskPilot Labs",
              applicationCategory: "ProjectManagementApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
              },
              description:
                "AI-powered project management for software development teams.",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <AuthProvider>
            <LayoutWrapper>
              <Toaster />
              {children}
              <Analytics />
            </LayoutWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
