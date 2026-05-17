import Link from "next/link";
import { Agent } from "@/lib/types";
import { Zap, Sparkles } from "lucide-react";
import { AgentIcon } from "./AgentIcon";

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

const CATEGORY_GRADIENTS: Record<string, string> = {
  "career-job-search": "from-violet-500/20 via-purple-400/10 to-indigo-300/5",
  "companion-life-coach": "from-pink-500/20 via-pink-400/10 to-rose-300/5",
  "dressing-style": "from-amber-500/20 via-amber-400/10 to-yellow-300/5",
  "family-parenting": "from-emerald-500/20 via-emerald-400/10 to-green-300/5",
  "health-wellness-fitness": "from-rose-500/20 via-rose-400/10 to-pink-300/5",
  "home-real-estate": "from-cyan-500/20 via-cyan-400/10 to-sky-300/5",
  "learning-tutoring": "from-blue-500/20 via-blue-400/10 to-indigo-300/5",
  "personal-finance": "from-teal-500/20 via-teal-400/10 to-emerald-300/5",
  "relationship-dating": "from-rose-500/20 via-rose-400/10 to-pink-300/5",
  "shopping-purchase-decisions": "from-orange-500/20 via-orange-400/10 to-amber-300/5",
  "travel-organiser": "from-sky-500/20 via-sky-400/10 to-blue-300/5",
};

type Rarity = "common" | "uncommon" | "rare" | "legendary";

function getRarity(depth: number): { rarity: Rarity; label: string; color: string; dotColor: string } {
  if (depth >= 5) return { rarity: "legendary", label: "Legendary", color: "text-amber-700 bg-amber-50 border-amber-200", dotColor: "bg-amber-400" };
  if (depth >= 4) return { rarity: "rare", label: "Rare", color: "text-purple-700 bg-purple-50 border-purple-200", dotColor: "bg-purple-400" };
  if (depth >= 3) return { rarity: "uncommon", label: "Uncommon", color: "text-emerald-700 bg-emerald-50 border-emerald-200", dotColor: "bg-emerald-400" };
  return { rarity: "common", label: "Common", color: "text-gray-600 bg-gray-50 border-gray-200", dotColor: "bg-gray-400" };
}

function PricingPill({ pricing }: { pricing: string }) {
  const lower = pricing.toLowerCase();
  if (lower.includes("free") && !lower.includes("paid") && !lower.includes("premium") && !lower.includes("pro plan")) {
    return <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">Free</span>;
  }
  if (lower.includes("free")) {
    return <span className="text-[11px] font-medium text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">Freemium</span>;
  }
  const match = pricing.match(/\$[\d.]+/);
  if (match) {
    return <span className="text-[11px] font-medium text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">{match[0]}/mo</span>;
  }
  return <span className="text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">Paid</span>;
}

function AutonomyDots({ depth }: { depth: number }) {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            i <= depth ? "bg-current opacity-80" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export function AgentCard({ agent }: { agent: Agent }) {
  const catColor = CATEGORY_COLORS[agent.categorySlug] || "#6366f1";
  const catGradient = CATEGORY_GRADIENTS[agent.categorySlug] || "from-indigo-500/20 via-indigo-400/10 to-purple-300/5";
  const { rarity, dotColor } = getRarity(agent.agenticDepth);
  const isLegendary = rarity === "legendary";

  return (
    <Link href={`/agent/${agent.slug}`} className="group block h-full">
      <div
        className={`relative h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out ${isLegendary ? "card-legendary" : ""}`}
      >
        {/* Category gradient top band */}
        <div className={`h-20 bg-gradient-to-br ${catGradient} relative`}>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 80%, ${catColor}15, transparent 60%)`,
            }}
          />
          {/* Rarity dot */}
          <div className="absolute top-3 right-3">
            <div className={`w-2.5 h-2.5 rounded-full ${dotColor} shadow-sm`} />
          </div>
        </div>

        {/* Icon centered overlapping */}
        <div className="flex justify-center -mt-7 relative z-[2]">
          <AgentIcon
            name={agent.name}
            websiteUrl={agent.url}
            iconUrl=""
            size="md"
            className="rounded-2xl shadow-lg border-[3px] border-white"
            glowColor={catColor}
          />
        </div>

        {/* Content */}
        <div className="px-4 pb-4 pt-3 text-center">
          <h3 className="font-bold text-[15px] text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight truncate">
            {agent.name}
          </h3>
          <p className="text-[13px] text-gray-500 mt-1.5 line-clamp-1 leading-snug">
            {agent.jobToBeDone}
          </p>

          {/* Pricing pill */}
          <div className="mt-3">
            <PricingPill pricing={agent.pricing} />
          </div>

          {/* Bottom: autonomy dots + end-to-end badge */}
          <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-gray-50">
            <div className="flex items-center gap-1.5" style={{ color: catColor }}>
              <AutonomyDots depth={agent.agenticDepth} />
            </div>
            {agent.workflowCompletion === "High" && (
              <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                End-to-end
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function AgentCardCompact({ agent }: { agent: Agent }) {
  const catColor = CATEGORY_COLORS[agent.categorySlug] || "#6366f1";

  return (
    <Link href={`/agent/${agent.slug}`} className="group block">
      <div className="flex items-center gap-3.5 bg-white rounded-xl border border-gray-100 px-4 py-3.5 hover:border-gray-200 hover:shadow-md hover:shadow-gray-100/60 transition-all duration-300">
        <div className="relative">
          <div
            className="absolute -inset-0.5 rounded-xl opacity-40"
            style={{ background: catColor }}
          />
          <AgentIcon name={agent.name} websiteUrl={agent.url} iconUrl="" size="sm" className="rounded-xl shadow-sm relative" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[14px] text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{agent.name}</h3>
          <p className="text-[12px] text-gray-500 truncate mt-0.5">{agent.jobToBeDone}</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: catColor }}
          />
          <PricingPill pricing={agent.pricing} />
        </div>
      </div>
    </Link>
  );
}

export function AgentCardFeatured({ agent }: { agent: Agent }) {
  const catColor = CATEGORY_COLORS[agent.categorySlug] || "#6366f1";
  const catGradient = CATEGORY_GRADIENTS[agent.categorySlug] || "from-indigo-500/20 via-indigo-400/10 to-purple-300/5";
  const { rarity, label, color } = getRarity(agent.agenticDepth);
  const isLegendary = rarity === "legendary";

  return (
    <Link href={`/agent/${agent.slug}`} className="group block h-full">
      <div
        className={`relative h-full bg-white rounded-[20px] border border-gray-100 overflow-hidden hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 ease-out card-featured-hover ${isLegendary ? "card-legendary" : ""}`}
      >
        {/* Large category gradient header */}
        <div className={`h-28 bg-gradient-to-br ${catGradient} relative`}>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 50% 100%, ${catColor}20, transparent 60%), radial-gradient(circle at 80% 20%, ${catColor}10, transparent 40%)`,
            }}
          />
          {/* Rarity badge */}
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm ${color}`}>
              <Zap className="w-3 h-3" />{label}
            </span>
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center -mt-9 relative z-[2]">
          <AgentIcon
            name={agent.name}
            websiteUrl={agent.url}
            iconUrl=""
            size="lg"
            className="rounded-2xl shadow-xl border-[4px] border-white"
            glowColor={catColor}
          />
        </div>

        <div className="px-5 pb-5 pt-3 text-center">
          {/* Name */}
          <h3 className="font-bold text-[18px] text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">
            {agent.name}
          </h3>
          <p className="text-[14px] text-gray-500 mt-2 leading-relaxed line-clamp-2">
            {agent.jobToBeDone}
          </p>

          {/* Pricing + end-to-end */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <PricingPill pricing={agent.pricing} />
            {agent.workflowCompletion === "High" && (
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
                End-to-end
              </span>
            )}
          </div>

          {/* Why over ChatGPT hook */}
          {agent.whyOverChatGPT && (
            <div className="mt-4 bg-gradient-to-r from-indigo-50/80 to-purple-50/60 rounded-xl p-3.5 border border-indigo-100/50 text-left">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Why this over ChatGPT</span>
              </div>
              <p className="text-[12px] text-indigo-800/80 leading-[1.5] line-clamp-2">{agent.whyOverChatGPT}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
