import { Suspense } from "react";
import PaymentSuccessPage from "./success/page";
import { SettingsForm } from "../settings/settings-form";

// Define the expected shape of searchParams
interface SearchParams {
  success?: string;
}

// Props for the Server Component
interface OnboardingPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function OnboardingPage({
  searchParams,
}: OnboardingPageProps) {
  // Resolve the searchParams Promise
  const resolvedSearchParams = await searchParams;
  const isPaymentSuccess = resolvedSearchParams.success === "true";

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }
    >
      {isPaymentSuccess ? <PaymentSuccessPage /> : <SettingsForm />}
    </Suspense>
  );
}
