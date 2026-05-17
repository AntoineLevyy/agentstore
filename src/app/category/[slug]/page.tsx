import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, agents, getCategory } from "@/lib/data";
import { AgentCard } from "@/components/AgentCard";
import { ChevronRight, Target } from "lucide-react";
import type { Metadata } from "next";

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

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `Best AI Apps for ${category.name} — Agentstore`,
    description: category.jobContext,
  };
}

// Derive 3 concise bullet points from jobContext
function getKeyPoints(jobContext: string): string[] {
  const sentences = jobContext.split(/\.\s+/).filter((s) => s.length > 20);
  return sentences.slice(0, 3).map((s) => s.replace(/\.$/, "").trim());
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const catColor = CATEGORY_COLORS[slug] || "#6366f1";
  const categoryAgents = agents.filter((a) => a.categorySlug === slug);
  const topPicks = categoryAgents.filter((a) => a.agenticDepth >= 4).slice(0, 3);
  const restAgents = categoryAgents.filter((a) => !topPicks.includes(a));
  const otherCategories = categories.filter((c) => c.slug !== slug).slice(0, 6);
  const keyPoints = getKeyPoints(category.jobContext);

  const avgDepth = categoryAgents.length > 0
    ? (categoryAgents.reduce((sum, a) => sum + a.agenticDepth, 0) / categoryAgents.length).toFixed(1)
    : "0";
  const highCompletionCount = categoryAgents.filter((a) => a.workflowCompletion === "High").length;
  const freeCount = categoryAgents.filter((a) => a.pricing.toLowerCase().includes("free")).length;

  return (
    <div className="min-h-screen">
      {/* Category accent gradient strip */}
      <div
        className="h-1.5"
        style={{ background: `linear-gradient(to right, ${catColor}, ${catColor}80)` }}
      />

      {/* Hero section */}
      <section className="relative overflow-hidden border-b border-black/[0.04]">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${catColor}, transparent 70%)` }}
        />
        <div className="relative max-w-5xl mx-auto px-5 pt-8 pb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/categories" className="hover:text-gray-900 transition-colors">Categories</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium">{category.name}</span>
          </div>

          {/* Category header */}
          <div className="flex items-start gap-4 mb-8">
            <span className="text-5xl">{CATEGORY_ICONS[slug] || "\u{1F4F1}"}</span>
            <div>
              <h1 className="text-[34px] font-bold text-gray-900 leading-tight">
                Best AI Apps for {category.name}
              </h1>
              <p className="text-[16px] text-gray-600 mt-2 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>

          {/* Key points - 3 concise bullets */}
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-[var(--shadow-sm)]">
            <h2 className="font-bold text-[14px] text-gray-900 mb-3">What to know</h2>
            <ul className="space-y-2">
              {keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] text-gray-600 leading-relaxed">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: catColor }}
                  />
                  {point}
                </li>
              ))}
            </ul>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-black/[0.04]">
              <div>
                <p className="text-[24px] font-bold text-gray-900">{categoryAgents.length}</p>
                <p className="text-[12px] text-gray-500">Apps reviewed</p>
              </div>
              <div>
                <p className="text-[24px] font-bold text-gray-900">{avgDepth}/5</p>
                <p className="text-[12px] text-gray-500">Avg. autonomy</p>
              </div>
              <div>
                <p className="text-[24px] font-bold text-gray-900">{highCompletionCount}</p>
                <p className="text-[12px] text-gray-500">End-to-end solutions</p>
              </div>
              <div>
                <p className="text-[24px] font-bold text-gray-900">{freeCount}</p>
                <p className="text-[12px] text-gray-500">Free to start</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All apps — top picks get a badge */}
      <section className="max-w-5xl mx-auto px-5 py-14">
        <div className="flex items-center gap-2 mb-8">
          <Target className="w-5 h-5 text-gray-600" />
          <h2 className="text-[22px] font-bold text-gray-900">
            {category.name} apps ({categoryAgents.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Top picks first, then rest */}
          {topPicks.map((agent) => (
            <AgentCard key={agent.id} agent={agent} topPick />
          ))}
          {restAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      {/* Other categories */}
      <section className="bg-gray-50 border-t border-black/[0.04]">
        <div className="max-w-5xl mx-auto px-5 py-14">
          <h2 className="text-[20px] font-bold text-gray-900 mb-6">Explore other categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {otherCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-3 bg-white rounded-xl border border-black/[0.06] p-4 hover:shadow-[var(--shadow-md)] hover:border-black/[0.1] transition-all duration-200"
              >
                <span className="text-xl">{CATEGORY_ICONS[cat.slug] || "\u{1F4F1}"}</span>
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
