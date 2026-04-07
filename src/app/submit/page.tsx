"use client";

import { useState } from "react";
import { categories } from "@/lib/data";
import { Check, ChevronLeft, ChevronRight, Upload, Plus, X } from "lucide-react";

const steps = [
  { number: 1, title: "Basic Info" },
  { number: 2, title: "Media" },
  { number: 3, title: "Technical" },
  { number: 4, title: "Pricing" },
  { number: 5, title: "Review" },
];

export default function SubmitPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    description: "",
    category_id: "",
    icon: null as File | null,
    screenshots: [] as File[],
    capabilities: [""],
    tools: [""],
    special_data: "",
    website_url: "",
    creator_name: "",
    pricing_type: "free" as string,
    pricing_amount: "",
    pricing_period: "monthly" as string,
  });

  const [submitted, setSubmitted] = useState(false);

  function updateForm(updates: Partial<typeof form>) {
    setForm((prev) => ({ ...prev, ...updates }));
  }

  function addCapability() {
    updateForm({ capabilities: [...form.capabilities, ""] });
  }

  function removeCapability(i: number) {
    updateForm({ capabilities: form.capabilities.filter((_, idx) => idx !== i) });
  }

  function updateCapability(i: number, value: string) {
    const caps = [...form.capabilities];
    caps[i] = value;
    updateForm({ capabilities: caps });
  }

  function addTool() {
    updateForm({ tools: [...form.tools, ""] });
  }

  function removeTool(i: number) {
    updateForm({ tools: form.tools.filter((_, idx) => idx !== i) });
  }

  function updateTool(i: number, value: string) {
    const t = [...form.tools];
    t[i] = value;
    updateForm({ tools: t });
  }

  function canProceed() {
    switch (step) {
      case 1: return form.name && form.tagline && form.description && form.category_id;
      case 2: return true; // Media is optional
      case 3: return form.capabilities.some((c) => c.trim()) && form.website_url;
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-[600px] mx-auto px-5 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-white">Agent Submitted!</h1>
        <p className="text-gray-500 mt-3 text-[15px]">
          Your agent <strong>{form.name}</strong> has been submitted for review.
          We&apos;ll review it and get back to you within 24-48 hours.
        </p>
        <a href="/" className="inline-block mt-6 bg-[#0A84FF] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#409CFF] transition-colors text-sm">
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto px-5 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Submit an Agent</h1>
      <p className="text-gray-500 mb-8">List your AI agent on the Agent Store. It takes under 5 minutes.</p>

      {/* Progress */}
      <div className="flex items-center gap-1 mb-10">
        {steps.map((s) => (
          <div key={s.number} className="flex-1 flex items-center gap-1">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
              s.number < step ? "bg-[#0A84FF] text-white" :
              s.number === step ? "bg-[#0A84FF] text-white" :
              "bg-white/10 text-gray-400"
            }`}>
              {s.number < step ? <Check className="w-4 h-4" /> : s.number}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${s.number <= step ? "text-white" : "text-gray-400"}`}>
              {s.title}
            </span>
            {s.number < steps.length && <div className={`flex-1 h-0.5 mx-2 rounded ${s.number < step ? "bg-[#0A84FF]" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Agent Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
              placeholder="e.g. My AI Assistant"
              className="w-full h-12 px-4 bg-[#1c1c1e] rounded-xl text-[15px] text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#0A84FF]/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Tagline *</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => updateForm({ tagline: e.target.value })}
              placeholder="A short description of what your agent does"
              maxLength={80}
              className="w-full h-12 px-4 bg-[#1c1c1e] rounded-xl text-[15px] text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#0A84FF]/30"
            />
            <p className="text-xs text-gray-400 mt-1">{form.tagline.length}/80</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => updateForm({ description: e.target.value })}
              placeholder="Describe what your agent does, how it works, and why users should try it..."
              rows={5}
              className="w-full px-4 py-3 bg-[#1c1c1e] rounded-xl text-[15px] text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#0A84FF]/30 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Category *</label>
            <select
              value={form.category_id}
              onChange={(e) => updateForm({ category_id: e.target.value })}
              className="w-full h-12 px-4 bg-[#1c1c1e] rounded-xl text-[15px] text-white outline-none focus:ring-2 focus:ring-[#0A84FF]/30 appearance-none"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Step 2: Media */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Agent Icon</label>
            <p className="text-xs text-gray-400 mb-3">128x128px recommended. PNG or JPG.</p>
            <label className="flex items-center justify-center w-32 h-32 rounded-[22.5%] bg-[#1c1c1e] border-2 border-dashed border-gray-600 cursor-pointer hover:bg-[#2c2c2e] transition-colors">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => updateForm({ icon: e.target.files?.[0] || null })} />
              {form.icon ? (
                <span className="text-sm text-gray-400 text-center px-2">{form.icon.name}</span>
              ) : (
                <Upload className="w-8 h-8 text-gray-400" />
              )}
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Screenshots</label>
            <p className="text-xs text-gray-400 mb-3">Upload up to 5 screenshots showing your agent in action.</p>
            <label className="flex items-center justify-center w-full h-32 rounded-2xl bg-[#1c1c1e] border-2 border-dashed border-gray-600 cursor-pointer hover:bg-[#2c2c2e] transition-colors">
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => updateForm({ screenshots: Array.from(e.target.files || []) })} />
              <div className="text-center">
                <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-400 mt-2">
                  {form.screenshots.length > 0 ? `${form.screenshots.length} file(s) selected` : "Click to upload"}
                </p>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Step 3: Technical */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Capabilities *</label>
            <p className="text-xs text-gray-400 mb-3">What can your agent do? Add each capability separately.</p>
            <div className="space-y-2">
              {form.capabilities.map((cap, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={cap}
                    onChange={(e) => updateCapability(i, e.target.value)}
                    placeholder="e.g. Code generation"
                    className="flex-1 h-10 px-4 bg-[#1c1c1e] rounded-xl text-[14px] text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#0A84FF]/30"
                  />
                  {form.capabilities.length > 1 && (
                    <button onClick={() => removeCapability(i)} className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center hover:bg-red-900/50 transition-colors">
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addCapability} className="flex items-center gap-1.5 text-[#0A84FF] text-sm font-medium hover:text-[#409CFF]">
                <Plus className="w-4 h-4" /> Add capability
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Tools</label>
            <p className="text-xs text-gray-400 mb-3">What tools or integrations does your agent use?</p>
            <div className="space-y-2">
              {form.tools.map((tool, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tool}
                    onChange={(e) => updateTool(i, e.target.value)}
                    placeholder="e.g. Web browser"
                    className="flex-1 h-10 px-4 bg-[#1c1c1e] rounded-xl text-[14px] text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#0A84FF]/30"
                  />
                  {form.tools.length > 1 && (
                    <button onClick={() => removeTool(i)} className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center hover:bg-red-900/50 transition-colors">
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addTool} className="flex items-center gap-1.5 text-[#0A84FF] text-sm font-medium hover:text-[#409CFF]">
                <Plus className="w-4 h-4" /> Add tool
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Special Data / Knowledge</label>
            <textarea
              value={form.special_data}
              onChange={(e) => updateForm({ special_data: e.target.value })}
              placeholder="Does your agent have access to unique data, knowledge bases, or training?"
              rows={3}
              className="w-full px-4 py-3 bg-[#1c1c1e] rounded-xl text-[15px] text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#0A84FF]/30 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Website URL *</label>
            <input
              type="url"
              value={form.website_url}
              onChange={(e) => updateForm({ website_url: e.target.value })}
              placeholder="https://youragent.com"
              className="w-full h-12 px-4 bg-[#1c1c1e] rounded-xl text-[15px] text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#0A84FF]/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Creator Name (optional)</label>
            <input
              type="text"
              value={form.creator_name}
              onChange={(e) => updateForm({ creator_name: e.target.value })}
              placeholder="Your name or company"
              className="w-full h-12 px-4 bg-[#1c1c1e] rounded-xl text-[15px] text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#0A84FF]/30"
            />
          </div>
        </div>
      )}

      {/* Step 4: Pricing */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-3">Pricing Model</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "free", label: "Free", desc: "No cost to use" },
                { value: "freemium", label: "Freemium", desc: "Free tier with paid upgrades" },
                { value: "paid", label: "Paid", desc: "Requires payment to use" },
                { value: "contact", label: "Contact Sales", desc: "Custom pricing" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateForm({ pricing_type: opt.value })}
                  className={`p-4 rounded-2xl border-2 text-left transition-colors ${
                    form.pricing_type === opt.value
                      ? "border-[#0A84FF] bg-[#0A84FF]/15"
                      : "border-white/5 bg-[#1c1c1e] hover:bg-[#2c2c2e]"
                  }`}
                >
                  <p className="font-semibold text-sm text-white">{opt.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {(form.pricing_type === "paid" || form.pricing_type === "freemium") && (
            <>
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Price (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    value={form.pricing_amount}
                    onChange={(e) => updateForm({ pricing_amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full h-12 pl-8 pr-4 bg-[#1c1c1e] rounded-xl text-[15px] text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#0A84FF]/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Billing Period</label>
                <select
                  value={form.pricing_period}
                  onChange={(e) => updateForm({ pricing_period: e.target.value })}
                  className="w-full h-12 px-4 bg-[#1c1c1e] rounded-xl text-[15px] text-white outline-none focus:ring-2 focus:ring-[#0A84FF]/30 appearance-none"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="one_time">One-time</option>
                  <option value="per_use">Per use</option>
                </select>
              </div>
            </>
          )}
        </div>
      )}

      {/* Step 5: Review */}
      {step === 5 && (
        <div className="space-y-6">
          <div className="bg-[#1c1c1e] rounded-2xl p-6">
            <h3 className="font-bold text-white text-lg mb-4">Review Your Submission</h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 font-medium">Name</p>
                <p className="text-sm text-white">{form.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Tagline</p>
                <p className="text-sm text-white">{form.tagline}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Category</p>
                <p className="text-sm text-white">{categories.find((c) => c.id === form.category_id)?.name || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Description</p>
                <p className="text-sm text-white line-clamp-3">{form.description}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Capabilities</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {form.capabilities.filter((c) => c.trim()).map((cap, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white/10 rounded-full text-xs text-gray-300">{cap}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Tools</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {form.tools.filter((t) => t.trim()).map((tool, i) => (
                    <span key={i} className="px-2.5 py-1 bg-[#0A84FF]/15 rounded-full text-xs text-[#0A84FF]">{tool}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Website</p>
                <p className="text-sm text-[#0A84FF]">{form.website_url}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Pricing</p>
                <p className="text-sm text-white">
                  {form.pricing_type === "free" ? "Free" :
                   form.pricing_type === "contact" ? "Contact Sales" :
                   `$${form.pricing_amount}/${form.pricing_period}`}
                </p>
              </div>
              {form.creator_name && (
                <div>
                  <p className="text-xs text-gray-400 font-medium">Creator</p>
                  <p className="text-sm text-white">{form.creator_name}</p>
                </div>
              )}
              {form.icon && (
                <div>
                  <p className="text-xs text-gray-400 font-medium">Icon</p>
                  <p className="text-sm text-white">{form.icon.name}</p>
                </div>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center">
            By submitting, your agent will be reviewed by our team. Approved agents typically appear within 24-48 hours.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1.5 text-gray-500 font-medium text-sm hover:text-gray-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        ) : (
          <div />
        )}

        {step < 5 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-1.5 bg-[#0A84FF] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#409CFF] transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 bg-[#0A84FF] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#409CFF] transition-colors text-sm"
          >
            <Check className="w-4 h-4" /> Submit Agent
          </button>
        )}
      </div>
    </div>
  );
}
