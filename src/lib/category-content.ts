export interface CategoryContent {
  userMoment: string;
  visualDirection: string;
  useCases: string[];
  trustSignals: string[];
  seoAngles: string[];
  examples: string[];
  comparisonCriteria: string[];
}

const defaultContent: CategoryContent = {
  userMoment: "Find an AI app that fits the task, tools, pricing, and level of trust you need.",
  visualDirection: "A decision surface: clear task outcomes, fit signals, integrations, pricing, and proof.",
  useCases: ["Compare apps", "Check integrations", "Review pricing", "Evaluate trust"],
  trustSignals: ["Publisher identity", "Data access", "Pricing clarity", "Recent updates"],
  seoAngles: ["best AI apps", "AI app directory", "AI tools comparison"],
  examples: ["OpenAI GPTs", "Zapier apps", "workflow assistants"],
  comparisonCriteria: ["Best for", "Pricing", "Integrations", "Data access", "Setup time"],
};

export const categoryContent: Record<string, CategoryContent> = {
  productivity: {
    userMoment: "You are overwhelmed by meetings, email, and tasks and want fewer context switches with clearer next actions.",
    visualDirection: "Calm command-center layouts: checklists, progress cards, calendar/inbox surfaces, and status pills.",
    useCases: ["Daily planning", "Meeting notes", "Inbox triage", "Calendar scheduling", "Task follow-up"],
    trustSignals: ["Gmail/Calendar permissions", "Private note handling", "Slack/Notion integrations", "Human review controls"],
    seoAngles: ["best AI productivity apps", "AI calendar assistants", "AI meeting note takers", "AI task management apps"],
    examples: ["Motion", "Reclaim", "Notion AI", "Granola", "Otter"],
    comparisonCriteria: ["Calendar support", "Email access", "Task sync", "Team collaboration", "Free plan"],
  },
  "developer-tools": {
    userMoment: "You need to ship, debug, review, test, or understand code faster without losing control of the repo.",
    visualDirection: "Dark IDE-quality surfaces: code panels, diffs, terminal snippets, repo context, and sharp technical cards.",
    useCases: ["Code generation", "Code review", "Debugging", "Test generation", "Issue to PR", "Docs and API work"],
    trustSignals: ["GitHub permissions", "Local vs cloud processing", "Secrets handling", "SOC2/security", "Open-source status"],
    seoAngles: ["best AI coding apps", "AI code review tools", "AI debugging apps", "AI developer tools"],
    examples: ["Cursor", "GitHub Copilot", "Devin", "Windsurf", "Aider"],
    comparisonCriteria: ["IDE support", "Languages", "Repo permissions", "Autonomy level", "Enterprise controls"],
  },
  writing: {
    userMoment: "You need brand-safe copy, articles, emails, scripts, or docs without staring at a blank page.",
    visualDirection: "Editorial workspace with document cards, annotations, before/after copy, and content-calendar cues.",
    useCases: ["SEO articles", "Email copy", "Social posts", "Docs", "Brand voice rewrites"],
    trustSignals: ["Originality checks", "Citation/source controls", "Brand voice controls", "Publishing integrations"],
    seoAngles: ["best AI writing apps", "AI SEO writers", "AI copywriting apps", "AI blog writing tools"],
    examples: ["Jasper", "Copy.ai", "Writer", "Typeface", "Surfer SEO"],
    comparisonCriteria: ["Brand controls", "SEO features", "Team workflows", "Export/publishing", "Plagiarism checks"],
  },
  research: {
    userMoment: "You need reliable synthesis, citations, and fresh sources without manually searching every paper or webpage.",
    visualDirection: "Source-backed research surfaces: citation trails, document stacks, excerpt cards, and knowledge maps.",
    useCases: ["Literature review", "Market scan", "Source-backed answers", "Company research", "PDF synthesis"],
    trustSignals: ["Citation links", "Source freshness", "Hallucination mitigation", "Inspectable evidence"],
    seoAngles: ["best AI research apps", "AI apps with citations", "AI literature review tools", "AI market research apps"],
    examples: ["Perplexity", "Elicit", "Consensus", "SciSpace", "NotebookLM"],
    comparisonCriteria: ["Source types", "Citation quality", "Export formats", "Freshness", "Document support"],
  },
  "data-analysis": {
    userMoment: "You need answers from data without hand-writing every query, spreadsheet formula, or dashboard.",
    visualDirection: "BI-grade cards: query results, charts, SQL snippets, lineage cues, and tabular numerals.",
    useCases: ["Natural language to SQL", "Spreadsheet analysis", "Dashboard generation", "Product analytics", "CRM analysis"],
    trustSignals: ["Permission-aware querying", "Data lineage", "Accuracy validation", "Role-based access"],
    seoAngles: ["best AI data analytics apps", "AI BI apps", "natural language analytics tools", "AI SQL apps"],
    examples: ["ThoughtSpot", "Tableau Pulse", "Power BI Copilot", "Hex", "Julius"],
    comparisonCriteria: ["Data sources", "SQL support", "Charting", "Governance", "Export options"],
  },
  "customer-support": {
    userMoment: "You need to answer customers instantly, reduce tickets, and escalate correctly from approved knowledge.",
    visualDirection: "Support inbox and chat-first UI: ticket queues, help-center cards, handoff states, and CSAT proof.",
    useCases: ["Ticket triage", "Live chat", "Email support", "Help-center sync", "QA monitoring"],
    trustSignals: ["Grounded in approved docs", "Escalation rules", "Audit logs", "PII handling", "Multilingual support"],
    seoAngles: ["best AI customer support apps", "AI helpdesk automation", "AI support chatbot", "AI customer service apps"],
    examples: ["Intercom Fin", "Zendesk AI", "Ada", "Gorgias", "Sierra"],
    comparisonCriteria: ["Channels", "Handoff", "Knowledge sync", "Deflection proof", "Security"],
  },
  creative: {
    userMoment: "You need to generate, edit, remix, or publish visual, video, audio, or story artifacts.",
    visualDirection: "Gallery-first creative surfaces with output previews, media tiles, timelines, and waveform cues.",
    useCases: ["Image generation", "Video generation", "Music", "Voice", "Design", "Storytelling"],
    trustSignals: ["Commercial rights", "Training data policy", "Watermarking", "Moderation", "Copyright/IP clarity"],
    seoAngles: ["best AI creative apps", "AI video apps", "AI image generation apps", "AI music apps"],
    examples: ["Midjourney", "Runway", "Adobe Firefly", "Canva AI", "Suno", "ElevenLabs"],
    comparisonCriteria: ["Output quality", "Medium", "Licensing", "Editing workflow", "Export formats"],
  },
  education: {
    userMoment: "You want personalized tutoring, lesson planning, grading help, or study support with safety boundaries.",
    visualDirection: "Warm notebook-style learning surfaces: progress paths, curriculum maps, annotations, and badges.",
    useCases: ["Tutoring", "Lesson planning", "Study help", "Grading", "Language learning"],
    trustSignals: ["Age safety", "FERPA/COPPA/GDPR notes", "Academic integrity", "Expert-reviewed content"],
    seoAngles: ["best AI education apps", "AI tutoring apps", "AI lesson planning tools", "AI study assistants"],
    examples: ["Khanmigo", "Duolingo Max", "Quizlet AI", "MagicSchool", "Socratic"],
    comparisonCriteria: ["Learner type", "Subjects", "Safety controls", "Teacher tools", "Progress tracking"],
  },
  finance: {
    userMoment: "You need forecasting, analysis, bookkeeping, FP&A, tax, or financial workflow help with high trust.",
    visualDirection: "Trust-heavy fintech: dark navy/green palettes, forecasts, secure badges, and compact charts.",
    useCases: ["Budgeting", "Bookkeeping", "FP&A", "Tax prep", "Financial analysis"],
    trustSignals: ["Regulatory disclaimers", "Bank integration safety", "Audit trails", "Data security"],
    seoAngles: ["best AI finance apps", "AI bookkeeping apps", "AI financial analysis tools", "AI budgeting apps"],
    examples: ["Intuit Assist", "Ramp Intelligence", "Brex AI", "FinChat", "Datarails"],
    comparisonCriteria: ["Data sources", "Compliance", "Exports", "Forecasting", "Human review"],
  },
  "sales-marketing": {
    userMoment: "You need more pipeline, better campaigns, and less CRM/admin work without sacrificing brand or compliance.",
    visualDirection: "Pipeline and campaign-board hybrid: lead cards, channel tags, creative grids, and revenue metrics.",
    useCases: ["Outbound", "Inbound", "Account research", "CRM updates", "SEO", "Paid/social/email campaigns"],
    trustSignals: ["Deliverability", "CRM write permissions", "Attribution", "Brand safety", "Compliance"],
    seoAngles: ["best AI sales apps", "AI SDR apps", "AI marketing apps", "AI campaign automation tools"],
    examples: ["Clay", "Apollo AI", "Salesforce Einstein", "HubSpot AI", "Jasper", "Lavender"],
    comparisonCriteria: ["CRM support", "Channels", "Lead data", "Brand controls", "Compliance"],
  },
  "health-wellness": {
    userMoment: "You want coaching for habits, workouts, nutrition, sleep, or wellness while knowing the limits of AI advice.",
    visualDirection: "Clean wellness: soft greens/blues, coach cards, habit streaks, rings, and biomarker panels.",
    useCases: ["Workout plans", "Nutrition", "Sleep", "Habit coaching", "Mental wellness"],
    trustSignals: ["Medical disclaimers", "Expert credentials", "Privacy/HIPAA where relevant", "Emergency boundaries"],
    seoAngles: ["best AI fitness apps", "AI health coach", "AI nutrition planner", "AI workout assistant"],
    examples: ["Whoop Coach", "Fitbit AI", "Apple Health", "MyFitnessPal AI", "Noom"],
    comparisonCriteria: ["Goal type", "Wearables", "Credentials", "Privacy", "Plan personalization"],
  },
  "shopping-home": {
    userMoment: "You want the best product, deal, grocery, gift, or home choice without endless comparison tabs.",
    visualDirection: "Retail-style cards, recommendation quizzes, comparison panels, deal badges, and swatches.",
    useCases: ["Product comparison", "Deal finding", "Gift ideas", "Groceries", "Interior/home planning"],
    trustSignals: ["Affiliate disclosure", "Review authenticity", "Price freshness", "Return policy clarity"],
    seoAngles: ["best AI shopping assistants", "AI product recommendation apps", "AI deal finder", "AI personal shopper"],
    examples: ["Amazon Rufus", "Klarna AI", "Google Shopping AI", "Perplexity Shopping", "Honey"],
    comparisonCriteria: ["Price freshness", "Retailer support", "Reviews", "Affiliate policy", "Personalization"],
  },
  "travel-lifestyle": {
    userMoment: "You want a trip planned around your budget, timing, preferences, and constraints.",
    visualDirection: "Aspirational but practical: maps, itinerary cards, booking panels, routes, and day-by-day timelines.",
    useCases: ["Itinerary planning", "Price tracking", "Local recommendations", "Business travel", "Family travel"],
    trustSignals: ["Live availability", "Cancellation clarity", "Source links", "Affiliate transparency"],
    seoAngles: ["best AI travel apps", "AI trip planner", "AI itinerary generator", "AI travel planning assistant"],
    examples: ["Expedia Romie", "Booking.com AI Trip Planner", "Kayak AI", "Mindtrip", "Layla"],
    comparisonCriteria: ["Booking support", "Live prices", "Maps", "Budget controls", "Source quality"],
  },
  "relationships-social": {
    userMoment: "You want help with dating, communication, gifts, events, companionship, or social confidence.",
    visualDirection: "Warm, intimate, and clear: chat/journal cards, mood colors, avatar circles, and memory controls.",
    useCases: ["Dating help", "Gift planning", "Event planning", "Conversation coaching", "Companion chat"],
    trustSignals: ["Memory controls", "Emotional safety", "Moderation", "AI disclosure", "Privacy"],
    seoAngles: ["best AI companion apps", "AI dating coach", "AI gift planner", "AI social assistant"],
    examples: ["Pi", "Character.AI", "Replika", "Nomi", "Rosebud"],
    comparisonCriteria: ["Relationship type", "Memory", "Safety", "Customization", "Privacy"],
  },
  "learning-skills": {
    userMoment: "You want to learn a language, instrument, recipe, hobby, or practical skill with guided practice.",
    visualDirection: "Studio/classroom hybrid: lesson cards, practice paths, streaks, badges, and feedback panels.",
    useCases: ["Language learning", "Music practice", "Cooking", "Hobbies", "Skill drills"],
    trustSignals: ["Expert-reviewed content", "Age appropriateness", "Physical safety", "Progress transparency"],
    seoAngles: ["AI language tutor", "AI cooking coach", "AI music tutor", "best AI skill-learning apps"],
    examples: ["Duolingo Max", "Yousician", "Khanmigo", "Quizlet", "Photomath"],
    comparisonCriteria: ["Skill type", "Practice feedback", "Progress tracking", "Safety", "Curriculum"],
  },
  "parenting-family": {
    userMoment: "You need help with family logistics, baby tracking, routines, child safety, or school communication.",
    visualDirection: "Calm family OS: routines, shared calendars, safety checklists, and age-stage cards.",
    useCases: ["Baby tracking", "Family calendar", "Routines", "School comms", "Child safety"],
    trustSignals: ["Child data privacy", "Pediatric disclaimers", "Emergency boundaries", "COPPA/GDPR-K notes"],
    seoAngles: ["best AI parenting apps", "AI family assistant", "baby tracking AI", "AI child safety assistant"],
    examples: ["Family calendar apps", "baby trackers", "school communication assistants"],
    comparisonCriteria: ["Age stage", "Privacy", "Sharing", "Safety", "Calendar support"],
  },
  "legal-admin": {
    userMoment: "You need help reviewing contracts, job paperwork, immigration steps, taxes, or admin documents.",
    visualDirection: "Document-first and restrained: clause cards, redlines, checklists, secure-vault motifs.",
    useCases: ["Contract review", "Legal research", "Immigration", "Tax/admin", "Job applications"],
    trustSignals: ["Not legal advice", "Jurisdiction boundaries", "Confidentiality", "Citation accuracy", "Security"],
    seoAngles: ["best AI legal apps", "AI contract review tools", "AI immigration assistant", "AI tax assistant"],
    examples: ["Harvey", "Spellbook", "CoCounsel", "Lexis+ AI", "Luminance"],
    comparisonCriteria: ["Jurisdiction", "Document type", "Attorney review", "Security", "Citations"],
  },
  "personal-finance": {
    userMoment: "You want budgeting, saving, investing, credit, or money clarity without exposing more data than necessary.",
    visualDirection: "Consumer fintech: friendly secure cards, goal progress, forecast charts, and tabular money values.",
    useCases: ["Budgeting", "Saving", "Investing", "Credit", "Bills and subscriptions"],
    trustSignals: ["Bank data safety", "No-advice limits", "Pricing transparency", "Regulatory disclaimers"],
    seoAngles: ["best AI budgeting apps", "AI personal finance assistant", "AI investment assistant", "AI credit assistant"],
    examples: ["Cleo", "Rocket Money", "Intuit Assist", "Monarch", "YNAB-like assistants"],
    comparisonCriteria: ["Bank linking", "Advice limits", "Budgeting method", "Security", "Pricing"],
  },
};

export function getCategoryContent(slug: string): CategoryContent {
  return categoryContent[slug] ?? defaultContent;
}
