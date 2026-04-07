import { NextRequest, NextResponse } from "next/server";
import { agents, categories, searchAgents, getCategoryById } from "@/lib/data";

// MCP JSON-RPC handler
// Implements the Model Context Protocol (spec 2025-11-25) for AI-to-AI agent discovery
// See: https://modelcontextprotocol.io/specification/2025-11-25

const PROTOCOL_VERSION = "2025-11-25";
const SERVER_NAME = "agent-store";
const SERVER_VERSION = "1.0.0";

// JSON-RPC 2.0 error codes
const PARSE_ERROR = -32700;
const INVALID_REQUEST = -32600;
const METHOD_NOT_FOUND = -32601;
const INVALID_PARAMS = -32602;
const INTERNAL_ERROR = -32603;

function formatAgent(agent: typeof agents[0]) {
  const category = getCategoryById(agent.category_id);
  return {
    id: agent.id,
    name: agent.name,
    slug: agent.slug,
    tagline: agent.tagline,
    description: agent.description,
    category: category?.name || "Uncategorized",
    capabilities: agent.capabilities,
    tools: agent.tools,
    special_data: agent.special_data,
    website_url: agent.website_url,
    creator: agent.creator_name,
    pricing_type: agent.pricing_type,
    pricing_amount: agent.pricing_amount,
    pricing_period: agent.pricing_period,
    rating: agent.rating_avg,
    rating_count: agent.rating_count,
  };
}

function handleRequest(method: string, params: Record<string, unknown> = {}): { result?: unknown; error?: { code: number; message: string; data?: unknown } } {
  switch (method) {
    // ─── Lifecycle ───────────────────────────────────────────
    case "initialize": {
      const clientProtocol = params.protocolVersion as string | undefined;
      return {
        result: {
          protocolVersion: PROTOCOL_VERSION,
          capabilities: {
            tools: { listChanged: false },
            resources: { subscribe: false, listChanged: false },
            logging: {},
          },
          serverInfo: {
            name: SERVER_NAME,
            version: SERVER_VERSION,
          },
          instructions: "Agent Store MCP server. Use find_agent_for_task to discover AI agents for any task. Use search_agents for filtered search. Use get_agent for details on a specific agent.",
        },
      };
    }

    case "notifications/initialized":
      // Client confirms initialization — no response needed for notifications
      return { result: {} };

    case "ping":
      return { result: {} };

    // ─── Tools ──────────────────────────────────────────────
    case "tools/list":
      return {
        result: {
          tools: [
            {
              name: "find_agent_for_task",
              description: "Describe a task in natural language and get the best matching AI agents ranked by relevance. This is the primary discovery tool — use it when an AI system needs to find or delegate to a specialized agent.",
              inputSchema: {
                type: "object" as const,
                properties: {
                  task_description: {
                    type: "string",
                    description: "Natural language description of the task (e.g. 'I need to analyze a CSV dataset and create visualizations')",
                  },
                  max_results: {
                    type: "number",
                    description: "Max agents to return (default 5, max 20)",
                  },
                  pricing_preference: {
                    type: "string",
                    description: "Preferred pricing model",
                    enum: ["free", "freemium", "paid", "any"],
                  },
                },
                required: ["task_description"],
              },
            },
            {
              name: "search_agents",
              description: "Search the Agent Store catalog with structured filters. Supports text queries combined with category, capability, tool, and pricing filters.",
              inputSchema: {
                type: "object" as const,
                properties: {
                  query: {
                    type: "string",
                    description: "Free-text search query (e.g. 'code generation', 'customer support')",
                  },
                  category: {
                    type: "string",
                    description: "Filter by category slug",
                    enum: categories.map((c) => c.slug),
                  },
                  capability: {
                    type: "string",
                    description: "Filter by specific capability (e.g. 'web browsing', 'code generation')",
                  },
                  tool: {
                    type: "string",
                    description: "Filter by tool the agent uses (e.g. 'API', 'Slack')",
                  },
                  pricing: {
                    type: "string",
                    description: "Filter by pricing type",
                    enum: ["free", "freemium", "paid", "contact"],
                  },
                  limit: {
                    type: "number",
                    description: "Max results to return (default 10, max 50)",
                  },
                },
              },
            },
            {
              name: "get_agent",
              description: "Get complete details about a specific AI agent by its slug identifier. Returns capabilities, tools, pricing, and related agents.",
              inputSchema: {
                type: "object" as const,
                properties: {
                  slug: {
                    type: "string",
                    description: "The agent's URL slug (e.g. 'cursor', 'perplexity-ai', 'devin')",
                  },
                },
                required: ["slug"],
              },
            },
            {
              name: "list_categories",
              description: "List all agent categories with descriptions and live agent counts. Useful for understanding the catalog structure.",
              inputSchema: {
                type: "object" as const,
                properties: {},
              },
            },
          ],
        },
      };

    case "tools/call": {
      const toolName = params.name as string;
      const args = (params.arguments || {}) as Record<string, unknown>;

      switch (toolName) {
        case "search_agents": {
          let results = agents.filter((a) => a.status === "approved");

          if (args.query) results = searchAgents(args.query as string);
          if (args.category) {
            const cat = categories.find((c) => c.slug === args.category);
            if (cat) results = results.filter((a) => a.category_id === cat.id);
          }
          if (args.capability) {
            const cap = (args.capability as string).toLowerCase();
            results = results.filter((a) => a.capabilities.some((c) => c.toLowerCase().includes(cap)));
          }
          if (args.tool) {
            const t = (args.tool as string).toLowerCase();
            results = results.filter((a) => a.tools.some((tl) => tl.toLowerCase().includes(t)));
          }
          if (args.pricing) {
            results = results.filter((a) => a.pricing_type === args.pricing);
          }

          const limit = Math.min((args.limit as number) || 10, 50);
          return {
            result: {
              content: [{
                type: "text",
                text: JSON.stringify({ agents: results.slice(0, limit).map(formatAgent), total: results.length }),
              }],
            },
          };
        }

        case "get_agent": {
          if (!args.slug) {
            return { error: { code: INVALID_PARAMS, message: "Missing required parameter: slug" } };
          }
          const agent = agents.find((a) => a.slug === args.slug && a.status === "approved");
          if (!agent) {
            return {
              result: {
                content: [{ type: "text", text: JSON.stringify({ error: "Agent not found", slug: args.slug }) }],
                isError: true,
              },
            };
          }
          return {
            result: {
              content: [{ type: "text", text: JSON.stringify(formatAgent(agent)) }],
            },
          };
        }

        case "list_categories": {
          const cats = categories.map((c) => ({
            name: c.name,
            slug: c.slug,
            icon: c.icon,
            description: c.description,
            agent_count: agents.filter((a) => a.category_id === c.id && a.status === "approved").length,
          }));
          return {
            result: {
              content: [{ type: "text", text: JSON.stringify({ categories: cats }) }],
            },
          };
        }

        case "find_agent_for_task": {
          if (!args.task_description) {
            return { error: { code: INVALID_PARAMS, message: "Missing required parameter: task_description" } };
          }
          const taskDesc = (args.task_description as string).toLowerCase();
          const maxResults = Math.min((args.max_results as number) || 5, 20);
          const pricingPref = args.pricing_preference as string;

          let scored = agents
            .filter((a) => a.status === "approved")
            .map((agent) => {
              let score = 0;
              const fields = [
                agent.name.toLowerCase(),
                agent.tagline.toLowerCase(),
                agent.description.toLowerCase(),
                ...agent.capabilities.map((c) => c.toLowerCase()),
                ...agent.tools.map((t) => t.toLowerCase()),
                agent.special_data.toLowerCase(),
              ].join(" ");

              const words = taskDesc.split(/\s+/).filter((w) => w.length > 2);
              for (const word of words) {
                if (agent.name.toLowerCase().includes(word)) score += 15;
                else if (agent.tagline.toLowerCase().includes(word)) score += 12;
                else if (fields.includes(word)) score += 8;
              }

              // Exact phrase bonus
              if (fields.includes(taskDesc)) score += 25;

              return { agent, score };
            })
            .filter((s) => s.score > 0)
            .sort((a, b) => b.score - a.score);

          if (pricingPref && pricingPref !== "any") {
            scored = scored.filter((s) => s.agent.pricing_type === pricingPref);
          }

          const results = scored.slice(0, maxResults).map((s) => ({
            ...formatAgent(s.agent),
            relevance_score: Math.round(s.score),
          }));

          return {
            result: {
              content: [{
                type: "text",
                text: JSON.stringify({
                  task: args.task_description,
                  recommendations: results,
                  total_matches: scored.length,
                }),
              }],
            },
          };
        }

        default:
          return { error: { code: INVALID_PARAMS, message: `Unknown tool: ${toolName}` } };
      }
    }

    // ─── Resources ──────────────────────────────────────────
    case "resources/list":
      return {
        result: {
          resources: [
            {
              uri: "agentstore://catalog",
              name: "Agent Store Catalog",
              description: `Complete catalog of all ${agents.filter((a) => a.status === "approved").length} approved AI agents with capabilities, tools, pricing, and ratings.`,
              mimeType: "application/json",
            },
            {
              uri: "agentstore://categories",
              name: "Agent Categories",
              description: "All agent categories with descriptions and agent counts.",
              mimeType: "application/json",
            },
          ],
        },
      };

    case "resources/read": {
      const uri = params.uri as string;
      if (!uri) {
        return { error: { code: INVALID_PARAMS, message: "Missing required parameter: uri" } };
      }

      if (uri === "agentstore://catalog") {
        const approved = agents.filter((a) => a.status === "approved").map(formatAgent);
        return {
          result: {
            contents: [{
              uri: "agentstore://catalog",
              mimeType: "application/json",
              text: JSON.stringify({ agents: approved, total: approved.length }),
            }],
          },
        };
      }

      if (uri === "agentstore://categories") {
        const cats = categories.map((c) => ({
          name: c.name, slug: c.slug, icon: c.icon, description: c.description,
          agent_count: agents.filter((a) => a.category_id === c.id && a.status === "approved").length,
        }));
        return {
          result: {
            contents: [{
              uri: "agentstore://categories",
              mimeType: "application/json",
              text: JSON.stringify({ categories: cats }),
            }],
          },
        };
      }

      return { error: { code: INVALID_PARAMS, message: `Unknown resource URI: ${uri}` } };
    }

    // ─── Logging ────────────────────────────────────────────
    case "logging/setLevel":
      return { result: {} };

    default:
      return { error: { code: METHOD_NOT_FOUND, message: `Method not found: ${method}` } };
  }
}

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { jsonrpc: "2.0", id: null, error: { code: PARSE_ERROR, message: "Parse error" } },
      { status: 400 }
    );
  }

  const { jsonrpc, id, method, params } = body;

  if (jsonrpc !== "2.0") {
    return NextResponse.json(
      { jsonrpc: "2.0", id, error: { code: INVALID_REQUEST, message: "Invalid JSON-RPC version. Must be 2.0." } },
      { status: 400 }
    );
  }

  if (!method || typeof method !== "string") {
    return NextResponse.json(
      { jsonrpc: "2.0", id, error: { code: INVALID_REQUEST, message: "Missing or invalid method." } },
      { status: 400 }
    );
  }

  // Notifications (no id) don't get responses per JSON-RPC spec
  const isNotification = id === undefined || id === null;

  const { result, error } = handleRequest(method, params || {});

  if (isNotification && method.startsWith("notifications/")) {
    return new NextResponse(null, { status: 204 });
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (error) {
    return NextResponse.json({ jsonrpc: "2.0", id, error }, { headers });
  }

  return NextResponse.json({ jsonrpc: "2.0", id, result }, { headers });
}

// GET: Server metadata and health check
export async function GET() {
  const approvedCount = agents.filter((a) => a.status === "approved").length;

  return NextResponse.json({
    name: SERVER_NAME,
    version: SERVER_VERSION,
    description: `The App Store for AI Agents. Discover, compare, and connect to ${approvedCount} specialized AI agents for any task.`,
    protocol: "mcp",
    protocolVersion: PROTOCOL_VERSION,
    status: "operational",
    stats: {
      agents: approvedCount,
      categories: categories.length,
      tools: 4,
      resources: 2,
    },
    endpoints: {
      mcp: "/api/mcp",
      rest: "/api/agents",
      discovery: "/.well-known/mcp.json",
    },
    capabilities: ["tools", "resources", "logging"],
  });
}
