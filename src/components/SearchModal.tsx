"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { agents, categories } from "@/lib/data";
import { Agent } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  "career-job-search": "#8b5cf6",
  "companion-life-coach": "#ec4899",
  "dressing-style": "#f59e0b",
  "family-parenting": "#10b981",
  "health-wellness-fitness": "#f43f5e",
  "home-real-estate": "#06b6d4",
  "learning-tutoring": "#3b82f6",
  "personal-finance": "#14b8a6",
  "relationship-dating": "#f43f5e",
  "shopping-purchase-decisions": "#f97316",
  "travel-organiser": "#0ea5e9",
};

const CATEGORY_ICONS: Record<string, string> = {
  "career-job-search": "\u{1F4BC}",
  "companion-life-coach": "\u{1F9E0}",
  "dressing-style": "\u{1F457}",
  "family-parenting": "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}",
  "health-wellness-fitness": "\u{1F4AA}",
  "home-real-estate": "\u{1F3E0}",
  "learning-tutoring": "\u{1F4DA}",
  "personal-finance": "\u{1F4B0}",
  "relationship-dating": "\u2764\uFE0F",
  "shopping-purchase-decisions": "\u{1F6CD}\uFE0F",
  "travel-organiser": "\u2708\uFE0F",
};

function scoreAgent(agent: Agent, query: string): number {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  let score = 0;

  const searchable = [
    agent.name,
    agent.jobToBeDone,
    agent.outputAction,
    agent.userInput,
    agent.whyOverChatGPT,
    ...agent.capabilities,
  ].join(" ").toLowerCase();

  for (const word of words) {
    if (agent.name.toLowerCase().includes(word)) score += 20;
    else if (agent.jobToBeDone.toLowerCase().includes(word)) score += 15;
    else if (searchable.includes(word)) score += 5;
  }

  if (searchable.includes(q)) score += 25;
  return score;
}

const popularAgents = agents
  .filter((a) => a.relevanceScore >= 5)
  .slice(0, 5);

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, onClose]);

  const results = query.trim()
    ? agents
        .map((a) => ({ agent: a, score: scoreAgent(a, query) }))
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map((s) => s.agent)
    : [];

  const matchedCategories = query.trim()
    ? categories.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.slug.includes(query.toLowerCase().replace(/\s+/g, "-"))
      )
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] search-backdrop animate-fade-in" onClick={onClose}>
      <div className="min-h-full flex items-start justify-center pt-[15vh] px-4">
        <div
          className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search apps, categories, or what you need..."
              className="flex-1 text-[16px] text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
            />
            <button
              onClick={onClose}
              className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {/* Category matches */}
            {matchedCategories.length > 0 && (
              <div className="px-5 pt-4 pb-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {matchedCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all"
                    >
                      <span>{CATEGORY_ICONS[cat.slug]}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* App results */}
            {results.length > 0 && (
              <div className="px-3 py-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-2">Apps</p>
                {results.map((agent) => (
                  <Link
                    key={agent.id}
                    href={`/agent/${agent.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: CATEGORY_COLORS[agent.categorySlug] || "#6366f1" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                        {agent.name}
                      </p>
                      <p className="text-[12px] text-gray-500 truncate">{agent.jobToBeDone}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            )}

            {/* No results */}
            {query.trim() && results.length === 0 && matchedCategories.length === 0 && (
              <div className="px-5 py-10 text-center">
                <p className="text-[14px] text-gray-500">No results for &ldquo;{query}&rdquo;</p>
                <p className="text-[12px] text-gray-400 mt-1">Try different keywords</p>
              </div>
            )}

            {/* Empty state — popular */}
            {!query.trim() && (
              <div className="px-3 py-3">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Popular</p>
                {popularAgents.map((agent) => (
                  <Link
                    key={agent.id}
                    href={`/agent/${agent.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: CATEGORY_COLORS[agent.categorySlug] || "#6366f1" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                        {agent.name}
                      </p>
                      <p className="text-[12px] text-gray-500 truncate">{agent.jobToBeDone}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
                  </Link>
                ))}

                <div className="mt-3 pt-3 border-t border-gray-100 px-2">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 6).map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-full hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all"
                      >
                        <span className="text-sm">{CATEGORY_ICONS[cat.slug]}</span>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-gray-400">
              <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-mono">esc</kbd>
              to close
            </div>
            <Link
              href="/discover"
              onClick={onClose}
              className="text-[12px] font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Advanced search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
