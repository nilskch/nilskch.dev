"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

export default function CookieBanner() {
  // Add a new state to track hydration
  const [isHydrated, setIsHydrated] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Mark component as hydrated
    setIsHydrated(true);
    
    // Check if user has already made a choice
    const storedConsent = localStorage.getItem("cookie-consent");
    if (storedConsent !== null) {
      setCookieConsent(storedConsent === "true");
    }
  }, []);
  
  useEffect(() => {
    // If user has made a choice, update PostHog tracking accordingly
    if (cookieConsent === true) {
      posthog.opt_in_capturing();
    } else if (cookieConsent === false) {
      posthog.opt_out_capturing();
    }
    
    // Only store preference if user has made a choice
    if (cookieConsent !== null) {
      localStorage.setItem("cookie-consent", cookieConsent.toString());
    }
  }, [cookieConsent]);
  
  const handleAccept = () => {
    setCookieConsent(true);
  };
  
  const handleDecline = () => {
    setCookieConsent(false);
  };
  
  // Only show banner after hydration and if user hasn't made a choice
  if (!isHydrated || cookieConsent !== null) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <p>
            This website uses cookies to enhance your browsing experience and analyze site traffic.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="px-3 py-1 text-xs rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-3 py-1 text-xs rounded-md bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}