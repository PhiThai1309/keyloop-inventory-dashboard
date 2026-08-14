"use client";

import { useEffect, useState } from "react";

let initPromise: Promise<void> | null = null;

export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!initPromise) {
        initPromise = (async () => {
          if (process.env.NODE_ENV === "development") {
            try {
              const { worker } = await import("@/mocks/browser");
              await worker.start({ onUnhandledRequest: "bypass" });
            } catch (error) {
              // Ignore "Operation has been aborted" errors that happen during HMR / Fast Refresh
              if (error instanceof Error && error.message.includes("Operation has been aborted")) {
                console.warn("[MSW] Service worker registration aborted during fast refresh.");
              } else {
                console.error("[MSW] Failed to start worker:", error);
              }
            }
          }
        })();
      }

      initPromise.then(() => {
        setMswReady(true);
      });
    }
  }, []);

  if (!mswReady) {
    return null; // Or a loading skeleton
  }

  return <>{children}</>;
}
