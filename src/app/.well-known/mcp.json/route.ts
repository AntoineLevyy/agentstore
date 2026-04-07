import { NextResponse } from "next/server";
import { agents, categories } from "@/lib/data";

// .well-known/mcp.json — standard MCP server discovery endpoint
// AI systems GET this to discover the MCP server and its capabilities
// See: https://modelcontextprotocol.io/specification/2025-11-25

export async function GET() {
  const approvedCount = agents.filter((a) => a.status === "approved").length;

  return NextResponse.json({
    name: "agent-store",
    version: "1.0.0",
    description: `The App Store for AI Agents. Discover, compare, and connect to ${approvedCount} specialized AI agents for any task.`,
    url: "/api/mcp",
    transport: "http",
    protocolVersion: "2025-11-25",
    capabilities: {
      tools: true,
      resources: true,
      logging: true,
    },
    tools: [
      {
        name: "find_agent_for_task",
        description: "Describe a task in natural language and get the best matching AI agents ranked by relevance. Primary discovery tool for AI-to-AI delegation.",
      },
      {
        name: "search_agents",
        description: "Search the Agent Store catalog with structured filters: text query, category, capability, tool, pricing.",
      },
      {
        name: "get_agent",
        description: "Get complete details about a specific AI agent by slug identifier.",
      },
      {
        name: "list_categories",
        description: `List all ${categories.length} agent categories with descriptions and live agent counts.`,
      },
    ],
    resources: [
      {
        uri: "agentstore://catalog",
        description: `Full catalog of ${approvedCount} approved AI agents.`,
      },
      {
        uri: "agentstore://categories",
        description: "All agent categories with agent counts.",
      },
    ],
    stats: {
      agents: approvedCount,
      categories: categories.length,
    },
  });
}
