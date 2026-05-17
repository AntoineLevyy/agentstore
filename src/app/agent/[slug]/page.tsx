import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryById } from "@/lib/data";
import { getAgentBySlug, getAgentsByCategory as getRelatedAgents, getReviewsForAgent } from "@/lib/db";
import { ArrowRight, CheckCircle2, ChevronRight, ExternalLink, Globe, ShieldCheck, Sparkles, Star } from "lucide-react";
import { AgentCard, getPriceLabel } from "@/components/AgentCard";
import { AgentIcon } from "@/components/AgentIcon";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewList } from "@/components/ReviewList";

export const revalidate = 60;

function Signal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-black/[0.06]">
      <p className="text-[11px] font-[780] uppercase tracking-[0.13em] text-[#a49a90]">{label}</p>
      <p className="mt-1 text-[15px] font-[760] text-[#171411]">{value}</p>
    </div>
  );
}

function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "orange" | "green" }) {
  const cls = tone === "orange" ? "bg-[#fff0e8] text-[#a33d13]" : tone === "green" ? "bg-[#e8f8ed] text-[#17673a]" : "bg-[#f3f0ea] text-[#6c6258]";
  return <span className={`inline-flex rounded-full px-3 py-1.5 text-[12px] font-[720] ${cls}`}>{children}</span>;
}

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) notFound();

  const category = getCategoryById(agent.category_id);
  const reviews = await getReviewsForAgent(slug);
  const allRelated = await getRelatedAgents(agent.category_id);
  const relatedAgents = allRelated.filter((a) => a.id !== agent.id).slice(0, 3);
  const firstJob = agent.capabilities[0] || category?.description || agent.tagline;

  return (
    <div className="min-h-screen bg-[#fbfaf7] px-4 py-8 text-[#171411] sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-6 flex items-center gap-2 text-[13px] font-[620] text-[#8a8178]">
          <Link href="/" className="hover:text-[#171411]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          {category && <Link href={`/category/${category.slug}`} className="hover:text-[#171411]">{category.name}</Link>}
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#171411]">{agent.name}</span>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[42px] bg-[#fff6ec] p-6 shadow-sm ring-1 ring-black/[0.06] sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <AgentIcon name={agent.name} websiteUrl={agent.website_url} iconUrl={agent.icon_url} size="xl" className="rounded-[34px] bg-white" />
              <div className="min-w-0 flex-1">
                <div className="mb-4 flex flex-wrap gap-2">
                  {category && <Pill tone="orange">{category.name}</Pill>}
                  <Pill>{getPriceLabel(agent)}</Pill>
                  {agent.rating_count > 0 && <Pill tone="green">★ {Number(agent.rating_avg).toFixed(1)} from {agent.rating_count}</Pill>}
                </div>
                <h1 className="text-[46px] font-[840] leading-[0.98] tracking-[-0.055em] sm:text-[68px]">{agent.name}</h1>
                <p className="mt-4 max-w-2xl text-[20px] font-[620] leading-8 text-[#5f554c]">{agent.tagline}</p>
                {agent.creator_name && <p className="mt-3 text-[14px] font-[680] text-[#9a5a24]">By {agent.creator_name}</p>}

                <div className="mt-8 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-black/[0.06]">
                  <p className="mb-2 inline-flex items-center gap-2 text-[12px] font-[820] uppercase tracking-[0.13em] text-[#ff6b35]"><Sparkles className="h-4 w-4" /> Why this app exists</p>
                  <h2 className="text-[24px] font-[820] tracking-[-0.035em]">We have an app that does what you want: {firstJob.toLowerCase()}.</h2>
                  <p className="mt-3 text-[15px] leading-7 text-[#6c6258]">{agent.description}</p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={agent.website_url} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#171411] px-6 text-[15px] font-[780] text-white transition hover:-translate-y-0.5 hover:shadow-xl">
                    Open app <ExternalLink className="h-4 w-4" />
                  </a>
                  {category && <Link href={`/category/${category.slug}`} className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-[760] text-[#171411] shadow-sm ring-1 ring-black/[0.06]">Compare {category.name} apps <ArrowRight className="h-4 w-4" /></Link>}
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <Signal label="Best for" value={agent.capabilities.slice(0, 2).join(", ") || "Trying the app"} />
            <Signal label="Works with" value={agent.tools.slice(0, 3).join(", ") || "Web app"} />
            <Signal label="Price" value={getPriceLabel(agent)} />
            <div className="rounded-[28px] bg-[#171411] p-5 text-white shadow-lg">
              <p className="flex items-center gap-2 text-[13px] font-[760] text-[#ffd8c2]"><ShieldCheck className="h-4 w-4" /> Before you try it</p>
              <ul className="mt-4 space-y-3 text-[13px] leading-5 text-white/72">
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7ee3a1]" /> Check what data the app asks for before connecting accounts.</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7ee3a1]" /> Compare similar apps in the category before paying.</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7ee3a1]" /> Start with the free plan or trial when available.</li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <div className="rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-black/[0.06] lg:col-span-2">
            <h2 className="text-[28px] font-[820] tracking-[-0.04em]">What it can do</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {agent.capabilities.map((cap) => <Pill key={cap} tone="orange">{cap}</Pill>)}
            </div>
            {agent.special_data && (
              <div className="mt-6 rounded-[24px] bg-[#fbf7ef] p-5">
                <p className="text-[12px] font-[820] uppercase tracking-[0.13em] text-[#a49a90]">Learning / data advantage</p>
                <p className="mt-2 text-[15px] leading-7 text-[#5f554c]">{agent.special_data}</p>
              </div>
            )}
          </div>
          <div className="rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-black/[0.06]">
            <h2 className="text-[24px] font-[820] tracking-[-0.04em]">Useful links</h2>
            <div className="mt-5 space-y-3">
              <a href={agent.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-[18px] bg-[#fbf7ef] px-4 py-3 text-[14px] font-[720] text-[#171411]"><span className="inline-flex items-center gap-2"><Globe className="h-4 w-4 text-[#ff6b35]" /> Website</span><ArrowRight className="h-4 w-4" /></a>
              <a href={`https://www.google.com/search?q=${encodeURIComponent(agent.name + " review")}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-[18px] bg-[#fbf7ef] px-4 py-3 text-[14px] font-[720] text-[#171411]">Reviews <ArrowRight className="h-4 w-4" /></a>
              <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(agent.name + " demo")}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-[18px] bg-[#fbf7ef] px-4 py-3 text-[14px] font-[720] text-[#171411]">Demos <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-black/[0.06]">
          <h2 className="text-[28px] font-[820] tracking-[-0.04em]">Reviews</h2>
          {reviews.length > 0 ? (
            <div className="mt-4">
              <div className="mb-5 flex items-center gap-2 text-[#8a6500]"><Star className="h-5 w-5 fill-current" /><span className="text-[18px] font-[820]">{Number(agent.rating_avg).toFixed(1)}</span><span className="text-[13px] font-[650] text-[#7b7369]">from {reviews.length} reviews</span></div>
              <ReviewList reviews={reviews} />
            </div>
          ) : <p className="mt-3 text-[15px] font-[620] text-[#6c6258]">No reviews yet. If you try {agent.name}, leave the first useful note for the next person.</p>}
          <div className="mt-6"><ReviewForm agentSlug={agent.slug} agentName={agent.name} /></div>
        </section>

        {relatedAgents.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-5 text-[32px] font-[820] tracking-[-0.045em]">Similar apps</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedAgents.map((related) => <AgentCard key={related.id} agent={related} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
