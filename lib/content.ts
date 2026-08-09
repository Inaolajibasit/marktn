// All site content lives here as static data. No CMS — every component
// and page imports from this file. To update copy or swap images, edit
// this file directly; to add real photography, drop files into the
// matching /public/images/... path named below (see public/images/README.md).

export type Campaign = {
  slug: string;
  client: string;
  year: string;
  category: "Luxury" | "Beauty" | "Entertainment" | "Launches" | "Events" | "PR";
  stat: string;
  description: string;
  heroImage: string;
  gallery: string[];
  overview: string;
  challenge: string;
  insight: string;
  strategy: string;
  execution: string;
  results: { label: string; value: string }[];
  pressCoverage: { outlet: string; headline: string }[];
  featured: boolean;
};

export const campaigns: Campaign[] = [
  {
    slug: "dior-lagos-launch",
    client: "Dior",
    year: "2025",
    category: "Launches",
    stat: "6.2M impressions",
    description: "A three-night residency introducing Dior to Lagos.",
    heroImage: "/images/work/dior-lagos-launch/hero.jpg",
    gallery: [
      "/images/work/dior-lagos-launch/gallery-1.jpg",
      "/images/work/dior-lagos-launch/gallery-2.jpg",
      "/images/work/dior-lagos-launch/gallery-3.jpg",
    ],
    overview:
      "Dior's first standalone Lagos activation, introducing the maison to West Africa's luxury consumer through a three-night experiential residency.",
    challenge:
      "Dior needed a Lagos debut that felt native to the city's social and cultural rhythm, not a scaled-down version of a European launch.",
    insight:
      "Lagos's luxury audience responds to intimacy and access, not scale — the smaller the room, the higher the perceived value.",
    strategy:
      "A three-night invite-only residency built around Nigerian creative talent, with global press access layered on top rather than leading.",
    execution:
      "In-house production of the residency space, a curated guest list spanning fashion, film and music, and a coordinated media embargo across four markets.",
    results: [
      { label: "Impressions", value: "6.2M+" },
      { label: "Press Placements", value: "22" },
      { label: "Guests", value: "340" },
    ],
    pressCoverage: [
      { outlet: "Business of Fashion", headline: "Dior's calculated Lagos debut" },
      { outlet: "Marie Claire", headline: "Inside the room Dior built for Lagos" },
    ],
    featured: true,
  },
  {
    slug: "loreal-westafrica",
    client: "L'Oréal",
    year: "2024",
    category: "Beauty",
    stat: "48 press placements",
    description: "Regional media strategy across four markets.",
    heroImage: "/images/work/loreal-westafrica/hero.jpg",
    gallery: [
      "/images/work/loreal-westafrica/gallery-1.jpg",
      "/images/work/loreal-westafrica/gallery-2.jpg",
      "/images/work/loreal-westafrica/gallery-3.jpg",
    ],
    overview:
      "A coordinated media relations push introducing three L'Oréal beauty lines across four West African markets simultaneously.",
    challenge:
      "Each market had its own beauty press ecosystem with no existing relationship to a single regional campaign.",
    insight:
      "Regional press trusts locally-sourced editors, not a single continental spokesperson — the campaign needed four faces, not one.",
    strategy:
      "Market-specific media ambassadors briefed from a shared narrative, released on a staggered four-week calendar.",
    execution:
      "Local press days in Lagos, Accra, Abidjan and Dakar, each producing market-specific coverage tied to a shared campaign hashtag.",
    results: [
      { label: "Press Placements", value: "48" },
      { label: "Markets", value: "4" },
      { label: "Reach", value: "9.1M+" },
    ],
    pressCoverage: [
      { outlet: "BeautyMatter", headline: "Cultural intelligence as a growth strategy" },
    ],
    featured: true,
  },
  {
    slug: "culture-custodian-live",
    client: "Culture Custodian",
    year: "2024",
    category: "Entertainment",
    stat: "30K attendees",
    description: "A sold-out live event and press activation.",
    heroImage: "/images/work/culture-custodian-live/hero.jpg",
    gallery: [
      "/images/work/culture-custodian-live/gallery-1.jpg",
      "/images/work/culture-custodian-live/gallery-2.jpg",
      "/images/work/culture-custodian-live/gallery-3.jpg",
    ],
    overview:
      "A flagship live entertainment event produced end-to-end, from ticketing narrative to day-of press coordination.",
    challenge: "Selling out a first-year event with no historical attendance data to anchor projections.",
    insight: "Scarcity messaging outperforms broad awareness for a first-year cultural event.",
    strategy: "A tiered release schedule paired with creator partnerships timed to each release.",
    execution: "Four-week creator rollout, on-site press management, and same-day recap content distribution.",
    results: [
      { label: "Attendees", value: "30K+" },
      { label: "Sell-out Time", value: "36 hrs" },
      { label: "Creator Reach", value: "12M+" },
    ],
    pressCoverage: [
      { outlet: "Culture Custodian", headline: "Inside the campaign that sold out in a day" },
    ],
    featured: true,
  },
  {
    slug: "estee-lauder-accra",
    client: "Estée Lauder",
    year: "2023",
    category: "Events",
    stat: "12 markets",
    description: "Multi-market experiential rollout.",
    heroImage: "/images/work/estee-lauder-accra/hero.jpg",
    gallery: [
      "/images/work/estee-lauder-accra/gallery-1.jpg",
      "/images/work/estee-lauder-accra/gallery-2.jpg",
      "/images/work/estee-lauder-accra/gallery-3.jpg",
    ],
    overview: "An experiential rollout anchoring Estée Lauder's counter presence across a dozen West and East African markets.",
    challenge: "Coordinating a consistent brand experience across markets with very different retail infrastructure.",
    insight: "Counter staff, not advertising, are the primary brand touchpoint in these markets.",
    strategy: "A staff-first activation model, training counter teams as the face of each local launch.",
    execution: "In-market training sessions and a shared activation kit adapted per market's retail format.",
    results: [
      { label: "Markets", value: "12" },
      { label: "Counter Staff Trained", value: "210" },
      { label: "Uplift", value: "34%" },
    ],
    pressCoverage: [],
    featured: false,
  },
];

export const featuredCampaigns = campaigns.filter((c) => c.featured);

export function getCampaignBySlug(slug: string) {
  return campaigns.find((c) => c.slug === slug) ?? null;
}

export function getNextCampaign(slug: string) {
  const i = campaigns.findIndex((c) => c.slug === slug);
  return campaigns[(i + 1) % campaigns.length];
}

export type PressMention = { outlet: string; headline: string; year: string };

export const press: PressMention[] = [
  { outlet: "Marie Claire", headline: "The agency redefining African luxury PR", year: "2025" },
  { outlet: "Business of Fashion", headline: "How marktn PR built Dior's Lagos debut", year: "2025" },
  { outlet: "PRNewswire", headline: "marktn PR expands to four markets", year: "2024" },
  { outlet: "Culture Custodian", headline: "Inside the campaign that sold out in a day", year: "2024" },
  { outlet: "BeautyMatter", headline: "Cultural intelligence as a growth strategy", year: "2023" },
  { outlet: "21 Magazine", headline: "Onyeka Nwonah on perception and power", year: "2023" },
];

export type Service = {
  slug: string;
  name: string;
  detail: string;
  moreInfo: string;
  href: string;
  audience: string[];
  deliverables: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "public-relations",
    name: "Public Relations",
    detail: "Narrative strategy and reputation management for markets entering or scaling across Africa.",
    moreInfo:
      "From press releases to long-lead features, we shape the story before it breaks and steward it after. Our PR work spans corporate communications, product launches, and ongoing reputation management across the continent.",
    href: "/services/public-relations",
    audience: ["Global brands entering African markets", "Established brands protecting or evolving their reputation", "Leadership teams preparing for a major launch or announcement"],
    deliverables: ["Communications and narrative strategy", "Press office and media materials", "Launch and announcement planning", "Reputation and issues counsel", "Coverage reporting and insight"],
    faqs: [
      { question: "Do you offer ongoing PR retainers?", answer: "Yes. We support both focused campaigns and ongoing press-office retainers, depending on your communications rhythm and objectives." },
      { question: "Which markets do you cover?", answer: "Our work is rooted in Africa, with active experience across West, East and Southern African markets and relationships with relevant global media." },
      { question: "How do you measure success?", answer: "We agree on meaningful measures at the outset, including message pull-through, quality of coverage, audience relevance, sentiment and commercial context." },
    ],
  },
  {
    slug: "media-relations",
    name: "Media Relations",
    detail: "Direct relationships with the editors and publications that shape culture and commerce.",
    moreInfo:
      "We work with editors across Business of Fashion, Marie Claire, BeautyMatter and regional powerhouses in Lagos, Accra, Nairobi and Johannesburg. Briefings, exclusives and ongoing coverage — not just one-off placements.",
    href: "/services/media-relations",
    audience: ["Brands with a strong story but limited editorial access", "Teams launching products, people or ideas", "Organisations seeking deeper, long-term media relationships"],
    deliverables: ["Media landscape and opportunity mapping", "Tailored media lists", "Pitch development and outreach", "Editor briefings and interview management", "Coverage tracking and follow-up"],
    faqs: [
      { question: "Can you guarantee coverage?", answer: "Earned coverage cannot be guaranteed. We focus on a credible story, precise targeting and trusted relationships—the conditions that make meaningful coverage more likely." },
      { question: "Do you work with international publications?", answer: "Yes. We work across leading African titles and relevant international fashion, beauty, business and culture media." },
      { question: "Can this be a standalone engagement?", answer: "Yes. Media relations can run independently or as part of a wider PR, launch or integrated campaign." },
    ],
  },
  {
    slug: "experiential",
    name: "Experiential",
    detail: "Launches and activations built for the moment a brand is first felt in a new market.",
    moreInfo:
      "Residencies, press days, brand houses and counter activations — produced in-house from concept to load-out. We design for the room, the guest list, and the press moment simultaneously.",
    href: "/services/experiential",
    audience: ["Brands planning launches, press days or cultural activations", "Teams that need local production without losing global standards", "Organisations creating an experience designed to earn attention"],
    deliverables: ["Experience concept and creative direction", "Venue, supplier and production management", "Guest strategy and invitation management", "Run-of-show and on-site delivery", "Press and content integration"],
    faqs: [
      { question: "Do you handle production end to end?", answer: "Yes. We can manage the full experience from concept and budgeting through suppliers, guest management, live delivery and post-event reporting." },
      { question: "Can you deliver outside Nigeria?", answer: "Yes. We build trusted local teams for projects across key African markets while maintaining one central creative and production standard." },
      { question: "How early should we involve you?", answer: "Ideally eight to twelve weeks before a major activation. Larger builds or multi-market programmes benefit from a longer lead time." },
    ],
  },
  {
    slug: "brand-strategy",
    name: "Brand Strategy",
    detail: "Positioning rooted in cultural fluency, not translated from elsewhere.",
    moreInfo:
      "Market-entry positioning, narrative architecture, and brand voice systems. We work with founders and global teams to define how a brand sounds, looks and shows up before it speaks publicly.",
    href: "/services/brand-strategy",
    audience: ["Founders defining a new brand", "Global teams adapting positioning for African audiences", "Established brands that have outgrown their current narrative"],
    deliverables: ["Research and cultural landscape review", "Positioning and value proposition", "Audience and messaging architecture", "Brand voice principles", "Go-to-market communications roadmap"],
    faqs: [
      { question: "Is this visual branding?", answer: "Our focus is strategic: positioning, narrative, audience, messaging and voice. We can collaborate with your visual identity team or recommend the right creative partners." },
      { question: "Will we receive a usable strategy document?", answer: "Yes. The final system is practical and designed for your teams and partners to use across campaigns, content, press and decision-making." },
      { question: "Can you facilitate leadership workshops?", answer: "Yes. Workshops are often central to aligning leadership, surfacing insight and making strategic choices efficiently." },
    ],
  },
  {
    slug: "influencer-marketing",
    name: "Influencer Marketing",
    detail: "Talent partnerships chosen for cultural weight, not follower count alone.",
    moreInfo:
      "Briefing, contracting, and managing creators across fashion, beauty, music and culture. We choose for fit and credibility — reach follows.",
    href: "/services/influencer-marketing",
    audience: ["Brands seeking credible cultural advocates", "Campaigns that need reach with relevance", "Teams requiring local talent knowledge and hands-on management"],
    deliverables: ["Creator strategy and talent shortlist", "Audience and brand-fit vetting", "Briefing, contracting and negotiation", "Content review and campaign management", "Performance reporting and learnings"],
    faqs: [
      { question: "How do you select creators?", answer: "We assess cultural credibility, audience quality, creative fit, brand safety and past performance—not follower count alone." },
      { question: "Do you manage contracts and usage rights?", answer: "Yes. We manage commercial negotiation, deliverables, timelines, approvals and usage terms as part of the engagement." },
      { question: "Can you work with our existing talent roster?", answer: "Absolutely. We can evaluate, refine and manage an existing roster or supplement it where the brief needs additional voices." },
    ],
  },
  {
    slug: "campaign-production",
    name: "Campaign Production",
    detail: "In-house production from concept to final film.",
    moreInfo:
      "Photography, film, and editorial production with full on-the-ground teams across West and East Africa. Concepting, casting, location, post — under one roof.",
    href: "/services/campaign-production",
    audience: ["Brands producing editorial, social or launch assets in Africa", "Global creative teams needing reliable local execution", "Campaigns requiring one accountable production partner"],
    deliverables: ["Creative development and treatment", "Budgeting, scheduling and pre-production", "Casting, crew, locations and logistics", "Photography and film production", "Post-production and final asset delivery"],
    faqs: [
      { question: "Can you work from an existing global concept?", answer: "Yes. We can faithfully localise and produce an established creative direction, or develop the concept with you from the beginning." },
      { question: "Do you produce both stills and film?", answer: "Yes. We build integrated teams for photography, film and supporting social content so the asset suite feels coherent." },
      { question: "How are budgets managed?", answer: "You receive a transparent production budget, agreed scope and approval points. Any changes are discussed before costs are committed." },
    ],
  },
  {
    slug: "integrated-campaigns",
    name: "Integrated Campaigns",
    detail: "PR, experiential and media working as a single system.",
    moreInfo:
      "When the brief needs all three working at once — earned, owned and experiential in lockstep — we run it as one campaign with one team and one measurement framework.",
    href: "/services/integrated-campaigns",
    audience: ["Brands with a major market-entry or launch brief", "Teams coordinating several agencies or workstreams", "Campaigns that need earned, owned and experiential activity to reinforce one idea"],
    deliverables: ["Integrated campaign strategy", "Creative platform and channel planning", "PR, media, talent and experience management", "Central programme and partner coordination", "Unified measurement and reporting"],
    faqs: [
      { question: "What makes a campaign integrated?", answer: "Every channel begins with one strategic idea and one audience journey. PR, content, talent and experience are planned together rather than assembled afterwards." },
      { question: "Can you lead other specialist partners?", answer: "Yes. We can act as the central agency, setting the communications system and coordinating client teams and specialist partners." },
      { question: "What is the typical timeline?", answer: "Most integrated campaigns require at least twelve weeks. Multi-market or production-heavy programmes may require more." },
    ],
  },
  {
    slug: "consulting",
    name: "Consulting",
    detail: "Advisory for leadership teams entering African markets for the first time.",
    moreInfo:
      "Market intelligence, entry sequencing, and partner selection for global houses and founders approaching the continent. Engagements run from a single workshop to a six-month retainer.",
    href: "/services/consulting",
    audience: ["Leadership teams assessing an African market opportunity", "Global brands choosing when and how to enter", "Founders who need an experienced external perspective"],
    deliverables: ["Market and cultural intelligence", "Opportunity and risk assessment", "Entry sequencing and communications counsel", "Partner and stakeholder mapping", "Executive workshops and advisory sessions"],
    faqs: [
      { question: "What does a consulting engagement look like?", answer: "It can be a focused leadership workshop, a defined research and recommendations project, or an ongoing advisory relationship." },
      { question: "Is the advice specific to our category?", answer: "Yes. We shape the work around your category, audience, commercial goals and the realities of the markets you are considering." },
      { question: "Can consulting lead into execution?", answer: "Yes. When useful, the strategy can transition into PR, experiential, production or an integrated campaign with the same team." },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug) ?? null;
}

export const brandPartners = ["LVMH", "L'Oréal", "Estée Lauder", "Dior", "Culture Custodian", "BeautyMatter"];

export type ImpactStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

export const impactStats: ImpactStat[] = [
  { value: 18.8, prefix: "₦", suffix: "M+", decimals: 1, label: "PR Value Generated" },
  { value: 10.9, suffix: "M+", decimals: 1, label: "Total Impressions" },
  { value: 40, suffix: "+", label: "Campaigns Delivered" },
  { value: 30, suffix: "K+", label: "Community Reached" },
  { value: 4, label: "Countries" },
];

export const founder = {
  name: "Onyeka Nwonah",
  portrait: "/images/founder/onyeka.jpg",
  bio: "Onyeka founded marktn PR on a simple conviction: African audiences deserve campaigns built for them, not adapted for them. Her work sits at the intersection of Western luxury standards and the cultural fluency required to actually move people here.",
  timeline: [
    { year: "2018", event: "Began in media relations, placing early-stage African fashion brands in international press." },
    { year: "2020", event: "Led experiential launches for beauty brands entering the West African market." },
    { year: "2022", event: "Founded marktn PR to build campaigns rooted in cultural intelligence, not imported playbooks." },
    { year: "2025", event: "Grew marktn PR into a four-country agency working with global luxury houses." },
  ],
};

export const values = [
  { name: "Cultural Fluency", detail: "We build for the audience in front of us, not a translated version of somewhere else." },
  { name: "Craft", detail: "Every deliverable is produced to a standard that could sit in an international portfolio." },
  { name: "Candor", detail: "We tell clients what will work, not what is easiest to say." },
  { name: "Access", detail: "Real relationships with the press and platforms that move culture." },
];

export const CATEGORIES = ["All", "Luxury", "Beauty", "Entertainment", "Launches", "Events", "PR"] as const;
