"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { agents as staticAgents, categories, b2cCategories, b2bCategories, getCategoryById } from "@/lib/data";
import { getAllApprovedAgents } from "@/lib/db";
import { Agent } from "@/lib/types";
import { AgentCard, getPriceLabel } from "@/components/AgentCard";
import { AgentIcon } from "@/components/AgentIcon";

interface Filters {
  category?: string;
  pricing?: string;
}

const examples = [
  "I want an app to edit family photos",
  "I need help planning a cheap weekend trip",
  "I want to learn Spanish for 10 minutes a day",
  "I need an app to write follow-up emails",
  "I want help understanding a legal document",
  "I need a better grocery and meal plan",
];

function scoreAgent(agent: Agent, query: string, filters: Filters) {
  if (filters.category && agent.category_id !== filters.category) return 0;
  if (filters.pricing && agent.pricing_type !== filters.pricing) return 0;
  if (!query.trim()) return 1;

  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  const searchable = [agent.name, agent.tagline, agent.description, ...agent.capabilities, ...agent.tools, agent.special_data]
    .join(" ")
    .toLowerCase();
  let score = 0;
  for (const word of words) {
    if (agent.name.toLowerCase().includes(word)) score += 16;
    else if (agent.tagline.toLowerCase().includes(word)) score += 10;
    else if (searchable.includes(word)) score += 5;
  }
  if (searchable.includes(q)) score += 24;
  return score;
}

function ResultRow({ agent, score, query }: { agent: Agent; score: number; query: string }) {
  const category = getCategoryById(agent.category_id);
  const reason = agent.capabilities.slice(0, 2).join(" + ") || agent.tools.slice(0, 2).join(" + ") || category?.name || "matches your request";
  const match = Math.min(98, Math.max(72, Math.round(score * 5 + 68)));

  return (
    <Link href={`/agent/${agent.slug}`} className="group block rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-black/[0.06] transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <AgentIcon name={agent.name} websiteUrl={agent.website_url} iconUrl={agent.icon_url} size="md" className="rounded-[18px]" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[20px] font-[820] tracking-[-0.035em] text-[#171411]">{agent.name}</h2>
            {category && <span className="rounded-full bg-[#fff0e8] px-2.5 py-1 text-[11px] font-[760] text-[#a33d13]">{category.name}</span>}
            <span className="rounded-full bg-[#f0ece5] px-2.5 py-1 text-[11px] font-[760] text-[#6c6258]">{getPriceLabel(agent)}</span>
          </div>
          <p className="mt-1 text-[14px] leading-6 text-[#6f675f]">{agent.tagline}</p>
          <div className="mt-4 rounded-[20px] bg-[#fbf7ef] p-4">
            <p className="text-[13px] font-[700] leading-5 text-[#2a241f]">
              We have an app that does what you want{query ? ` for “${query}”` : ""}: <span className="text-[#ff6b35]">{reason}</span>.
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {agent.tools.slice(0, 3).map((tool) => <span key={tool} className="rounded-full bg-[#e8f8ed] px-2.5 py-1 text-[11px] font-[700] text-[#17673a]">{tool}</span>)}
          </div>
        </div>
        <div className="rounded-[22px] bg-[#171411] px-4 py-3 text-center text-white sm:w-24">
          <p className="text-[24px] font-[820] tracking-[-0.04em]">{match}%</p>
          <p className="text-[11px] font-[650] text-white/60">fit</p>
        </div>
      </div>
    </Link>
  );
}

export default function DiscoverPage() {
  const [query, setQuery] = useState(() => typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("q") || "");
  const [searched, setSearched] = useState(() => typeof window !== "undefined" && Boolean(new URLSearchParams(window.location.search).get("q")));
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({});
  const [agents, setAgents] = useState<Agent[]>(staticAgents.filter((a) => a.status === "approved"));

  useEffect(() => {
    getAllApprovedAgents().then((dbAgents) => {
      if (dbAgents.length > 0) setAgents(dbAgents);
    }).catch(() => {});
  }, []);

  const approved = agents;
  const resultSet = useMemo(() => {
    return approved
      .map((agent) => ({ agent, score: scoreAgent(agent, query, filters) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || Number(b.agent.featured) - Number(a.agent.featured))
      .slice(0, searched ? 24 : 9);
  }, [approved, query, filters, searched]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const categoryGroups = [...b2cCategories, ...b2bCategories.slice(0, 6)];

  function runSearch(nextQuery?: string) {
    const q = nextQuery ?? query;
    setQuery(q);
    setSearched(Boolean(q.trim()) || activeFilterCount > 0);
    if (q.trim()) window.history.replaceState(null, "", `/discover?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="min-h-screen bg-[#fbfaf7] px-4 py-10 text-[#171411] sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        <section className="rounded-[42px] bg-[#fff6ec] p-6 shadow-sm ring-1 ring-black/[0.06] sm:p-10">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-[760] text-[#a33d13] shadow-sm"><Sparkles className="h-3.5 w-3.5" /> Consumer app search</p>
            <h1 className="text-[46px] font-[840] leading-[0.98] tracking-[-0.055em] sm:text-[68px]">Tell us what you want done.</h1>
            <p className="mt-4 max-w-2xl text-[17px] leading-7 text-[#6c6258]">Skip categories if you want. Describe the outcome, and we’ll show apps that can handle it with simple reasons, price, tools, and detail pages.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); runSearch(); }} className="mt-8 rounded-[30px] bg-white p-2 shadow-[0_18px_60px_rgba(56,42,25,0.12)] ring-1 ring-black/[0.07] sm:flex">
            <div className="flex min-h-14 flex-1 items-center gap-3 px-4">
              <Search className="h-5 w-5 text-[#ff6b35]" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="I want an app to help me budget without spreadsheets..." className="w-full bg-transparent text-[16px] font-[560] outline-none placeholder:text-[#a49a90]" />
            </div>
            <div className="mt-2 flex gap-2 sm:mt-0">
              <button type="button" onClick={() => setShowFilters(!showFilters)} className="inline-flex h-14 items-center gap-2 rounded-[24px] bg-[#f3f0ea] px-4 text-[14px] font-[760] text-[#5f554c]"><SlidersHorizontal className="h-4 w-4" /> Filter{activeFilterCount ? ` ${activeFilterCount}` : ""}</button>
              <button className="h-14 flex-1 rounded-[24px] bg-[#171411] px-6 text-[15px] font-[780] text-white sm:flex-none">Find apps</button>
            </div>
          </form>

          {showFilters && (
            <div className="mt-4 grid gap-3 rounded-[26px] bg-white p-4 ring-1 ring-black/[0.06] md:grid-cols-3">
              <select value={filters.category || ""} onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })} className="h-12 rounded-[18px] bg-[#fbf7ef] px-4 text-[14px] font-[650] outline-none">
                <option value="">Any category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <select value={filters.pricing || ""} onChange={(e) => setFilters({ ...filters, pricing: e.target.value || undefined })} className="h-12 rounded-[18px] bg-[#fbf7ef] px-4 text-[14px] font-[650] outline-none">
                <option value="">Any price</option>
                <option value="free">Free</option>
                <option value="freemium">Freemium</option>
                <option value="paid">Paid</option>
                <option value="contact">Contact</option>
              </select>
              <button onClick={() => { setFilters({}); setShowFilters(false); }} className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-[#171411] px-4 text-[14px] font-[760] text-white"><X className="h-4 w-4" /> Clear filters</button>
            </div>
          )}

          {!searched && (
            <div className="mt-5 flex flex-wrap gap-2">
              {examples.map((example) => <button key={example} onClick={() => runSearch(example)} className="rounded-full bg-white px-3 py-2 text-[12px] font-[680] text-[#6b625a] shadow-sm ring-1 ring-black/[0.05] transition hover:bg-[#171411] hover:text-white">{example}</button>)}
            </div>
          )}
        </section>

        {!searched && (
          <section className="mt-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[13px] font-[760] uppercase tracking-[0.14em] text-[#ff6b35]">Start with a category</p>
                <h2 className="mt-1 text-[30px] font-[820] tracking-[-0.045em]">Each category page explains how to choose.</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {categoryGroups.map((category) => <Link key={category.id} href={`/category/${category.slug}`} className="rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-black/[0.06] transition hover:-translate-y-0.5 hover:shadow-md"><p className="text-[18px] font-[820]">{category.name}</p><p className="mt-1 text-[13px] leading-5 text-[#736a61]">{category.description}</p></Link>)}
            </div>
          </section>
        )}

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[13px] font-[760] uppercase tracking-[0.14em] text-[#ff6b35]">{searched ? "Matched apps" : "Popular apps"}</p>
              <h2 className="mt-1 text-[32px] font-[820] tracking-[-0.045em]">{searched ? `${resultSet.length} apps that may fit` : "Apps people compare first"}</h2>
            </div>
          </div>
          {searched ? (
            <div className="space-y-4">
              {resultSet.length === 0 ? <div className="rounded-[30px] bg-white p-10 text-center ring-1 ring-black/[0.06]"><p className="font-[700] text-[#6c6258]">No app matched that yet. Try a simpler phrase or browse categories.</p></div> : resultSet.map(({ agent, score }) => <ResultRow key={agent.id} agent={agent} score={score} query={query} />)}
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {resultSet.map(({ agent }) => <AgentCard key={agent.id} agent={agent} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
