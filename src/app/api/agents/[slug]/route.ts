import { NextResponse } from "next/server";
import { getAgent, getCategoryById, getAgentsByCategory } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const agent = getAgent(slug);

  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const category = getCategoryById(agent.category_id);
  const related = getAgentsByCategory(agent.category_id)
    .filter((a) => a.id !== agent.id)
    .slice(0, 4)
    .map((a) => ({ id: a.id, name: a.name, slug: a.slug, tagline: a.tagline }));

  return NextResponse.json({
    id: agent.id,
    name: agent.name,
    slug: agent.slug,
    tagline: agent.tagline,
    description: agent.description,
    icon_url: agent.icon_url,
    category: category ? { id: category.id, name: category.name, slug: category.slug } : null,
    capabilities: agent.capabilities,
    tools: agent.tools,
    special_data: agent.special_data,
    website_url: agent.website_url,
    creator_name: agent.creator_name,
    pricing: {
      type: agent.pricing_type,
      amount: agent.pricing_amount,
      currency: agent.pricing_currency,
      period: agent.pricing_period,
    },
    rating: {
      average: agent.rating_avg,
      count: agent.rating_count,
    },
    whats_new: agent.whats_new,
    created_at: agent.created_at,
    updated_at: agent.updated_at,
    related_agents: related,
  });
}
