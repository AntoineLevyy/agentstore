import Link from "next/link";
import { ArrowRight, Users, Bot, Globe, BarChart3, Zap, Code2 } from "lucide-react";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl md:text-4xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-[#0A84FF] flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-white text-[15px]">{title}</h3>
        <p className="text-[14px] text-gray-400 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="bg-[#1c1c1e] rounded-2xl p-6 border border-white/[0.06]">
      <div className="w-10 h-10 rounded-xl bg-[#0A84FF]/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-[#0A84FF]" />
      </div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-[14px] text-gray-400 mt-2 leading-relaxed">{description}</p>
    </div>
  );
}

export default function DevelopersPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 py-10">
      {/* Hero */}
      <div className="max-w-3xl mb-16">
        <p className="text-[13px] font-semibold text-[#0A84FF] uppercase tracking-wider mb-3">For Agent Builders</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Your agent deserves
          <br />distribution
        </h1>
        <p className="text-lg text-gray-400 mt-5 leading-relaxed max-w-2xl">
          You built an AI agent that solves a real problem. Now put it where users can find it — and where other AI systems can route tasks to it automatically.
        </p>
        <div className="flex items-center gap-4 mt-8">
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-[#0A84FF] text-white font-semibold px-7 py-3 rounded-full hover:bg-[#409CFF] transition-colors text-sm"
          >
            List Your Agent <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/mcp"
            className="inline-flex items-center gap-2 text-gray-400 font-medium px-5 py-3 rounded-full hover:text-white hover:bg-white/5 transition-colors text-sm"
          >
            View MCP Docs
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-8 mb-16 py-10 border-y border-white/[0.06]">
        <Stat value="12+" label="Agents listed" />
        <Stat value="10" label="Categories" />
        <Stat value="∞" label="AI systems via MCP" />
      </div>

      {/* Two audiences */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">One listing, two audiences</h2>
        <p className="text-gray-400 mb-8">Every agent you list reaches humans browsing the store AND AI systems connected via MCP.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#0A84FF]/10 to-transparent rounded-2xl p-8 border border-[#0A84FF]/20">
            <Users className="w-8 h-8 text-[#0A84FF] mb-4" />
            <h3 className="text-xl font-bold text-white">Human Discovery</h3>
            <p className="text-[14px] text-gray-400 mt-3 leading-relaxed">
              Users browse, search, compare, and click through to your agent. Every listing is SEO-optimized with its own shareable URL, OpenGraph cards, and structured data. Your agent shows up in Google when people search for solutions.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-[13px] text-gray-400">
                <div className="w-1 h-1 rounded-full bg-[#0A84FF]" /> SEO-optimized detail page
              </li>
              <li className="flex items-center gap-2 text-[13px] text-gray-400">
                <div className="w-1 h-1 rounded-full bg-[#0A84FF]" /> Rich social sharing cards
              </li>
              <li className="flex items-center gap-2 text-[13px] text-gray-400">
                <div className="w-1 h-1 rounded-full bg-[#0A84FF]" /> Category and search placement
              </li>
              <li className="flex items-center gap-2 text-[13px] text-gray-400">
                <div className="w-1 h-1 rounded-full bg-[#0A84FF]" /> Ratings and reviews
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#5E5CE6]/10 to-transparent rounded-2xl p-8 border border-[#5E5CE6]/20">
            <Bot className="w-8 h-8 text-[#5E5CE6] mb-4" />
            <h3 className="text-xl font-bold text-white">AI Discovery via MCP</h3>
            <p className="text-[14px] text-gray-400 mt-3 leading-relaxed">
              AI systems connected to the Agent Store can find your agent programmatically. When Claude, GPT, or a custom orchestrator needs to delegate a task, your agent shows up as a recommendation — ranked by relevance.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-[13px] text-gray-400">
                <div className="w-1 h-1 rounded-full bg-[#5E5CE6]" /> MCP tool discovery
              </li>
              <li className="flex items-center gap-2 text-[13px] text-gray-400">
                <div className="w-1 h-1 rounded-full bg-[#5E5CE6]" /> Task-based routing
              </li>
              <li className="flex items-center gap-2 text-[13px] text-gray-400">
                <div className="w-1 h-1 rounded-full bg-[#5E5CE6]" /> REST API access
              </li>
              <li className="flex items-center gap-2 text-[13px] text-gray-400">
                <div className="w-1 h-1 rounded-full bg-[#5E5CE6]" /> llms.txt and structured data
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* What you get */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">What you get</h2>
        <p className="text-gray-400 mb-8">Everything a listed agent receives, at no cost.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ValueCard
            icon={Globe}
            title="Dedicated Agent Page"
            description="Your own SEO-optimized page with description, capabilities, tools, pricing, ratings, and a direct link to your product."
          />
          <ValueCard
            icon={Zap}
            title="MCP Discoverability"
            description="Any AI system connected via MCP can find and recommend your agent when users describe matching tasks."
          />
          <ValueCard
            icon={BarChart3}
            title="Visibility in Rankings"
            description="Appear in category charts, top rated lists, search results, and the featured 'Today' section on the homepage."
          />
          <ValueCard
            icon={Code2}
            title="API & Embeds"
            description="Your agent data is available via REST API. Embed your Agent Store listing badge on your own website."
          />
          <ValueCard
            icon={Users}
            title="Reviews & Social Proof"
            description="Users can rate and review your agent. High ratings boost your ranking in search and recommendations."
          />
          <ValueCard
            icon={Bot}
            title="AI-to-AI Routing"
            description="When orchestrator agents break tasks into subtasks, your agent gets recommended for tasks matching your capabilities."
          />
        </div>
      </div>

      {/* How to list */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">List your agent in 5 minutes</h2>
        <p className="text-gray-400 mb-8">Five steps. No approval wait for launch partners.</p>

        <div className="bg-[#1c1c1e] rounded-2xl p-8 border border-white/[0.06] space-y-8">
          <Step
            number={1}
            title="Basic info"
            description="Name, tagline, and a description of what your agent does. Pick a category."
          />
          <Step
            number={2}
            title="Upload media"
            description="Agent icon (128x128) and up to 5 screenshots showing your agent in action."
          />
          <Step
            number={3}
            title="Technical details"
            description="List your agent's capabilities, tools it uses, any special data or knowledge, and your website URL."
          />
          <Step
            number={4}
            title="Set pricing"
            description="Free, freemium, paid, or contact sales. We link users directly to your site — no middleman."
          />
          <Step
            number={5}
            title="Submit for review"
            description="Review your listing and submit. Approved agents go live within 24-48 hours."
          />
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-[#0A84FF] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#409CFF] transition-colors text-sm"
          >
            Start Your Listing <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Badge embed */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">Show off your listing</h2>
        <p className="text-gray-400 mb-6">Add a badge to your website or README to drive traffic to your Agent Store page.</p>

        <div className="bg-[#1c1c1e] rounded-2xl p-6 border border-white/[0.06]">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#0A84FF] rounded-lg px-3 py-1.5 flex items-center gap-2">
              <img
                src="https://res.cloudinary.com/djklousbo/image/upload/v1775356040/logo_agentstore.png_fmokea.jpg"
                alt="Agent Store"
                className="h-4 w-4 rounded"
              />
              <span className="text-white text-xs font-semibold">Listed on Agent Store</span>
            </div>
            <span className="text-[12px] text-gray-500">Preview</span>
          </div>

          <div className="bg-[#0a0a0a] rounded-lg border border-white/[0.06] p-4">
            <code className="text-[12px] text-gray-400 font-mono break-all">
              {`<a href="https://agentstore.dev/agent/YOUR-SLUG"><img src="https://agentstore.dev/badge.svg" alt="Listed on Agent Store" /></a>`}
            </code>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-6">Common questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "Does it cost anything to list my agent?",
              a: "No. Listing is free. We don't take a cut of your revenue — users click through directly to your website.",
            },
            {
              q: "Do you handle payments?",
              a: "Not yet. The 'Get' button links directly to your site. In-store payments via Stripe are planned for v2.",
            },
            {
              q: "How does MCP discovery work?",
              a: "When an AI system is connected to the Agent Store via MCP, it can call find_agent_for_task with a natural language description. Your agent gets returned if it matches. The better your capabilities and description, the higher you rank.",
            },
            {
              q: "Can I update my listing after publishing?",
              a: "Yes. You'll get a developer dashboard to edit your agent details, update screenshots, and change pricing at any time.",
            },
            {
              q: "What's the review process?",
              a: "We check that your agent is real, the website works, and the description is accurate. No editorial gatekeeping — if it works, it gets listed.",
            },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-white/[0.06] pb-6 last:border-0">
              <h3 className="font-semibold text-white text-[15px]">{faq.q}</h3>
              <p className="text-[14px] text-gray-400 mt-2 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
