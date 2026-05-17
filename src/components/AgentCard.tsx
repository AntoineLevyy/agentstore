import Link from "next/link";
import { Agent } from "@/lib/types";
import { ExternalLink, Zap, Star, ArrowRight } from "lucide-react";
import { AgentIcon } from "./AgentIcon";

function AgenticBadge({ depth }: { depth: number }) {
  if (depth >= 4) return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full"><Zap className="w-3 h-3" />Fully autonomous</span>;
  if (depth >= 3) return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full"><Zap className="w-3 h-3" />Semi-autonomous</span>;
  return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">AI-assisted</span>;
}

function PricingPill({ pricing }: { pricing: string }) {
  const lower = pricing.toLowerCase();
  if (lower.includes("free") && !lower.includes("paid") && !lower.includes("premium") && !lower.includes("pro")) {
    return <span className="text-[12px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Free</span>;
  }
  if (lower.includes("free")) {
    return <span className="text-[12px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">Free tier</span>;
  }
  return <span className="text-[12px] font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full">Paid</span>;
}

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link href={`/agent/${agent.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-black/[0.06] p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-black/[0.1] transition-all duration-200">
        {/* Top row: icon + name + pricing */}
        <div className="flex items-start gap-3.5">
          <AgentIcon name={agent.name} websiteUrl={agent.url} iconUrl="" size="md" className="rounded-xl" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-[15px] text-gray-900 truncate group-hover:text-indigo-700 transition-colors">{agent.name}</h3>
              <PricingPill pricing={agent.pricing} />
            </div>
            {/* The consumer job — what this does for YOU */}
            <p className="text-[13px] text-gray-600 mt-1 line-clamp-2 leading-relaxed">{agent.jobToBeDone}</p>
          </div>
        </div>

        {/* What you get */}
        <div className="mt-4 pt-3.5 border-t border-black/[0.04]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <AgenticBadge depth={agent.agenticDepth} />
              {agent.workflowCompletion === "High" && (
                <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">End-to-end</span>
              )}
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
          </div>

          {/* Trust signal */}
          {agent.traction && agent.traction !== "Unknown" && (
            <p className="text-[11px] text-gray-500 mt-2.5 line-clamp-1 italic">{agent.traction}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export function AgentCardCompact({ agent }: { agent: Agent }) {
  return (
    <Link href={`/agent/${agent.slug}`} className="group block">
      <div className="flex items-center gap-3 bg-white rounded-xl border border-black/[0.06] px-4 py-3 hover:shadow-[var(--shadow-md)] hover:border-black/[0.1] transition-all duration-200">
        <AgentIcon name={agent.name} websiteUrl={agent.url} iconUrl="" size="sm" className="rounded-lg" />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[14px] text-gray-900 truncate">{agent.name}</h3>
          <p className="text-[12px] text-gray-500 truncate">{agent.jobToBeDone}</p>
        </div>
        <PricingPill pricing={agent.pricing} />
      </div>
    </Link>
  );
}

export function AgentCardFeatured({ agent }: { agent: Agent }) {
  return (
    <Link href={`/agent/${agent.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-black/[0.1] transition-all duration-200">
        {/* Colored top accent */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500" />

        <div className="p-6">
          <div className="flex items-start gap-4">
            <AgentIcon name={agent.name} websiteUrl={agent.url} iconUrl="" size="lg" className="rounded-xl" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[17px] text-gray-900 group-hover:text-indigo-700 transition-colors">{agent.name}</h3>
              <p className="text-[14px] text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">{agent.jobToBeDone}</p>
            </div>
          </div>

          {/* Key info grid */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="bg-gray-50 rounded-lg p-2.5">
              <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Pricing</p>
              <p className="text-[13px] font-semibold text-gray-900 mt-0.5">{agent.pricing}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2.5">
              <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Autonomy</p>
              <p className="text-[13px] font-semibold text-gray-900 mt-0.5">{agent.agenticDepth}/5</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2.5">
              <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Completion</p>
              <p className="text-[13px] font-semibold text-gray-900 mt-0.5">{agent.workflowCompletion}</p>
            </div>
          </div>

          {/* Why over ChatGPT */}
          {agent.whyOverChatGPT && (
            <div className="mt-4 bg-indigo-50/60 rounded-lg p-3">
              <p className="text-[11px] font-semibold text-indigo-800 mb-0.5">Why use this over ChatGPT?</p>
              <p className="text-[12px] text-indigo-700 leading-relaxed line-clamp-2">{agent.whyOverChatGPT}</p>
            </div>
          )}

          {/* Trust */}
          {agent.traction && agent.traction !== "Unknown" && (
            <p className="text-[11px] text-gray-500 mt-3 line-clamp-1 italic">{agent.traction}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
