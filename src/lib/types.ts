export type PricingType = "free" | "freemium" | "paid" | "contact";
export type PricingPeriod = "one_time" | "monthly" | "yearly" | "per_use" | "weekly";
export type AgentStatus = "draft" | "pending_review" | "approved" | "rejected" | "suspended";

export interface Agent {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon_url: string;
  screenshots: string[];
  category_id: string;
  capabilities: string[];
  tools: string[];
  special_data: string;
  website_url: string;
  creator_name: string | null;
  creator_id: string | null;
  pricing_type: PricingType;
  pricing_amount: number | null;
  pricing_currency: string;
  pricing_period: PricingPeriod | null;
  status: AgentStatus;
  featured: boolean;
  rating_avg: number;
  rating_count: number;
  whats_new: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  sort_order: number;
}

export interface Review {
  id: string;
  agent_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  title: string;
  body: string;
  created_at: string;
}
