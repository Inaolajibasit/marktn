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

export type Service = { name: string; detail: string };

export const services: Service[] = [
  { name: "Public Relations", detail: "Narrative strategy and reputation management for markets entering or scaling across Africa." },
  { name: "Media Relations", detail: "Direct relationships with the editors and publications that shape culture and commerce." },
  { name: "Experiential", detail: "Launches and activations built for the moment a brand is first felt in a new market." },
  { name: "Brand Strategy", detail: "Positioning rooted in cultural fluency, not translated from elsewhere." },
  { name: "Influencer Marketing", detail: "Talent partnerships chosen for cultural weight, not follower count alone." },
  { name: "Campaign Production", detail: "In-house production from concept to final film." },
  { name: "Integrated Campaigns", detail: "PR, experiential and media working as a single system." },
  { name: "Consulting", detail: "Advisory for leadership teams entering African markets for the first time." },
];

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
