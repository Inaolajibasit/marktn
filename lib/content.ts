// Static agency and portfolio content lives here. Blog content is managed in Sanity.
// Local photography is served from public/images; brand artwork is in public/images/hero.

export type Campaign = {
  slug: string;
  client: string;
  year: string;
  category:
    | "Luxury"
    | "Beauty"
    | "Entertainment"
    | "Launches"
    | "Events"
    | "PR"
    | "Fashion";
  stat: string;
  description: string;
  heroImage: string;
  imagePosition?: string;
  gallery: string[];
  overview: string;
  challenge: string;
  insight: string;
  strategy: string;
  execution: string;
  executionHeading?: string;
  executionSteps?: { title: string; copy: string }[];
  resultsHeading?: string;
  resultsSummary?: string;
  results: {
    label: string;
    value: string;
    count?: { to: number; prefix?: string; suffix?: string };
  }[];
  pressHeading?: string;
  pressCoverage: { outlet: string; headline: string; url?: string }[];
  socialCoverage?: { label: string; url: string }[];
  featured: boolean;
};

// Femme Nature: femmenature.md, client-confirmed MARKTN involvement, and linked coverage.
// Campaign metrics and Instagram feature attribution were supplied by the client.
// Reach/social reach and mentions/social mentions are shared totals, not additive.
export const campaigns: Campaign[] = [
  {
    slug: "femme-nature",
    client: "Femme Nature",
    year: "2026",
    category: "Fashion",
    stat: "5M social media reach",
    description:
      "Turning a collection launch into a community moment through open casting, storytelling and PR.",
    heroImage: "/images/work/femmenature/work11.jpg",
    imagePosition: "center 25%",
    gallery: [
      "/images/work/femmenature/work1.webp",
      "/images/work/femmenature/work2.webp",
      "/images/work/femmenature/work3.webp",
      "/images/work/femmenature/work5.webp",
      "/images/work/femmenature/work6.webp",
      "/images/work/femmenature/work7.webp",
    ],
    overview:
      "For Heat Check, Femme Nature’s second womenswear collection, MARKTN’s work focused on giving women a part in the launch itself. The opportunity was to build attention for the collection through the people, personalities and culture already shaping its Lagos community.",
    challenge:
      "Femme Nature needed a launch that made its promise of confidence and self-expression tangible. The challenge was to turn interest in the clothes into participation in the brand, with a story that women would want to join, share and see themselves in.",
    insight:
      "Women were already styling Severe Nature and connecting through Femme Club and the For The Girls broadcast channel. Giving that community a voice in who represented the collection made the launch personal and gave participants a reason to bring their friends into the conversation.",
    strategy:
      "We made the casting process part of the launch story. An open invitation from Tara Gold encouraged women to introduce themselves in their own style; community voting then kept the audience involved. That participation became the foundation for a wider story about women shaping Nigerian streetwear.",
    executionHeading: "The solution MARKTN brought",
    execution:
      "Our approach connected community casting, campaign storytelling and PR, giving Femme Nature a launch story with people at its centre and reasons for audiences to take part.",
    executionSteps: [
      {
        title: "Open the casting call",
        copy: "The invitation, fronted by Tara Gold, asked women across Lagos to submit short videos expressing their personalities and style. With no modelling portfolio required, the call made room for women from the brand’s own audience to enter the campaign.",
      },
      {
        title: "Give the community a voice",
        copy: "The For The Girls broadcast channel became the home of public voting. Women shared entries, supported their favourites and brought friends into the process, building conversation around Heat Check before the collection’s launch.",
      },
      {
        title: "Make the story feel like Lagos",
        copy: "The campaign followed Tara and the Heat Check girls through a Friday night: getting ready, dinner with friends and a night at the club. Their individual styling connected the collection to the lives and culture of the women it was made for.",
      },
      {
        title: "Give the media a story to tell",
        copy: "The PR story centred on women choosing who would represent them and shaping their own place in streetwear. Coverage explored the casting, the community and the collection, giving the brand visibility across fashion, lifestyle and culture publications.",
      },
    ],
    resultsHeading: "Participation. Conversation. Visibility.",
    resultsSummary:
      "The campaign recorded 5M social media reach, over 500K social media interactions, 500K likes and ₦10M in PR value. Across 46 social mentions, 35 were positive and none were negative. More than 50 women entered the casting call, turning audience interest into direct participation. Campaign results supplied by the client.",
    results: [
      {
        label: "Social media reach",
        value: "5M",
        count: { to: 5_000_000 },
      },
      {
        label: "Social media interactions",
        value: "500K+",
        count: { to: 500_000, suffix: "+" },
      },
      {
        label: "Likes",
        value: "500K",
        count: { to: 500_000 },
      },
      {
        label: "PR value",
        value: "₦10M",
        count: { to: 10_000_000, prefix: "₦" },
      },
      {
        label: "Social mentions",
        value: "46",
        count: { to: 46 },
      },
      {
        label: "Positive mentions",
        value: "35",
        count: { to: 35 },
      },
      
    ],
    pressHeading: "Where our work was featured",
    pressCoverage: [
      {
        outlet: "Pulse Nigeria",
        headline: "Who gets to be a Femme Nature Girl? The women decided",
        url: "https://www.pulse.ng/story/femme-nature-heat-check-lagos-casting-2026100214521533646",
      },
      {
        outlet: "Marie Claire Nigeria",
        headline: "Femme Nature turns up the heat with its new collection, Heat Check",
        url: "https://marieclaire.ng/femme-nature-turns-up-the-heat-with-its-new-collection-heat-check/",
      },
      {
        outlet: "Deeds Magazine",
        headline: "Femme Nature Turns Up the Heat With Its New Heat Check Collection",
        url: "https://www.deedsmag.com/stories/femme-nature-turns-up-the-heat-with-its-new-heat-check-collection",
      },
      {
        outlet: "Grix Magazine",
        headline: "Who Gets to Be a Femme Nature Girl? The Women Decided",
        url: "https://grixmag.com/featured/who-gets-to-be-a-femme-nature-girl-the-women-decided/",
      },
      {
        outlet: "@go_liestylemag",
        headline: "Femme Nature drops its second collection. Heat Check",
        url: "https://www.instagram.com/p/DeMjZWmCEZZ/?exln=MWt3YXloMnVvZ3A1bw==",
      },
      {
        outlet: "@natif.shack",
        headline: "Brand of the week",
        url: "https://www.instagram.com/p/DeURuvgiH_E/?img_index=4&vrfl=d252YTRyemw2b3J2",
      },
      {
        outlet: "@theroseng_",
        headline: "Heat Check collection by Severe Nature",
        url: "https://www.instagram.com/p/DeKKx0SDGak/?cplk=YXFpemlyY2NsOG8x",
      },
      {
        outlet: "@grixmagazine",
        headline: "Femme Nature is taking the heat outside today",
        url: "https://www.instagram.com/p/DeBsZ8NDctq/?img_index=3&cplk=eTU4bzdsMnFlcDBt",
      },
      {
        outlet: "@marieclairenigeria",
        headline: "Femme Nature is turning up the heat",
        url: "https://www.instagram.com/p/Ddy4ZRNiwS-/?mdxt=djd4bzhvMzB5ODdv",
      },
    ],
    socialCoverage: [
      { label: "Severe Nature post 01", url: "https://www.instagram.com/p/Dc1hROztN7h/" },
      { label: "Severe Nature post 02", url: "https://www.instagram.com/p/DdRnld2NGrD/" },
      { label: "Severe Nature post 03", url: "https://www.instagram.com/p/DeULiYrt9Uy/" },
    ],
    featured: false,
  },
  {
    slug: "dior-lagos-launch",
    client: "Dior",
    year: "2025",
    category: "Launches",
    stat: "6.2M impressions",
    description: "A three-night residency introducing Dior to Lagos.",
    heroImage: "/images/hero/image1.png",
    gallery: [
      "/images/hero/hero.png",
      "/images/hero/hero1.png",
      "/images/hero/hero2.png",
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
      {
        outlet: "Business of Fashion",
        headline: "Dior's calculated Lagos debut",
      },
      {
        outlet: "Marie Claire",
        headline: "Inside the room Dior built for Lagos",
      },
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
    heroImage: "/images/hero/image2.png",
    gallery: [
      "/images/hero/hero.png",
      "/images/hero/hero1.png",
      "/images/hero/hero2.png",
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
      {
        outlet: "BeautyMatter",
        headline: "Cultural intelligence as a growth strategy",
      },
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
    heroImage: "/images/hero/image3.png",
    gallery: [
      "/images/hero/hero.png",
      "/images/hero/hero1.png",
      "/images/hero/hero2.png",
    ],
    overview:
      "A flagship live entertainment event produced end-to-end, from ticketing narrative to day-of press coordination.",
    challenge:
      "Selling out a first-year event with no historical attendance data to anchor projections.",
    insight:
      "Scarcity messaging outperforms broad awareness for a first-year cultural event.",
    strategy:
      "A tiered release schedule paired with creator partnerships timed to each release.",
    execution:
      "Four-week creator rollout, on-site press management, and same-day recap content distribution.",
    results: [
      { label: "Attendees", value: "30K+" },
      { label: "Sell-out Time", value: "36 hrs" },
      { label: "Creator Reach", value: "12M+" },
    ],
    pressCoverage: [
      {
        outlet: "Culture Custodian",
        headline: "Inside the campaign that sold out in a day",
      },
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
    heroImage: "/images/hero/hero2.png",
    gallery: [
      "/images/hero/hero.png",
      "/images/hero/hero1.png",
      "/images/hero/hero2.png",
    ],
    overview:
      "An experiential rollout anchoring Estée Lauder's counter presence across a dozen West and East African markets.",
    challenge:
      "Coordinating a consistent brand experience across markets with very different retail infrastructure.",
    insight:
      "Counter staff, not advertising, are the primary brand touchpoint in these markets.",
    strategy:
      "A staff-first activation model, training counter teams as the face of each local launch.",
    execution:
      "In-market training sessions and a shared activation kit adapted per market's retail format.",
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
  {
    outlet: "Marie Claire",
    headline: "The agency redefining African luxury PR",
    year: "2025",
  },
  {
    outlet: "Business of Fashion",
    headline: "How marktn PR built Dior's Lagos debut",
    year: "2025",
  },
  {
    outlet: "PRNewswire",
    headline: "marktn PR expands to four markets",
    year: "2024",
  },
  {
    outlet: "Culture Custodian",
    headline: "Inside the campaign that sold out in a day",
    year: "2024",
  },
  {
    outlet: "BeautyMatter",
    headline: "Cultural intelligence as a growth strategy",
    year: "2023",
  },
  {
    outlet: "21 Magazine",
    headline: "Onyeka Nwonah on perception and power",
    year: "2023",
  },
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
    name: "Public & Media Relations",
    detail:
      "Stories, reputation and editorial positioning rooted in an understanding of African audiences.",
    moreInfo:
      "We connect brand storytelling and narrative development with press releases, media strategy and reputation management. Strategic placements and journalist relationships help shape a clear editorial position.",
    audience: [
      "Brands with a clear identity and positioning",
      "African businesses building stronger audience connections",
      "Global brands seeking culturally accurate market entry",
    ],
    deliverables: [
      "Brand Storytelling & Narrative Development",
      "Press Releases & Media Strategy",
      "Reputation Management",
      "Strategic Media Placements",
      "Journalist & Publication Relationships",
      "Editorial Positioning",
    ],
    href: "/services/public-relations",
    faqs: [
      {
        question: "Who is this for?",
        answer:
          "Brands with a clear identity and positioning. African businesses building stronger audience connections. Global brands seeking culturally accurate market entry.",
      },
      {
        question: "What shapes the approach?",
        answer:
          "Our From-Their-Eyes Led Marketing approach puts cultural truth, immersive experiences and long-term narratives at the centre, with Africa as a primary market.",
      },
    ],
  },
  {
    slug: "influencer-marketing",
    name: "Influencer & Community Marketing",
    detail:
      "Partnerships and community-led campaigns built on cultural understanding.",
    moreInfo:
      "Influencer partnerships, community-led campaigns and cultural seeding strategies connect brands with the people and conversations that matter to their audiences.",
    audience: [
      "Brands seeking authentic engagement with African audiences",
      "Businesses ready to go beyond conventional marketing",
      "Companies investing in distinctive, high-impact marketing",
    ],
    deliverables: [
      "Influencer Partnerships",
      "Community-led Campaigns",
      "Cultural Seeding Strategies",
    ],
    href: "/services/influencer-marketing",
    faqs: [
      {
        question: "Who is this for?",
        answer:
          "Brands seeking authentic engagement with African audiences. Businesses ready to go beyond conventional marketing. Companies investing in distinctive, high-impact marketing.",
      },
      {
        question: "What shapes the approach?",
        answer:
          "Our From-Their-Eyes Led Marketing approach puts cultural truth, immersive experiences and long-term narratives at the centre, with Africa as a primary market.",
      },
    ],
  },
  {
    slug: "experiential",
    name: "Experiential Marketing",
    detail:
      "Brand activations and immersive experiences that create moments, not just campaigns.",
    moreInfo:
      "We bring brands into the moments people share through activations, pop-ups and immersive experiences. Event-based storytelling connects the experience to a wider brand narrative.",
    audience: [
      "African businesses growing their market presence",
      "Brands seeking meaningful audience engagement",
      "Global brands connecting with African markets",
    ],
    deliverables: [
      "Brand Activations",
      "Pop-ups & Immersive Experiences",
      "Event-based Storytelling",
    ],
    href: "/services/experiential",
    faqs: [
      {
        question: "Who is this for?",
        answer:
          "African businesses growing their market presence. Brands seeking meaningful audience engagement. Global brands connecting with African markets.",
      },
      {
        question: "What shapes the approach?",
        answer:
          "Our From-Their-Eyes Led Marketing approach puts cultural truth, immersive experiences and long-term narratives at the centre, with Africa as a primary market.",
      },
    ],
  },
  {
    slug: "campaign-production",
    name: "Campaign Production",
    detail:
      "Creative direction, content production and end-to-end campaign execution.",
    moreInfo:
      "From creative direction to content production and campaign execution, we bring the work together around one clear brand narrative. Every execution is guided by our commitment to global standards.",
    audience: [
      "Brands with a clear identity and positioning",
      "Companies investing in distinctive creative work",
      "Businesses ready to turn a campaign idea into an experience",
    ],
    deliverables: [
      "Creative Direction",
      "Content Production",
      "End to End Campaign Execution",
    ],
    href: "/services/campaign-production",
    faqs: [
      {
        question: "Who is this for?",
        answer:
          "Brands with a clear identity and positioning. Companies investing in distinctive creative work. Businesses ready to turn a campaign idea into an experience.",
      },
      {
        question: "What shapes the approach?",
        answer:
          "Our From-Their-Eyes Led Marketing approach puts cultural truth, immersive experiences and long-term narratives at the centre, with Africa as a primary market.",
      },
    ],
  },
  {
    slug: "integrated-campaigns",
    name: "Integrated Campaign",
    detail:
      "Cross-channel strategy that connects digital, offline and experiential marketing.",
    moreInfo:
      "We connect digital, offline and experiential touchpoints through cross-channel strategy and full funnel campaign development, building long-term narratives rather than isolated moments.",
    audience: [
      "African businesses building stronger brands",
      "Companies seeking a connected campaign across channels",
      "Global brands entering African markets",
    ],
    deliverables: [
      "Cross-channel Strategy (Digital, Offline & Experiential)",
      "Full Funnel Campaign Development",
    ],
    href: "/services/integrated-campaigns",
    faqs: [
      {
        question: "Who is this for?",
        answer:
          "African businesses building stronger brands. Companies seeking a connected campaign across channels. Global brands entering African markets.",
      },
      {
        question: "What shapes the approach?",
        answer:
          "Our From-Their-Eyes Led Marketing approach puts cultural truth, immersive experiences and long-term narratives at the centre, with Africa as a primary market.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug) ?? null;
}

export const brandPartners = [
  "LVMH",
  "L'Oréal",
  "Estée Lauder",
  "Dior",
  "Culture Custodian",
  "BeautyMatter",
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  context: string;
};

// Replace these anonymized placeholders with approved, attributed client quotes.
export const testimonials: Testimonial[] = [
  {
    quote:
      "They understood the cultural nuance immediately—and translated it into a campaign that felt globally polished and unmistakably local.",
    name: "Regional Brand Lead",
    role: "Global Beauty Group",
    context: "Market launch · West Africa",
  },
  {
    quote:
      "The team brought clarity to a complex launch. Every detail, from the guest list to the press narrative, worked as one system.",
    name: "Marketing Director",
    role: "Luxury House",
    context: "Experiential · Lagos",
  },
  {
    quote:
      "marktn PR feels like an extension of our team: strategic when it matters, candid when we need it, and exceptional in execution.",
    name: "Founder",
    role: "Culture Platform",
    context: "Integrated campaign · Africa",
  },
];

export type ImpactStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

export const impactStats: ImpactStat[] = [
  {
    value: 18.8,
    prefix: "₦",
    suffix: "M+",
    decimals: 1,
    label: "PR Value Generated",
  },
  { value: 10.9, suffix: "M+", decimals: 1, label: "Total Impressions" },
  { value: 40, suffix: "+", label: "Campaigns Delivered" },
  { value: 30, suffix: "K+", label: "Community Reached" },
  { value: 4, label: "Countries" },
];

export const company = {
  name: "MARKTN",
  founded: "2026",
  email: "Info@marktn.com",
  onyekaEmail: "Onyeka@marktn.com",
  headline: "The new standard for African marketing.",
  description:
    "MARKTN is a next generation marketing and public relations company, founded in 2026 to redefine how brands engage with the Nigerian and broader African market.",
  philosophy:
    "Our name is a stylized evolution of Marketing. It reflects a simple belief: marketing should not be repeated, it should be re-imagined.",
  partnership:
    "We partner with local, international and global brands to design campaigns that are relevant to African audiences and position Africa as a key driver of global cultural influence.",
  purpose:
    "We exist because African audiences deserve more than recycled marketing ideas. We believe brands should understand the people, culture and stories behind the markets they want to reach.",
  mission:
    "To transform marketing and public relations in Nigeria and Africa by delivering distinct, culturally intelligent and experience-driven campaigns that go beyond expectations and redefine how brands connect with people.",
  vision:
    "To become Africa’s most relevant and globally respected marketing and PR agency — the first choice for international brands entering the African market, and a driving force in changing global perception of African marketing.",
  approach: "From-Their-Eyes Led Marketing",
  principles: [
    "Campaigns rooted in cultural truth",
    "Immersive brand experiences",
    "Long-term narratives",
    "Africa as a primary market",
  ],
  clients:
    "Ambitious African businesses across industries, from emerging businesses to established companies, looking to build stronger brands, connect with their audiences and grow their market presence.",
  idealClients: [
    "Brands with a clear identity and positioning",
    "Companies willing to invest in distinctive, high-impact marketing",
    "Organizations seeking authentic engagement with African audiences",
    "Global brands looking for culturally accurate market entry strategies",
  ],
  identity:
    "MARKTN is marketing, just not as you know it. Our identity is bold, unconventional and built around the idea of going beyond the brief. The asterisk points to something beyond what’s written: more to explore, question and uncover. Placed on the K, it turns the deliberate difference in our name into our most recognizable symbol.",
};

// Owner career details: MARKTN-Portfolio.pptx, slides 1-2, 4-11, 13 and 15.
// These are Onyeka's career credits, including roles before MARKTN.
export const owner = {
  name: "Onyeka Nwonah",
  title: "Founder & CEO, MARKTN",
  portrait: "/images/founder/onyeka-nwonah-portrait.png",
  linkedin: "https://www.linkedin.com/in/onyekachukwu-nwonah-2166a023a/",
  introduction:
    "A PR and brand strategist with over five years of experience building campaigns across luxury, beauty, FMCG and entertainment in Nigeria.",
  perspective:
    "Her work brings cultural understanding and emotional intelligence to brand storytelling, influencer partnerships and live experiences. The belief that African consumers deserve campaigns built around their own realities is the conviction behind MARKTN.",
  statistics: [
    { value: "5+", label: "Years of experience" },
    { value: "40+", label: "Career campaigns" },
  ],
  experience: [
    {
      company: "Beguile by Omaa",
      role: "Creative & Content Manager",
      detail:
        "Creative and content work on Golden Kiss, alongside influencer partnerships and the ISWIS podcast sponsorship.",
    },
    {
      company: "Beauty Hut Africa",
      role: "Marketing & PR Executive",
      detail:
        "Brand launches and cultural campaigns, including Danessa Myricks Beauty’s Nigeria debut and L’Oréal Professionnel Paris.",
    },
    {
      company: "Redrick PR",
      role: "PR Associate & PR Intern",
      detail:
        "Campaign and event experience involving LVMH and L’Oréal brands, Prime Video premieres and Lagos Fashion Week.",
    },
  ],
  brands: [
    "LVMH",
    "L’Oréal Group",
    "Prime Video",
    "Veuve Clicquot",
    "Hennessy",
    "Maybelline NY",
    "Ralph Lauren",
    "CeraVe",
    "818 Spirits",
    "Danessa Myricks Beauty",
    "Beauty Hut Africa",
    "Beguile by Omaa",
  ],
  education:
    "B.Sc. Mass Communication (Broadcasting), Babcock University. Google Digital Marketing certified.",
};

export const companyRoles = [
  {
    name: "Cultural Interpreter",
    detail:
      "Translates global brand ambition into authentic African cultural truth.",
  },
  {
    name: "Creative Partner",
    detail:
      "Builds narratives and experiences alongside brands, not just for them.",
  },
  {
    name: "Market Entry Strategist",
    detail:
      "Guides global brands into African markets with clarity and confidence.",
  },
  {
    name: "Disruptor",
    detail:
      "Challenges recycled, diluted marketing norms with bold, original thinking.",
  },
];

export const values = [
  {
    name: "Meaningful & Steadfast Impact",
    detail: "We focus on meaningful engagement, not vanity metrics.",
  },
  {
    name: "Fresh & New",
    detail:
      "We reject recycled ideas and prioritize fresh, intentional thinking.",
  },
  {
    name: "Cultural Intelligence",
    detail: "We build from real understanding of people, not assumptions.",
  },
  { name: "Excellent", detail: "Every execution must meet global standards." },
  {
    name: "All About The Moment",
    detail: "We create moments, not just campaigns.",
  },
];

export const CATEGORIES = [
  "All",
  "Fashion",
  "Luxury",
  "Beauty",
  "Entertainment",
  "Launches",
  "Events",
  "PR",
] as const;
