import Link from "next/link";
import { agents, categories } from "@/lib/data";
import { AgentCardFeatured, AgentCard } from "@/components/AgentCard";
import { ArrowRight, Search, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

const CATEGORY_ICONS: Record<string, string> = {
  "career-job-search": "\u{1F4BC}",
  "companion-life-coach": "\u{1F9E0}",
  "dressing-style": "\u{1F457}",
  "family-parenting": "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}",
  "health-wellness-fitness": "\u{1F4AA}",
  "home-real-estate": "\u{1F3E0}",
  "learning-tutoring": "\u{1F4DA}",
  "personal-finance": "\u{1F4B0}",
  "relationship-dating": "\u2764\uFE0F",
  "shopping-purchase-decisions": "\u{1F6CD}\uFE0F",
  "travel-organiser": "\u2708\uFE0F",
};

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

export default function Home() {
  const featured = agents.filter((a) => a.relevanceScore >= 5 && a.agenticDepth >= 4).slice(0, 3);
  const staffPicks = agents.filter((a) => a.relevanceScore >= 5).slice(0, 4);
  const highAutonomy = agents.filter((a) => a.agenticDepth >= 4).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Layered gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/60 via-white to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(168,85,247,0.04),transparent_50%)]" />
        <div className="absolute inset-0 noise-overlay" />

        <div className="relative max-w-5xl mx-auto px-5 pt-32 pb-20 text-center">
          <div className="inline-flex items-center gap-2 glass text-gray-600 text-[13px] font-semibold px-4 py-2 rounded-full mb-10 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            The consumer AI directory
          </div>

          <h1 className="text-[clamp(40px,6vw,64px)] font-extrabold text-gray-900 leading-[1.05] tracking-[-0.03em]">
            Discover AI apps
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">for your everyday life.</span>
          </h1>

          <p className="text-[17px] text-gray-400 mt-8 max-w-lg mx-auto leading-[1.7]">
            89 consumer AI apps rated by how autonomous they actually are.
            Browse by what you need done.
          </p>

          <div className="flex items-center justify-center gap-3.5 mt-10">
            <Link
              href="/discover"
              className="group inline-flex items-center gap-2.5 h-[52px] px-8 bg-gray-900 text-white font-semibold text-[15px] rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-xl shadow-gray-900/10"
            >
              Find your app <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center h-[52px] px-8 bg-white text-gray-700 font-semibold text-[15px] rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
            >
              Browse categories
            </Link>
          </div>
        </div>

        {/* Category pills */}
        <div className="relative max-w-5xl mx-auto px-5 pb-16">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const catColor = CATEGORY_COLORS[cat.slug] || "#6366f1";
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="group inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200/60 text-gray-600 text-[13px] font-medium pl-3 pr-3.5 py-2 rounded-full hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="text-[15px]">{CATEGORY_ICONS[cat.slug] || "\u{1F4F1}"}</span>
                  <span className="group-hover:text-gray-900 transition-colors">{cat.name}</span>
                  <span className="text-[11px] text-gray-300 font-semibold">{cat.agentCount}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-4xl mx-auto px-5 pb-6">
        <Link
          href="/newsletter"
          className="group flex items-center justify-between bg-white rounded-2xl px-6 py-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] border border-black/[0.04] transition-all duration-300 hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">📬</span>
            <p className="text-[14px] text-gray-600 font-medium">
              <span className="text-gray-900 font-semibold">Get Agentstore Weekly:</span>{" "}
              category teardowns of the consumer AI apps people may actually use.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </Link>
      </section>

      {/* Staff Picks / Trending */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-[12px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-3">
              <TrendingUp className="w-3.5 h-3.5" /> Staff picks
            </div>
            <h2 className="text-[26px] font-bold text-gray-900">Trending this week</h2>
          </div>
          <Link href="/discover" className="text-[13px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {staffPicks.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="max-w-6xl mx-auto px-5 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: <Zap className="w-5 h-5" />, color: "#6366f1", title: "Real autonomy scores", desc: "Every app rated 1-5 on how much it actually does for you vs. just assisting." },
            { icon: <TrendingUp className="w-5 h-5" />, color: "#10b981", title: "Consumer jobs, not features", desc: "Organized by what you\u2019re trying to accomplish, not what the tech does." },
            { icon: <Shield className="w-5 h-5" />, color: "#f59e0b", title: "Honest \u201cwhy not ChatGPT?\u201d", desc: "Every app explains what it does better than a general chatbot." },
          ].map((prop) => (
            <div
              key={prop.title}
              className="group bg-white rounded-2xl p-7 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5 transition-all duration-500"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white"
                style={{ backgroundColor: prop.color }}
              >
                {prop.icon}
              </div>
              <h3 className="font-bold text-[16px] text-gray-900">{prop.title}</h3>
              <p className="text-[14px] text-gray-400 mt-2 leading-relaxed">{prop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured — most autonomous consumer apps */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-[26px] font-bold text-gray-900">Most autonomous apps</h2>
            <p className="text-[15px] text-gray-500 mt-1.5">These actually do the work, not just help you do it</p>
          </div>
          <Link href="/discover?sort=autonomy" className="text-[13px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((agent) => (
            <AgentCardFeatured key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      {/* By category — top picks */}
      <section className="bg-white border-t border-black/[0.04]">
        <div className="max-w-6xl mx-auto px-5 py-24">
          <h2 className="text-[26px] font-bold text-gray-900 mb-2">Browse by what you need</h2>
          <p className="text-[15px] text-gray-500 mb-12">11 categories of AI apps for real consumer jobs</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => {
              const catAgents = agents.filter((a) => a.categorySlug === cat.slug).slice(0, 2);
              const catColor = CATEGORY_COLORS[cat.slug] || "#6366f1";
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="group bg-gray-50/80 hover:bg-white rounded-2xl border border-black/[0.04] hover:border-black/[0.08] p-6 hover:shadow-[var(--shadow-md)] transition-all duration-200 relative overflow-hidden"
                >
                  {/* Color accent strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ background: catColor }}
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{CATEGORY_ICONS[cat.slug] || "\u{1F4F1}"}</span>
                    <div>
                      <h3 className="font-bold text-[15px] text-gray-900 group-hover:text-indigo-700 transition-colors">{cat.name}</h3>
                      <p className="text-[12px] text-gray-500">{cat.agentCount} apps</p>
                    </div>
                  </div>
                  <p className="text-[13.5px] text-gray-600 leading-relaxed line-clamp-2">{cat.description}</p>
                  {catAgents.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-black/[0.04]">
                      <div className="flex items-center gap-2 text-[12px] text-gray-500">
                        <span className="font-medium">Top picks:</span>
                        {catAgents.map((a) => a.name).join(", ")}
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/30 to-indigo-50/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-5 py-28 text-center">
          <h2 className="text-[32px] font-extrabold text-gray-900 tracking-[-0.03em]">
            Stop scrolling. Start doing.
          </h2>
          <p className="text-[16px] text-gray-400 mt-4 max-w-sm mx-auto leading-relaxed">
            Find the AI app that handles the thing you&apos;ve been putting off.
          </p>
          <Link
            href="/discover"
            className="group inline-flex items-center gap-2.5 h-[52px] px-8 bg-gray-900 text-white font-semibold text-[15px] rounded-2xl mt-10 hover:bg-gray-800 transition-all duration-300 shadow-xl shadow-gray-900/10"
          >
            Search all apps <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.06] bg-white">
        <div className="max-w-6xl mx-auto px-5 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="8" fill="url(#footer-grad)" />
                  <path d="M8 14h12M14 8v12M10 10l8 8M18 10l-8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                  <defs><linearGradient id="footer-grad" x1="0" y1="0" x2="28" y2="28"><stop stopColor="#6366f1" /><stop offset="1" stopColor="#a855f7" /></linearGradient></defs>
                </svg>
                <span className="font-semibold text-[14px] text-gray-900">Agentstore</span>
              </div>
              <p className="text-[13px] text-gray-500 leading-relaxed">{agents.length}+ apps across 11 categories. Updated May 2026.</p>
            </div>

            {/* Category links */}
            <div className="md:col-span-3">
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Categories</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="text-[13px] text-gray-600 hover:text-indigo-600 transition-colors py-1"
                  >
                    {CATEGORY_ICONS[cat.slug]} {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
