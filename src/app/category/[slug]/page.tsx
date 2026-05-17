import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, agents, getCategory } from "@/lib/data";
import { AgentCard, AgentCardFeatured } from "@/components/AgentCard";
import { ChevronRight, ArrowRight, Zap, Target, BookOpen } from "lucide-react";
import type { Metadata } from "next";

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

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `Best AI Apps for ${category.name} — Every AI App`,
    description: category.jobContext,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const categoryAgents = agents.filter((a) => a.categorySlug === slug);
  const topPicks = categoryAgents.filter((a) => a.agenticDepth >= 4).slice(0, 3);
  const restAgents = categoryAgents.filter((a) => !topPicks.includes(a));
  const otherCategories = categories.filter((c) => c.slug !== slug).slice(0, 6);

  // Derive common patterns for the learning section
  const avgDepth = categoryAgents.length > 0
    ? (categoryAgents.reduce((sum, a) => sum + a.agenticDepth, 0) / categoryAgents.length).toFixed(1)
    : "0";
  const highCompletionCount = categoryAgents.filter((a) => a.workflowCompletion === "High").length;
  const freeCount = categoryAgents.filter((a) => a.pricing.toLowerCase().includes("free")).length;

  return (
    <div className="min-h-screen">
      {/* Hero section — the learning surface */}
      <section className="bg-gradient-to-b from-indigo-50/60 to-white border-b border-black/[0.04]">
        <div className="max-w-5xl mx-auto px-5 pt-8 pb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/categories" className="hover:text-gray-900 transition-colors">Categories</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium">{category.name}</span>
          </div>

          {/* Category header */}
          <div className="flex items-start gap-4 mb-6">
            <span className="text-4xl">{CATEGORY_ICONS[slug] || "📱"}</span>
            <div>
              <h1 className="text-[32px] font-bold text-gray-900 leading-tight">
                Best AI Apps for {category.name}
              </h1>
              <p className="text-[16px] text-gray-600 mt-2 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>

          {/* Learning context — what consumers need to know about this category */}
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 mt-6 shadow-[var(--shadow-sm)]">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <h2 className="font-semibold text-[14px] text-gray-900">What to know about AI {category.name.toLowerCase()} apps</h2>
            </div>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              {category.jobContext}
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-black/[0.04]">
              <div>
                <p className="text-[22px] font-bold text-gray-900">{categoryAgents.length}</p>
                <p className="text-[12px] text-gray-500">Apps reviewed</p>
              </div>
              <div>
                <p className="text-[22px] font-bold text-gray-900">{avgDepth}/5</p>
                <p className="text-[12px] text-gray-500">Avg. autonomy</p>
              </div>
              <div>
                <p className="text-[22px] font-bold text-gray-900">{highCompletionCount}</p>
                <p className="text-[12px] text-gray-500">End-to-end solutions</p>
              </div>
              <div>
                <p className="text-[22px] font-bold text-gray-900">{freeCount}</p>
                <p className="text-[12px] text-gray-500">Free to start</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top picks */}
      {topPicks.length > 0 && (
        <section className="max-w-5xl mx-auto px-5 py-12">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-indigo-600" />
            <h2 className="text-[20px] font-bold text-gray-900">Top picks — most autonomous</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topPicks.map((agent) => (
              <AgentCardFeatured key={agent.id} agent={agent} />
            ))}
          </div>
        </section>
      )}

      {/* All apps in category */}
      <section className="max-w-5xl mx-auto px-5 pb-12">
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-5 h-5 text-gray-600" />
          <h2 className="text-[20px] font-bold text-gray-900">
            All {category.name} apps ({categoryAgents.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(topPicks.length > 0 ? restAgents : categoryAgents).map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {topPicks.length > 0 && topPicks.map((agent) => (
            <AgentCard key={`all-${agent.id}`} agent={agent} />
          ))}
        </div>
      </section>

      {/* Other categories */}
      <section className="bg-gray-50 border-t border-black/[0.04]">
        <div className="max-w-5xl mx-auto px-5 py-12">
          <h2 className="text-[18px] font-bold text-gray-900 mb-5">Explore other categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {otherCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-3 bg-white rounded-xl border border-black/[0.06] p-4 hover:shadow-[var(--shadow-md)] hover:border-black/[0.1] transition-all duration-200"
              >
                <span className="text-xl">{CATEGORY_ICONS[cat.slug] || "📱"}</span>
                <div>
                  <p className="font-semibold text-[14px] text-gray-900">{cat.name}</p>
                  <p className="text-[12px] text-gray-500">{cat.agentCount} apps</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
