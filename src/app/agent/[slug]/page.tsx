import { notFound } from "next/navigation";
import Link from "next/link";
import { agents, categories, getCategory } from "@/lib/data";
import { ChevronRight, ExternalLink, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { AgentIcon } from "@/components/AgentIcon";
import { AgentCard } from "@/components/AgentCard";
import { Comments } from "@/components/Comments";
import type { Metadata } from "next";

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

export async function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const agent = agents.find((a) => a.slug === slug);
  if (!agent) return {};
  return {
    title: `${agent.name} — ${agent.jobToBeDone} | Every AI App`,
    description: agent.jobToBeDone,
  };
}

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = agents.find((a) => a.slug === slug);
  if (!agent) notFound();

  const category = getCategory(agent.categorySlug);
  const relatedAgents = agents
    .filter((a) => a.categorySlug === agent.categorySlug && a.id !== agent.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-5 pt-6 pb-10">
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
          <div className="flex items-start gap-5">
            <AgentIcon name={agent.name} websiteUrl={agent.url} iconUrl="" size="xl" className="rounded-2xl shadow-md" />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-[28px] font-bold text-gray-900">{agent.name}</h1>
                {agent.agenticDepth >= 4 && (
                  <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                    <Zap className="w-3.5 h-3.5" />Highly autonomous
                  </span>
                )}
              </div>
              <p className="text-[16px] text-gray-600 mt-2 leading-relaxed max-w-xl">{agent.jobToBeDone}</p>

              <div className="flex items-center gap-3 mt-5">
                <a
                  href={agent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-10 px-5 bg-indigo-600 text-white font-semibold text-[14px] rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Try {agent.name} <ExternalLink className="w-4 h-4" />
                </a>
                <span className="text-[14px] font-medium text-gray-700 bg-gray-100 px-3.5 py-2 rounded-xl">{agent.pricing}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="max-w-4xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            {/* What it does */}
            <div>
              <h2 className="font-semibold text-[16px] text-gray-900 mb-3">What it does for you</h2>
              <div className="bg-white rounded-xl border border-black/[0.06] p-5">
                <div className="space-y-3">
                  <div>
                    <p className="text-[12px] font-medium text-gray-500 uppercase tracking-wider mb-1">You give it</p>
                    <p className="text-[14px] text-gray-700 leading-relaxed">{agent.userInput}</p>
                  </div>
                  <div className="border-t border-black/[0.04] pt-3">
                    <p className="text-[12px] font-medium text-gray-500 uppercase tracking-wider mb-1">You get back</p>
                    <p className="text-[14px] text-gray-700 leading-relaxed">{agent.outputAction}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why over ChatGPT */}
            {agent.whyOverChatGPT && (
              <div>
                <h2 className="font-semibold text-[16px] text-gray-900 mb-3">Why use this instead of ChatGPT?</h2>
                <div className="bg-indigo-50/60 rounded-xl border border-indigo-100 p-5">
                  <p className="text-[14px] text-indigo-800 leading-relaxed">{agent.whyOverChatGPT}</p>
                </div>
              </div>
            )}

            {/* Trust signals */}
            {agent.traction && agent.traction.toLowerCase() !== "unknown" && (
              <div>
                <h2 className="font-semibold text-[16px] text-gray-900 mb-3">Traction & proof</h2>
                <div className="bg-white rounded-xl border border-black/[0.06] p-5">
                  <p className="text-[14px] text-gray-700 leading-relaxed">{agent.traction}</p>
                </div>
              </div>
            )}

            {/* Capabilities */}
            {agent.capabilities.length > 0 && (
              <div>
                <h2 className="font-semibold text-[16px] text-gray-900 mb-3">Capabilities & tools</h2>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((cap) => (
                    <span key={cap} className="inline-flex items-center gap-1.5 text-[13px] text-gray-700 bg-white border border-black/[0.06] px-3 py-1.5 rounded-lg">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      {cap.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick facts */}
            <div className="bg-white rounded-xl border border-black/[0.06] p-5">
              <h3 className="font-semibold text-[14px] text-gray-900 mb-4">Quick facts</h3>
              <div className="space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Autonomy level</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-5 h-2 rounded-full ${i <= agent.agenticDepth ? "bg-indigo-500" : "bg-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Workflow</span>
                  <span className="text-[13px] font-medium text-gray-900">{agent.workflowCompletion}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Memory</span>
                  <span className="text-[13px] font-medium text-gray-900">{agent.memoryAdvantage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Pricing</span>
                  <span className="text-[13px] font-medium text-gray-900">{agent.pricing}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Category</span>
                  <Link href={`/category/${agent.categorySlug}`} className="text-[13px] font-medium text-indigo-600 hover:text-indigo-800">
                    {CATEGORY_ICONS[agent.categorySlug]} {category?.name}
                  </Link>
                </div>
              </div>
            </div>

            {/* Visit */}
            <a
              href={agent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-11 bg-gray-900 text-white font-semibold text-[14px] rounded-xl hover:bg-gray-800 transition-colors"
            >
              Visit website <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Comments section */}
        <div className="mt-10">
          <Comments agentSlug={agent.slug} />
        </div>
      </section>

      {/* Related apps */}
      {relatedAgents.length > 0 && (
        <section className="bg-gray-50 border-t border-black/[0.04]">
          <div className="max-w-4xl mx-auto px-5 py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-[18px] text-gray-900">More {category?.name} apps</h2>
              <Link href={`/category/${agent.categorySlug}`} className="text-[13px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
