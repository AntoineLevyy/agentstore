"use client";

import { useEffect, useRef } from "react";

const BEEHIIV_FORM_ID = "cded69ed-3928-4911-aa13-d0d9da66bd96";

export function NewsletterSignup({ minimal = false }: { minimal?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || !containerRef.current) return;
    loaded.current = true;

    const script = document.createElement("script");
    script.src = "https://subscribe-forms.beehiiv.com/v3/loader.js";
    script.async = true;
    script.dataset.beehiivForm = BEEHIIV_FORM_ID;
    containerRef.current.appendChild(script);
  }, []);

  return <div ref={containerRef} />;
}
