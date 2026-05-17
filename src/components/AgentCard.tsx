import Link from "next/link";
import { Agent } from "@/lib/types";
import { ExternalLink, Zap, ArrowUpRight, Sparkles } from "lucide-react";
import { AgentIcon } from "./AgentIcon";

const DEPTH_LABELS: Record<number, { label: string; color: string }> = {
  5: { label: "Full auto", color: "text-indigo-700 bg-indigo-50 border-indigo-100" },
  4: { label: "Mostly auto", color: "text-violet-700 bg-violet-50 border-violet-100" },
  3: { label: "Semi-auto", color: "text-sky-700 bg-sky-50 border-sky-100" },
  2: { label: "Assisted", color: "text-gray-600 bg-gray-50 border-gray-100" },
  1: { label: "Manual", color: "text-gray-600 bg-gray-50 border-gray-100" },
};

function PricingLabel({ pricing }: { pricing: string }) {
  const lower = pricing.toLowerCase();
  if (lower.includes("free") && !lower.includes("paid") && !lower.includes("premium") && !lower.includes("pro plan")) {
    return <span className="text-emerald-600 font-semibold text-[12px]">Free</span>;
  }
  if (lower.includes("free")) {
    return <span className="text-gray-700 font-medium text-[12px]">Free tier available</span>;
  }
  // Try to extract a price
  const match = pricing.match(/\$[\d.]+/);
  if (match) {
    return <span className="text-gray-700 font-medium text-[12px]">From {match[0]}/mo</span>;
  }
  return <span className="text-gray-500 font-medium text-[12px]">Paid</span>;
}

export function AgentCard({ agent }: { agent: Agent }) {
  const depth = DEPTH_LABELS[agent.agenticDepth] || DEPTH_LABELS[2];

  return (
    <Link href={`/agent/${agent.slug}`} className="group block h-full">
      <div className="relative h-full bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/80 transition-all duration-300 ease-out">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <AgentIcon name={agent.name} websiteUrl={agent.url} iconUrl="" size="md" className="rounded-[14px] shadow-sm" />
            <div>
              <h3 className="font-semibold text-[15px] text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">{agent.name}</h3>
              <PricingLabel pricing={agent.pricing} />
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0 mt-1" />
        </div>

        {/* Job to be done — the key selling line */}
        <p className="text-[13.5px] text-gray-600 leading-[1.55] line-clamp-2 mb-4">{agent.jobToBeDone}</p>

        {/* Bottom meta */}
        <div className="flex items-center gap-2 mt-auto">
          <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border ${depth.color}`}>
            <Zap className="w-3 h-3" />{depth.label}
          </span>
          {agent.workflowCompletion === "High" && (
            <span className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md">
              End-to-end
            </span>
          )}
        </div>

        {/* Subtle trust line */}
        {agent.traction && !agent.traction.toLowerCase().includes("unknown") && agent.traction.length > 10 && (
          <p className="text-[11px] text-gray-400 mt-3 line-clamp-1 leading-relaxed">{agent.traction}</p>
        )}
      </div>
    </Link>
  );
}

export function AgentCardCompact({ agent }: { agent: Agent }) {
  return (
    <Link href={`/agent/${agent.slug}`} className="group block">
      <div className="flex items-center gap-3.5 bg-white rounded-xl border border-gray-100 px-4 py-3.5 hover:border-gray-200 hover:shadow-md hover:shadow-gray-100/60 transition-all duration-300">
        <AgentIcon name={agent.name} websiteUrl={agent.url} iconUrl="" size="sm" className="rounded-xl shadow-sm" />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[14px] text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{agent.name}</h3>
          <p className="text-[12px] text-gray-500 truncate mt-0.5">{agent.jobToBeDone}</p>
        </div>
        <PricingLabel pricing={agent.pricing} />
      </div>
    </Link>
  );
}

export function AgentCardFeatured({ agent }: { agent: Agent }) {
  const depth = DEPTH_LABELS[agent.agenticDepth] || DEPTH_LABELS[2];

  return (
    <Link href={`/agent/${agent.slug}`} className="group block h-full">
      <div className="relative h-full bg-white rounded-[20px] border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-300 ease-out">
        {/* Gradient accent top */}
        <div className="h-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.08),transparent_60%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
          {/* Autonomy badge floating */}
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg border backdrop-blur-sm ${depth.color}`}>
              <Zap className="w-3 h-3" />{depth.label}
            </span>
          </div>
        </div>

        <div className="px-5 pb-5 -mt-6 relative">
          {/* Icon */}
          <AgentIcon name={agent.name} websiteUrl={agent.url} iconUrl="" size="lg" className="rounded-[16px] shadow-md border-[3px] border-white" />

          {/* Content */}
          <h3 className="font-semibold text-[17px] text-gray-900 mt-3 group-hover:text-indigo-600 transition-colors leading-tight">{agent.name}</h3>
          <p className="text-[13.5px] text-gray-600 mt-1.5 leading-[1.55] line-clamp-2">{agent.jobToBeDone}</p>

          {/* Key info row */}
          <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-gray-50">
            <PricingLabel pricing={agent.pricing} />
            {agent.workflowCompletion === "High" && (
              <span className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md">End-to-end</span>
            )}
          </div>

          {/* Why over ChatGPT — the hook */}
          {agent.whyOverChatGPT && (
            <div className="mt-3.5 bg-gradient-to-r from-indigo-50/70 to-purple-50/50 rounded-xl p-3 border border-indigo-100/50">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">Why this over ChatGPT</span>
              </div>
              <p className="text-[12px] text-indigo-800/80 leading-[1.5] line-clamp-2">{agent.whyOverChatGPT}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
