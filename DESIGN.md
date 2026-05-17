# AgentAppStore Design Direction

## Product promise

AgentAppStore helps people and AI systems find the right agent for a concrete job, with enough context to compare fit, trust, pricing, integrations, and data access before trying it.

## 1. User moment

The user is a founder, operator, developer, marketer, or curious consumer who knows a task they want delegated, but does not know which AI agent is credible, compatible, safe, or worth trying.

## 2. Product artifact

The product artifact is an **agent decision surface**:

- intent search result with match reasons
- category landing page with top picks, sub-use-cases, trust guidance, and comparison criteria
- agent detail page with outcome, integrations, permissions, data access, pricing, proof, and alternatives

Not just: a generic directory grid.

## 3. First viewport spec

The first viewport should contain:

- H1: `Find the right AI agent for the job.` or similar outcome-led headline.
- Primary product artifact: intent search box plus live example results/match reasons.
- Primary CTA: search/explore by task.
- Secondary CTA: browse categories or MCP/API docs.
- Trust cue near action: `500+ agents · 18 categories · pricing, integrations, and data-access signals`.
- One proof detail: sample result showing agent name, category, price, integration, and why it matched.

## 4. Primary interaction

User types a task in natural language, e.g. `summarize sales calls into HubSpot`, and gets ranked agents with explicit match reasons.

## 5. CTA hierarchy

- Primary: `Find an agent` / search by task.
- Secondary: `Browse categories`.
- Tertiary: `MCP Protocol`, `Submit an agent`, `Developers`.

## 6. Trust / anxiety map

- **Will this access sensitive data?** Handle on cards/detail pages with `Data access` and `Permissions` badges.
- **Is the agent real and maintained?** Handle with `Verified`, `Recently updated`, publisher/source links, and claim/report flows.
- **Is this paid placement?** Handle near ranking copy: `Ranked by relevance, not sponsorship` unless monetization changes.
- **Can I compare alternatives?** Handle with compare affordances and category comparison modules.
- **Will this work with my tools?** Handle with integration chips on cards and filters.

## 7. Explicit removals / avoid

- Do not make every page a generic dark SaaS card grid.
- Do not rely on logo marquee as the main artifact; search/match should be the artifact.
- Do not use vague copy like `AI-powered assistant` without an actual task outcome.
- Do not hide trust/privacy information below unrelated marketing sections.
- Do not make category pages just icon + list; they should be SEO/content landing pages.

## 8. Visual direction as concrete decisions

### Typography

- Keep high-legibility Geist/Inter-style sans.
- H1: 64–80px desktop, 38–44px mobile, tight but readable line-height.
- Body: 15–17px.
- Metadata: 11–13px.
- Use tabular numerals for ratings, prices, counts, and match scores.

### Color

- Keep premium dark base: `#08090a`, `#0f1011`.
- Brand accent: `#5e6ad2`.
- Add category accents carefully: dev blue/purple, creative magenta/orange, finance green, trust/security teal, consumer warmth.
- Use solid result surfaces for readability; reserve gradients/glass for hero and featured modules.

### Shape and components

- Cards: 16–24px radius for richer marketplace feel.
- Buttons: 10–14px radius.
- Filter chips: full pill.
- App icons: rounded square, roughly 20–28% corner radius.
- Card anatomy: icon, name, outcome tagline, category, price, integrations/tools, rating/proof, trust badge, CTA.

### Layout

- Homepage: hero search + example results, curated collections, category entry points, MCP/developer section.
- Discover: sticky search, active filter chips, faceted filters, sorted results, better empty states.
- Category pages: category hero, top picks, use-case chips, category-specific trust guidance, filters/list, FAQ/content.
- Detail pages: outcome first, screenshots/examples if available, permissions/data access, pricing, alternatives.

## 9. Category page content system

Use `research/agentstore-ui-design-research.xlsx` as the category content source. Each category should get:

- user moment
- visual metaphor
- sub-use-case chips
- trust/proof module
- SEO intro
- FAQ
- top agents / comparison criteria

Priority category upgrades:

1. Developer Tools
2. Productivity
3. Research
4. Customer Support
5. Sales & Marketing
6. Creative
7. Finance / Personal Finance
8. Legal & Admin

## 10. Acceptance criteria

- First viewport contains an actual product artifact: intent search + example matches.
- User can understand what AgentAppStore does within 5 seconds.
- Agent cards expose enough decision signals to compare.
- Category pages are useful SEO/content pages, not just lists.
- Trust/data-access cues appear near evaluation and CTAs.
- Mobile search/filter UX works independently from desktop.
- Visual design feels like a premium app store / discovery engine, not a generic AI SaaS template.

## 11. Browser QA checklist

Ask during visual QA:

1. Does the first viewport contain a specific product artifact, not just a pitch?
2. Is the primary interaction obvious within 5 seconds?
3. Does this look like a consumer-quality AI agent marketplace?
4. Are trust and data-access concerns handled where users feel anxiety?
5. Are category pages materially richer than a list of cards?
6. What still looks generic, dense, fake, or embarrassing?

## Research artifact

The research workbook is committed at:

`research/agentstore-ui-design-research.xlsx`

It contains:

- `UI Design Trends`: 14 design rules/trends with concrete AgentAppStore applications.
- `Category Trends`: 18 category-specific content/design rows matching the current site taxonomy.
- `Design System Direction`: implementation-level design decisions.
- `Sources`: reference URLs and how they inform the work.
