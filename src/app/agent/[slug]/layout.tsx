import type { Metadata } from "next";
import { getAgent, getCategoryById } from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgent(slug);

  if (!agent) {
    return {
      title: "Agent Not Found — Agent Store",
    };
  }

  const category = getCategoryById(agent.category_id);
  const title = `${agent.name} — Agent Store`;
  const description = agent.tagline;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Agent Store",
      ...(agent.icon_url ? { images: [agent.icon_url] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    keywords: [
      agent.name,
      ...(category ? [category.name] : []),
      ...agent.capabilities,
      "AI agent",
    ],
  };
}

export default function AgentLayout({ children }: Props) {
  return children;
}
