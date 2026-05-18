"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const formUrl = process.env.NEXT_PUBLIC_BEEHIIV_FORM_URL;

  if (submitted) {
    return (
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-6 py-4">
        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
        <p className="text-[15px] text-green-800 font-medium">
          You&apos;re in. Check your inbox for a confirmation.
        </p>
      </div>
    );
  }

  if (!formUrl) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-3 mb-3">
          <Mail className="w-5 h-5 text-indigo-500" />
          <p className="text-[15px] font-semibold text-gray-900">Newsletter coming soon</p>
        </div>
        <p className="text-[14px] text-gray-500">
          We&apos;re setting up the newsletter. Check back shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formUrl}
      method="POST"
      onSubmit={() => setSubmitted(true)}
      className="flex flex-col sm:flex-row gap-3"
    >
      <input
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 h-[52px] px-5 rounded-2xl border border-gray-200 bg-white text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all"
      />
      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2.5 h-[52px] px-8 bg-gray-900 text-white font-semibold text-[15px] rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-xl shadow-gray-900/10"
      >
        Subscribe <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </form>
  );
}
