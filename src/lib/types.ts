export interface Agent {
  id: string;
  name: string;
  slug: string;
  url: string;
  category: string;
  categorySlug: string;
  jobToBeDone: string;
  targetUser: string;
  userInput: string;
  outputAction: string;
  agenticDepth: number;
  workflowCompletion: string;
  memoryAdvantage: string;
  pricing: string;
  traction: string;
  whyOverChatGPT: string;
  relevanceScore: number;
  capabilities: string[];
  sourceUrls: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  jobContext: string;
  agentCount: number;
}
