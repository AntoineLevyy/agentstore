import Link from "next/link";
import { ArrowRight, BookOpen, Lightbulb, BarChart3, Layers, Target } from "lucide-react";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { getAllNewsletterIssues, getLatestNewsletterIssue } from "@/lib/newsletter";

export const metadata = {
  title: "Newsletter — Agentstore Weekly",
  description: "Track the consumer AI apps people may actually use. Category teardowns, traction notes, and opportunity gaps for builders.",
};

export default function NewsletterPage() {
  const issues = getAllNewsletterIssues();
  const latest = getLatestNewsletterIssue();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/60 via-white to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.08),transparent)]" />

        <div className="relative max-w-3xl mx-auto px-5 pt-28 pb-16 text-center">
          <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold text-gray-900 leading-[1.1] tracking-[-0.03em]">
            Track the consumer AI apps
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              people may actually use.
            </span>
          </h1>

          <p className="text-[17px] text-gray-500 mt-6 max-w-lg mx-auto leading-[1.7]">
            Every week we tear down one consumer AI category — the apps, their agentic depth,
            traction signals, and where the gaps are for builders.
          </p>

          <div className="max-w-md mx-auto mt-10">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-4xl mx-auto px-5 py-16">
        <h2 className="text-[22px] font-bold text-gray-900 mb-8 text-center">What you get</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: <BookOpen className="w-5 h-5" />, color: "#6366f1", label: "Category teardown every week" },
            { icon: <Target className="w-5 h-5" />, color: "#8b5cf6", label: "Specific AI app teardowns" },
            { icon: <BarChart3 className="w-5 h-5" />, color: "#10b981", label: "Traction & surface notes" },
            { icon: <Layers className="w-5 h-5" />, color: "#0ea5e9", label: "Workflow & category analysis" },
            { icon: <Lightbulb className="w-5 h-5" />, color: "#f59e0b", label: "Opportunity gaps for builders" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 bg-white rounded-2xl p-5 shadow-[var(--shadow-card)] border border-black/[0.04]"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>
              <span className="text-[14px] font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Latest issue */}
      {latest && (
        <section className="max-w-4xl mx-auto px-5 pb-16">
          <h2 className="text-[22px] font-bold text-gray-900 mb-6">Latest issue</h2>
          <Link
            href={`/newsletter/${latest.slug}`}
            className="group block bg-white rounded-2xl p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] border border-black/[0.04] transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[12px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                Issue #{latest.issue}
              </span>
              <span className="text-[12px] text-gray-400">{latest.date}</span>
              {latest.featured_category && (
                <span className="text-[12px] text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                  {latest.featured_category}
                </span>
              )}
            </div>
            <h3 className="text-[18px] font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
              {latest.title}
            </h3>
            <p className="text-[14px] text-gray-500 mt-2 leading-relaxed">{latest.description}</p>
            <div className="flex items-center gap-1.5 mt-4 text-[13px] font-medium text-indigo-600">
              Read issue <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </section>
      )}

      {/* Archive */}
      {issues.length > 0 && (
        <section className="max-w-4xl mx-auto px-5 pb-20">
          <h2 className="text-[22px] font-bold text-gray-900 mb-6">Archive</h2>
          <div className="space-y-3">
            {issues.map((issue) => (
              <Link
                key={issue.slug}
                href={`/newsletter/${issue.slug}`}
                className="group flex items-center justify-between bg-white rounded-2xl px-6 py-4 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] border border-black/[0.04] transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[12px] font-bold text-gray-400 w-6">#{issue.issue}</span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                      {issue.title}
                    </h3>
                    <p className="text-[13px] text-gray-400 mt-0.5">{issue.date} · {issue.featured_category}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="border-t border-black/[0.04] bg-gray-50/50">
        <div className="max-w-3xl mx-auto px-5 py-20 text-center">
          <h2 className="text-[24px] font-bold text-gray-900">Don&apos;t miss the next teardown</h2>
          <p className="text-[15px] text-gray-500 mt-3 mb-8">Free, weekly, unsubscribe anytime.</p>
          <div className="max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
}
