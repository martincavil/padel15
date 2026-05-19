"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Helper to fire GA4 events
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Hooks for specific conversions
export function useTrackReservationClick() {
  return () => trackEvent("reservation_click", { event_category: "engagement" });
}

export function useTrackCoachingFormSubmit() {
  return () => trackEvent("coaching_form_submit", { event_category: "lead" });
}

export function useTrackB2BFormSubmit() {
  return () => trackEvent("b2b_form_submit", { event_category: "lead" });
}

export function useTrackNewsletterSignup() {
  return () => trackEvent("newsletter_signup", { event_category: "engagement" });
}

// Component that handles outbound link tracking
export function TrackedLink({
  href,
  children,
  eventName,
  className,
  target,
  rel,
  "aria-label": ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  eventName: string;
  className?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}) {
  const handleClick = () => trackEvent(eventName, { link_url: href });
  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

export default function Tracking() {
  useEffect(() => {
    // Meta Pixel — loads only if user consented (RGPD)
    // TODO: Replace XXXXXXXXXXXXXXXXX with your actual Meta Pixel ID
    const pixelId = "XXXXXXXXXXXXXXXXX";
    const consent = localStorage.getItem("cookie-consent");

    if (consent === "accepted" && pixelId !== "XXXXXXXXXXXXXXXXX") {
      const script = document.createElement("script");
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
