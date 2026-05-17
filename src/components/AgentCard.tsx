import Link from "next/link";
import { Agent } from "@/lib/types";
import { getCategoryById } from "@/lib/data";
import { ArrowRight, CheckCircle2, Sparkles, Star } from "lucide-react";
import { AgentIcon } from "./AgentIcon";

export function getPriceLabel(agent: Agent) {
  if (agent.pricing_type === "free") return "Free";
  if (agent.pricing_type === "contact") return "Contact";
  const period = agent.pricing_period === "monthly" ? "/mo" : agent.pricing_period === "yearly" ? "/yr" : agent.pricing_period === "weekly" ? "/wk" : agent.pricing_period === "per_use" ? "/use" : "";
  return agent.pricing_amount ? `$${agent.pricing_amount}${period}` : "Paid";
}

function makeJob(agent: Agent) {
  const firstCapability = agent.capabilities[0]?.toLowerCase();
  if (firstCapability) return `It can help with ${firstCapability}.`;
  return agent.tagline;
}

export function AppSignal({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "green" | "orange" }) {
  const cls = tone === "green" ? "bg-[#e8f8ed] text-[#17673a]" : tone === "orange" ? "bg-[#fff0e8] text-[#a33d13]" : "bg-[#f3f0ea] text-[#6c6258]";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-[680] ${cls}`}>{children}</span>;
}

export function AgentCard({ agent }: { agent: Agent }) {
  const category = getCategoryById(agent.category_id);
  const tools = agent.tools.slice(0, 2);

  return (
    <Link href={`/agent/${agent.slug}`} className="group block h-full">
      <article className="flex h-full flex-col rounded-[28px] bg-white p-5 shadow-[0_16px_50px_rgba(34,28,20,0.08)] ring-1 ring-black/[0.06] transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(34,28,20,0.13)]">
        <div className="flex items-start gap-4">
          <AgentIcon name={agent.name} websiteUrl={agent.website_url} iconUrl={agent.icon_url} size="md" className="rounded-[18px] bg-[#f7f3ec] ring-1 ring-black/[0.04]" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-[17px] font-[760] tracking-[-0.02em] text-[#191511]">{agent.name}</h3>
              {agent.rating_count > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#fff7d8] px-2 py-0.5 text-[11px] font-[700] text-[#8a6500]">
                  <Star className="h-3 w-3 fill-current" /> {Number(agent.rating_avg).toFixed(1)}
                </span>
              )}
            </div>
            <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#6f675f]">{agent.tagline}</p>
          </div>
        </div>

        <div className="mt-5 rounded-[22px] bg-[#fbf7ef] p-4">
          <p className="flex items-start gap-2 text-[13px] font-[650] leading-5 text-[#2a241f]">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#ff6b35]" />
            We have an app that does what you want: {makeJob(agent)}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {category && <AppSignal tone="orange">{category.name}</AppSignal>}
          <AppSignal>{getPriceLabel(agent)}</AppSignal>
          {tools.map((tool) => <AppSignal key={tool} tone="green">{tool}</AppSignal>)}
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-[680] text-[#6c6258]"><CheckCircle2 className="h-3.5 w-3.5 text-[#39a96b]" /> Checked listing</span>
          <span className="inline-flex items-center gap-1 text-[13px] font-[760] text-[#171411]">Details <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
        </div>
      </article>
    </Link>
  );
}

export function AgentCardLarge({ agent }: { agent: Agent }) {
  return <AgentCard agent={agent} />;
}

export function AgentCardGrid({ agent }: { agent: Agent }) {
  return <AgentCard agent={agent} />;
}
