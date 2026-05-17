import Link from "next/link";
import { agents, categories } from "@/lib/data";
import { AgentCardFeatured, AgentCard } from "@/components/AgentCard";
import { ArrowRight, Search, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

const CATEGORY_ICONS: Record<string, string> = {
  "career-job-search": "💼",
  "companion-life-coach": "🧠",
  "dressing-style": "👗",
  "family-parenting": "👨‍👩‍👧",
  "health-wellness-fitness": "💪",
  "home-real-estate": "🏠",
  "learning-tutoring": "📚",
  "personal-finance": "💰",
  "relationship-dating": "❤️",
  "shopping-purchase-decisions": "🛍️",
  "travel-organiser": "✈️",
};

export default function Home() {
  const featured = agents.filter((a) => a.relevanceScore >= 5 && a.agenticDepth >= 4).slice(0, 3);
  const highAutonomy = agents.filter((a) => a.agenticDepth >= 4).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.04),transparent_50%)]" />

        <div className="relative max-w-5xl mx-auto px-5 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-black/[0.06] text-gray-600 text-[13px] font-medium px-3.5 py-2 rounded-full mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            The complete consumer AI directory
          </div>

          <h1 className="text-[clamp(36px,5vw,56px)] font-bold text-gray-900 leading-[1.1] tracking-tight">
            Every AI app.
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">For your actual life.</span>
          </h1>

          <p className="text-[17px] text-gray-600 mt-6 max-w-lg mx-auto leading-relaxed">
            Not another chatbot list. Every real AI app that handles your job search,
            manages your money, plans your trips, and coaches your health — in one place.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 h-11 px-6 bg-indigo-600 text-white font-semibold text-[14px] rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
            >
              Find your app <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center h-11 px-6 bg-white text-gray-700 font-semibold text-[14px] rounded-xl border border-black/[0.1] hover:bg-gray-50 transition-colors"
            >
              Browse categories
            </Link>
          </div>
        </div>
      </section>

      {/* Category pills */}
      <section className="max-w-6xl mx-auto px-5 -mt-4">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="inline-flex items-center gap-2 bg-white border border-black/[0.06] text-gray-700 text-[13px] font-medium px-4 py-2.5 rounded-xl hover:shadow-md hover:border-black/[0.1] transition-all duration-200"
            >
              <span className="text-base">{CATEGORY_ICONS[cat.slug] || "📱"}</span>
              {cat.name}
              <span className="text-gray-400 text-[12px]">{cat.agentCount}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-[var(--shadow-sm)]">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-[16px] text-gray-900">Real autonomy scores</h3>
            <p className="text-[14px] text-gray-600 mt-2 leading-relaxed">
              Every app rated 1-5 on how much it actually does for you vs. just assisting.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-[var(--shadow-sm)]">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-[16px] text-gray-900">Consumer jobs, not features</h3>
            <p className="text-[14px] text-gray-600 mt-2 leading-relaxed">
              Organized by what you&apos;re trying to accomplish, not what the tech does.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-[var(--shadow-sm)]">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-semibold text-[16px] text-gray-900">Honest &ldquo;why not ChatGPT?&rdquo;</h3>
            <p className="text-[14px] text-gray-600 mt-2 leading-relaxed">
              Every app explains what it does better than a general chatbot.
            </p>
          </div>
        </div>
      </section>

      {/* Featured — most autonomous consumer apps */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[24px] font-bold text-gray-900">Most autonomous apps</h2>
            <p className="text-[14px] text-gray-500 mt-1">These actually do the work, not just help you do it</p>
          </div>
          <Link href="/discover?sort=autonomy" className="text-[13px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((agent) => (
            <AgentCardFeatured key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      {/* By category — top picks */}
      <section className="bg-white border-t border-black/[0.04]">
        <div className="max-w-6xl mx-auto px-5 py-20">
          <h2 className="text-[24px] font-bold text-gray-900 mb-2">Browse by what you need</h2>
          <p className="text-[14px] text-gray-500 mb-10">11 categories of AI apps for real consumer jobs</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const catAgents = agents.filter((a) => a.categorySlug === cat.slug).slice(0, 2);
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="group bg-gray-50 hover:bg-white rounded-2xl border border-black/[0.04] hover:border-black/[0.08] p-5 hover:shadow-[var(--shadow-md)] transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{CATEGORY_ICONS[cat.slug] || "📱"}</span>
                    <div>
                      <h3 className="font-semibold text-[15px] text-gray-900 group-hover:text-indigo-700 transition-colors">{cat.name}</h3>
                      <p className="text-[12px] text-gray-500">{cat.agentCount} apps</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-2">{cat.description}</p>
                  {catAgents.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-black/[0.04]">
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
      <section className="bg-gradient-to-b from-white to-indigo-50/50">
        <div className="max-w-4xl mx-auto px-5 py-20 text-center">
          <h2 className="text-[28px] font-bold text-gray-900">
            Stop scrolling. Start doing.
          </h2>
          <p className="text-[15px] text-gray-600 mt-3 max-w-md mx-auto">
            Find the AI app that handles the thing you&apos;ve been putting off.
          </p>
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 h-11 px-6 bg-indigo-600 text-white font-semibold text-[14px] rounded-xl mt-8 hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
          >
            Search all apps <Search className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.06] bg-white">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="url(#footer-grad)" />
                <path d="M8 14h12M14 8v12M10 10l8 8M18 10l-8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                <defs><linearGradient id="footer-grad" x1="0" y1="0" x2="28" y2="28"><stop stopColor="#6366f1" /><stop offset="1" stopColor="#a855f7" /></linearGradient></defs>
              </svg>
              <span className="font-semibold text-[13px] text-gray-900">Every AI App</span>
            </div>
            <p className="text-[12px] text-gray-500">89+ apps · 11 categories · Updated May 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
