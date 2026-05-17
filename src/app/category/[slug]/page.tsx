import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategory, categories } from "@/lib/data";
import { getAgentsByCategory } from "@/lib/db";
import { getCategoryContent } from "@/lib/category-content";
import { AgentCard } from "@/components/AgentCard";
import { ArrowRight, CheckCircle2, ChevronRight, Search, ShieldCheck, Sparkles } from "lucide-react";
import { CategoryIcon } from "@/components/CategoryIcon";

export const revalidate = 60;

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-white px-3 py-1.5 text-[12px] font-[720] text-[#6c6258] shadow-sm ring-1 ring-black/[0.05]">{children}</span>;
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const categoryAgents = await getAgentsByCategory(category.id);
  const content = getCategoryContent(category.slug);
  const topApps = [...categoryAgents]
    .sort((a, b) => (b.rating_avg * Math.max(b.rating_count, 1) + Number(b.featured) * 10) - (a.rating_avg * Math.max(a.rating_count, 1) + Number(a.featured) * 10))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#fbfaf7] px-4 py-8 text-[#171411] sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-6 flex items-center gap-2 text-[13px] font-[620] text-[#8a8178]">
          <Link href="/" className="hover:text-[#171411]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/discover" className="hover:text-[#171411]">Apps</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#171411]">{category.name}</span>
        </div>

        <section className="rounded-[42px] bg-[#fff6ec] p-6 shadow-sm ring-1 ring-black/[0.06] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white px-3 py-2 text-[12px] font-[760] text-[#7b4b24] shadow-sm ring-1 ring-black/[0.06]">
                <CategoryIcon slug={category.slug} size="sm" />
                {categoryAgents.length} apps in {category.name}
              </div>
              <h1 className="max-w-3xl text-[48px] font-[840] leading-[0.98] tracking-[-0.055em] sm:text-[72px]">
                Best AI apps for {category.name.toLowerCase()}.
              </h1>
              <p className="mt-5 max-w-2xl text-[18px] leading-8 text-[#625950]">
                {content.userMoment.replaceAll("agent", "app").replaceAll("Agent", "App")}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {content.useCases.slice(0, 7).map((useCase) => <Pill key={useCase}>{useCase}</Pill>)}
              </div>
            </div>

            <div className="rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-black/[0.06]">
              <p className="mb-3 flex items-center gap-2 text-[12px] font-[820] uppercase tracking-[0.13em] text-[#ff6b35]"><Search className="h-4 w-4" /> Category learning</p>
              <h2 className="text-[22px] font-[820] tracking-[-0.035em]">How to choose a {category.name.toLowerCase()} app</h2>
              <div className="mt-4 space-y-2.5">
                {content.comparisonCriteria.slice(0, 5).map((criterion) => (
                  <p key={criterion} className="flex gap-2 rounded-[18px] bg-[#fbf7ef] px-3 py-2.5 text-[13px] font-[650] text-[#5f554c]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#39a96b]" /> {criterion}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-black/[0.06]">
            <p className="mb-2 flex items-center gap-2 text-[12px] font-[820] uppercase tracking-[0.13em] text-[#ff6b35]"><Sparkles className="h-4 w-4" /> What people want</p>
            <p className="text-[15px] leading-7 text-[#625950]">{content.visualDirection.replaceAll("agents", "apps").replaceAll("agent", "app")}</p>
          </div>
          <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-black/[0.06]">
            <p className="mb-2 flex items-center gap-2 text-[12px] font-[820] uppercase tracking-[0.13em] text-[#ff6b35]"><ShieldCheck className="h-4 w-4" /> Trust checks</p>
            <div className="flex flex-wrap gap-2">{content.trustSignals.slice(0, 5).map((signal) => <Pill key={signal}>{signal}</Pill>)}</div>
          </div>
          <div className="rounded-[28px] bg-[#171411] p-5 text-white shadow-sm">
            <p className="mb-2 text-[12px] font-[820] uppercase tracking-[0.13em] text-[#ffd8c2]">Searches this page should win</p>
            <div className="flex flex-wrap gap-2">{content.seoAngles.slice(0, 4).map((angle) => <span key={angle} className="rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-[700] text-white/80">{angle.replaceAll("agents", "apps")}</span>)}</div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[13px] font-[760] uppercase tracking-[0.14em] text-[#ff6b35]">Recommended apps</p>
              <h2 className="mt-1 text-[34px] font-[820] tracking-[-0.045em]">Apps that can do the job</h2>
            </div>
            <Link href={`/discover?q=${encodeURIComponent(category.name)}`} className="inline-flex items-center gap-2 text-[14px] font-[760] text-[#171411]">Search this category <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {(topApps.length ? topApps : categoryAgents.slice(0, 6)).map((agent) => <AgentCard key={agent.id} agent={agent} />)}
          </div>
        </section>

        <section className="mt-12 rounded-[34px] bg-white p-6 shadow-sm ring-1 ring-black/[0.06] sm:p-8">
          <p className="text-[13px] font-[760] uppercase tracking-[0.14em] text-[#ff6b35]">FAQ</p>
          <h2 className="mt-1 text-[32px] font-[820] tracking-[-0.045em]">What to know before choosing</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.comparisonCriteria.slice(0, 4).map((criterion) => (
              <div key={criterion} className="rounded-[24px] bg-[#fbf7ef] p-5">
                <h3 className="text-[16px] font-[800] tracking-[-0.02em]">How important is {criterion.toLowerCase()}?</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#675e55]">Very. The right {category.name.toLowerCase()} app should make this obvious before you sign up or connect sensitive data.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-[24px] font-[820] tracking-[-0.035em]">Other categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.filter((c) => c.id !== category.id).slice(0, 12).map((c) => <Link key={c.id} href={`/category/${c.slug}`} className="rounded-full bg-white px-3 py-2 text-[12px] font-[700] text-[#6c6258] shadow-sm ring-1 ring-black/[0.05] hover:bg-[#171411] hover:text-white">{c.name}</Link>)}
          </div>
        </section>
      </div>
    </div>
  );
}
