export const site = {
  name: "Cloveode Technologies",
  shortName: "Cloveode",
  url: "https://cloveode.com",
  tagline: "Software, built beautifully.",
  description:
    "Cloveode Technologies designs and engineers websites, online stores, blockchain systems and custom software for companies that want to move fast and last long.",
  email: "info@cloveode.com",
  // Address, phone and hours must match the Google Business Profile exactly.
  phone: { display: "+91 86288 92998", tel: "+918628892998" },
  hours: { label: "Monday to Friday, 10am to 7pm", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "19:00" },
  location: {
    street: "Near Housing Board Colony, Sanyardh",
    city: "Mandi",
    region: "Himachal Pradesh",
    country: "India",
    postalCode: "175001",
    geo: { latitude: 31.698904, longitude: 76.927881 },
    /** the Google Business Profile listing */
    mapsUrl: "https://maps.google.com/?cid=16142725884854262008",
  },
  founded: 2023,
  social: {
    linkedin: "https://www.linkedin.com/company/cloveode-technologies",
    instagram: "https://www.instagram.com/cloveode.tech/",
    facebook: "https://www.facebook.com/p/Cloveode-Technologies-61553006534162/",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  figures: {
    yearsExperience: 12,
    projects: 60,
    clients: 35,
  },
} as const;
