"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { categories } from "@/lib/data";
import { Send, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SubmitPage() {
  const [form, setForm] = useState({
    app_name: "",
    app_url: "",
    category: "",
    description: "",
    pricing: "",
    submitter_name: "",
    submitter_email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.app_name.trim() || !form.app_url.trim() || !form.category || !form.description.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    const { error: dbError } = await supabase.from("submissions").insert({
      app_name: form.app_name.trim(),
      app_url: form.app_url.trim(),
      category: form.category,
      description: form.description.trim(),
      pricing: form.pricing.trim() || null,
      submitter_name: form.submitter_name.trim() || null,
      submitter_email: form.submitter_email.trim() || null,
    });

    if (dbError) {
      setError("Something went wrong. Please try again.");
    } else {
      setSuccess(true);
    }
    setSubmitting(false);
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-5 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="text-[24px] font-bold text-gray-900 mb-2">App submitted!</h1>
        <p className="text-[15px] text-gray-600 mb-6">
          We&apos;ll review your submission and add it to the directory if it meets our criteria
          for consumer AI apps.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="h-10 px-5 inline-flex items-center font-medium text-[14px] text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Back home
          </Link>
          <button
            onClick={() => { setSuccess(false); setForm({ app_name: "", app_url: "", category: "", description: "", pricing: "", submitter_name: "", submitter_email: "" }); }}
            className="h-10 px-5 inline-flex items-center font-medium text-[14px] text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <div className="text-center mb-10">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-6 h-6 text-indigo-600" />
        </div>
        <h1 className="text-[28px] font-bold text-gray-900 mb-2">Submit an AI app</h1>
        <p className="text-[15px] text-gray-600 max-w-md mx-auto">
          Know a consumer AI app that helps real people with real tasks? Submit it and we&apos;ll review it for the directory.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/[0.06] p-6 md:p-8 shadow-[var(--shadow-sm)]">
        <div className="space-y-5">
          {/* App name */}
          <div>
            <label className="text-[13px] font-medium text-gray-700 block mb-1.5">
              App name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.app_name}
              onChange={(e) => setForm({ ...form, app_name: e.target.value })}
              placeholder="e.g. Careerflow"
              className="w-full h-11 px-4 bg-gray-50 rounded-xl text-[14px] text-gray-900 placeholder:text-gray-400 border border-black/[0.06] outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all"
            />
          </div>

          {/* URL */}
          <div>
            <label className="text-[13px] font-medium text-gray-700 block mb-1.5">
              Website URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={form.app_url}
              onChange={(e) => setForm({ ...form, app_url: e.target.value })}
              placeholder="https://..."
              className="w-full h-11 px-4 bg-gray-50 rounded-xl text-[14px] text-gray-900 placeholder:text-gray-400 border border-black/[0.06] outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-[13px] font-medium text-gray-700 block mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full h-11 px-4 bg-gray-50 rounded-xl text-[14px] text-gray-900 border border-black/[0.06] outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all appearance-none pr-10"
            >
              <option value="">Select a category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-[13px] font-medium text-gray-700 block mb-1.5">
              What does it do for the user? <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the consumer job it helps with — what do you give it, what do you get back?"
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl text-[14px] text-gray-900 placeholder:text-gray-400 border border-black/[0.06] outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all resize-none"
            />
          </div>

          {/* Pricing */}
          <div>
            <label className="text-[13px] font-medium text-gray-700 block mb-1.5">Pricing</label>
            <input
              type="text"
              value={form.pricing}
              onChange={(e) => setForm({ ...form, pricing: e.target.value })}
              placeholder="e.g. Free tier; Pro $9/mo"
              className="w-full h-11 px-4 bg-gray-50 rounded-xl text-[14px] text-gray-900 placeholder:text-gray-400 border border-black/[0.06] outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all"
            />
          </div>

          <div className="border-t border-black/[0.04] pt-5">
            <p className="text-[12px] text-gray-500 mb-4">Optional — so we can follow up if needed</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[13px] font-medium text-gray-700 block mb-1.5">Your name</label>
                <input
                  type="text"
                  value={form.submitter_name}
                  onChange={(e) => setForm({ ...form, submitter_name: e.target.value })}
                  placeholder="Optional"
                  className="w-full h-11 px-4 bg-gray-50 rounded-xl text-[14px] text-gray-900 placeholder:text-gray-400 border border-black/[0.06] outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-gray-700 block mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.submitter_email}
                  onChange={(e) => setForm({ ...form, submitter_email: e.target.value })}
                  placeholder="Optional"
                  className="w-full h-11 px-4 bg-gray-50 rounded-xl text-[14px] text-gray-900 placeholder:text-gray-400 border border-black/[0.06] outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-[13px] text-red-700">{error}</div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-11 bg-indigo-600 text-white font-semibold text-[14px] rounded-xl hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {submitting ? "Submitting..." : "Submit app"}
          </button>
        </div>
      </form>

      <p className="text-[12px] text-gray-500 text-center mt-5">
        We review submissions within a few days. Apps must be consumer-focused (not B2B/enterprise)
        and provide real agentic value beyond what ChatGPT can do.
      </p>
    </div>
  );
}
