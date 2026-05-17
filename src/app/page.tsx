import Link from "next/link";
import { agents, b2cCategories, b2bCategories } from "@/lib/data";
import { AgentIcon } from "@/components/AgentIcon";
import { AgentCard } from "@/components/AgentCard";
import { ArrowRight, CheckCircle2, Heart, Search, Sparkles } from "lucide-react";
import { CategoryIcon } from "@/components/CategoryIcon";

function categoryCount(categoryId: string) {
  return agents.filter((a) => a.status === "approved" && a.category_id === categoryId).length;
}

const appJobs = [
  "plan meals around what is in my fridge",
  "turn meeting notes into follow-ups",
  "find the cheapest flight window",
  "make a workout I will actually do",
  "write a better sales email",
];

export default function Home() {
  const approved = agents.filter((a) => a.status === "approved");
  const featured = approved.filter((a) => a.featured).slice(0, 6);
  const consumerCategories = [...b2cCategories, ...b2bCategories.slice(0, 6)];
  const heroApps = featured.slice(0, 3);

  return (
    <div className="bg-[#fbfaf7] text-[#171411]">
      <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 lg:pb-24 lg:pt-20">
        <div className="absolute left-1/2 top-8 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#ffd8c2] opacity-60 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[12px] font-[720] text-[#7b4b24] shadow-sm ring-1 ring-black/[0.06]">
              <Heart className="h-3.5 w-3.5 fill-[#ff6b35] text-[#ff6b35]" />
              {approved.length}+ AI apps, organized by what people actually want done
            </div>
            <h1 className="max-w-3xl text-[52px] font-[820] leading-[0.96] tracking-[-0.055em] text-[#171411] sm:text-[72px] lg:text-[86px]">
              We have an app that does what you want.
            </h1>
            <p className="mt-6 max-w-xl text-[18px] leading-8 text-[#625950]">
              Search by the job in your head — not by model names, protocols, or AI jargon. Find consumer AI apps for home, work, money, travel, learning, relationships, creativity, and admin.
            </p>

            <form action="/discover" className="mt-8 rounded-[30px] bg-white p-2 shadow-[0_24px_80px_rgba(56,42,25,0.16)] ring-1 ring-black/[0.07] sm:flex">
              <div className="flex min-h-14 flex-1 items-center gap-3 px-4">
                <Search className="h-5 w-5 text-[#ff6b35]" />
                <input
                  name="q"
                  placeholder="I want an app to plan a trip with my friends..."
                  className="w-full bg-transparent text-[16px] font-[560] text-[#171411] outline-none placeholder:text-[#a49a90]"
                />
              </div>
              <button className="mt-2 inline-flex h-14 w-full items-center justify-center rounded-[24px] bg-[#171411] px-6 text-[15px] font-[760] text-white transition hover:bg-[#2a241f] sm:mt-0 sm:w-auto">
                Find my app
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-2">
              {appJobs.map((job) => (
                <Link key={job} href={`/discover?q=${encodeURIComponent(job)}`} className="rounded-full bg-[#f0ece5] px-3 py-2 text-[12px] font-[650] text-[#6b625a] transition hover:bg-[#171411] hover:text-white">
                  {job}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[42px] bg-[#171411] p-4 shadow-[0_30px_90px_rgba(23,20,17,0.28)]">
              <div className="rounded-[32px] bg-[#fffaf1] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-[780] uppercase tracking-[0.12em] text-[#a06736]">Example result</p>
                    <h2 className="mt-1 text-[22px] font-[800] tracking-[-0.035em] text-[#171411]">Apps for “organize my workday”</h2>
                  </div>
                  <Sparkles className="h-6 w-6 text-[#ff6b35]" />
                </div>
                <div className="space-y-3">
                  {heroApps.map((app, index) => (
                    <Link key={app.id} href={`/agent/${app.slug}`} className="block rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-black/[0.06] transition hover:-translate-y-0.5 hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff0e8] text-[12px] font-[820] text-[#ff6b35]">{index + 1}</span>
                        <AgentIcon name={app.name} websiteUrl={app.website_url} iconUrl={app.icon_url} size="sm" className="rounded-[13px]" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[15px] font-[780] text-[#171411]">{app.name}</p>
                          <p className="truncate text-[12px] font-[560] text-[#746b62]">{app.tagline}</p>
                        </div>
                        <span className="rounded-full bg-[#e8f8ed] px-2 py-1 text-[11px] font-[760] text-[#17673a]">Fits</span>
                      </div>
                      <p className="mt-3 rounded-[16px] bg-[#fbf7ef] px-3 py-2 text-[12px] font-[620] leading-5 text-[#5f554c]">
                        Why: {app.capabilities.slice(0, 2).join(" + ") || "matches the task"}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="border-y border-black/[0.06] bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[13px] font-[760] uppercase tracking-[0.14em] text-[#ff6b35]">Browse by life area</p>
              <h2 className="mt-2 text-[40px] font-[820] tracking-[-0.045em] text-[#171411]">SEO pages that teach, then recommend.</h2>
            </div>
            <Link href="/discover" className="inline-flex items-center gap-2 text-[14px] font-[760] text-[#171411]">See all apps <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {consumerCategories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`} className="group rounded-[28px] bg-[#fbfaf7] p-5 ring-1 ring-black/[0.06] transition hover:-translate-y-1 hover:bg-[#fff6ec] hover:shadow-lg">
                <div className="mb-5 flex items-center justify-between">
                  <CategoryIcon slug={category.slug} size="md" />
                  <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-[760] text-[#7b7369] shadow-sm">{categoryCount(category.id)} apps</span>
                </div>
                <h3 className="text-[18px] font-[800] tracking-[-0.025em] text-[#171411]">{category.name}</h3>
                <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-[#716860]">{category.description}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-[12px] font-[760] text-[#ff6b35]">Learn what works <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-8 max-w-2xl">
            <p className="text-[13px] font-[760] uppercase tracking-[0.14em] text-[#ff6b35]">Better cards</p>
            <h2 className="mt-2 text-[42px] font-[820] leading-none tracking-[-0.045em]">Less directory. More “should I try this?”</h2>
            <p className="mt-4 text-[16px] leading-7 text-[#675e55]">Every app card surfaces the job it handles, price, category, tools, and trust cues before you click.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((agent) => <AgentCard key={agent.id} agent={agent} />)}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-[1180px] rounded-[36px] bg-[#171411] p-8 text-white shadow-[0_24px_80px_rgba(23,20,17,0.18)] sm:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_0.75fr] md:items-center">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-[720] text-[#ffd8c2]"><CheckCircle2 className="h-3.5 w-3.5" /> No protocol layer in the pitch</p>
              <h2 className="text-[38px] font-[820] leading-none tracking-[-0.045em]">Consumer apps first. Discovery complexity hidden.</h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-7 text-white/70">The product speaks like a consumer app store: tell us what you want done, get apps that can do it, learn how to choose by category, then open the right detail page.</p>
            </div>
            <Link href="/discover" className="inline-flex h-14 items-center justify-center rounded-full bg-white px-6 text-[15px] font-[780] text-[#171411] transition hover:-translate-y-0.5 hover:shadow-xl">Find an app</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
