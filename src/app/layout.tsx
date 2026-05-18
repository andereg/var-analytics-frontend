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
            {/* Article Engaged — goal signal for CEI / CPI / DTI / STI / SPI / DPI.
                Fires once per page load when user stayed >=60s AND scrolled to the bottom.
                Restricted to /start/* topic pages to avoid false positives on taxform funnel pages. */}
            <Script id="article-engaged" strategy="afterInteractive">
                {`
                  (function () {
                    // Nur auf Themen-Seiten /start/* feuern (Topics, News, etc.),
                    // NICHT auf Steuerformular-Schritten oder der Startseite.
                    if (!location.pathname.startsWith("/start/")) return;

                    var reachedBottom = false;
                    var stayedOneMinute = false;
                    var eventSent = false;

                    setTimeout(function () {
                      stayedOneMinute = true;
                      maybeTrackArticleEngaged();
                    }, 60000);

                    window.addEventListener("scroll", function () {
                      var scrollBottom = window.scrollY + window.innerHeight;
                      var pageHeight = document.documentElement.scrollHeight;
                      if (scrollBottom >= pageHeight - 10) {
                        reachedBottom = true;
                        maybeTrackArticleEngaged();
                      }
                    });

                    function maybeTrackArticleEngaged() {
                      if (eventSent || !reachedBottom || !stayedOneMinute) return;
                      if (!window.umami) return;
                      eventSent = true;
                      umami.track("article_engaged", {
                        action: "read_full_article",
                        time_on_page_seconds: 60,
                        path: location.pathname,
                      });
                    }
                  })();
                `}
            </Script>
            {/* link_click — fires for every <a> click (internal + external).
                Anonymous, DSG-compliant. Supports cross-portal journey analysis. */}
            <Script id="link-click" strategy="afterInteractive">
                {`
                  document.addEventListener("click", function (e) {
                    var link = e.target.closest("a");
                    if (!link || !link.href) return;
                    try {
                      var url = new URL(link.href, location.href);
                      if (!window.umami) return;
                      var isInternal = url.hostname === location.hostname;
                      umami.track("link_click", {
                        target: link.href,
                        target_host: url.hostname,
                        from_path: location.pathname,
                        type: isInternal ? "internal" : "external",
                      });
                    } catch (_) {
                      /* ignore malformed URLs (mailto:, tel:, etc.) */
                    }
                  }, true);
                `}
            </Script>
        </body>
        </html>
    );
}
