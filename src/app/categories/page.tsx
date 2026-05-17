import Link from "next/link";
import { categories, agents } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI App Categories — Consumer AI",
  description: "Browse 11 categories of AI apps for real life: career, health, finance, relationships, travel, shopping & more.",
};

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

export default function CategoriesPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <h1 className="text-[32px] font-bold text-gray-900 mb-2">Categories</h1>
      <p className="text-[16px] text-gray-600 mb-10">
        11 categories of AI apps organized by what you&apos;re trying to accomplish in life.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map((cat) => {
          const catAgents = agents.filter((a) => a.categorySlug === cat.slug);
          const topNames = catAgents.slice(0, 3).map((a) => a.name);

          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group bg-white rounded-2xl border border-black/[0.06] p-6 hover:shadow-[var(--shadow-lg)] hover:border-black/[0.1] transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{CATEGORY_ICONS[cat.slug] || "📱"}</span>
                <div>
                  <h2 className="font-semibold text-[18px] text-gray-900 group-hover:text-indigo-700 transition-colors">{cat.name}</h2>
                  <p className="text-[13px] text-gray-500">{cat.agentCount} apps</p>
                </div>
              </div>
              <p className="text-[14px] text-gray-600 leading-relaxed line-clamp-3">{cat.description}</p>
              {topNames.length > 0 && (
                <p className="text-[12px] text-gray-500 mt-3 pt-3 border-t border-black/[0.04]">
                  <span className="font-medium">Popular:</span> {topNames.join(", ")}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
