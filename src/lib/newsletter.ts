import fs from "fs";
import path from "path";

export interface NewsletterIssue {
  title: string;
  date: string;
  slug: string;
  description: string;
  issue: number;
  status: string;
  featured_category: string;
  content: string;
}

const NEWSLETTER_DIR = path.join(process.cwd(), "content", "newsletter");

function parseFrontmatter(raw: string): { data: Record<string, string | number>; content: string } {
  const lines = raw.split("\n");
  if (lines[0]?.trim() !== "---") {
    return { data: {}, content: raw };
  }

  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i]?.trim() === "---") {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    return { data: {}, content: raw };
  }

  const frontmatterLines = lines.slice(1, endIndex);
  const data: Record<string, string | number> = {};

  for (const line of frontmatterLines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value: string | number = line.slice(colonIndex + 1).trim();
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    // Parse numbers
    if (/^\d+$/.test(String(value))) {
      value = parseInt(String(value), 10);
    }
    data[key] = value;
  }

  const content = lines.slice(endIndex + 1).join("\n").trim();
  return { data, content };
}

function loadIssue(filename: string): NewsletterIssue | null {
  const filePath = path.join(NEWSLETTER_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(raw);

  if (!data.title || !data.slug || !data.date) return null;

  return {
    title: String(data.title),
    date: String(data.date),
    slug: String(data.slug),
    description: String(data.description || ""),
    issue: Number(data.issue || 0),
    status: String(data.status || "draft"),
    featured_category: String(data.featured_category || ""),
    content,
  };
}

export function getAllNewsletterIssues(): NewsletterIssue[] {
  if (!fs.existsSync(NEWSLETTER_DIR)) return [];

  const files = fs.readdirSync(NEWSLETTER_DIR).filter((f) => f.endsWith(".md"));
  const issues: NewsletterIssue[] = [];

  for (const file of files) {
    const issue = loadIssue(file);
    if (issue && issue.status === "published") {
      issues.push(issue);
    }
  }

  return issues.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNewsletterIssue(slug: string): NewsletterIssue | null {
  const all = getAllNewsletterIssues();
  return all.find((i) => i.slug === slug) || null;
}

export function getLatestNewsletterIssue(): NewsletterIssue | null {
  const all = getAllNewsletterIssues();
  return all[0] || null;
}
