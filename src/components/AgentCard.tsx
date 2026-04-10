import Link from "next/link";
import { Agent } from "@/lib/types";
import { getCategoryById } from "@/lib/data";
import { Star } from "lucide-react";
import { AgentIcon } from "./AgentIcon";

function PricingBadge({ agent }: { agent: Agent }) {
  if (agent.pricing_type === "free") return <span className="text-[#5e6ad2] font-[510] text-[12px]">Free</span>;
  if (agent.pricing_type === "contact") return <span className="text-[#62666d] font-[510] text-[12px]">Contact</span>;
  const amount = agent.pricing_amount;
  const period = agent.pricing_period === "monthly" ? "/mo" : agent.pricing_period === "yearly" ? "/yr" : agent.pricing_period === "per_use" ? "/use" : "";
  return (
    <span className="text-[#5e6ad2] font-[510] text-[12px]">
      ${amount}{period}
    </span>
  );
}

export function AgentCard({ agent }: { agent: Agent }) {
  const category = getCategoryById(agent.category_id);

  return (
    <Link href={`/agent/${agent.slug}`} className="group block">
      <div className="flex items-start gap-3">
        <AgentIcon name={agent.name} websiteUrl={agent.website_url} size="md" className="group-hover:brightness-110 transition-all duration-[0.16s]" />
        <div className="flex-1 min-w-0">
          <h3 className="font-[510] text-[14px] text-[#f7f8f8] truncate tracking-[-0.01em]">{agent.name}</h3>
          <p className="text-[13px] text-[#8a8f98] truncate leading-[1.4]">{agent.tagline}</p>
          <div className="flex items-center gap-2 mt-0.5">
            {agent.rating_count > 0 && (
              <div className="flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-[#62666d] text-[#62666d]" />
                <span className="text-[11px] text-[#62666d]">{agent.rating_avg.toFixed(1)}</span>
              </div>
            )}
            {category && <span className="text-[11px] text-[#62666d]">{category.name}</span>}
          </div>
        </div>
        <div className="flex-shrink-0 pt-0.5">
          <div className="bg-[rgba(255,255,255,0.05)] rounded-[4px] px-3 py-1 text-center">
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
      <div className="bg-[#0f1011] rounded-[8px] border border-[rgba(255,255,255,0.05)] overflow-hidden hover:border-[rgba(255,255,255,0.1)] transition-all duration-[0.16s]">
        <div className="h-44 bg-gradient-to-br from-[#5e6ad2]/20 to-[#8b5cf6]/10 relative flex items-center justify-center">
          <AgentIcon name={agent.name} websiteUrl={agent.website_url} size="xl" className="opacity-80" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f1011] to-transparent p-5">
            <p className="text-[11px] font-[510] text-[#62666d] uppercase tracking-wider">{category?.name}</p>
            <h3 className="text-[16px] font-[590] text-[#f7f8f8] mt-1 tracking-[-0.01em]">{agent.name}</h3>
            <p className="text-[13px] text-[#8a8f98] mt-0.5 truncate">{agent.tagline}</p>
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
        <div className="mx-auto group-hover:brightness-110 transition-all duration-[0.16s]">
          <AgentIcon name={agent.name} websiteUrl={agent.website_url} size="lg" className="mx-auto" />
        </div>
        <h3 className="font-[510] text-[12px] text-[#f7f8f8] mt-2 truncate tracking-[-0.01em]">{agent.name}</h3>
        <p className="text-[11px] text-[#62666d] truncate">{agent.tagline}</p>
        <div className="mt-1">
          <div className="inline-block bg-[rgba(255,255,255,0.05)] rounded-[4px] px-2 py-0.5">
            <PricingBadge agent={agent} />
          </div>
        </div>
      </div>
    </Link>
  );
}
