import { NextResponse } from "next/server";
import { categories, agents } from "@/lib/data";

export async function GET() {
  const enriched = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    icon: cat.icon,
    description: cat.description,
    agent_count: agents.filter((a) => a.category_id === cat.id && a.status === "approved").length,
  }));

  return NextResponse.json({ categories: enriched });
}
