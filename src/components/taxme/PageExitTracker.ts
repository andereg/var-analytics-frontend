"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        umami?: {
            track: (eventName: string, data?: Record<string, unknown>) => void;
        };
    }
}

export default function PageExitTracker() {
    useEffect(() => {
        const trackPageExit = () => {
            if (window.umami) {
                window.umami.track("page_exit", {
                    page: window.location.pathname,
                    page_name: document.title,
                });
            }
        };

        window.addEventListener("pagehide", trackPageExit);

        return () => {
            window.removeEventListener("pagehide", trackPageExit);
        };
    }, []);

    return null;
}