import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategory, categories } from "@/lib/data";
import { getAgentsByCategory } from "@/lib/db";
import { getCategoryContent } from "@/lib/category-content";
import { AgentCard } from "@/components/AgentCard";
import { ChevronRight, ShieldCheck, Sparkles, Search, Layers3 } from "lucide-react";
import { CategoryIcon } from "@/components/CategoryIcon";

export const revalidate = 60;

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[12px] font-[510] text-[#d0d6e0]">
      {children}
    </span>
  );
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const categoryAgents = await getAgentsByCategory(category.id);
  const content = getCategoryContent(category.slug);
  const topAgents = [...categoryAgents]
    .sort((a, b) => (b.rating_avg * Math.max(b.rating_count, 1)) - (a.rating_avg * Math.max(a.rating_count, 1)))
    .slice(0, 3);

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#8a8f98] mb-8">
        <Link href="/" className="hover:text-[#d0d6e0]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/discover" className="hover:text-[#d0d6e0]">Discover</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#d0d6e0]">{category.name}</span>
      </div>

      {/* Rich category hero */}
      <section className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[radial-gradient(circle_at_20%_0%,rgba(94,106,210,0.24),transparent_32%),linear-gradient(135deg,#101112_0%,#0b0c0d_54%,#08090a_100%)] p-6 md:p-10 mb-8">
        <div className="absolute right-0 top-0 h-64 w-64 translate-x-16 -translate-y-20 rounded-full bg-[#5e6ad2]/10 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[12px] font-[510] text-[#d0d6e0] backdrop-blur">
              <CategoryIcon slug={category.slug} size="sm" />
              <span>{categoryAgents.length} agents in {category.name}</span>
            </div>
            <h1 className="max-w-3xl text-[40px] font-[590] leading-[1.02] tracking-[-1.2px] text-[#f7f8f8] md:text-[64px] md:tracking-[-2px]">
              Best AI agents for {category.name.toLowerCase()}.
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#a5abb4] md:text-[17px]">
              {content.userMoment}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {content.useCases.slice(0, 6).map((useCase) => (
                <Pill key={useCase}>{useCase}</Pill>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-white/[0.08] bg-[#08090a]/80 p-4 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-[590] uppercase tracking-[0.14em] text-[#62666d]">Decision guide</p>
                <p className="mt-1 text-[15px] font-[590] text-[#f7f8f8]">Compare by what matters</p>
              </div>
              <Search className="h-4 w-4 text-[#5e6ad2]" />
            </div>
            <div className="space-y-2.5">
              {content.comparisonCriteria.slice(0, 5).map((criterion, index) => (
                <div key={criterion} className="flex items-center gap-3 rounded-[14px] border border-white/[0.06] bg-white/[0.025] px-3 py-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5e6ad2]/15 text-[11px] font-[590] text-[#8f98ff]">{index + 1}</span>
                  <span className="text-[13px] text-[#d0d6e0]">{criterion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category intelligence */}
      <section className="mb-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[22px] border border-white/[0.06] bg-[#0f1011] p-5">
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#5e6ad2]/15">
            <Sparkles className="h-4 w-4 text-[#8f98ff]" />
          </div>
          <h2 className="text-[15px] font-[590] text-[#f7f8f8]">Design pattern</h2>
          <p className="mt-2 text-[13px] leading-6 text-[#8a8f98]">{content.visualDirection}</p>
        </div>
        <div className="rounded-[22px] border border-white/[0.06] bg-[#0f1011] p-5">
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[12px] bg-emerald-400/15">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
          </div>
          <h2 className="text-[15px] font-[590] text-[#f7f8f8]">Trust checks</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {content.trustSignals.slice(0, 5).map((signal) => (
              <span key={signal} className="rounded-full bg-white/[0.045] px-2.5 py-1 text-[11px] text-[#a5abb4]">{signal}</span>
            ))}
          </div>
        </div>
        <div className="rounded-[22px] border border-white/[0.06] bg-[#0f1011] p-5">
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[12px] bg-orange-400/15">
            <Layers3 className="h-4 w-4 text-orange-300" />
          </div>
          <h2 className="text-[15px] font-[590] text-[#f7f8f8]">Popular searches</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {content.seoAngles.slice(0, 4).map((angle) => (
              <span key={angle} className="rounded-full bg-white/[0.045] px-2.5 py-1 text-[11px] text-[#a5abb4]">{angle}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Top picks */}
      {topAgents.length > 0 && (
        <section className="mb-8 rounded-[24px] border border-white/[0.06] bg-[#0f1011] p-5 md:p-6">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-[590] uppercase tracking-[0.14em] text-[#62666d]">Start here</p>
              <h2 className="mt-1 text-[22px] font-[590] tracking-[-0.4px] text-[#f7f8f8]">Top {category.name} agents to compare</h2>
            </div>
            <Link href="/discover" className="hidden rounded-full bg-white/[0.05] px-3 py-1.5 text-[12px] font-[510] text-[#d0d6e0] hover:bg-white/[0.08] md:inline-flex">
              Search all agents
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {topAgents.map((agent) => (
              <div key={agent.id} className="rounded-[18px] border border-white/[0.06] bg-[#08090a] p-4">
                <AgentCard agent={agent} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Agents list */}
      {categoryAgents.length > 0 ? (
        <section className="rounded-[24px] border border-white/[0.06] bg-[#0f1011] overflow-hidden">
          <div className="flex flex-col gap-2 border-b border-white/[0.06] px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-[18px] font-[590] text-white">All {category.name} agents</h2>
              <p className="text-[13px] text-[#8a8f98]">Compare pricing, fit, ratings, and capabilities.</p>
            </div>
            <Link href={`/discover?category=${category.slug}`} className="text-[13px] font-[510] text-[#8f98ff] hover:text-[#b6bcff]">
              Filter in discover
            </Link>
          </div>
          <div className="divide-y divide-white/[0.06]">
            {categoryAgents.map((agent) => (
              <div key={agent.id} className="px-5 py-4">
                <AgentCard agent={agent} />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center py-20 rounded-[24px] border border-white/[0.06] bg-[#0f1011]">
          <p className="text-[#8a8f98] text-lg">No agents in this category yet</p>
          <Link href="/submit" className="text-[#5e6ad2] text-sm font-medium mt-2 inline-block hover:underline">
            Submit the first one
          </Link>
        </div>
      )}

      {/* SEO / examples */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-[22px] border border-white/[0.06] bg-[#0f1011] p-5">
          <h2 className="text-[16px] font-[590] text-[#f7f8f8]">What to evaluate</h2>
          <ul className="mt-3 space-y-2 text-[13px] leading-6 text-[#8a8f98]">
            {content.comparisonCriteria.map((criterion) => (
              <li key={criterion} className="flex gap-2"><span className="text-[#5e6ad2]">•</span>{criterion}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[22px] border border-white/[0.06] bg-[#0f1011] p-5">
          <h2 className="text-[16px] font-[590] text-[#f7f8f8]">Reference products</h2>
          <p className="mt-2 text-[13px] leading-6 text-[#8a8f98]">
            People searching this category often compare agents and tools like {content.examples.join(", ")}.
          </p>
          <p className="mt-4 text-[12px] leading-5 text-[#62666d]">
            Use these examples as reference points, then verify current pricing, permissions, and integrations on each agent page.
          </p>
        </div>
      </section>

      {/* Other categories */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-white mb-4">Other Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories
            .filter((c) => c.id !== category.id)
            .slice(0, 5)
            .map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="bg-[#0f1011] rounded-2xl p-4 hover:bg-[#101112] transition-colors"
              >
                <CategoryIcon slug={cat.slug} />
                <p className="font-semibold text-sm text-white mt-2">{cat.name}</p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
