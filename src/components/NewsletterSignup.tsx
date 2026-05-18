"use client";

import { useEffect, useRef } from "react";
import { Mail } from "lucide-react";

const BEEHIIV_FORM_ID = "cded69ed-3928-4911-aa13-d0d9da66bd96";

export function NewsletterSignup() {
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

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
          <Mail className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <p className="text-[15px] font-bold text-gray-900">Agentstore Weekly</p>
          <p className="text-[13px] text-gray-400">Free, every week. Unsubscribe anytime.</p>
        </div>
      </div>
      <div ref={containerRef} />
    </div>
  );
}
