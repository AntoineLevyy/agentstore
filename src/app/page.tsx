import Link from "next/link";
import { agents, categories } from "@/lib/data";
import { AgentIcon } from "@/components/AgentIcon";
import { ArrowRight, Search, Layers, Zap, Globe } from "lucide-react";


export default function Home() {
  const approved = agents.filter((a) => a.status === "approved");
  // Two rows for the rolling marquee — pick 40 agents, split into 2 rows of 20
  const marqueeAgents = approved.filter((a) => a.website_url).sort(() => 0.5 - Math.random()).slice(0, 40);
  const row1 = marqueeAgents.slice(0, 20);
  const row2 = marqueeAgents.slice(20, 40);
  const categoryStats = categories.map((c) => ({
    ...c,
    count: approved.filter((a) => a.category_id === c.id).length,
  }));

  return (
    <div>
      {/* ─── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5e6ad2]/[0.02] via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto px-5 pt-32 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] text-[#8a8f98] text-[12px] font-[510] px-3 py-1.5 rounded-[4px] mb-10">
            <img
              src="https://res.cloudinary.com/djklousbo/image/upload/v1775356040/logo_agentstore.png_fmokea.jpg"
              alt="Agent Store"
              className="h-3.5 w-3.5 rounded-[2px]"
            />
            Agent Store
          </div>

          <h1 className="text-[64px] md:text-[80px] font-[510] text-[#f7f8f8] leading-[1.0] tracking-[-1.6px]">
            The right agent
            <br />
            for every task.
          </h1>

          <p className="text-[15px] text-[#8a8f98] mt-8 max-w-md mx-auto leading-[24px] tracking-[-0.165px]">
            500+ AI agents. {categories.length} categories.
            <br className="hidden md:block" />
            Searchable by humans. Discoverable by machines.
          </p>

          <div className="flex items-center justify-center gap-3 mt-10">
            <Link
              href="/discover"
              className="inline-flex items-center h-[32px] px-4 bg-[#5e6ad2] text-white font-[510] text-[13px] rounded-[4px] hover:bg-[#6d78d5] transition-all duration-[0.16s]"
            >
              Explore the Store
            </Link>
            <Link
              href="/mcp"
              className="inline-flex items-center h-[32px] px-4 bg-transparent text-[#8a8f98] font-[510] text-[13px] rounded-[4px] hover:text-[#d0d6e0] hover:bg-[rgba(255,255,255,0.03)] transition-all duration-[0.16s]"
            >
              MCP Protocol
            </Link>
          </div>
        </div>

        {/* Rolling logo marquee */}
        <div className="relative mt-12 pb-16" aria-hidden="true">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#08090a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#08090a] to-transparent z-10 pointer-events-none" />

          {/* Row 1 — scrolls left */}
          <div className="flex gap-4 mb-4 animate-[marquee-left_60s_linear_infinite]" style={{ width: "max-content" }}>
            {[...row1, ...row1].map((agent, i) => (
              <div key={`r1-${i}`} className="flex-shrink-0 opacity-60 hover:opacity-90 transition-opacity duration-[0.24s]">
                <AgentIcon name={agent.name} websiteUrl={agent.website_url} size="md" />
              </div>
            ))}
          </div>

          {/* Row 2 — scrolls right */}
          <div className="flex gap-4 animate-[marquee-right_55s_linear_infinite]" style={{ width: "max-content" }}>
            {[...row2, ...row2].map((agent, i) => (
              <div key={`r2-${i}`} className="flex-shrink-0 opacity-60 hover:opacity-90 transition-opacity duration-[0.24s]">
                <AgentIcon name={agent.name} websiteUrl={agent.website_url} size="md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Divider ─────────────────────────────────────────── */}
      <div className="border-t border-[rgba(255,255,255,0.05)]" />

      {/* ─── Designed for Discovery ──────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-5 py-24">
        <div className="max-w-2xl mb-16">
          <p className="text-[13px] font-[510] text-[#5e6ad2] mb-4 tracking-[-0.01em]">Designed for Discovery</p>
          <h2 className="text-[48px] font-[510] text-[#f7f8f8] leading-[48px] tracking-[-1.056px]">
            Find what you need.
          </h2>
          <h2 className="text-[48px] font-[510] text-[#8a8f98] leading-[48px] tracking-[-1.056px]">
            Not what&apos;s trending.
          </h2>
        </div>

        {/* Search feature — full width */}
        <div className="bg-[#0f1011] rounded-[8px] p-8 md:p-10 border border-[rgba(255,255,255,0.05)] mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[12px] font-[510] text-[#5e6ad2] mb-3">Task-Based Search</p>
              <h3 className="text-[20px] font-[590] text-[#d0d6e0] leading-[26.6px] tracking-[-0.24px]">
                Describe your task.
                <br />Get matched instantly.
              </h3>
              <p className="text-[15px] text-[#8a8f98] mt-4 leading-[24px] tracking-[-0.165px] max-w-sm">
                Tell us what you need in your own words. Our engine matches you with agents that have the right capabilities, tools, and data.
              </p>
              <Link href="/discover" className="inline-flex items-center gap-1.5 h-[32px] px-4 bg-[#5e6ad2] text-white font-[510] text-[13px] rounded-[4px] mt-6 hover:bg-[#6d78d5] transition-all duration-[0.16s]">
                Try it now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="bg-[#08090a] rounded-[8px] p-5 border border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.02)] rounded-[6px] px-3 py-2.5 mb-3 border border-[rgba(255,255,255,0.05)]">
                <Search className="w-3.5 h-3.5 text-[#62666d]" />
                <span className="text-[13px] text-[#62666d] tracking-[-0.01em]">&ldquo;automate customer support for my store&rdquo;</span>
              </div>
              <div className="space-y-2">
                {approved.filter(a => a.featured).slice(0, 3).map((agent, i) => (
                  <div key={agent.id} className="flex items-center gap-2.5 px-1.5 py-1">
                    <span className="text-[11px] text-[#62666d] w-3 font-[510]">{i + 1}</span>
                    <AgentIcon name={agent.name} websiteUrl={agent.website_url} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-[#f7f8f8] font-[510] truncate tracking-[-0.01em]">{agent.name}</p>
                      <p className="text-[11px] text-[#62666d] truncate">{agent.tagline}</p>
                    </div>
                    <span className="text-[11px] text-[#5e6ad2] font-[510]">{92 - i * 11}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Three feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0f1011] rounded-[8px] p-6 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.08)] transition-all duration-[0.16s]">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-[6px] bg-[rgba(94,106,210,0.15)] flex items-center justify-center">
                <Layers className="w-4 h-4 text-[#5e6ad2]" />
              </div>
              <p className="text-[12px] font-[510] text-[#62666d] uppercase tracking-wider">Catalog</p>
            </div>
            <h3 className="text-[16px] font-[590] text-[#d0d6e0] leading-[24px]">{categories.length} categories. 500+ agents.</h3>
            <p className="text-[13px] text-[#62666d] mt-2 leading-[19.5px]">
              Capabilities, tools, pricing, and what makes each one unique.
            </p>
            <Link href="/discover" className="inline-flex items-center gap-1 text-[#5e6ad2] text-[12px] font-[510] mt-4 hover:text-[#6d78d5] transition-colors duration-[0.1s]">
              Browse <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-[#0f1011] rounded-[8px] p-6 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.08)] transition-all duration-[0.16s]">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-[6px] bg-[rgba(16,185,129,0.15)] flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#10b981]" />
              </div>
              <p className="text-[12px] font-[510] text-[#62666d] uppercase tracking-wider">Filters</p>
            </div>
            <h3 className="text-[16px] font-[590] text-[#d0d6e0] leading-[24px]">Filter by what matters.</h3>
            <p className="text-[13px] text-[#62666d] mt-2 leading-[19.5px]">
              Pricing, tools, capabilities, integrations. Find exactly what fits.
            </p>
          </div>

          <div className="bg-[#0f1011] rounded-[8px] p-6 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.08)] transition-all duration-[0.16s]">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-[6px] bg-[rgba(251,146,60,0.15)] flex items-center justify-center">
                <Globe className="w-4 h-4 text-[#fb923c]" />
              </div>
              <p className="text-[12px] font-[510] text-[#62666d] uppercase tracking-wider">Resources</p>
            </div>
            <h3 className="text-[16px] font-[590] text-[#d0d6e0] leading-[24px]">Docs, tutorials, reviews.</h3>
            <p className="text-[13px] text-[#62666d] mt-2 leading-[19.5px]">
              Official docs, community guides, and YouTube reviews for every agent.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Divider ─────────────────────────────────────────── */}
      <div className="border-t border-[rgba(255,255,255,0.05)]" />

      {/* ─── Built for AI Systems ────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-5 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[13px] font-[510] text-[#8b5cf6] mb-4 tracking-[-0.01em]">Built for AI Systems</p>
            <h2 className="text-[48px] font-[510] text-[#f7f8f8] leading-[48px] tracking-[-1.056px]">
              The discovery
            </h2>
            <h2 className="text-[48px] font-[510] text-[#8a8f98] leading-[48px] tracking-[-1.056px]">
              layer for agents.
            </h2>
            <p className="text-[15px] text-[#8a8f98] mt-6 leading-[24px] tracking-[-0.165px] max-w-md">
              Connect any MCP-compatible AI system. When it needs to delegate a task, it queries our endpoint and gets the best match. Ranked by relevance, not by who paid more.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <Link
                href="/mcp"
                className="inline-flex items-center h-[32px] px-4 bg-[#5e6ad2] text-white font-[510] text-[13px] rounded-[4px] hover:bg-[#6d78d5] transition-all duration-[0.16s]"
              >
                View MCP Docs
              </Link>
              <a
                href="/.well-known/mcp.json"
                target="_blank"
                className="text-[#62666d] text-[12px] font-[510] hover:text-[#8a8f98] transition-colors duration-[0.1s]"
              >
                /.well-known/mcp.json
              </a>
            </div>
          </div>
          <div className="bg-[#0f1011] rounded-[8px] p-6 border border-[rgba(255,255,255,0.05)] font-mono text-[12.25px] leading-[15.925px] tracking-[-0.182px]">
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#eb5757]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[hsl(46,87%,65%)]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/60" />
              <span className="text-[11px] text-[#62666d] ml-1.5 font-sans font-[510]">MCP JSON-RPC</span>
            </div>
            <p className="text-[#62666d]">// &ldquo;What can help with this task?&rdquo;</p>
            <p className="text-[#d0d6e0] mt-1">{"{"}</p>
            <p className="text-[#d0d6e0] ml-4"><span className="text-[#5e6ad2]">&quot;method&quot;</span>: <span className="text-[#10b981]">&quot;tools/call&quot;</span>,</p>
            <p className="text-[#d0d6e0] ml-4"><span className="text-[#5e6ad2]">&quot;params&quot;</span>: {"{"}</p>
            <p className="text-[#d0d6e0] ml-8"><span className="text-[#5e6ad2]">&quot;name&quot;</span>: <span className="text-[#10b981]">&quot;find_agent_for_task&quot;</span>,</p>
            <p className="text-[#d0d6e0] ml-8"><span className="text-[#5e6ad2]">&quot;arguments&quot;</span>: {"{"}</p>
            <p className="text-[#d0d6e0] ml-12"><span className="text-[#5e6ad2]">&quot;task&quot;</span>: <span className="text-[#10b981]">&quot;analyze customer churn&quot;</span></p>
            <p className="text-[#d0d6e0] ml-8">{"}"}</p>
            <p className="text-[#d0d6e0] ml-4">{"}"}</p>
            <p className="text-[#d0d6e0]">{"}"}</p>
            <div className="border-t border-[rgba(255,255,255,0.05)] my-3" />
            <p className="text-[#62666d]">// Ranked from 500+ agents</p>
            <p className="text-[#d0d6e0] mt-1">→ Julius AI <span className="text-[#62666d] ml-1">92%</span></p>
            <p className="text-[#d0d6e0]">→ Amplitude <span className="text-[#62666d] ml-1">78%</span></p>
            <p className="text-[#d0d6e0]">→ Mixpanel Spark <span className="text-[#62666d] ml-1">71%</span></p>
          </div>
        </div>
      </section>

      {/* ─── Divider ─────────────────────────────────────────── */}
      <div className="border-t border-[rgba(255,255,255,0.05)]" />

      {/* ─── Category grid ───────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-5 py-24">
        <div className="max-w-2xl mb-12">
          <p className="text-[13px] font-[510] text-[#62666d] mb-4">Browse by Category</p>
          <h2 className="text-[48px] font-[510] text-[#f7f8f8] leading-[48px] tracking-[-1.056px]">Every type of AI agent.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {categoryStats.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="bg-[#0f1011] rounded-[8px] p-5 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.08)] hover:bg-[#101112] transition-all duration-[0.16s]"
            >
              <span className="text-2xl">{cat.icon}</span>
              <p className="font-[590] text-[14px] text-[#d0d6e0] mt-2.5 tracking-[-0.01em]">{cat.name}</p>
              <p className="text-[12px] text-[#62666d] font-[510] mt-0.5">{cat.count} agents</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Divider ─────────────────────────────────────────── */}
      <div className="border-t border-[rgba(255,255,255,0.05)]" />

      {/* ─── Final CTA ───────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#5e6ad2]/[0.02] to-transparent pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-5 py-28 text-center">
          <h2 className="text-[48px] font-[510] text-[#f7f8f8] leading-[48px] tracking-[-1.056px]">
            Start discovering.
          </h2>
          <p className="text-[15px] text-[#8a8f98] mt-5 max-w-sm mx-auto leading-[24px] tracking-[-0.165px]">
            500+ AI agents. {categories.length} categories. One search away.
          </p>
          <Link
            href="/discover"
            className="inline-flex items-center gap-1.5 h-[32px] px-4 bg-[#5e6ad2] text-white font-[510] text-[13px] rounded-[4px] mt-8 hover:bg-[#6d78d5] transition-all duration-[0.16s]"
          >
            Explore the Agent Store <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-[1200px] mx-auto px-5 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-[12px] font-[510] text-[#62666d] mb-3">Browse</p>
              <div className="space-y-2">
                <Link href="/discover" className="block text-[13px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors duration-[0.1s]">Discover</Link>
                <Link href="/discover" className="block text-[13px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors duration-[0.1s]">Categories</Link>
                <Link href="/search" className="block text-[13px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors duration-[0.1s]">Search</Link>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-[510] text-[#62666d] mb-3">For Developers</p>
              <div className="space-y-2">
                <Link href="/developers" className="block text-[13px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors duration-[0.1s]">List Your Agent</Link>
                <Link href="/mcp" className="block text-[13px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors duration-[0.1s]">MCP Docs</Link>
                <Link href="/submit" className="block text-[13px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors duration-[0.1s]">Submit Agent</Link>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-[510] text-[#62666d] mb-3">API</p>
              <div className="space-y-2">
                <a href="/api/agents" target="_blank" className="block text-[13px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors duration-[0.1s]">REST API</a>
                <a href="/api/mcp" target="_blank" className="block text-[13px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors duration-[0.1s]">MCP Endpoint</a>
                <a href="/.well-known/mcp.json" target="_blank" className="block text-[13px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors duration-[0.1s]">MCP Discovery</a>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-[510] text-[#62666d] mb-3">Resources</p>
              <div className="space-y-2">
                <a href="/llms.txt" target="_blank" className="block text-[13px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors duration-[0.1s]">llms.txt</a>
                <a href="/sitemap.xml" target="_blank" className="block text-[13px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors duration-[0.1s]">Sitemap</a>
              </div>
            </div>
          </div>
          <div className="border-t border-[rgba(255,255,255,0.05)] mt-8 pt-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="https://res.cloudinary.com/djklousbo/image/upload/v1775356040/logo_agentstore.png_fmokea.jpg"
                alt="Agent Store"
                className="h-4 w-4 rounded-[2px]"
              />
              <p className="text-[12px] text-[#62666d] font-[510]">Agent Store</p>
            </div>
            <p className="text-[11px] text-[#62666d]">500+ agents · {categories.length} categories · MCP 2025-11-25</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
