"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Star, MessageCircle, Send } from "lucide-react";

interface Comment {
  id: string;
  agent_slug: string;
  user_name: string;
  title: string;
  body: string;
  rating: number;
  created_at: string;
}

function StarRating({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(i)}
          className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
        >
          <Star
            className={`w-4 h-4 ${i <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
          />
        </button>
      ))}
    </div>
  );
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function Comments({ agentSlug }: { agentSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ user_name: "", title: "", body: "", rating: 0 });

  useEffect(() => {
    loadComments();
  }, [agentSlug]);

  async function loadComments() {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("agent_slug", agentSlug)
      .order("created_at", { ascending: false });
    setComments(data || []);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.user_name.trim() || !form.body.trim() || form.rating === 0) return;

    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      agent_slug: agentSlug,
      user_name: form.user_name.trim(),
      title: form.title.trim() || "Review",
      body: form.body.trim(),
      rating: form.rating,
    });

    if (!error) {
      setSuccess(true);
      setForm({ user_name: "", title: "", body: "", rating: 0 });
      setShowForm(false);
      loadComments();
      setTimeout(() => setSuccess(false), 3000);
    }
    setSubmitting(false);
  }

  const avgRating = comments.length > 0
    ? (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1)
    : null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-[16px] text-gray-900">Reviews</h2>
          {comments.length > 0 && (
            <span className="text-[13px] text-gray-500">
              {avgRating} avg · {comments.length} review{comments.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Write a review
        </button>
      </div>

      {/* Success message */}
      {success && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-[13px] text-emerald-700 font-medium">
          Thanks for your review!
        </div>
      )}

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-black/[0.08] p-5 mb-5">
          <div className="space-y-4">
            <div>
              <label className="text-[12px] font-medium text-gray-600 block mb-1.5">Your rating</label>
              <StarRating rating={form.rating} onRate={(r) => setForm({ ...form, rating: r })} interactive />
            </div>
            <div>
              <label className="text-[12px] font-medium text-gray-600 block mb-1.5">Your name</label>
              <input
                type="text"
                value={form.user_name}
                onChange={(e) => setForm({ ...form, user_name: e.target.value })}
                placeholder="Jane"
                className="w-full h-10 px-3.5 bg-gray-50 rounded-lg text-[14px] text-gray-900 placeholder:text-gray-400 border border-black/[0.06] outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="text-[12px] font-medium text-gray-600 block mb-1.5">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Game changer for my job search"
                className="w-full h-10 px-3.5 bg-gray-50 rounded-lg text-[14px] text-gray-900 placeholder:text-gray-400 border border-black/[0.06] outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="text-[12px] font-medium text-gray-600 block mb-1.5">Your review</label>
              <textarea
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                placeholder="What was your experience like? Would you recommend it?"
                rows={3}
                className="w-full px-3.5 py-2.5 bg-gray-50 rounded-lg text-[14px] text-gray-900 placeholder:text-gray-400 border border-black/[0.06] outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={submitting || !form.user_name.trim() || !form.body.trim() || form.rating === 0}
                className="inline-flex items-center gap-1.5 h-9 px-4 bg-indigo-600 text-white font-medium text-[13px] rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5" />
                {submitting ? "Posting..." : "Post review"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="h-9 px-4 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="text-[13px] text-gray-500 py-6 text-center">Loading reviews...</div>
      ) : comments.length === 0 ? (
        <div className="bg-gray-50 rounded-xl border border-black/[0.04] p-8 text-center">
          <MessageCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-[14px] text-gray-500">No reviews yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-xl border border-black/[0.06] p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-indigo-700">{comment.user_name[0]?.toUpperCase()}</span>
                  </div>
                  <span className="text-[13px] font-medium text-gray-900">{comment.user_name}</span>
                  <span className="text-[11px] text-gray-400">{timeAgo(comment.created_at)}</span>
                </div>
                <StarRating rating={comment.rating} />
              </div>
              {comment.title && <p className="text-[13px] font-medium text-gray-900 pl-[38px] mb-0.5">{comment.title}</p>}
              <p className="text-[13px] text-gray-700 leading-relaxed pl-[38px]">{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
