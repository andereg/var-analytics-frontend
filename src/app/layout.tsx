import type {Metadata} from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import React from "react";
import Script from "next/script";


const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Steuererklärung Kanton Alpengrün",
    description: "Your interactive helper for your thesis"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body
            className={`${inter.className} antialiased light min-h-screen overflow-x-hidden`}
        >
            <main className="min-h-screen">
                {children}
            </main>
            {/* Umami Analytics — privacy-first, no cookies, no IDs */}
            <Script
                src="https://analytics.lucasreitmann.me/script.js"
                data-website-id="0824d89a-a427-47fd-8a84-cc3f26b4e80c"
                strategy="afterInteractive"
            />
            {/* Page Load Time — sends a custom Umami event with performance.timing data */}
            <Script id="page-load-time" strategy="afterInteractive">
                {`
                  window.addEventListener("load", function () {
                    var tries = 0;
                    var iv = setInterval(function () {
                      if (window.umami && window.performance) {
                        clearInterval(iv);
                        var t = performance.timing;
                        umami.track("page_load_time", {
                          path: location.pathname,
                          ms: t.loadEventEnd - t.navigationStart,
                        });
                      } else if (++tries > 20) {
                        clearInterval(iv);
                      }
                    }, 100);
                  });
                `}
            </Script>
        </body>
        </html>
    );
}
