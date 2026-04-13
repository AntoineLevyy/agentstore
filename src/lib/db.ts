import { getSupabase } from "./supabase";
import { Agent } from "./types";

// ─── Agents ─────────────────────────────────────────────

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  const { data } = await getSupabase()
    .from("agents")
    .select("*")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();
  return data;
}

export async function getAgentsByCategory(categoryId: string): Promise<Agent[]> {
  const { data } = await getSupabase()
    .from("agents")
    .select("*")
    .eq("category_id", categoryId)
    .eq("status", "approved")
    .order("name");
  return data || [];
}

export async function getFeaturedAgents(): Promise<Agent[]> {
  const { data } = await getSupabase()
    .from("agents")
    .select("*")
    .eq("status", "approved")
    .eq("featured", true)
    .order("name")
    .limit(20);
  return data || [];
}

export async function searchAgents(query: string): Promise<Agent[]> {
  const { data } = await getSupabase()
    .from("agents")
    .select("*")
    .eq("status", "approved")
    .or(`name.ilike.%${query}%,tagline.ilike.%${query}%,description.ilike.%${query}%`)
    .order("name")
    .limit(50);
  return data || [];
}

export async function getAllApprovedAgents(): Promise<Agent[]> {
  const { data } = await getSupabase()
    .from("agents")
    .select("*")
    .eq("status", "approved")
    .order("name");
  return data || [];
}

export async function getCategoryAgentCount(categoryId: string): Promise<number> {
  const { count } = await getSupabase()
    .from("agents")
    .select("*", { count: "exact", head: true })
    .eq("category_id", categoryId)
    .eq("status", "approved");
  return count || 0;
}

// ─── Submissions ────────────────────────────────────────

export async function submitAgent(agent: {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category_id: string;
  capabilities: string[];
  tools: string[];
  special_data: string;
  website_url: string;
  creator_name: string;
  pricing_type: string;
  pricing_amount: number | null;
  pricing_period: string | null;
}) {
  const { error } = await getSupabase()
    .from("agents")
    .insert({
      ...agent,
      status: "pending",
      icon_url: "",
      screenshots: [],
      pricing_currency: "USD",
      featured: false,
      rating_avg: 0,
      rating_count: 0,
    });

  if (error) throw error;
  return { success: true };
}

// ─── Reviews ────────────────────────────────────────────

export interface Review {
  id: string;
  agent_slug: string;
  user_name: string;
  rating: number;
  title: string;
  body: string;
  created_at: string;
}

export async function getReviewsForAgent(agentSlug: string): Promise<Review[]> {
  const { data } = await getSupabase()
    .from("reviews")
    .select("*")
    .eq("agent_slug", agentSlug)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function submitReview(review: {
  agent_slug: string;
  user_name: string;
  rating: number;
  title: string;
  body: string;
}) {
  const { data, error } = await getSupabase()
    .from("reviews")
    .insert(review)
    .select()
    .single();

  if (error) throw error;

  // Update agent rating
  const { data: reviews } = await getSupabase()
    .from("reviews")
    .select("rating")
    .eq("agent_slug", review.agent_slug);

  if (reviews && reviews.length > 0) {
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await getSupabase().rpc("update_agent_rating", {
      agent_slug: review.agent_slug,
      new_avg: Math.round(avg * 10) / 10,
      new_count: reviews.length,
    });
  }

  return data;
}
