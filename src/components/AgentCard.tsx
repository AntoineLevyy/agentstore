import Link from "next/link";
import { Agent } from "@/lib/types";
import { Zap, Sparkles, ArrowUpRight } from "lucide-react";
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

type Rarity = "common" | "uncommon" | "rare" | "legendary";

function getRarity(depth: number): { rarity: Rarity; label: string; bgClass: string } {
  if (depth >= 5) return { rarity: "legendary", label: "Legendary", bgClass: "bg-gradient-to-r from-amber-500 to-orange-500 text-white" };
  if (depth >= 4) return { rarity: "rare", label: "Rare", bgClass: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white" };
  if (depth >= 3) return { rarity: "uncommon", label: "Uncommon", bgClass: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white" };
  return { rarity: "common", label: "Common", bgClass: "bg-gray-200 text-gray-600" };
}

function PricingPill({ pricing }: { pricing: string }) {
  const lower = pricing.toLowerCase();
  if (lower.includes("free") && !lower.includes("paid") && !lower.includes("premium") && !lower.includes("pro plan")) {
    return <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full tracking-wide uppercase">Free</span>;
  }
  if (lower.includes("free")) {
    return <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">Freemium</span>;
  }
  const match = pricing.match(/\$[\d.]+/);
  if (match) {
    return <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{match[0]}/mo</span>;
  }
  return <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">Paid</span>;
}

export function AgentCard({ agent }: { agent: Agent }) {
  const catColor = CATEGORY_COLORS[agent.categorySlug] || "#6366f1";
  const { rarity, label, bgClass } = getRarity(agent.agenticDepth);
  const isLegendary = rarity === "legendary";

  return (
    <Link href={`/agent/${agent.slug}`} className="group block h-full">
      <div
        className={`relative h-full rounded-[20px] overflow-hidden bg-white transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] ${isLegendary ? "card-legendary" : ""}`}
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {/* Gradient header band */}
        <div className="h-24 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${catColor}18 0%, ${catColor}08 50%, transparent 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 80% 20%, ${catColor}12, transparent 50%)`,
            }}
          />
          {/* Decorative shapes */}
          <div
            className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-[0.07]"
            style={{ background: catColor }}
          />
          <div
            className="absolute -right-2 top-8 w-12 h-12 rounded-full opacity-[0.04]"
            style={{ background: catColor }}
          />

          {/* Rarity badge */}
          <div className="absolute top-3 right-3">
            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${bgClass}`}>
              {label}
            </span>
          </div>
        </div>

        {/* Icon — overlapping */}
        <div className="flex justify-center -mt-8 relative z-[2]">
          <div className="p-1 bg-white rounded-[18px] shadow-lg">
            <AgentIcon
              name={agent.name}
              websiteUrl={agent.url}
              iconUrl=""
              size="md"
              className="rounded-[14px]"
              glowColor={catColor}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-5 pt-3 text-center">
          <h3 className="font-bold text-[15px] text-gray-900 leading-snug truncate group-hover:text-indigo-600 transition-colors duration-300">
            {agent.name}
          </h3>
          <p className="text-[12.5px] text-gray-400 mt-1 line-clamp-2 leading-relaxed min-h-[2.5em]">
            {agent.jobToBeDone}
          </p>

          {/* Pricing + end-to-end */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <PricingPill pricing={agent.pricing} />
            {agent.workflowCompletion === "High" && (
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                E2E
              </span>
            )}
          </div>

          {/* Autonomy dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3 pt-3 border-t border-gray-100/80">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i <= agent.agenticDepth ? catColor : "#e5e7eb",
                  boxShadow: i <= agent.agenticDepth ? `0 0 6px ${catColor}40` : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* Hover arrow indicator */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center backdrop-blur-sm">
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-600" />
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
      <div className="flex items-center gap-3.5 bg-white rounded-2xl px-4 py-3.5 shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-md)] transition-all duration-300">
        <AgentIcon name={agent.name} websiteUrl={agent.url} iconUrl="" size="sm" className="rounded-xl" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[14px] text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{agent.name}</h3>
          <p className="text-[12px] text-gray-400 truncate mt-0.5">{agent.jobToBeDone}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: catColor }} />
          <PricingPill pricing={agent.pricing} />
        </div>
      </div>
    </Link>
  );
}

export function AgentCardFeatured({ agent }: { agent: Agent }) {
  const catColor = CATEGORY_COLORS[agent.categorySlug] || "#6366f1";
  const { rarity, label, bgClass } = getRarity(agent.agenticDepth);

  return (
    <Link href={`/agent/${agent.slug}`} className="group block h-full">
      <div
        className="card-featured-hover relative h-full rounded-[24px] overflow-hidden bg-white transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[var(--shadow-xl)]"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {/* Rich gradient header */}
        <div className="h-32 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${catColor}20 0%, ${catColor}10 40%, ${catColor}05 100%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 20% 80%, ${catColor}20, transparent 50%), radial-gradient(circle at 80% 20%, ${catColor}15, transparent 50%)`,
            }}
          />
          {/* Decorative circles */}
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-[0.06]" style={{ background: catColor }} />
          <div className="absolute right-12 top-16 w-16 h-16 rounded-full opacity-[0.04]" style={{ background: catColor }} />
          <div className="absolute left-8 -bottom-4 w-20 h-20 rounded-full opacity-[0.03]" style={{ background: catColor }} />

          {/* Badges */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm ${bgClass}`}>
              {label}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Icon — large, overlapping */}
        <div className="flex justify-center -mt-10 relative z-[2]">
          <div className="p-1.5 bg-white rounded-[22px] shadow-xl">
            <AgentIcon
              name={agent.name}
              websiteUrl={agent.url}
              iconUrl=""
              size="lg"
              className="rounded-[17px]"
              glowColor={catColor}
            />
          </div>
        </div>

        <div className="px-6 pb-6 pt-3">
          <h3 className="font-bold text-[18px] text-gray-900 text-center group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
            {agent.name}
          </h3>
          <p className="text-[13px] text-gray-400 mt-2 text-center line-clamp-2 leading-relaxed">
            {agent.jobToBeDone}
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mt-5">
            <div className="bg-gray-50 rounded-xl py-2 px-2 text-center">
              <p className="text-[15px] font-bold text-gray-900">{agent.agenticDepth}/5</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Auto</p>
            </div>
            <div className="bg-gray-50 rounded-xl py-2 px-2 text-center">
              <p className="text-[12px] font-bold text-gray-900 truncate">{agent.workflowCompletion}</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Flow</p>
            </div>
            <div className="bg-gray-50 rounded-xl py-2 px-2 text-center">
              <PricingPill pricing={agent.pricing} />
            </div>
          </div>

          {/* Why over ChatGPT */}
          {agent.whyOverChatGPT && (
            <div
              className="mt-4 rounded-xl p-3.5"
              style={{
                background: `linear-gradient(135deg, ${catColor}06, ${catColor}03)`,
                border: `1px solid ${catColor}12`,
              }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3 h-3" style={{ color: catColor }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: catColor }}>Why this over ChatGPT</span>
              </div>
              <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2">{agent.whyOverChatGPT}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
