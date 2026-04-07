import { NextRequest, NextResponse } from "next/server";
import { agents, categories, searchAgents, getAgentsByCategory, getCategoryById } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q");
  const categorySlug = searchParams.get("category");
  const capability = searchParams.get("capability");
  const tool = searchParams.get("tool");
  const pricing = searchParams.get("pricing");
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
  const offset = parseInt(searchParams.get("offset") || "0");

  let results = agents.filter((a) => a.status === "approved");

  // Text search
  if (query) {
    results = searchAgents(query);
  }

  // Category filter
  if (categorySlug) {
    const cat = categories.find((c) => c.slug === categorySlug);
    if (cat) {
      results = results.filter((a) => a.category_id === cat.id);
    }
  }

  // Capability filter
  if (capability) {
    const cap = capability.toLowerCase();
    results = results.filter((a) =>
      a.capabilities.some((c) => c.toLowerCase().includes(cap))
    );
  }

  // Tool filter
  if (tool) {
    const t = tool.toLowerCase();
    results = results.filter((a) =>
      a.tools.some((tl) => tl.toLowerCase().includes(t))
    );
  }

  // Pricing filter
  if (pricing) {
    results = results.filter((a) => a.pricing_type === pricing);
  }

  const total = results.length;
  const paginated = results.slice(offset, offset + limit);

  // Enrich with category name
  const enriched = paginated.map((agent) => {
    const category = getCategoryById(agent.category_id);
    return {
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
      updated_at: agent.updated_at,
    };
  });

  return NextResponse.json({
    agents: enriched,
    pagination: { total, limit, offset, has_more: offset + limit < total },
  });
}
