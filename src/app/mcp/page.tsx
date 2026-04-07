"use client";

import { useState } from "react";
import { Copy, Check, Circle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button onClick={handleCopy} className="text-gray-500 hover:text-gray-300 transition-colors">
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="bg-[#0a0a0a] rounded-lg border border-white/[0.06] overflow-hidden">
      {label && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06]">
          <span className="text-xs text-gray-500 font-mono">{label}</span>
          <CopyButton text={code} />
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-[13px] text-gray-300 font-mono leading-6">{code}</code>
      </pre>
    </div>
  );
}

function ToolRef({ name, description, params }: { name: string; description: string; params: { name: string; type: string; required?: boolean; description: string }[] }) {
  return (
    <div className="border-b border-white/[0.06] pb-8 mb-8 last:border-0 last:pb-0 last:mb-0">
      <div className="flex items-center gap-3 mb-2">
        <code className="text-[15px] font-mono font-semibold text-[#0A84FF]">{name}</code>
      </div>
      <p className="text-[14px] text-gray-400 leading-relaxed mb-4">{description}</p>
      {params.length > 0 && (
        <div className="bg-[#0a0a0a] rounded-lg border border-white/[0.06] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                <th className="px-4 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {params.map((p) => (
                <tr key={p.name}>
                  <td className="px-4 py-2.5">
                    <code className="text-[13px] text-white font-mono">{p.name}</code>
                    {p.required && <span className="text-[10px] text-[#FF453A] ml-1.5 font-medium">required</span>}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-[12px] text-gray-500 font-mono">{p.type}</span>
                  </td>
                  <td className="px-4 py-2.5 hidden md:table-cell">
                    <span className="text-[13px] text-gray-400">{p.description}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function MCPPage() {
  const [configTab, setConfigTab] = useState<"claude-desktop" | "claude-code" | "custom">("claude-desktop");

  return (
    <div className="max-w-[860px] mx-auto px-5 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <img
          src="https://res.cloudinary.com/djklousbo/image/upload/v1775356040/logo_agentstore.png_fmokea.jpg"
          alt="Agent Store"
          className="h-10 w-10 rounded-xl object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-white">Agent Store MCP Server</h1>
        </div>
      </div>
      <p className="text-[15px] text-gray-400 mt-3 leading-relaxed max-w-2xl">
        Connect any MCP-compatible AI system to the Agent Store. Search, discover, and route tasks to the best AI agent — programmatically.
      </p>

      {/* Server info */}
      <div className="mt-8 bg-[#1c1c1e] rounded-xl border border-white/[0.06] overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
          <div className="px-5 py-4">
            <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">Server</p>
            <p className="text-[14px] text-white font-mono mt-1">agent-store</p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">Version</p>
            <p className="text-[14px] text-white font-mono mt-1">1.0.0</p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">Protocol</p>
            <p className="text-[14px] text-white font-mono mt-1">2025-11-25</p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">Transport</p>
            <p className="text-[14px] text-white font-mono mt-1">HTTP</p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#30D158]" />
          <span className="text-[13px] text-gray-400">Operational</span>
        </div>
        <a href="/.well-known/mcp.json" target="_blank" className="text-[13px] text-[#0A84FF] hover:underline font-mono">
          /.well-known/mcp.json
        </a>
        <a href="/api/mcp" target="_blank" className="text-[13px] text-[#0A84FF] hover:underline font-mono">
          /api/mcp
        </a>
      </div>

      {/* Quick setup */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-white mb-1">Quick Setup</h2>
        <p className="text-[14px] text-gray-500 mb-5">Add the Agent Store as an MCP server in your client config.</p>

        <div className="flex gap-1 mb-3">
          {(["claude-desktop", "claude-code", "custom"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setConfigTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                configTab === tab
                  ? "bg-white/10 text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab === "claude-desktop" ? "Claude Desktop" : tab === "claude-code" ? "Claude Code" : "Custom Client"}
            </button>
          ))}
        </div>

        {configTab === "claude-desktop" && (
          <div>
            <CodeBlock
              label="claude_desktop_config.json"
              code={`{
  "mcpServers": {
    "agent-store": {
      "url": "https://agentstore.dev/api/mcp"
    }
  }
}`}
            />
            <p className="text-[12px] text-gray-500 mt-2">Restart Claude Desktop after saving. The 4 agent discovery tools will appear automatically.</p>
          </div>
        )}

        {configTab === "claude-code" && (
          <div>
            <CodeBlock
              label="~/.claude/settings.json"
              code={`{
  "mcpServers": {
    "agent-store": {
      "url": "https://agentstore.dev/api/mcp"
    }
  }
}`}
            />
            <p className="text-[12px] text-gray-500 mt-2">Claude Code will pick this up on the next session. Use the tools like any other MCP tool.</p>
          </div>
        )}

        {configTab === "custom" && (
          <div>
            <CodeBlock
              label="HTTP POST /api/mcp"
              code={`POST https://agentstore.dev/api/mcp
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "find_agent_for_task",
    "arguments": {
      "task_description": "I need to analyze customer churn data",
      "max_results": 3
    }
  }
}`}
            />
            <p className="text-[12px] text-gray-500 mt-2">Standard MCP JSON-RPC over HTTP. No auth required for read operations.</p>
          </div>
        )}
      </section>

      {/* Capabilities */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-white mb-1">Capabilities</h2>
        <p className="text-[14px] text-gray-500 mb-5">What this server exposes to connected clients.</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1c1c1e] rounded-xl border border-white/[0.06] px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#30D158]" />
              <span className="text-[14px] font-medium text-white">Tools</span>
            </div>
            <p className="text-[13px] text-gray-500">4 tools for searching, filtering, and discovering agents by task</p>
          </div>
          <div className="bg-[#1c1c1e] rounded-xl border border-white/[0.06] px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#30D158]" />
              <span className="text-[14px] font-medium text-white">Resources</span>
            </div>
            <p className="text-[13px] text-gray-500">Full catalog and category directory as readable resources</p>
          </div>
          <div className="bg-[#1c1c1e] rounded-xl border border-white/[0.06] px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-4 h-4 text-gray-600" />
              <span className="text-[14px] font-medium text-gray-500">Prompts</span>
            </div>
            <p className="text-[13px] text-gray-600">Coming soon</p>
          </div>
          <div className="bg-[#1c1c1e] rounded-xl border border-white/[0.06] px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-4 h-4 text-gray-600" />
              <span className="text-[14px] font-medium text-gray-500">Sampling</span>
            </div>
            <p className="text-[13px] text-gray-600">Coming soon</p>
          </div>
        </div>
      </section>

      {/* Tools Reference */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-white mb-1">Tools</h2>
        <p className="text-[14px] text-gray-500 mb-6">Complete reference for all available tools.</p>

        <ToolRef
          name="find_agent_for_task"
          description="Describe a task in natural language and get ranked agent recommendations. This is the primary discovery endpoint — the routing layer for AI-to-AI delegation. Returns agents scored by relevance with full metadata."
          params={[
            { name: "task_description", type: "string", required: true, description: "Natural language description of the task" },
            { name: "max_results", type: "number", description: "Max agents to return (default 5, max 20)" },
            { name: "pricing_preference", type: "string", description: '"free" | "freemium" | "paid" | "any"' },
          ]}
        />

        <ToolRef
          name="search_agents"
          description="Structured search across the entire agent catalog. Supports text queries combined with category, capability, tool, and pricing filters. Returns paginated results."
          params={[
            { name: "query", type: "string", description: "Free-text search" },
            { name: "category", type: "string", description: "Category slug filter" },
            { name: "capability", type: "string", description: "Filter by capability" },
            { name: "tool", type: "string", description: "Filter by tool the agent uses" },
            { name: "pricing", type: "string", description: '"free" | "freemium" | "paid" | "contact"' },
            { name: "limit", type: "number", description: "Max results (default 10, max 50)" },
          ]}
        />

        <ToolRef
          name="get_agent"
          description="Get complete details for a specific agent by slug. Returns capabilities, tools, pricing, ratings, special data, and related agents in the same category."
          params={[
            { name: "slug", type: "string", required: true, description: 'Agent identifier (e.g. "cursor", "perplexity")' },
          ]}
        />

        <ToolRef
          name="list_categories"
          description="List all agent categories with descriptions and live agent counts. No parameters required."
          params={[]}
        />
      </section>

      {/* Resources */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-white mb-1">Resources</h2>
        <p className="text-[14px] text-gray-500 mb-5">Readable resources exposed by this server.</p>

        <div className="bg-[#0a0a0a] rounded-lg border border-white/[0.06] divide-y divide-white/[0.04]">
          <div className="px-5 py-4 flex items-start justify-between">
            <div>
              <code className="text-[13px] text-[#0A84FF] font-mono">agentstore://catalog</code>
              <p className="text-[13px] text-gray-500 mt-1">Complete catalog of all approved agents with full metadata</p>
            </div>
            <span className="text-[11px] text-gray-600 font-mono bg-white/5 px-2 py-0.5 rounded">application/json</span>
          </div>
          <div className="px-5 py-4 flex items-start justify-between">
            <div>
              <code className="text-[13px] text-[#0A84FF] font-mono">agentstore://categories</code>
              <p className="text-[13px] text-gray-500 mt-1">All categories with descriptions and agent counts</p>
            </div>
            <span className="text-[11px] text-gray-600 font-mono bg-white/5 px-2 py-0.5 rounded">application/json</span>
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-white mb-1">Example: Find an agent for a task</h2>
        <p className="text-[14px] text-gray-500 mb-5">A user asks Claude: &ldquo;Find me an AI that can help with legal contract review.&rdquo; Claude calls the Agent Store:</p>

        <CodeBlock
          label="Request"
          code={`{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "find_agent_for_task",
    "arguments": {
      "task_description": "review and analyze legal contracts",
      "max_results": 2
    }
  }
}`}
        />

        <div className="mt-4">
          <CodeBlock
            label="Response"
            code={`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [{
      "type": "text",
      "text": {
        "task": "review and analyze legal contracts",
        "recommendations": [
          {
            "name": "Harvey",
            "slug": "harvey",
            "tagline": "AI legal assistant for law firms",
            "capabilities": ["Contract drafting", "Document review", "Legal research"],
            "website_url": "https://harvey.ai",
            "pricing_type": "contact",
            "rating": 4.5,
            "relevance_score": 72
          }
        ],
        "total_matches": 1
      }
    }]
  }
}`}
          />
        </div>

        <p className="text-[12px] text-gray-500 mt-3">Claude reads the response and recommends Harvey to the user, with pricing, rating, and a direct link.</p>
      </section>

      {/* REST API note */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-white mb-1">REST API</h2>
        <p className="text-[14px] text-gray-500 mb-5">Prefer REST over JSON-RPC? The same data is available via standard HTTP endpoints.</p>

        <div className="bg-[#0a0a0a] rounded-lg border border-white/[0.06] divide-y divide-white/[0.04]">
          {[
            { method: "GET", path: "/api/agents", description: "Search & list agents" },
            { method: "GET", path: "/api/agents/:slug", description: "Get agent by slug" },
            { method: "GET", path: "/api/categories", description: "List all categories" },
          ].map((endpoint) => (
            <a
              key={endpoint.path}
              href={endpoint.path.replace(":slug", "cursor")}
              target="_blank"
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-[11px] font-mono font-bold text-[#30D158] bg-[#30D158]/10 px-2 py-0.5 rounded">
                {endpoint.method}
              </span>
              <code className="text-[13px] text-white font-mono">{endpoint.path}</code>
              <span className="text-[13px] text-gray-500 ml-auto hidden md:block">{endpoint.description}</span>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-14 mb-8 border-t border-white/[0.06] pt-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-[15px] font-semibold text-white">List your agent on the store</h3>
            <p className="text-[13px] text-gray-500 mt-1">Every listed agent is automatically discoverable via MCP by every connected AI system.</p>
          </div>
          <Link
            href="/submit"
            className="bg-white text-black font-semibold px-6 py-2.5 rounded-lg text-[13px] hover:bg-gray-200 transition-colors flex-shrink-0"
          >
            Submit Agent
          </Link>
        </div>
      </section>
    </div>
  );
}
