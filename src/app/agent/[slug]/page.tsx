import { notFound } from "next/navigation";
import Link from "next/link";
import { agents, categories, getCategory } from "@/lib/data";
import { ChevronRight, ExternalLink, Zap, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
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
    <div className="min-h-screen">
      {/* Category accent strip */}
      <div
        className="h-1"
        style={{ background: `linear-gradient(to right, ${catColor}, ${catColor}60)` }}
      />

      {/* Header */}
      <section className="relative overflow-hidden bg-white border-b border-black/[0.06]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ background: `radial-gradient(ellipse at 30% 0%, ${catColor}, transparent 60%)` }}
        />
        <div className="relative max-w-4xl mx-auto px-5 pt-6 pb-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            {category && (
              <>
                <Link href={`/category/${category.slug}`} className="hover:text-gray-900 transition-colors">{category.name}</Link>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
            <span className="text-gray-900 font-medium">{agent.name}</span>
          </div>

          {/* Main info */}
          <div className="flex items-start gap-6">
            <AgentIcon
              name={agent.name}
              websiteUrl={agent.url}
              iconUrl=""
              size="xl"
              className="rounded-2xl shadow-lg"
              glowColor={catColor}
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-[30px] font-bold text-gray-900">{agent.name}</h1>
                {agent.agenticDepth >= 4 && (
                  <span
                    className="inline-flex items-center gap-1 text-[12px] font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ backgroundColor: catColor }}
                  >
                    <Zap className="w-3.5 h-3.5" />Highly autonomous
                  </span>
                )}
              </div>
              <p className="text-[17px] text-gray-600 mt-2.5 leading-relaxed max-w-xl">{agent.jobToBeDone}</p>

              <div className="flex items-center gap-3 mt-6">
                <a
                  href={agent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-11 px-6 text-white font-semibold text-[14px] rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                  style={{ backgroundColor: catColor }}
                >
                  Try {agent.name} <ExternalLink className="w-4 h-4" />
                </a>
                <span className="text-[14px] font-medium text-gray-700 bg-gray-100 px-4 py-2.5 rounded-xl">{agent.pricing}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="max-w-4xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            {/* Why over ChatGPT — KEY DIFFERENTIATOR, shown first prominently */}
            {agent.whyOverChatGPT && (
              <div
                className="rounded-2xl p-6 border"
                style={{
                  backgroundColor: `${catColor}08`,
                  borderColor: `${catColor}20`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5" style={{ color: catColor }} />
                  <h2 className="font-bold text-[17px] text-gray-900">Why use this instead of ChatGPT?</h2>
                </div>
                <p className="text-[15px] text-gray-700 leading-relaxed">{agent.whyOverChatGPT}</p>
              </div>
            )}

            {/* What it does */}
            <div>
              <h2 className="font-bold text-[17px] text-gray-900 mb-4">What it does for you</h2>
              <div className="bg-white rounded-xl border border-black/[0.06] p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">You give it</p>
                    <p className="text-[15px] text-gray-700 leading-relaxed">{agent.userInput}</p>
                  </div>
                  <div className="border-t border-black/[0.04] pt-4">
                    <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">You get back</p>
                    <p className="text-[15px] text-gray-700 leading-relaxed">{agent.outputAction}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            {agent.traction && agent.traction.toLowerCase() !== "unknown" && (
              <div>
                <h2 className="font-bold text-[17px] text-gray-900 mb-4">Traction & proof</h2>
                <div className="bg-white rounded-xl border border-black/[0.06] p-6">
                  <p className="text-[15px] text-gray-700 leading-relaxed">{agent.traction}</p>
                </div>
              </div>
            )}

            {/* Capabilities */}
            {agent.capabilities.length > 0 && (
              <div>
                <h2 className="font-bold text-[17px] text-gray-900 mb-4">Capabilities & tools</h2>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((cap) => (
                    <span key={cap} className="inline-flex items-center gap-1.5 text-[13px] text-gray-700 bg-white border border-black/[0.06] px-3.5 py-2 rounded-xl">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      {cap.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — compact visual format */}
          <div className="space-y-5">
            {/* Visual stats card */}
            <div className="bg-white rounded-2xl border border-black/[0.06] p-5 space-y-4">
              {/* Autonomy visual */}
              <div>
                <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">Autonomy level</p>
                <div className="flex gap-1 items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex-1 h-2.5 rounded-full transition-colors"
                      style={{
                        backgroundColor: i <= agent.agenticDepth ? catColor : "#e5e7eb",
                      }}
                    />
                  ))}
                </div>
                <p className="text-[12px] text-gray-500 mt-1.5">{agent.agenticDepth}/5 — {agent.agenticDepth >= 4 ? "Highly autonomous" : agent.agenticDepth >= 3 ? "Semi-autonomous" : "Assisted"}</p>
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Workflow</span>
                  <span className="text-[13px] font-semibold text-gray-900">{agent.workflowCompletion}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Memory</span>
                  <span className="text-[13px] font-semibold text-gray-900">{agent.memoryAdvantage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Category</span>
                  <Link
                    href={`/category/${agent.categorySlug}`}
                    className="text-[13px] font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: catColor }}
                  >
                    {CATEGORY_ICONS[agent.categorySlug]} {category?.name}
                  </Link>
                </div>
              </div>
            </div>

            {/* Visit CTA */}
            <a
              href={agent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-12 text-white font-semibold text-[14px] rounded-xl hover:opacity-90 transition-opacity shadow-md"
              style={{ backgroundColor: catColor }}
            >
              Visit website <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Comments section */}
        <div className="mt-12">
          <Comments agentSlug={agent.slug} />
        </div>
      </section>

      {/* Also consider — related apps */}
      {relatedAgents.length > 0 && (
        <section className="bg-gray-50 border-t border-black/[0.04]">
          <div className="max-w-4xl mx-auto px-5 py-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-bold text-[20px] text-gray-900">Also consider</h2>
                <p className="text-[14px] text-gray-500 mt-1">Other {category?.name} apps worth checking out</p>
              </div>
              <Link href={`/category/${agent.categorySlug}`} className="text-[13px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
