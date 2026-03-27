import type {Metadata} from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import Banner from "@/components/meta/Banner";
import React from "react";
import { TORProvider } from "@/context/TORContext";
import { TopicProvider } from "@/context/TopicContext";
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
        <Script id="matomo-init" strategy="beforeInteractive">
            {`
            var _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u='//46.225.49.241:8082/';
              _paq.push(['setTrackerUrl', u + 'matomo.php']);
              _paq.push(['setSiteId', '3']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true;
              g.src=u + 'matomo.js';
              s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
        <TopicProvider>
            <TORProvider>
                <Banner/>
                <main className="min-h-screen">
                    {children}
                </main>
            </TORProvider>
        </TopicProvider>
        </body>
        </html>
    );
}
