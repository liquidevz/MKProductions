// Shared top-nav configuration used by every page.
// `href` on a top-level link makes it a real navigation target (hash route);
// links without one act purely as hover triggers for their sublinks.
export const NAV_LINKS = [
  {
    title: "Work",
    sublinks: [
      { title: "Expedition", href: "#" },
      { title: "Automotive", href: "#" },
      { title: "Industrial", href: "#" },
      { title: "Cinematography", href: "#" },
    ],
  },
  {
    title: "Portfolio",
    href: "#/portfolio",
    sublinks: [
      { title: "Expeditions", href: "#/portfolio?expeditions" },
      { title: "Automotive", href: "#/portfolio?automotive" },
      { title: "Cinematography", href: "#/portfolio?cinematography" },
    ],
  },
  {
    title: "About",
    sublinks: [
      { title: "The Studio", href: "#" },
      { title: "Our Story", href: "#" },
    ],
  },
  {
    title: "Services",
    sublinks: [
      { title: "Photo Sessions", href: "#" },
      { title: "Commercial Shoots", href: "#" },
      { title: "Film Production", href: "#" },
    ],
  },
  {
    title: "Journal",
    sublinks: [
      { title: "Blog", href: "#" },
      { title: "Behind the Scenes", href: "#" },
      { title: "Socials", href: "#" },
    ],
  },
];
