"use client";

import { useState } from "react";
import { Search, Sparkles, ArrowRight, SlidersHorizontal, X } from "lucide-react";
import { agents, categories, getCategoryById } from "@/lib/data";
import { Agent } from "@/lib/types";
import { AgentIcon } from "@/components/AgentIcon";
import Link from "next/link";

function scoreAgent(agent: Agent, query: string, filters: Filters): number {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  let score = 0;

  const searchable = [
    agent.name.toLowerCase(),
    agent.tagline.toLowerCase(),
    agent.description.toLowerCase(),
    ...agent.capabilities.map((c) => c.toLowerCase()),
    ...agent.tools.map((t) => t.toLowerCase()),
    agent.special_data.toLowerCase(),
  ].join(" ");

  for (const word of words) {
    if (agent.name.toLowerCase().includes(word)) score += 15;
    else if (agent.tagline.toLowerCase().includes(word)) score += 10;
    else if (searchable.includes(word)) score += 5;
  }

  // Exact phrase match bonus
  if (searchable.includes(q)) score += 20;

  // Apply filters
  if (filters.category && agent.category_id !== filters.category) return 0;
  if (filters.pricing && agent.pricing_type !== filters.pricing) return 0;
  if (filters.tool) {
    const toolMatch = agent.tools.some((t) => t.toLowerCase().includes(filters.tool!.toLowerCase()));
    if (!toolMatch) return 0;
  }

  return score;
}

interface Filters {
  category?: string;
  pricing?: string;
  tool?: string;
}

const exampleQueries = [
  "I need to automate customer support for my Shopify store",
  "Help me write SEO-optimized blog posts",
  "I want to build a web app without coding",
  "Analyze my sales data and create dashboards",
  "Generate marketing videos with AI avatars",
  "Find research papers about machine learning",
  "I need an AI tutor for learning math",
  "Automate my accounting and bookkeeping",
];

function ResultCard({ agent, score }: { agent: Agent; score: number }) {
  const category = getCategoryById(agent.category_id);
  const priceLabel = agent.pricing_type === "free" ? "Free" :
    agent.pricing_type === "contact" ? "Contact" :
    agent.pricing_type === "freemium" ? `From $${agent.pricing_amount}/mo` :
    `$${agent.pricing_amount}/${agent.pricing_period === "monthly" ? "mo" : agent.pricing_period === "yearly" ? "yr" : "use"}`;

  return (
    <Link href={`/agent/${agent.slug}`} className="block group">
      <div className="bg-[#1c1c1e] rounded-2xl p-5 border border-white/[0.06] hover:border-[#0A84FF]/30 transition-all">
        <div className="flex items-start gap-4">
          <AgentIcon name={agent.name} websiteUrl={agent.website_url} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white text-[15px] truncate">{agent.name}</h3>
              {category && (
                <span className="text-[11px] text-gray-500 bg-white/5 px-2 py-0.5 rounded-full flex-shrink-0">
                  {category.icon} {category.name}
                </span>
              )}
            </div>
            <p className="text-[13px] text-gray-400 mt-1">{agent.tagline}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {agent.capabilities.slice(0, 3).map((cap) => (
                <span key={cap} className="text-[11px] text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{cap}</span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[12px] text-[#0A84FF] font-medium">{priceLabel}</span>
              <span className="text-[11px] text-gray-600">{Math.round((score / 50) * 100)}% match</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FindPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ agent: Agent; score: number }[]>([]);
  const [searched, setSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({});

  function handleSearch(q?: string) {
    const searchQuery = q || query;
    if (!searchQuery.trim()) return;
    if (q) setQuery(q);

    const scored = agents
      .filter((a) => a.status === "approved")
      .map((a) => ({ agent: a, score: scoreAgent(a, searchQuery, filters) }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

    setResults(scored);
    setSearched(true);
  }

  function clearFilters() {
    setFilters({});
    if (query) handleSearch();
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="max-w-[800px] mx-auto px-5 py-10">
      {/* Hero */}
      {!searched && (
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#0A84FF]/15 text-[#0A84FF] text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Discovery
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Describe what you need.
            <br />
            <span className="text-gray-400">We&apos;ll find the right agent.</span>
          </h1>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Tell us your task in plain language. We&apos;ll match you with the best AI agents based on capabilities, tools, and what they&apos;re built for.
          </p>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your task... e.g. 'automate customer support for my e-commerce store'"
              className="w-full h-14 pl-12 pr-28 bg-[#1c1c1e] rounded-2xl text-[15px] text-white placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-[#0A84FF]/30 border border-white/[0.06]"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  activeFilterCount > 0 ? "bg-[#0A84FF]/15 text-[#0A84FF]" : "bg-white/5 text-gray-500 hover:text-white"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              <button
                type="submit"
                className="bg-[#0A84FF] text-white font-semibold px-4 h-10 rounded-xl text-sm hover:bg-[#409CFF] transition-colors"
              >
                Find
              </button>
            </div>
          </div>
        </form>

        {/* Filters */}
        {showFilters && (
          <div className="mt-3 bg-[#1c1c1e] rounded-2xl p-4 border border-white/[0.06]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-white">Filters</span>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs text-[#0A84FF] hover:underline">Clear all</button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">Category</label>
                <select
                  value={filters.category || ""}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })}
                  className="w-full mt-1 h-9 px-3 bg-white/5 rounded-lg text-[13px] text-white border-none outline-none"
                >
                  <option value="">All</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">Pricing</label>
                <select
                  value={filters.pricing || ""}
                  onChange={(e) => setFilters({ ...filters, pricing: e.target.value || undefined })}
                  className="w-full mt-1 h-9 px-3 bg-white/5 rounded-lg text-[13px] text-white border-none outline-none"
                >
                  <option value="">Any</option>
                  <option value="free">Free</option>
                  <option value="freemium">Freemium</option>
                  <option value="paid">Paid</option>
                  <option value="contact">Contact Sales</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">Tool</label>
                <input
                  type="text"
                  value={filters.tool || ""}
                  onChange={(e) => setFilters({ ...filters, tool: e.target.value || undefined })}
                  placeholder="e.g. Slack, API"
                  className="w-full mt-1 h-9 px-3 bg-white/5 rounded-lg text-[13px] text-white placeholder:text-gray-600 border-none outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Example queries */}
      {!searched && (
        <div className="mt-6">
          <p className="text-[12px] text-gray-600 mb-3">Try one of these:</p>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.map((eq) => (
              <button
                key={eq}
                onClick={() => handleSearch(eq)}
                className="text-[12px] text-gray-400 bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors text-left"
              >
                {eq}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {searched && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-400">
              {results.length > 0
                ? `${results.length} agent${results.length !== 1 ? "s" : ""} matched`
                : "No agents matched your description"}
            </p>
            {results.length > 0 && (
              <button onClick={() => { setSearched(false); setResults([]); setQuery(""); }} className="text-xs text-[#0A84FF] hover:underline">
                New search
              </button>
            )}
          </div>

          {results.length === 0 && (
            <div className="text-center py-12 bg-[#1c1c1e] rounded-2xl border border-white/[0.06]">
              <p className="text-gray-500">No agents found for that description.</p>
              <p className="text-gray-600 text-sm mt-1">Try different words or broaden your search.</p>
              <button
                onClick={() => { setSearched(false); setResults([]); }}
                className="mt-4 text-[#0A84FF] text-sm font-medium hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          <div className="space-y-3">
            {results.map(({ agent, score }) => (
              <ResultCard key={agent.id} agent={agent} score={score} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
