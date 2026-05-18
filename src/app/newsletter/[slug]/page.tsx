import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllNewsletterIssues, getNewsletterIssue } from "@/lib/newsletter";
import { NewsletterSignup } from "@/components/NewsletterSignup";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const issue = getNewsletterIssue(slug);
  if (!issue) return { title: "Not Found" };

  return {
    title: `${issue.title} — Agentstore Weekly`,
    description: issue.description,
  };
}

export async function generateStaticParams() {
  const issues = getAllNewsletterIssues();
  return issues.map((issue) => ({ slug: issue.slug }));
}

function renderMarkdown(content: string): string {
  let html = content;

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-[18px] font-bold text-gray-900 mt-8 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-[22px] font-bold text-gray-900 mt-10 mb-4">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-[28px] font-extrabold text-gray-900 mt-6 mb-6">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr class="my-8 border-gray-200" />');

  // Tables
  html = html.replace(/^\|(.+)\|$/gm, (match) => {
    const cells = match.split("|").filter((c) => c.trim() !== "");
    if (cells.every((c) => /^[\s-:]+$/.test(c))) {
      return ""; // separator row
    }
    const isHeader = cells.every((c) => c.trim().length > 0);
    const tag = "td";
    const row = cells
      .map((c) => `<${tag} class="px-3 py-2 border border-gray-200 text-[14px]">${c.trim()}</${tag}>`)
      .join("");
    return `<tr>${row}</tr>`;
  });
  html = html.replace(/(<tr>.*<\/tr>\n?)+/g, (match) => {
    return `<table class="w-full border-collapse my-6 bg-white rounded-lg overflow-hidden">${match}</table>`;
  });

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="text-[15px] text-gray-600 leading-relaxed ml-4 list-disc">$1</li>');
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul class="my-4 space-y-1.5">${match}</ul>`);

  // Paragraphs (lines that aren't already HTML)
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<")) return trimmed;
      return `<p class="text-[15px] text-gray-600 leading-[1.8] my-4">${trimmed}</p>`;
    })
    .join("\n");

  return html;
}

export default async function NewsletterIssuePage({ params }: PageProps) {
  const { slug } = await params;
  const issue = getNewsletterIssue(slug);

  if (!issue) {
    notFound();
  }

  const htmlContent = renderMarkdown(issue.content);

  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      {/* Back link */}
      <Link
        href="/newsletter"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-500 hover:text-indigo-600 transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to newsletter
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[12px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
            Issue #{issue.issue}
          </span>
          <span className="text-[13px] text-gray-400">{issue.date}</span>
          {issue.featured_category && (
            <span className="text-[12px] text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
              {issue.featured_category}
            </span>
          )}
        </div>
        <h1 className="text-[clamp(28px,4vw,36px)] font-extrabold text-gray-900 leading-[1.15] tracking-[-0.03em]">
          {issue.title}
        </h1>
        {issue.description && (
          <p className="text-[16px] text-gray-500 mt-4 leading-relaxed">{issue.description}</p>
        )}
      </div>

      {/* Content */}
      <article
        className="newsletter-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Bottom CTA */}
      <div className="mt-16 pt-10 border-t border-gray-200">
        <h2 className="text-[20px] font-bold text-gray-900 mb-2">Enjoyed this issue?</h2>
        <p className="text-[15px] text-gray-500 mb-6">Get the next category teardown in your inbox.</p>
        <NewsletterSignup />
      </div>
    </div>
  );
}
