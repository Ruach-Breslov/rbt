"use client";

import { useEffect, useRef } from "react";

type TurnstileApi = {
  render(container: HTMLElement, options: Record<string, unknown>): string;
  remove(widgetId: string): void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loader: Promise<TurnstileApi> | undefined;

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (loader) return loader;

  loader = new Promise<TurnstileApi>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile-loader="true"]');
    const script = existing ?? document.createElement("script");
    const onLoad = () => window.turnstile ? resolve(window.turnstile) : reject(new Error("TURNSTILE_UNAVAILABLE"));
    const onError = () => reject(new Error("TURNSTILE_LOAD_FAILED"));

    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });

    if (!existing) {
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.turnstileLoader = "true";
      document.head.append(script);
    }
  });

  return loader;
}

export function TurnstileWidget({ siteKey, action }: { siteKey: string; action: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!siteKey || !container.current) return;
    let active = true;
    let widgetId = "";

    void loadTurnstile().then((turnstile) => {
      if (!active || !container.current) return;
      widgetId = turnstile.render(container.current, {
        sitekey: siteKey,
        action,
        theme: "auto",
        size: "flexible",
        "response-field": true,
        "response-field-name": "cf-turnstile-response"
      });
    }).catch(() => undefined);

    return () => {
      active = false;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [action, siteKey]);

  return <div className="turnstile-shell" ref={container} />;
}
