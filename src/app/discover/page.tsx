"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { agents, categories } from "@/lib/data";
import { Agent } from "@/lib/types";
import { AgentCard } from "@/components/AgentCard";

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
    <div className="max-w-6xl mx-auto px-5 py-12">
      {/* Search */}
      <div className="mb-10">
        <h1 className="text-[30px] font-bold text-gray-900 mb-2">Discover AI apps</h1>
        <p className="text-[16px] text-gray-600 mb-6">Search {agents.length} consumer AI apps by what you need done.</p>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you need help with?"
            className="w-full h-14 pl-12 pr-14 bg-white rounded-2xl text-[16px] text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-200 border border-black/[0.1] shadow-sm"
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

        {/* Category pills - horizontal scrollable */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          <button
            onClick={() => setFilters({ ...filters, category: undefined })}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-full border transition-all ${
              !filters.category
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const isActive = filters.category === cat.slug;
            const catColor = CATEGORY_COLORS[cat.slug];
            return (
              <button
                key={cat.id}
                onClick={() => setFilters({ ...filters, category: isActive ? undefined : cat.slug })}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-full border transition-all ${
                  isActive
                    ? "text-white border-transparent"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
                style={isActive ? { backgroundColor: catColor, borderColor: catColor } : undefined}
              >
                <span className="text-sm">{CATEGORY_ICONS[cat.slug]}</span>
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mt-3 bg-white rounded-xl p-4 border border-black/[0.06] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-medium text-gray-900">Filters</span>
              {activeFilterCount > 0 && (
                <button onClick={() => setFilters({})} className="text-[12px] text-indigo-600 hover:underline">Clear all</button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
        {!query && !filters.category && (
          <div className="flex flex-wrap gap-2 mt-4">
            {exampleQueries.map((eq) => (
              <button
                key={eq}
                onClick={() => setQuery(eq)}
                className="text-[13px] text-gray-600 bg-white border border-black/[0.06] px-3.5 py-2 rounded-full hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all"
              >
                {eq}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[14px] text-gray-500">
          {displayAgents.length} app{displayAgents.length !== 1 ? "s" : ""}
          {query && ` matching "${query}"`}
          {filters.category && ` in ${categories.find((c) => c.slug === filters.category)?.name}`}
        </p>
        {(query || filters.category) && (
          <button
            onClick={() => { setQuery(""); setFilters({}); }}
            className="inline-flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-900"
          >
            <X className="w-3.5 h-3.5" /> Clear all
          </button>
        )}
      </div>

      {/* Results — 3 columns on desktop */}
      {displayAgents.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-black/[0.06]">
          <p className="text-gray-600 text-[16px]">No apps found matching your search.</p>
          <p className="text-gray-500 text-[14px] mt-1.5">Try different keywords or clear your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}
