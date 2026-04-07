import { notFound } from "next/navigation";
import Link from "next/link";
import { getAgent, getCategoryById, getAgentsByCategory } from "@/lib/data";
import { Star, ExternalLink, Globe, ChevronRight, BookOpen, FileText, Video, MessageSquare } from "lucide-react";
import { AgentCard } from "@/components/AgentCard";
import { AgentIcon } from "@/components/AgentIcon";

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-3 text-right">{stars}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-[#FF9F0A] rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();

  const category = getCategoryById(agent.category_id);
  const relatedAgents = getAgentsByCategory(agent.category_id).filter((a) => a.id !== agent.id).slice(0, 4);

  const priceLabel = () => {
    if (agent.pricing_type === "free") return "Free";
    if (agent.pricing_type === "contact") return "Contact Sales";
    const period = agent.pricing_period === "monthly" ? "/mo" : agent.pricing_period === "yearly" ? "/yr" : agent.pricing_period === "per_use" ? "/use" : "";
    return `$${agent.pricing_amount}${period}`;
  };

  const totalReviews = agent.rating_count;
  const ratingDist = [
    Math.round(totalReviews * 0.6),
    Math.round(totalReviews * 0.2),
    Math.round(totalReviews * 0.1),
    Math.round(totalReviews * 0.05),
    Math.round(totalReviews * 0.05),
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <ChevronRight className="w-3 h-3" />
        {category && (
          <>
            <Link href={`/category/${category.slug}`} className="hover:text-gray-300">{category.name}</Link>
            <ChevronRight className="w-3 h-3" />
          </>
        )}
        <span className="text-gray-300">{agent.name}</span>
      </div>

      {/* Hero */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <AgentIcon name={agent.name} websiteUrl={agent.website_url} size="xl" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
          <p className="text-lg text-gray-400 mt-1">{agent.tagline}</p>
          {agent.creator_name && (
            <p className="text-sm text-[#0A84FF] mt-1">{agent.creator_name}</p>
          )}
          <div className="flex items-center gap-4 mt-4">
            <a
              href={agent.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0A84FF] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#409CFF] transition-colors text-sm"
            >
              {agent.pricing_type === "free" ? "Get" : priceLabel()}
              <ExternalLink className="w-4 h-4" />
            </a>
            {category && (
              <Link href={`/category/${category.slug}`} className="text-sm text-gray-500 hover:text-gray-300">
                {category.icon} {category.name}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* What's New */}
      {agent.whats_new && (
        <section className="mb-8 pb-8 border-b border-white/5">
          <h2 className="text-lg font-bold text-white mb-2">What&apos;s New</h2>
          <p className="text-[15px] text-gray-400">{agent.whats_new}</p>
        </section>
      )}

      {/* Description */}
      <section className="mb-8 pb-8 border-b border-white/5">
        <h2 className="text-lg font-bold text-white mb-2">Description</h2>
        <p className="text-[15px] text-gray-400 leading-relaxed">{agent.description}</p>
      </section>

      {/* Capabilities & Tools */}
      <section className="mb-8 pb-8 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-white mb-3">Capabilities</h2>
            <div className="flex flex-wrap gap-2">
              {agent.capabilities.map((cap) => (
                <span key={cap} className="px-3 py-1.5 bg-white/8 rounded-full text-sm text-gray-300 font-medium">
                  {cap}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-3">Tools</h2>
            <div className="flex flex-wrap gap-2">
              {agent.tools.map((tool) => (
                <span key={tool} className="px-3 py-1.5 bg-[#0A84FF]/15 rounded-full text-sm text-[#0A84FF] font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Special Data */}
      {agent.special_data && (
        <section className="mb-8 pb-8 border-b border-white/5">
          <h2 className="text-lg font-bold text-white mb-2">Special Data & Knowledge</h2>
          <p className="text-[15px] text-gray-400">{agent.special_data}</p>
        </section>
      )}

      {/* Ratings & Reviews */}
      <section className="mb-8 pb-8 border-b border-white/5">
        <h2 className="text-lg font-bold text-white mb-4">Ratings & Reviews</h2>
        {agent.rating_count > 0 ? (
          <div className="flex items-start gap-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-white">{agent.rating_avg.toFixed(1)}</p>
              <div className="flex items-center justify-center gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= Math.round(agent.rating_avg) ? "fill-[#FF9F0A] text-[#FF9F0A]" : "fill-gray-700 text-gray-700"}`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">{agent.rating_count.toLocaleString()} Ratings</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5, 4, 3, 2, 1].map((s, i) => (
                <RatingBar key={s} stars={s} count={ratingDist[i]} total={totalReviews} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#1c1c1e] rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-0.5 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-gray-700 text-gray-700" />
              ))}
            </div>
            <p className="text-gray-400 text-[15px]">No reviews yet</p>
            <p className="text-gray-500 text-sm mt-1">Be the first to review {agent.name}</p>
            <button className="mt-4 bg-[#0A84FF] text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-[#409CFF] transition-colors">
              Write a Review
            </button>
          </div>
        )}
      </section>

      {/* Information */}
      <section className="mb-8 pb-8 border-b border-white/5">
        <h2 className="text-lg font-bold text-white mb-4">Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500 font-medium">Category</p>
            <p className="text-sm text-gray-300 mt-0.5">{category?.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Pricing</p>
            <p className="text-sm text-gray-300 mt-0.5">{priceLabel()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Creator</p>
            <p className="text-sm text-gray-300 mt-0.5">{agent.creator_name || "Independent"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Website</p>
            <a href={agent.website_url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#0A84FF] mt-0.5 flex items-center gap-1 hover:underline">
              <Globe className="w-3 h-3" /> Visit
            </a>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="mb-8 pb-8 border-b border-white/5">
        <h2 className="text-lg font-bold text-white mb-4">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a
            href={agent.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#1c1c1e] rounded-xl p-4 border border-white/[0.06] hover:border-[#0A84FF]/30 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0A84FF]/10 flex items-center justify-center flex-shrink-0">
              <Globe className="w-4 h-4 text-[#0A84FF]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white group-hover:text-[#0A84FF] transition-colors">Official Website</p>
              <p className="text-[12px] text-gray-500 truncate">{agent.website_url}</p>
            </div>
          </a>
          <a
            href={`${agent.website_url}${agent.website_url.endsWith("/") ? "" : "/"}docs`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#1c1c1e] rounded-xl p-4 border border-white/[0.06] hover:border-[#0A84FF]/30 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-purple-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors">Documentation</p>
              <p className="text-[12px] text-gray-500">Guides, API docs, and getting started</p>
            </div>
          </a>
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(agent.name + " tutorial getting started")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#1c1c1e] rounded-xl p-4 border border-white/[0.06] hover:border-[#0A84FF]/30 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-green-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white group-hover:text-green-400 transition-colors">Tutorials & Guides</p>
              <p className="text-[12px] text-gray-500">Community tutorials and walkthroughs</p>
            </div>
          </a>
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(agent.name + " tutorial review")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#1c1c1e] rounded-xl p-4 border border-white/[0.06] hover:border-[#0A84FF]/30 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <Video className="w-4 h-4 text-red-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">Video Reviews</p>
              <p className="text-[12px] text-gray-500">YouTube tutorials and reviews</p>
            </div>
          </a>
        </div>
      </section>

      {/* You Might Also Like */}
      {relatedAgents.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-white mb-4">You Might Also Like</h2>
          <div className="bg-[#1c1c1e] rounded-[20px] divide-y divide-white/5">
            {relatedAgents.map((a) => (
              <div key={a.id} className="px-5 py-4">
                <AgentCard agent={a} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
