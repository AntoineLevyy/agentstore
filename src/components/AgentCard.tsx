import Link from "next/link";
import { Agent } from "@/lib/types";
import { getCategoryById } from "@/lib/data";
import { Star } from "lucide-react";
import { AgentIcon } from "./AgentIcon";

function PricingBadge({ agent }: { agent: Agent }) {
  if (agent.pricing_type === "free") return <span className="text-[#0A84FF] font-semibold text-sm">Free</span>;
  if (agent.pricing_type === "contact") return <span className="text-gray-400 font-medium text-sm">Contact</span>;
  const amount = agent.pricing_amount;
  const period = agent.pricing_period === "monthly" ? "/mo" : agent.pricing_period === "yearly" ? "/yr" : agent.pricing_period === "per_use" ? "/use" : "";
  return (
    <span className="text-[#0A84FF] font-semibold text-sm">
      ${amount}{period}
    </span>
  );
}

export function AgentCard({ agent }: { agent: Agent }) {
  const category = getCategoryById(agent.category_id);

  return (
    <Link href={`/agent/${agent.slug}`} className="group block">
      <div className="flex items-start gap-4">
        <AgentIcon name={agent.name} websiteUrl={agent.website_url} size="md" className="group-hover:shadow-lg transition-shadow" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[15px] text-white truncate">{agent.name}</h3>
          <p className="text-[13px] text-gray-400 truncate">{agent.tagline}</p>
          <div className="flex items-center gap-2 mt-1">
            {agent.rating_count > 0 && (
              <div className="flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-gray-500 text-gray-500" />
                <span className="text-[12px] text-gray-500">{agent.rating_avg.toFixed(1)}</span>
              </div>
            )}
            {category && <span className="text-[12px] text-gray-500">{category.name}</span>}
          </div>
        </div>
        <div className="flex-shrink-0 pt-1">
          <div className="bg-white/10 rounded-full px-4 py-1.5 text-center min-w-[60px]">
            <PricingBadge agent={agent} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function AgentCardLarge({ agent }: { agent: Agent }) {
  const category = getCategoryById(agent.category_id);

  return (
    <Link href={`/agent/${agent.slug}`} className="group block">
      <div className="bg-[#1c1c1e] rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.3)] overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-shadow">
        <div className="h-48 bg-gradient-to-br from-[#0A84FF]/30 to-purple-600/30 relative flex items-center justify-center">
          <AgentIcon name={agent.name} websiteUrl={agent.website_url} size="xl" className="rounded-[22.5%] opacity-80" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
            <p className="text-xs font-medium text-white/50 uppercase tracking-wide">{category?.name}</p>
            <h3 className="text-xl font-bold text-white mt-1">{agent.name}</h3>
            <p className="text-sm text-white/70 mt-0.5">{agent.tagline}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function AgentCardGrid({ agent }: { agent: Agent }) {
  return (
    <Link href={`/agent/${agent.slug}`} className="group block">
      <div className="text-center">
        <div className="mx-auto group-hover:shadow-lg transition-shadow">
          <AgentIcon name={agent.name} websiteUrl={agent.website_url} size="lg" className="mx-auto" />
        </div>
        <h3 className="font-medium text-[13px] text-white mt-2 truncate">{agent.name}</h3>
        <p className="text-[12px] text-gray-500 truncate">{agent.tagline}</p>
        <div className="mt-1.5">
          <div className="inline-block bg-white/10 rounded-full px-3 py-1">
            <PricingBadge agent={agent} />
          </div>
        </div>
      </div>
    </Link>
  );
}
