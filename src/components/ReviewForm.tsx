"use client";

import { useState } from "react";
import { Star, Check } from "lucide-react";
import { submitReview } from "@/lib/db";

export function ReviewForm({ agentSlug, agentName }: { agentSlug: string; agentName: string }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating || !name.trim() || !title.trim() || !body.trim()) {
      setError("Please fill in all fields and select a rating.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await submitReview({
        agent_slug: agentSlug,
        user_name: name.trim(),
        rating,
        title: title.trim(),
        body: body.trim(),
      });
      setSubmitted(true);
    } catch {
      setError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-[#0f1011] rounded-[8px] p-6 border border-[rgba(255,255,255,0.05)] text-center mt-6">
        <div className="w-10 h-10 rounded-full bg-[rgba(16,185,129,0.15)] flex items-center justify-center mx-auto mb-3">
          <Check className="w-5 h-5 text-[#10b981]" />
        </div>
        <p className="text-[#f7f8f8] font-[510] text-[14px]">Review submitted!</p>
        <p className="text-[#8a8f98] text-[13px] mt-1">Thank you for reviewing {agentName}.</p>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center h-[32px] px-4 bg-[#5e6ad2] text-white font-[510] text-[13px] rounded-[4px] hover:bg-[#6d78d5] transition-all duration-[0.16s] mt-4"
      >
        Write a Review
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0f1011] rounded-[8px] p-6 border border-[rgba(255,255,255,0.05)] mt-6">
      <h3 className="text-[16px] font-[590] text-[#d0d6e0] mb-4">Review {agentName}</h3>

      {/* Star rating */}
      <div className="mb-4">
        <p className="text-[13px] font-[510] text-[#62666d] mb-2">Rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onMouseEnter={() => setHoverRating(s)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(s)}
              className="p-0.5"
            >
              <Star
                className={`w-6 h-6 transition-colors duration-[0.1s] ${
                  s <= (hoverRating || rating)
                    ? "fill-[#fb923c] text-[#fb923c]"
                    : "fill-[#62666d]/30 text-[#62666d]/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="mb-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full h-[36px] px-3 bg-[#08090a] rounded-[6px] border border-[rgba(255,255,255,0.05)] text-[13px] text-[#f7f8f8] placeholder:text-[#62666d] outline-none focus:border-[#5e6ad2] transition-colors duration-[0.16s]"
        />
      </div>

      {/* Title */}
      <div className="mb-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Review title"
          className="w-full h-[36px] px-3 bg-[#08090a] rounded-[6px] border border-[rgba(255,255,255,0.05)] text-[13px] text-[#f7f8f8] placeholder:text-[#62666d] outline-none focus:border-[#5e6ad2] transition-colors duration-[0.16s]"
        />
      </div>

      {/* Body */}
      <div className="mb-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your experience..."
          rows={3}
          className="w-full px-3 py-2 bg-[#08090a] rounded-[6px] border border-[rgba(255,255,255,0.05)] text-[13px] text-[#f7f8f8] placeholder:text-[#62666d] outline-none focus:border-[#5e6ad2] transition-colors duration-[0.16s] resize-none"
        />
      </div>

      {error && <p className="text-[#eb5757] text-[12px] mb-3">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center h-[32px] px-4 bg-[#5e6ad2] text-white font-[510] text-[13px] rounded-[4px] hover:bg-[#6d78d5] transition-all duration-[0.16s] disabled:opacity-40"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[13px] text-[#62666d] hover:text-[#8a8f98] transition-colors duration-[0.1s]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
