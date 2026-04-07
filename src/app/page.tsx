import Link from "next/link";
import { agents, categories } from "@/lib/data";
import { AgentIcon } from "@/components/AgentIcon";
import { ArrowRight, Search, Layers, Zap, Globe } from "lucide-react";

// 35 scattered icon positions for a dense hero cloud
const iconPositions = [
  // Row 1
  { top: "0%", left: "3%", size: "lg" as const },
  { top: "2%", left: "16%", size: "md" as const },
  { top: "1%", left: "30%", size: "lg" as const },
  { top: "3%", left: "46%", size: "md" as const },
  { top: "0%", left: "58%", size: "lg" as const },
  { top: "2%", left: "72%", size: "md" as const },
  { top: "1%", left: "88%", size: "lg" as const },
  // Row 2
  { top: "14%", left: "0%", size: "md" as const },
  { top: "12%", left: "12%", size: "lg" as const },
  { top: "15%", left: "25%", size: "md" as const },
  { top: "13%", left: "38%", size: "lg" as const },
  { top: "16%", left: "52%", size: "md" as const },
  { top: "12%", left: "65%", size: "lg" as const },
  { top: "14%", left: "80%", size: "md" as const },
  { top: "13%", left: "93%", size: "lg" as const },
  // Row 3
  { top: "28%", left: "5%", size: "lg" as const },
  { top: "26%", left: "20%", size: "md" as const },
  { top: "30%", left: "35%", size: "lg" as const },
  { top: "27%", left: "50%", size: "md" as const },
  { top: "29%", left: "63%", size: "lg" as const },
  { top: "26%", left: "78%", size: "md" as const },
  { top: "28%", left: "92%", size: "lg" as const },
  // Row 4
  { top: "42%", left: "2%", size: "md" as const },
  { top: "40%", left: "15%", size: "lg" as const },
  { top: "43%", left: "28%", size: "md" as const },
  { top: "41%", left: "42%", size: "lg" as const },
  { top: "44%", left: "56%", size: "md" as const },
  { top: "40%", left: "70%", size: "lg" as const },
  { top: "42%", left: "85%", size: "md" as const },
  // Row 5
  { top: "55%", left: "8%", size: "lg" as const },
  { top: "53%", left: "22%", size: "md" as const },
  { top: "56%", left: "38%", size: "lg" as const },
  { top: "54%", left: "55%", size: "md" as const },
  { top: "57%", left: "68%", size: "lg" as const },
  { top: "53%", left: "83%", size: "md" as const },
];

export default function Home() {
  const approved = agents.filter((a) => a.status === "approved");
  // Pick 35 diverse agents for the hero cloud
  const heroAgents = approved
    .filter((a) => a.website_url)
    .sort(() => 0.5 - Math.random())
    .slice(0, 35);
  const categoryStats = categories.map((c) => ({
    ...c,
    count: approved.filter((a) => a.category_id === c.id).length,
  }));

  return (
    <div>
      {/* ─── Hero with scattered agent icons ─────────────────── */}
      <section className="relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A84FF]/[0.03] via-transparent to-transparent pointer-events-none" />

        {/* Scattered agent icons */}
        <div className="absolute inset-0 max-w-[1400px] mx-auto" aria-hidden="true">
          {heroAgents.map((agent, i) => {
            const pos = iconPositions[i];
            if (!pos) return null;
            return (
              <div
                key={agent.id}
                className="absolute opacity-[0.35] hover:opacity-70 transition-opacity duration-500"
                style={{ top: pos.top, left: pos.left }}
              >
                <AgentIcon
                  name={agent.name}
                  websiteUrl={agent.website_url}
                  size={pos.size}
                />
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div className="relative max-w-[1200px] mx-auto px-5 pt-28 pb-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] text-gray-400 text-[13px] font-medium px-4 py-2 rounded-full mb-8">
            <img
              src="https://res.cloudinary.com/djklousbo/image/upload/v1775356040/logo_agentstore.png_fmokea.jpg"
              alt="Agent Store"
              className="h-4 w-4 rounded"
            />
            Agent Store
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white leading-[1.05] tracking-[-0.03em]">
            The right agent
            <br />
            <span className="text-white">for every task.</span>
          </h1>

          <p className="text-[17px] text-gray-400 mt-8 max-w-xl mx-auto leading-relaxed">
            500+ AI agents. {categories.length} categories.
            <br className="hidden md:block" />
            Searchable by humans. Discoverable by machines.
          </p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <Link
              href="/discover"
              className="bg-white text-black font-semibold px-8 py-3.5 rounded-full text-[15px] hover:bg-gray-100 transition-colors"
            >
              Explore the Store
            </Link>
            <Link
              href="/mcp"
              className="bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] text-white font-semibold px-8 py-3.5 rounded-full text-[15px] hover:bg-white/[0.12] transition-colors"
            >
              MCP Protocol
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Divider ─────────────────────────────────────────── */}
      <div className="border-t border-white/[0.06]" />

      {/* ─── Designed for Discovery ──────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-5 py-28">
        <div className="max-w-3xl mb-20">
          <p className="text-[13px] font-semibold text-[#0A84FF] uppercase tracking-wider mb-4">Designed for Discovery</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.08] tracking-tight">
            Find what you need.
            <br />Not what&apos;s trending.
          </h2>
        </div>

        {/* Feature 1 — Search (full width, hero-like) */}
        <div className="bg-gradient-to-br from-[#1c1c1e] to-[#111113] rounded-[28px] p-10 md:p-14 border border-white/[0.06] mb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[13px] font-semibold text-[#0A84FF] uppercase tracking-wider mb-4">Task-Based Search</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                Describe your task.
                <br />Get matched instantly.
              </h3>
              <p className="text-[16px] text-gray-500 mt-5 leading-relaxed max-w-md">
                Tell us what you need in your own words. Our engine matches you with agents that have the right capabilities, tools, and data for your specific task.
              </p>
              <Link href="/discover" className="inline-flex items-center gap-2 bg-[#0A84FF] text-white font-semibold px-6 py-3 rounded-full text-[14px] mt-8 hover:bg-[#409CFF] transition-colors">
                Try it now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/[0.06]">
              <div className="flex items-center gap-3 bg-white/[0.04] rounded-xl px-4 py-3 mb-4">
                <Search className="w-4 h-4 text-gray-600" />
                <span className="text-[14px] text-gray-400">&ldquo;automate customer support for my Shopify store&rdquo;</span>
              </div>
              <div className="space-y-3">
                {approved.filter(a => a.featured).slice(0, 3).map((agent, i) => (
                  <div key={agent.id} className="flex items-center gap-3 px-2">
                    <span className="text-[12px] text-gray-700 w-4">{i + 1}</span>
                    <AgentIcon name={agent.name} websiteUrl={agent.website_url} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-white font-medium truncate">{agent.name}</p>
                      <p className="text-[11px] text-gray-600 truncate">{agent.tagline}</p>
                    </div>
                    <span className="text-[11px] text-[#0A84FF] font-medium">{92 - i * 11}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 + 3 + 4 — three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-gradient-to-b from-[#1c1c1e] to-[#141416] rounded-[24px] p-8 border border-white/[0.06] hover:border-white/[0.1] transition-colors">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">Catalog</p>
            </div>
            <h3 className="text-[20px] font-bold text-white leading-snug">{categories.length} categories.<br />500+ agents.</h3>
            <p className="text-[14px] text-gray-600 mt-3 leading-relaxed">
              Every agent with full details on capabilities, tools, pricing, and what makes it unique.
            </p>
            <Link href="/discover" className="inline-flex items-center gap-1 text-purple-400 text-[13px] font-semibold mt-5 hover:gap-2 transition-all">
              Browse <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-gradient-to-b from-[#1c1c1e] to-[#141416] rounded-[24px] p-8 border border-white/[0.06] hover:border-white/[0.1] transition-colors">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">Filters</p>
            </div>
            <h3 className="text-[20px] font-bold text-white leading-snug">Filter by<br />what matters.</h3>
            <p className="text-[14px] text-gray-600 mt-3 leading-relaxed">
              Pricing, tools, capabilities, integrations. Narrow down to exactly what fits your workflow.
            </p>
          </div>

          <div className="bg-gradient-to-b from-[#1c1c1e] to-[#141416] rounded-[24px] p-8 border border-white/[0.06] hover:border-white/[0.1] transition-colors">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-orange-400" />
              </div>
              <p className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">Resources</p>
            </div>
            <h3 className="text-[20px] font-bold text-white leading-snug">Docs, tutorials,<br />video reviews.</h3>
            <p className="text-[14px] text-gray-600 mt-3 leading-relaxed">
              Every listing links to official docs, community guides, and YouTube reviews.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Divider ─────────────────────────────────────────── */}
      <div className="border-t border-white/[0.06]" />

      {/* ─── Built for AI Systems ────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-5 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[13px] font-semibold text-[#5E5CE6] uppercase tracking-wider mb-4">Built for AI Systems</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              The discovery
              <br />layer for agents.
            </h2>
            <p className="text-[15px] text-gray-500 mt-6 leading-relaxed max-w-md">
              Connect any MCP-compatible AI system. When Claude, GPT, or your custom agent needs to delegate a task, it queries our endpoint and gets back the best match — ranked by relevance, not by who paid more.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <Link
                href="/mcp"
                className="bg-white text-black font-semibold px-6 py-3 rounded-full text-[14px] hover:bg-gray-100 transition-colors"
              >
                View MCP Docs
              </Link>
              <a
                href="/.well-known/mcp.json"
                target="_blank"
                className="text-gray-500 text-[14px] font-medium hover:text-white transition-colors"
              >
                /.well-known/mcp.json
              </a>
            </div>
          </div>
          <div className="bg-[#0a0a0a] rounded-[20px] p-7 border border-white/[0.06] font-mono text-[13px] leading-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="text-[11px] text-gray-600 ml-2">MCP JSON-RPC</span>
            </div>
            <p className="text-gray-600">// &ldquo;What can help with this task?&rdquo;</p>
            <p className="text-gray-400 mt-1">{"{"}</p>
            <p className="text-gray-400 ml-4"><span className="text-[#0A84FF]">&quot;method&quot;</span>: <span className="text-[#30D158]">&quot;tools/call&quot;</span>,</p>
            <p className="text-gray-400 ml-4"><span className="text-[#0A84FF]">&quot;params&quot;</span>: {"{"}</p>
            <p className="text-gray-400 ml-8"><span className="text-[#0A84FF]">&quot;name&quot;</span>: <span className="text-[#30D158]">&quot;find_agent_for_task&quot;</span>,</p>
            <p className="text-gray-400 ml-8"><span className="text-[#0A84FF]">&quot;arguments&quot;</span>: {"{"}</p>
            <p className="text-gray-400 ml-12"><span className="text-[#0A84FF]">&quot;task&quot;</span>: <span className="text-[#30D158]">&quot;analyze customer churn&quot;</span></p>
            <p className="text-gray-400 ml-8">{"}"}</p>
            <p className="text-gray-400 ml-4">{"}"}</p>
            <p className="text-gray-400">{"}"}</p>
            <div className="border-t border-white/[0.06] my-4" />
            <p className="text-gray-600">// Ranked from 500+ agents</p>
            <p className="text-[#FF9F0A] mt-1">→ Julius AI <span className="text-gray-700 ml-2">92% match</span></p>
            <p className="text-[#FF9F0A]">→ Amplitude <span className="text-gray-700 ml-2">78% match</span></p>
            <p className="text-[#FF9F0A]">→ Mixpanel Spark <span className="text-gray-700 ml-2">71% match</span></p>
          </div>
        </div>
      </section>

      {/* ─── Category grid ───────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-5 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[13px] font-semibold text-gray-600 uppercase tracking-wider mb-4">Browse by Category</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Every type of AI agent.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categoryStats.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="bg-[#1c1c1e] rounded-[20px] p-6 hover:bg-[#2c2c2e] transition-all border border-white/[0.04] hover:border-white/[0.08] hover:scale-[1.02]"
            >
              <span className="text-3xl">{cat.icon}</span>
              <p className="font-semibold text-[15px] text-white mt-3">{cat.name}</p>
              <p className="text-[12px] text-gray-600 mt-1">{cat.count} agents</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Divider ─────────────────────────────────────────── */}
      <div className="border-t border-white/[0.06]" />

      {/* ─── Final CTA ───────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A84FF]/[0.04] to-transparent pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-5 py-28 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Start discovering.
          </h2>
          <p className="text-[17px] text-gray-500 mt-5 max-w-md mx-auto">
            500+ AI agents. {categories.length} categories. One search away.
          </p>
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-full text-[15px] mt-10 hover:bg-gray-100 transition-colors"
          >
            Explore the Agent Store <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-5 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider mb-4">Browse</p>
              <div className="space-y-2.5">
                <Link href="/discover" className="block text-[13px] text-gray-500 hover:text-white transition-colors">Discover</Link>
                <Link href="/discover" className="block text-[13px] text-gray-500 hover:text-white transition-colors">Categories</Link>
                <Link href="/search" className="block text-[13px] text-gray-500 hover:text-white transition-colors">Search</Link>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider mb-4">For Developers</p>
              <div className="space-y-2.5">
                <Link href="/developers" className="block text-[13px] text-gray-500 hover:text-white transition-colors">List Your Agent</Link>
                <Link href="/mcp" className="block text-[13px] text-gray-500 hover:text-white transition-colors">MCP Docs</Link>
                <Link href="/submit" className="block text-[13px] text-gray-500 hover:text-white transition-colors">Submit Agent</Link>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider mb-4">API</p>
              <div className="space-y-2.5">
                <a href="/api/agents" target="_blank" className="block text-[13px] text-gray-500 hover:text-white transition-colors">REST API</a>
                <a href="/api/mcp" target="_blank" className="block text-[13px] text-gray-500 hover:text-white transition-colors">MCP Endpoint</a>
                <a href="/.well-known/mcp.json" target="_blank" className="block text-[13px] text-gray-500 hover:text-white transition-colors">MCP Discovery</a>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider mb-4">Resources</p>
              <div className="space-y-2.5">
                <a href="/llms.txt" target="_blank" className="block text-[13px] text-gray-500 hover:text-white transition-colors">llms.txt</a>
                <a href="/sitemap.xml" target="_blank" className="block text-[13px] text-gray-500 hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.06] mt-10 pt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="https://res.cloudinary.com/djklousbo/image/upload/v1775356040/logo_agentstore.png_fmokea.jpg"
                alt="Agent Store"
                className="h-5 w-5 rounded"
              />
              <p className="text-[12px] text-gray-600">Agent Store</p>
            </div>
            <p className="text-[12px] text-gray-700">500+ agents · {categories.length} categories · MCP 2025-11-25</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
