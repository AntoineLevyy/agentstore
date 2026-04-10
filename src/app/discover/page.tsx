"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { agents, categories, getCategoryById } from "@/lib/data";
import { Agent } from "@/lib/types";
import { AgentCard, AgentCardGrid } from "@/components/AgentCard";
import { AgentIcon } from "@/components/AgentIcon";

interface Filters {
  category?: string;
  pricing?: string;
  tool?: string;
}

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

  if (searchable.includes(q)) score += 20;
  if (filters.category && agent.category_id !== filters.category) return 0;
  if (filters.pricing && agent.pricing_type !== filters.pricing) return 0;
  if (filters.tool) {
    const toolMatch = agent.tools.some((t) => t.toLowerCase().includes(filters.tool!.toLowerCase()));
    if (!toolMatch) return 0;
  }

  return score;
}

function ResultCard({ agent, score }: { agent: Agent; score: number }) {
  const category = getCategoryById(agent.category_id);
  const priceLabel = agent.pricing_type === "free" ? "Free" :
    agent.pricing_type === "contact" ? "Contact" :
    agent.pricing_type === "freemium" ? `From $${agent.pricing_amount}/mo` :
    `$${agent.pricing_amount}/${agent.pricing_period === "monthly" ? "mo" : agent.pricing_period === "yearly" ? "yr" : "use"}`;

  return (
    <Link href={`/agent/${agent.slug}`} className="block group">
      <div className="bg-[#0f1011] rounded-2xl p-5 border border-[rgba(255,255,255,0.05)] hover:border-[#5e6ad2]/30 transition-all">
        <div className="flex items-start gap-4">
          <AgentIcon name={agent.name} websiteUrl={agent.website_url} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white text-[15px] truncate">{agent.name}</h3>
              {category && (
                <span className="text-[11px] text-[#8a8f98] bg-white/5 px-2 py-0.5 rounded-full flex-shrink-0">
                  {category.icon} {category.name}
                </span>
              )}
            </div>
            <p className="text-[13px] text-[#8a8f98] mt-1">{agent.tagline}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {agent.capabilities.slice(0, 3).map((cap) => (
                <span key={cap} className="text-[11px] text-[#8a8f98] bg-white/5 px-2 py-0.5 rounded-full">{cap}</span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[12px] text-[#5e6ad2] font-medium">{priceLabel}</span>
              <span className="text-[11px] text-[#62666d]">{Math.round((score / 50) * 100)}% match</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

const exampleQueries = [
  "automate customer support",
  "write SEO blog posts",
  "build a web app without coding",
  "analyze sales data",
  "generate marketing videos",
  "learn math with AI tutor",
  "automate bookkeeping",
  "find research papers",
];

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ agent: Agent; score: number }[]>([]);
  const [searched, setSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({});

  const approvedAgents = agents.filter((a) => a.status === "approved");
  const newest = [...approvedAgents].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 6);
  const topFree = approvedAgents.filter((a) => a.pricing_type === "free").sort((a, b) => a.name.localeCompare(b.name)).slice(0, 10);
  const topPaid = approvedAgents.filter((a) => a.pricing_type !== "free").sort((a, b) => a.name.localeCompare(b.name)).slice(0, 10);

  function handleSearch(q?: string) {
    const searchQuery = q || query;
    if (!searchQuery.trim()) return;
    if (q) setQuery(q);

    const scored = approvedAgents
      .map((a) => ({ agent: a, score: scoreAgent(a, searchQuery, filters) }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

    setResults(scored);
    setSearched(true);
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-8">
      {/* Search hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">
          Find the right agent
        </h1>
        <p className="text-[#8a8f98] mb-5">Describe what you need or browse {approvedAgents.length} agents across {categories.length} categories.</p>

        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8a8f98]" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); if (!e.target.value) setSearched(false); }}
              placeholder="Describe your task... e.g. 'automate customer support for my store'"
              className="w-full h-14 pl-12 pr-28 bg-[#0f1011] rounded-2xl text-[15px] text-white placeholder:text-[#62666d] outline-none focus:ring-2 focus:ring-[#5e6ad2]/30 border border-[rgba(255,255,255,0.05)]"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  activeFilterCount > 0 ? "bg-[#5e6ad2]/15 text-[#5e6ad2]" : "bg-white/5 text-[#8a8f98] hover:text-white"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              <button
                type="submit"
                className="bg-[#5e6ad2] text-white font-semibold px-4 h-10 rounded-xl text-sm hover:bg-[#6d78d5] transition-colors"
              >
                Find
              </button>
            </div>
          </div>
        </form>

        {showFilters && (
          <div className="mt-3 bg-[#0f1011] rounded-2xl p-4 border border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-white">Filters</span>
              {activeFilterCount > 0 && (
                <button onClick={() => { setFilters({}); }} className="text-xs text-[#5e6ad2] hover:underline">Clear all</button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-[#8a8f98] uppercase tracking-wider font-medium">Category</label>
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
                <label className="text-[11px] text-[#8a8f98] uppercase tracking-wider font-medium">Pricing</label>
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
                <label className="text-[11px] text-[#8a8f98] uppercase tracking-wider font-medium">Tool</label>
                <input
                  type="text"
                  value={filters.tool || ""}
                  onChange={(e) => setFilters({ ...filters, tool: e.target.value || undefined })}
                  placeholder="e.g. Slack, API"
                  className="w-full mt-1 h-9 px-3 bg-white/5 rounded-lg text-[13px] text-white placeholder:text-[#62666d] border-none outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {!searched && (
          <div className="flex flex-wrap gap-2 mt-4">
            {exampleQueries.map((eq) => (
              <button
                key={eq}
                onClick={() => handleSearch(eq)}
                className="text-[12px] text-[#8a8f98] bg-white/5 px-3 py-1.5 rounded-full hover:bg-[rgba(255,255,255,0.08)] hover:text-white transition-colors"
              >
                {eq}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search results */}
      {searched && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[#8a8f98]">
              {results.length > 0 ? `${results.length} agents matched` : "No agents matched"}
            </p>
            <button onClick={() => { setSearched(false); setResults([]); setQuery(""); }} className="text-xs text-[#5e6ad2] hover:underline">
              Clear search
            </button>
          </div>
          {results.length === 0 ? (
            <div className="text-center py-12 bg-[#0f1011] rounded-2xl border border-[rgba(255,255,255,0.05)]">
              <p className="text-[#8a8f98]">No agents found. Try different words or browse categories below.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map(({ agent, score }) => (
                <ResultCard key={agent.id} agent={agent} score={score} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Categories */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const count = approvedAgents.filter((a) => a.category_id === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="bg-[#0f1011] rounded-2xl p-4 hover:bg-[#101112] transition-colors"
              >
                <span className="text-2xl">{cat.icon}</span>
                <p className="font-semibold text-sm text-white mt-2">{cat.name}</p>
                <p className="text-xs text-[#8a8f98] mt-0.5">{count} agent{count !== 1 ? "s" : ""}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recently Added */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Recently Added</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-5">
          {newest.map((agent) => (
            <AgentCardGrid key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      {/* Top Free */}
      {topFree.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Top Free Agents</h2>
          <div className="bg-[#0f1011] rounded-[20px] divide-y divide-white/5">
            {topFree.map((agent, i) => (
              <div key={agent.id} className="flex items-center gap-4 px-5 py-4">
                <span className="text-lg font-bold text-[#62666d] w-6 text-center">{i + 1}</span>
                <div className="flex-1">
                  <AgentCard agent={agent} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Top Paid */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Top Paid Agents</h2>
        <div className="bg-[#0f1011] rounded-[20px] divide-y divide-white/5">
          {topPaid.map((agent, i) => (
            <div key={agent.id} className="flex items-center gap-4 px-5 py-4">
              <span className="text-lg font-bold text-[#62666d] w-6 text-center">{i + 1}</span>
              <div className="flex-1">
                <AgentCard agent={agent} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
