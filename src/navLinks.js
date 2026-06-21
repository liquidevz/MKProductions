import BLOG_POSTS from "./blogPosts.json";
import { SERVICES } from "./servicesData";

// Shared top-nav configuration used by every page.
// `href` on a top-level link makes it a real navigation target (path route);
// `sublinks` render as a hover dropdown.
export const NAV_LINKS = [
  { title: "Home", href: "/" },
  {
    title: "Services",
    href: "/services",
    // Each service opens its own detail page.
    sublinks: SERVICES.map((service) => ({
      title: service.title,
      href: `/services/${service.slug}`,
    })),
  },
  {
    title: "Portfolio",
    href: "/portfolio",
    // Each project jumps straight to its chapter on the portfolio page.
    sublinks: [
      { title: "Expeditions", href: "/portfolio/expeditions" },
      { title: "Automotive", href: "/portfolio/automotive" },
      { title: "Cinematography", href: "/portfolio/cinematography" },
    ],
  },
  {
    title: "Blog",
    href: "/blog",
    // Built from the blog JSON so the dropdown stays in sync with the posts.
    sublinks: BLOG_POSTS.map((post) => ({
      title: post.navLabel,
      href: `/blog/${post.id}`,
    })),
  },
];
