import { notFound } from "next/navigation";
import Link from "next/link";
import { agents, categories, getCategory } from "@/lib/data";
import { ChevronRight, ExternalLink, Zap, ArrowRight, CheckCircle, Sparkles, Star, ArrowUpRight, Shield, Brain, Workflow } from "lucide-react";
import { AgentIcon } from "@/components/AgentIcon";
import { AgentCard } from "@/components/AgentCard";
import { Comments } from "@/components/Comments";
import type { Metadata } from "next";

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

const DEPTH_LABELS: Record<number, string> = {
  5: "Fully autonomous",
  4: "Highly autonomous",
  3: "Semi-autonomous",
  2: "AI-assisted",
  1: "Manual with AI help",
};

export async function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const agent = agents.find((a) => a.slug === slug);
  if (!agent) return {};
  return {
    title: `${agent.name} — ${agent.jobToBeDone} | Agentstore`,
    description: agent.jobToBeDone,
  };
}

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = agents.find((a) => a.slug === slug);
  if (!agent) notFound();

  const category = getCategory(agent.categorySlug);
  const catColor = CATEGORY_COLORS[agent.categorySlug] || "#6366f1";
  const relatedAgents = agents
    .filter((a) => a.categorySlug === agent.categorySlug && a.id !== agent.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero header with gradient */}
      <section className="relative overflow-hidden bg-white">
        {/* Big gradient background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${catColor}, transparent)` }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ background: `linear-gradient(to right, ${catColor}, ${catColor}80, ${catColor}30)` }}
        />

        <div className="relative max-w-5xl mx-auto px-5 pt-6 pb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-10">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            {category && (
              <>
                <Link href={`/category/${category.slug}`} className="hover:text-gray-700 transition-colors">{category.name}</Link>
                <ChevronRight className="w-3 h-3" />
              </>
            )}
            <span className="text-gray-600">{agent.name}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left: icon + info */}
            <div className="flex-1">
              <div className="flex items-start gap-5">
                <AgentIcon
                  name={agent.name}
                  websiteUrl={agent.url}
                  iconUrl=""
                  size="xl"
                  className="rounded-[20px] shadow-xl border-2 border-white"
                  glowColor={catColor}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <Link
                      href={`/category/${agent.categorySlug}`}
                      className="text-[12px] font-semibold px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: catColor }}
                    >
                      {CATEGORY_ICONS[agent.categorySlug]} {category?.name}
                    </Link>
                    {agent.agenticDepth >= 4 && (
                      <span className="text-[12px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3" /> {DEPTH_LABELS[agent.agenticDepth]}
                      </span>
                    )}
                  </div>
                  <h1 className="text-[32px] font-bold text-gray-900 mt-2">{agent.name}</h1>
                  <p className="text-[17px] text-gray-500 mt-2 leading-relaxed max-w-xl">{agent.jobToBeDone}</p>
                </div>
              </div>

              {/* CTA row */}
              <div className="flex items-center gap-3 mt-7 ml-[calc(88px+20px)]">
                <a
                  href={agent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-7 text-white font-semibold text-[15px] rounded-xl hover:opacity-90 transition-all shadow-lg"
                  style={{ backgroundColor: catColor, boxShadow: `0 8px 24px ${catColor}30` }}
                >
                  Try {agent.name} <ArrowUpRight className="w-4 h-4" />
                </a>
                <span className="text-[14px] font-medium text-gray-600 bg-gray-100 px-4 py-3 rounded-xl">{agent.pricing}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-gray-200/60 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            <div className="py-5 px-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap className="w-4 h-4" style={{ color: catColor }} />
                <span className="text-[22px] font-bold text-gray-900">{agent.agenticDepth}/5</span>
              </div>
              <p className="text-[12px] text-gray-500 font-medium">Autonomy</p>
            </div>
            <div className="py-5 px-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Workflow className="w-4 h-4" style={{ color: catColor }} />
                <span className="text-[22px] font-bold text-gray-900">{agent.workflowCompletion}</span>
              </div>
              <p className="text-[12px] text-gray-500 font-medium">Workflow</p>
            </div>
            <div className="py-5 px-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Brain className="w-4 h-4" style={{ color: catColor }} />
                <span className="text-[15px] font-bold text-gray-900">{agent.memoryAdvantage}</span>
              </div>
              <p className="text-[12px] text-gray-500 font-medium">Memory</p>
            </div>
            <div className="py-5 px-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Shield className="w-4 h-4" style={{ color: catColor }} />
                <span className="text-[15px] font-bold text-gray-900">{agent.relevanceScore}/5</span>
              </div>
              <p className="text-[12px] text-gray-500 font-medium">Relevance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-5xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left column: main content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Why over ChatGPT — hero card */}
            {agent.whyOverChatGPT && (
              <div
                className="rounded-2xl p-6 border-2"
                style={{
                  backgroundColor: `${catColor}06`,
                  borderColor: `${catColor}25`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${catColor}15` }}>
                    <Sparkles className="w-4 h-4" style={{ color: catColor }} />
                  </div>
                  <h2 className="font-bold text-[16px] text-gray-900">Why this over ChatGPT?</h2>
                </div>
                <p className="text-[15px] text-gray-700 leading-relaxed">{agent.whyOverChatGPT}</p>
              </div>
            )}

            {/* Input / Output card */}
            <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-bold text-[16px] text-gray-900">How it works</h2>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-4 h-4 text-indigo-500 rotate-[90deg]" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-indigo-600 uppercase tracking-wider mb-1">You give it</p>
                    <p className="text-[15px] text-gray-700 leading-relaxed">{agent.userInput}</p>
                  </div>
                </div>
                <div className="border-t border-dashed border-gray-200 mx-14" />
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-emerald-600 uppercase tracking-wider mb-1">You get back</p>
                    <p className="text-[15px] text-gray-700 leading-relaxed">{agent.outputAction}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            {agent.traction && agent.traction.toLowerCase() !== "unknown" && (
              <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-amber-500" />
                  <h2 className="font-bold text-[16px] text-gray-900">Traction & proof</h2>
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed">{agent.traction}</p>
              </div>
            )}

            {/* Capabilities */}
            {agent.capabilities.length > 0 && (
              <div>
                <h2 className="font-bold text-[16px] text-gray-900 mb-4">Capabilities</h2>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((cap) => (
                    <span key={cap} className="inline-flex items-center gap-1.5 text-[13px] text-gray-700 bg-white border border-gray-200/60 px-3.5 py-2 rounded-xl shadow-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      {cap.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column: sticky sidebar */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-20 space-y-5">
              {/* Autonomy visual card */}
              <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
                <h3 className="font-bold text-[14px] text-gray-900 mb-5">Autonomy breakdown</h3>

                {/* Visual bar */}
                <div className="mb-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-3 rounded-full transition-colors first:rounded-l-full last:rounded-r-full"
                        style={{
                          backgroundColor: i <= agent.agenticDepth ? catColor : "#f3f4f6",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-[13px] font-semibold mt-2" style={{ color: catColor }}>
                    {DEPTH_LABELS[agent.agenticDepth] || "AI-assisted"}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-gray-500">Workflow</span>
                    <span className="text-[13px] font-semibold text-gray-900">{agent.workflowCompletion}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-gray-500">Memory</span>
                    <span className="text-[13px] font-semibold text-gray-900">{agent.memoryAdvantage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-gray-500">Pricing</span>
                    <span className="text-[13px] font-semibold text-gray-900">{agent.pricing}</span>
                  </div>
                </div>
              </div>

              {/* CTA card */}
              <div
                className="rounded-2xl p-6 text-white"
                style={{ backgroundColor: catColor }}
              >
                <p className="font-bold text-[15px] mb-2">Ready to try {agent.name}?</p>
                <p className="text-[13px] opacity-80 mb-4 leading-relaxed">{agent.pricing}</p>
                <a
                  href={agent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-11 bg-white/20 backdrop-blur font-semibold text-[14px] rounded-xl hover:bg-white/30 transition-colors"
                >
                  Visit website <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Category link */}
              <Link
                href={`/category/${agent.categorySlug}`}
                className="flex items-center gap-3 bg-white rounded-2xl border border-gray-200/60 p-4 hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{CATEGORY_ICONS[agent.categorySlug]}</span>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-gray-900">More {category?.name} apps</p>
                  <p className="text-[12px] text-gray-500">{category?.agentCount} apps in this category</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-14 max-w-3xl">
          <Comments agentSlug={agent.slug} />
        </div>
      </section>

      {/* Also consider */}
      {relatedAgents.length > 0 && (
        <section className="border-t border-gray-200/60 bg-white">
          <div className="max-w-5xl mx-auto px-5 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-bold text-[22px] text-gray-900">Also consider</h2>
                <p className="text-[14px] text-gray-500 mt-1">Similar apps in {category?.name}</p>
              </div>
              <Link href={`/category/${agent.categorySlug}`} className="text-[13px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedAgents.map((a) => (
                <AgentCard key={a.id} agent={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
