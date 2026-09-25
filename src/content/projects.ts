/**
 * PROJECTS — real case studies.
 *
 * Each entry drives a tile on the home page + /work and a detail page at /work/[slug].
 * Tiles/detail pages show a real screenshot when `image` is set (a path under /public),
 * otherwise a clean monogram card. `summary` is the tile line; `body` is the detail-page
 * prose; `link` is the live site.
 *
 * Every project has a real cover image. 100x Brokerage has no live link (its domain no
 * longer resolves).
 */
export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  year: number;
  /** hue offset for the monogram fallback card */
  hue: number;
  featured?: boolean;
  /** real cover screenshot under /public (falls back to a monogram card) */
  image?: string;
  /** detail-page prose, one paragraph per entry */
  body?: string[];
  /** live URL */
  link?: string;
  /** detail page: big Overview heading */
  overview?: string;
  /** detail page: "Service" meta value (defaults to category) */
  service?: string;
  /** detail page: the challenge paragraph */
  challenge?: string;
  /** detail page: the approach paragraph */
  approach?: string;
  /** detail page: outcome stat cards (use real, verifiable figures only) */
  results?: { value: string; label: string }[];
  /** detail page: extra screenshots shown as thumbnails */
  gallery?: string[];
  /** detail page: the large image beside the challenge/approach block */
  caseImage?: string;
  /** detail page: caption overlaid on the case image */
  caseCaption?: string;
  /** detail page hero: a transparent device-mockup PNG (replaces the framed screenshot) */
  heroMockup?: string;
  /** home featured card: the client’s own short brand tagline */
  tagline?: string;
  /** home featured card: location / “since” line */
  location?: string;
};

export const projects: Project[] = [
  {
    slug: "davidas-jewelry-replatform",
    title: "Rebuilding a jewelry brand’s site for search visibility",
    client: "Davidas Design Concepts",
    category: "Web development",
    summary:
      "A fine-jewelry storefront replatformed from a hash-routed legacy site into statically-generated, fully crawlable Next.js routes built for SEO.",
    year: 2026,
    hue: 45,
    featured: true,
    image: "/work/davidas.png",
    link: "https://davidas.com",
    overview: "A premium jewelry website with a stronger online presence.",
    service: "Web development, SEO",
    body: [
      "Davidas Design Concepts needed a modern, fast and SEO-friendly website that truly reflected the quality of their jewelry and helped them reach more customers online.",
      "I rebuilt the entire website with a clean design, an improved structure and SEO best practices to showcase their collections and drive organic traffic.",
    ],
    challenge:
      "The existing site was a hash-routed single-page app, so product URLs like /jewelry#product/210-104 were invisible to search engines — none of the 78 products could rank, and the catalogue was hard for customers to navigate and explore.",
    approach:
      "I rebuilt the storefront on Next.js 15 with statically-generated routes that mirror the store’s taxonomy (category → subcategory → product), each with its own metadata, canonical tags and JSON-LD, plus an auto-generated sitemap. I also ported the PHP forms to serverless functions and preserved every legacy URL, so existing links and rankings carried over cleanly.",
    // NOTE: placeholder figures from the design mockup — replace with real, verified numbers.
    results: [
      { value: "120%", label: "Increase in organic traffic" },
      { value: "3×", label: "Higher product-page engagement" },
      { value: "60%", label: "More inquiries from the website" },
    ],
    gallery: ["/work/davidas-showcase.png", "/work/davidas-jewelry.png", "/work/davidas-gems.png"],
    caseImage: "/work/davidas-showcase.png",
    caseCaption: "Elegance in every detail",
    heroMockup: "/work/davidas-mockup.png",
    tagline: "The fusion of art, craftsmanship and technology.",
    location: "Greensboro, NC — Since 1998",
  },
  {
    slug: "vshred-shopify-upsells",
    title: "Post-purchase upsell funnel and free-trial subscription for a fitness brand",
    client: "V Shred",
    category: "Shopify · E-commerce",
    summary:
      "One-click upsell pages with video sales letters and a first-month-free membership that converts to a paid subscription automatically.",
    year: 2026,
    hue: 340,
    featured: true,
    image: "/work/vshred.png",
    link: "https://vshrednutrition.com/pages/vshred-university-upsell",
    body: [
      "Built a set of post-purchase upsell pages on V Shred’s Shopify store (vshrednutrition.com) for both digital programs and physical supplements. Each page duplicates and restyles a theme upsell template, embeds a Vidalytics video sales letter, and adds the product straight to cart through to checkout, matched to the legacy reference pages for copy, images and video IDs.",
      "For the V Shred University membership I set up a first-month-free trial: a $0 ‘Free Trial’ product is what customers add at checkout, and a Recharge workflow then swaps their subscription to the paid $9.95 plan, adds a 30-day delay before the first charge, and updates the product shown in the customer portal — so day 0 is free, day 30 is the first $9.95 charge, and it recurs monthly after that.",
      "Everything was staged in theme code and shipped without disrupting the live store.",
    ],
  },
  {
    slug: "turnoffroad-ai-automation",
    title: "AI tooling and store automation for an off-road parts retailer",
    client: "Turn Offroad",
    category: "AI / Automation",
    summary:
      "An AI pipeline that turns install videos into written guides, plus a suite of Shopify integrations that automate inventory, shipping and fulfillment.",
    year: 2026,
    hue: 15,
    featured: true,
    image: "/work/turnoffroad.png",
    link: "https://turnoffroad.com",
    body: [
      "Built and maintain a suite of AI and automation tools for Turn Offroad’s Shopify store. The flagship is an AI pipeline that turns a YouTube install video into a written guide: it detects scene changes with ffmpeg, transcribes the audio, uses Claude to extract the installation steps and Gemini Vision to pick a matching screenshot for each one, then outputs an editable Word document with a tools list, per-step timestamps and a QR link back to the video. It runs behind a login-protected web app and has processed the back catalogue into 93 documents.",
      "Around it sits a set of Shopify integrations: a real-time sync of Katana purchase-order arrival dates into on-storefront stock badges; tag-based routing of oversized orders to Freight Club with automatic tracking and fulfillment; a daily multi-partner inventory feed delivered by email, SFTP and FTPS; and SKU-driven QR install labels printed with every ShipStation shipment.",
      "The tools run as Node.js and Python services on DigitalOcean, driven by Shopify webhooks and scheduled jobs, with Slack alerting so failures surface before they become silent data loss.",
    ],
  },
  {
    slug: "taste-marketplace",
    title: "Taste Marketplace — food & wine experiences",
    client: "Taste Marketplace",
    category: "WordPress / E-commerce",
    summary:
      "A curated marketplace of Australian food & wine experiences on WordPress + WooCommerce, with real-time Rezdy bookings and an AI concierge chatbot.",
    year: 2026,
    hue: 30,
    featured: true,
    image: "/work/taste-marketplace.png",
    link: "https://tastemarketplace.com.au",
    body: [
      "A curated marketplace of food & wine experiences across Australia, built on WordPress (Divi + WooCommerce). I built a custom Experience post type with structured ACF fields, taxonomies and a dedicated single template, and integrated real-time bookings via Rezdy.",
      "I also developed an AI concierge chatbot that helps visitors discover and book experiences. Ongoing work covers the staging → live deployment workflow, image/CDN optimisation, caching and overall site performance.",
    ],
  },
  {
    slug: "aged-care-cost-calculator",
    title: "Rebuilding an aged care cost calculator",
    client: "Aged Care Solutions",
    category: "Web development",
    summary:
      "A free cost calculator redesigned into a guided four-step flow with a sticky estimate panel — shipped as a WordPress/Divi plugin, calculations untouched.",
    year: 2026,
    hue: 220,
    featured: true,
    image: "/work/aged-care.png",
    link: "https://agedcare.solutions/free-aged-care-calculator/",
    body: [
      "Redesigned Aged Care Solutions’ free cost calculator into a guided, four-step experience. Rebuilt the desktop layout into two columns with a sticky estimate panel that stays in view as users scroll the inputs, swapped dropdowns for clear Yes/No toggles, and restructured the results into a bold daily figure with a clean fee breakdown.",
      "Shipped as a WordPress/Divi plugin — all UI/UX, with the underlying fee calculations preserved exactly.",
    ],
  },
  {
    slug: "drt-motorsports-storefront",
    title: "Custom mega menu & customer-care flow for a powersports retailer",
    client: "DRT Motorsports",
    category: "Shopify · E-commerce",
    summary:
      "A hand-built multi-level mega menu and a Gorgias-integrated post-purchase support flow, staged and shipped SEO-safe on a live Shopify store.",
    year: 2026,
    hue: 210,
    featured: true,
    image: "/work/drt-motorsports.png",
    link: "https://drtmotorsports.com/",
    body: [
      "Designed and built a custom multi-level flyout mega menu and header for a Shopify powersports store, matching the approved design with hand-tuned CSS — brand columns, image cards, precise positioning, and responsive behavior.",
      "Also created a post-purchase ‘Let’s Make It Right’ support page and form, integrated with the team’s Gorgias helpdesk (auto-tagging, photo uploads, and email routing to CS). Everything was staged across draft and live themes and shipped SEO-safe, with zero disruption to the live store.",
    ],
  },

  {
    slug: "wordpress-multisite-woocommerce",
    title: "Building and updating WooCommerce stores across multiple brands",
    client: "Multiple WordPress brands",
    category: "WordPress / E-commerce",
    summary:
      "Full-stack work across several WooCommerce stores — product, archive, checkout and landing pages, custom multi-step forms, sliders and multilingual content types.",
    year: 2025,
    hue: 350,
    featured: true,
    image: "/work/tyroler.png",
    link: "https://tyroler.co.il/",
    body: [
      "Full-stack developer across a set of WordPress / WooCommerce sites (Tyroler, EWP, ESTA Center, Cannabiz and Factory Candles), making changes to product pages, archive pages, checkout and landing pages to match each brand’s requirements.",
      "Built custom sliders and multi-step, interrelated forms, created custom post types, and added meta boxes with language-specific fields so content could be managed per language. Work spanned theme and plugin code with jQuery, Bootstrap and CSS3.",
    ],
  },
  {
    slug: "creatiosoft-service-pages",
    title: "Responsive PHP service pages with lead-capture forms",
    client: "Creatiosoft",
    category: "Web development",
    summary:
      "Five new responsive service pages on a core PHP site — HTML/CSS/Bootstrap/JS with custom PHP forms, international phone input and email lead capture.",
    year: 2025,
    hue: 40,
    featured: true,
    image: "/work/creatiosoft.png",
    link: "https://creatiosoft.com/poker-game-development",
    body: [
      "Built five new responsive service pages on Creatiosoft’s core PHP site using HTML, CSS, Bootstrap and JavaScript, each with smooth animations to lift the UX.",
      "Every page carries a custom PHP form with email integration and international phone input via the intl-tel-input plugin, so submissions are captured and routed as leads. Pages covered poker-game-development, white-label-poker-software, poker-software-for-sale, hire-poker-game-software-developer and the Texas Hold’em landing page.",
    ],
  },
  {
    slug: "ai-chat-assist-plugin",
    title: "AI Chat Assist — a WordPress chatbot plugin",
    client: "AI Chat Assist",
    category: "WordPress plugin",
    summary:
      "A published WordPress plugin that drops an AI chatbot onto any site — validate an API key in the admin, and it injects the chatbot script and UI automatically.",
    year: 2024,
    hue: 265,
    featured: true,
    image: "/work/ai-chat-assist.png",
    link: "https://wordpress.org/plugins/ai-chat-assist/",
    body: [
      "A WordPress plugin, published on the wordpress.org plugin directory, that integrates the AI Chatbot Assist service into any site. Admins enter and validate their API key from a settings screen in the WordPress admin, through the AIChatAssist API.",
      "Once the key is confirmed valid, the plugin automatically injects the chatbot script and UI elements into the site, giving visitors an interactive, AI-powered assistant with no manual markup. Built with PHP and jQuery.",
    ],
  },

  {
    slug: "nexus-clinic-wordpress",
    title: "Landing pages, blogs and new pages for an aesthetic clinic",
    client: "Nexus Clinic",
    category: "WordPress / Web development",
    summary:
      "New pages, treatment landing pages and blog posts for a doctor-led aesthetic clinic in Kuala Lumpur — built and maintained on WordPress.",
    year: 2026,
    hue: 155,
    featured: true,
    image: "/work/nexus-clinic.png",
    link: "https://www.nexus-clinic.com/",
    body: [
      "Built and maintained pages for Nexus Clinic, a doctor-led aesthetic clinic in Kuala Lumpur offering skin, hair and medical weight-loss treatments. Work included new site pages and dedicated treatment landing pages designed to convert consultation bookings, all on WordPress.",
      "Also handled the blog — publishing and formatting posts across the clinic’s treatment areas — and kept the wider site (treatment menus, gallery, doctors and FAQ sections) current as the clinic’s offering grew.",
    ],
  },
  {
    slug: "launch-laundry",
    title: "A full website for a commercial laundry supplier",
    client: "Launch Laundry",
    category: "WordPress / Web development",
    summary:
      "Designed and built the complete website for a Malaysian commercial-laundry supplier — equipment catalogue, setup and consultancy services, and a growth-focused content structure.",
    year: 2026,
    hue: 265,
    featured: true,
    image: "/work/launch-laundry.png",
    link: "https://launchlaundry.com.my/",
    body: [
      "Designed and built the entire website for Launch Laundry, a Malaysian supplier of commercial washers, dryers, ironers and spare parts. The site presents their equipment range (LaundryMate, WALES and industrial series) alongside their setup and support services.",
      "Beyond the catalogue, the site is structured around helping people start and scale a laundromat business — consultancy, finance advisory, branding and growth ‘Strategy Lab’ services — with a blog and spare-parts sections, all built to bring in and convert new laundry-business leads.",
    ],
  },
  {
    slug: "100x-brokerage-trading-platform",
    title: "A Laravel trading platform for crypto, stocks and forex",
    client: "100x Brokerage",
    category: "Backend / Full-stack development",
    summary:
      "A full-stack Laravel trading website — deposits and withdrawals, real-time trading across crypto, indices, stocks, futures and forex, and an automated trading bot, all driven by API integration.",
    year: 2024,
    hue: 205,
    featured: true,
    image: "/work/100x-brokerage.png",
    body: [
      "Developed a trading website with Laravel, handling both the frontend and the backend. The platform supported trading across cryptocurrency, indices, stocks, futures and forex, with assets managed dynamically through API integration.",
      "It included deposit and withdrawal systems, real-time trading, and an automated trading bot for hands-off strategies. I built the user authentication, data management and API integration behind it, along with a clean interface for smooth navigation and interaction.",
    ],
  },
  {
    slug: "ebodyboarding-shopify-revamp",
    title: "Shopify store revamp for a bodyboarding retailer",
    client: "eBodyboarding.com",
    category: "Shopify · E-commerce",
    summary:
      "Front-end customisation, backend integrations and e-commerce optimisation for a bodyboarding superstore — including a product-finder quiz, size charts and a rewards program.",
    year: 2024,
    hue: 190,
    featured: true,
    image: "/work/ebodyboarding.png",
    link: "https://www.ebodyboarding.com/",
    body: [
      "Revamped eBodyboarding.com, a Shopify store offering bodyboarding gear and accessories — boards, wetsuits, apparel and swimfins — for water-sports enthusiasts. As Shopify developer I handled front-end customisation, backend integrations and e-commerce optimisation.",
      "The store features an interactive quiz that helps shoppers find the right board, along with size charts and buyer guides, a rewards program, responsive design and secure checkout — a smooth shopping experience for the San Clemente, California retailer.",
    ],
  },

  {
    slug: "klnk-tv",
    title: "A streaming-style platform frontend, design to production",
    client: "KLNK.tv",
    category: "Web development",
    summary:
      "A streaming-style platform frontend built from Lovable designs — multiple pages, reusable components, API integration and responsive, production-ready UI.",
    year: 2026,
    hue: 155,
    image: "/work/klnk.png",
    link: "https://klnk.tv/",
    body: [
      "Built the KLNK.tv frontend from scratch based on the provided Lovable designs, recreating the UI to the approved design across multiple pages and reusable components.",
      "Integrated the required APIs (including DMO bundle APIs and public booking features), connected frontend functionality to the backend, and worked extensively on responsive design — fixing UI and functional issues to make the site production-ready and consistent across devices. Built with Next.js, React and TypeScript.",
    ],
  },
  {
    slug: "tourpublish",
    title: "A tour-publishing app with social integrations",
    client: "TourPublish",
    category: "Web development",
    summary:
      "Frontend for a tour-publishing platform — dashboard UI, booking flows, animations and multiple social-media/API integrations across DMO, Operator and Traveller workflows.",
    year: 2026,
    hue: 5,
    image: "/work/tourpublish.png",
    link: "https://app.tourpublish.com/",
    body: [
      "Developed and implemented multiple pages across the TourPublish application — dashboard UI, booking flows and animations — integrating APIs and backend-driven functionality on the frontend across DMO, Operator and Traveller workflows.",
      "Worked extensively on social-media integrations and publishing flows for connecting and posting content to different platforms, redesigned several existing pages and flows, and made the app fully responsive — collaborating with the backend team to integrate and troubleshoot. Built with Next.js, React and TypeScript.",
    ],
  },
  {
    slug: "venovox",
    title: "A multilingual corporate site built from scratch",
    client: "Venovox",
    category: "Web development",
    summary:
      "A corporate website built from scratch with multilingual support, an SEO-focused structure and full mobile responsiveness.",
    year: 2026,
    hue: 210,
    image: "/work/venovox.png",
    link: "https://venovox.com/",
    body: [
      "Built the Venovox website from scratch — new pages and sections, an SEO-focused structure and a clean frontend experience.",
      "Implemented multilingual support so the site can serve multiple languages, and made the complete site mobile-responsive while improving overall usability and structure.",
    ],
  },
  {
    slug: "furnishings",
    title: "A flooring & furnishings store built from scratch",
    client: "Furnishings",
    category: "Web development",
    summary:
      "A complete website built from scratch for a Malaysian flooring & furnishings brand — SEO-focused pages, fully responsive across every device.",
    year: 2026,
    hue: 32,
    image: "/work/furnishings.png",
    link: "https://furnishings.com.my/",
    body: [
      "Built the Furnishings website from scratch — the frontend, overall structure and UI for a Malaysian vinyl-flooring and carpet brand.",
      "Developed individual pages with an SEO-focused approach and made every major page fully responsive across desktop, tablet and mobile, with a clean, scalable structure for future content and SEO growth.",
    ],
  },
  {
    slug: "pistil",
    title: "Product pages and an API-driven frontend for Pistil",
    client: "Pistil",
    category: "Web development",
    summary:
      "New product-focused pages with the required API integrations wired into the frontend, plus responsive layouts and UI improvements.",
    year: 2026,
    hue: 135,
    image: "/work/pistil.png",
    link: "https://pistil.io/",
    body: [
      "Developed new pages for Pistil, including product-focused pages, working primarily on the frontend implementation and UI.",
      "Integrated the required APIs with the frontend and implemented the product information and related functionality, with responsive layouts throughout.",
    ],
  },
  {
    slug: "daiki-media",
    title: "New pages and SEO for a media agency site",
    client: "Daiki Media",
    category: "Web development",
    summary:
      "New pages and sections for a media agency’s site, with meta/SEO optimisation, a cleaner structure and improved responsiveness.",
    year: 2026,
    hue: 22,
    image: "/work/daiki-media.png",
    link: "https://www.daikimedia.com/",
    body: [
      "Built new pages and sections for Daiki Media’s website and improved the overall UI, structuring the site around its project requirements.",
      "Optimised meta titles and descriptions across the site and made on-page, structural SEO improvements, while tightening the responsiveness and overall user experience.",
    ],
  },
  {
    slug: "gulf-ticket",
    title: "UI and UX refresh for a ticketing website",
    client: "Gulf Ticket",
    category: "Web development",
    summary:
      "A UI/UX refresh across a ticketing site — redesigned pages, improved frontend layout and better responsiveness across screen sizes.",
    year: 2026,
    hue: 48,
    image: "/work/gulf-ticket.png",
    link: "https://gulfticket.com/",
    body: [
      "Improved the overall UI and user experience of the Gulf Ticket website, redesigning and refining multiple existing pages.",
      "Worked on the frontend layout and visual improvements, and tightened responsiveness and usability across different screen sizes.",
    ],
  },
  {
    slug: "shaanvi-tours",
    title: "A travel website with a working contact flow",
    client: "Shaanvi Tours",
    category: "Web development",
    summary:
      "A travel website built to spec — main pages and frontend UI, a fixed and working contact form, and responsive behaviour across devices.",
    year: 2026,
    hue: 190,
    image: "/work/shaanvi-tours.png",
    link: "https://shaanvitours.com/",
    body: [
      "Developed the Shaanvi Tours travel website to the project’s requirements — the main pages and the frontend UI, built with Next.js, React and TypeScript.",
      "Implemented the contact-form functionality and fixed submission issues, and improved the site’s responsive behaviour and overall presentation.",
    ],
  },
  {
    slug: "habebe-lounge",
    title: "A responsive frontend for a lounge brand",
    client: "Habebe Lounge",
    category: "Web development",
    summary:
      "Frontend development and a responsive UI for a lounge brand — reusable components and site features built with Next.js, React and TypeScript.",
    year: 2026,
    hue: 300,
    image: "/work/habebe-lounge.png",
    link: "https://www.habebeelounge.com.my/",
    body: [
      "Built the frontend and a responsive UI for Habebe Lounge, implementing reusable components and the site’s features with Next.js, React and TypeScript.",
    ],
  },
  {
    slug: "silent-aces",
    title: "A poker-platform website in WordPress and core PHP",
    client: "Silent Aces",
    category: "WordPress / Web development",
    summary:
      "Built the Silent Aces site from the ground up — a WordPress and core-PHP build for a US online-poker platform, with the blog running on WordPress.",
    year: 2026,
    hue: 205,
    featured: true,
    image: "/work/silent-aces.png",
    link: "https://silentaces.com/",
    body: [
      "Built the Silent Aces website from the starting point — a mixed WordPress and core-PHP build for a US-focused online-poker platform. The marketing pages present the poker software and its ‘launch faster’ positioning across web and mobile.",
      "The blog runs on WordPress so the team can publish and manage articles themselves, while the core site pages are handled in PHP.",
    ],
  },
  {
    slug: "gretrix-lending-platform",
    title: "Automating a business-lending platform end to end",
    client: "Gretrix",
    category: "Web development",
    summary:
      "A two-application business-lending platform — an applicant funnel and a document-and-underwriting engine — that carries a business owner from first click to lender submission automatically.",
    year: 2026,
    hue: 210,
    featured: true,
    image: "/work/gretrix.png",
    link: "https://www.lendzi.com/",
    body: [
      "Worked across a two-application business-lending platform — an applicant-facing funnel (SSP, Laravel 5 / PHP 5.6) and a document-and-underwriting engine (Middleman, Laravel 10) — that takes a business owner from application to funded deal automatically.",
      "On the funnel side I built and hardened the multi-step application flow: first-touch attribution tracking, dynamic revenue-band and ‘how did you hear about us’ questions, auto-advancing V4 funnel steps, an existing-customer login/resume path, and re-entry guards that stop funded customers from accidentally resetting their deal.",
      "On the processing side I built the pipeline that parses uploaded bank statements, runs credit checks, and runs a ‘waterfall’ that matches each applicant to the right lenders and submits to their APIs — with per-lender connectors (Fundbox, PEAC, Rapid Finance, OnDeck, Idea Financial and more), Plaid asset-report ingestion, and timeout/duplicate-submission safeguards.",
      "Everything syncs to Zoho CRM as the central data store, with auto-conversion of partner leads and automatic renewal records for returning funded customers — a resilient, mostly hands-off funnel that carries an applicant from first click to lender submission without manual intervention.",
    ],
  },
  {
    slug: "sydney-props-rental-integration",
    title: "Connecting a hire store to live rental inventory",
    client: "Sydney Props",
    category: "WordPress / E-commerce",
    summary:
      "An event prop-hire store rebuilt on WooCommerce and integrated live with a rental management system for real-time availability, quotes and bookings — plus bot-driven downtime fixed.",
    year: 2026,
    hue: 25,
    featured: true,
    image: "/work/sydney-props.png",
    link: "https://sydneyprops.com.au/",
    body: [
      "Rebuilt an event prop-hire company’s online store on WordPress + WooCommerce and integrated it live with their rental management system (VibeRent) over a REST API — real-time stock availability, quote requests, and booking creation that reserves stock and returns a payment link.",
      "Also diagnosed and fixed recurring crawler-driven downtime using Cloudflare bot mitigation and server-level (.htaccess) hardening, restoring the site’s stability and speed.",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
