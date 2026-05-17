"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { agents, categories } from "@/lib/data";
import { Agent } from "@/lib/types";
import { AgentCard } from "@/components/AgentCard";

const CATEGORY_ICONS: Record<string, string> = {
  "career-job-search": "💼",
  "companion-life-coach": "🧠",
  "dressing-style": "👗",
  "family-parenting": "👨‍👩‍👧",
  "health-wellness-fitness": "💪",
  "home-real-estate": "🏠",
  "learning-tutoring": "📚",
  "personal-finance": "💰",
  "relationship-dating": "❤️",
  "shopping-purchase-decisions": "🛍️",
  "travel-organiser": "✈️",
};

interface Filters {
  category?: string;
  autonomy?: string;
  sort?: string;
}

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

const exampleQueries = [
  "find me a job automatically",
  "plan a trip with flights and hotels",
  "get fit with a personal trainer",
  "manage my budget and save money",
  "learn a new language",
  "style my outfits daily",
  "help me date better",
  "find my next apartment",
];

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({});
  const [showFilters, setShowFilters] = useState(false);

  let displayAgents = [...agents];

  // Filter
  if (filters.category) {
    displayAgents = displayAgents.filter((a) => a.categorySlug === filters.category);
  }
  if (filters.autonomy) {
    const minDepth = parseInt(filters.autonomy);
    displayAgents = displayAgents.filter((a) => a.agenticDepth >= minDepth);
  }

  // Search
  if (query.trim()) {
    displayAgents = displayAgents
      .map((a) => ({ agent: a, score: scoreAgent(a, query) }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.agent);
  } else {
    // Default sort
    if (filters.sort === "autonomy") {
      displayAgents.sort((a, b) => b.agenticDepth - a.agenticDepth);
    } else if (filters.sort === "name") {
      displayAgents.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      displayAgents.sort((a, b) => b.relevanceScore - a.relevanceScore || b.agenticDepth - a.agenticDepth);
    }
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      {/* Search */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-gray-900 mb-2">Discover AI apps</h1>
        <p className="text-[15px] text-gray-600 mb-5">Search {agents.length} consumer AI apps by what you need done.</p>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you need help with?"
            className="w-full h-13 pl-12 pr-14 bg-white rounded-xl text-[15px] text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-200 border border-black/[0.1] shadow-sm"
          />
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              activeFilterCount > 0 ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-3 bg-white rounded-xl p-4 border border-black/[0.06] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-medium text-gray-900">Filters</span>
              {activeFilterCount > 0 && (
                <button onClick={() => setFilters({})} className="text-[12px] text-indigo-600 hover:underline">Clear all</button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-[12px] text-gray-500 font-medium">Category</label>
                <select
                  value={filters.category || ""}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })}
                  className="w-full mt-1 h-9 px-3 bg-gray-50 rounded-lg text-[13px] text-gray-900 border border-black/[0.06] outline-none"
                >
                  <option value="">All categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{CATEGORY_ICONS[c.slug]} {c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[12px] text-gray-500 font-medium">Min. autonomy</label>
                <select
                  value={filters.autonomy || ""}
                  onChange={(e) => setFilters({ ...filters, autonomy: e.target.value || undefined })}
                  className="w-full mt-1 h-9 px-3 bg-gray-50 rounded-lg text-[13px] text-gray-900 border border-black/[0.06] outline-none"
                >
                  <option value="">Any level</option>
                  <option value="3">3+ (Semi-autonomous)</option>
                  <option value="4">4+ (Highly autonomous)</option>
                  <option value="5">5 (Fully autonomous)</option>
                </select>
              </div>
              <div>
                <label className="text-[12px] text-gray-500 font-medium">Sort by</label>
                <select
                  value={filters.sort || ""}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value || undefined })}
                  className="w-full mt-1 h-9 px-3 bg-gray-50 rounded-lg text-[13px] text-gray-900 border border-black/[0.06] outline-none"
                >
                  <option value="">Relevance</option>
                  <option value="autonomy">Most autonomous</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Example queries */}
        {!query && (
          <div className="flex flex-wrap gap-2 mt-4">
            {exampleQueries.map((eq) => (
              <button
                key={eq}
                onClick={() => setQuery(eq)}
                className="text-[13px] text-gray-600 bg-white border border-black/[0.06] px-3.5 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all"
              >
                {eq}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-[13px] text-gray-500">
          {displayAgents.length} app{displayAgents.length !== 1 ? "s" : ""}
          {query && ` matching "${query}"`}
          {filters.category && ` in ${categories.find((c) => c.slug === filters.category)?.name}`}
        </p>
        {query && (
          <button
            onClick={() => setQuery("")}
            className="inline-flex items-center gap-1 text-[12px] text-gray-500 hover:text-gray-900"
          >
            <X className="w-3.5 h-3.5" /> Clear search
          </button>
        )}
      </div>

      {/* Results */}
      {displayAgents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-black/[0.06]">
          <p className="text-gray-600 text-[15px]">No apps found matching your search.</p>
          <p className="text-gray-500 text-[13px] mt-1">Try different keywords or clear your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}
