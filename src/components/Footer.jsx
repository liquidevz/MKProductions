import {
  FiArrowUpRight,
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
  FiYoutube,
} from "react-icons/fi";
import Logo from "./Logo";
import { NAV_LINKS } from "../navLinks";
import { SERVICES } from "../servicesData";

const CONTACT = [
  {
    Icon: FiMail,
    value: "hello@mkproductions.studio",
    href: "mailto:hello@mkproductions.studio",
  },
  { Icon: FiPhone, value: "+1 (555) 024 8190", href: "tel:+15550248190" },
  { Icon: FiMapPin, value: "Unit 4, Frame Works, Brooklyn NY", href: null },
];

const SOCIALS = [
  { Icon: FiInstagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: FiTwitter, label: "Twitter", href: "https://twitter.com" },
  { Icon: FiLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { Icon: FiYoutube, label: "YouTube", href: "https://youtube.com" },
];

// Mirrors the navbar: a rounded panel inside the same steel frame. Rendered
// once by RoundedDrawerNav, so it appears on every page automatically.
const Footer = () => {
  const navColumn = NAV_LINKS.map((l) => ({ title: l.title, href: l.href }));

  return (
    <footer className="mt-2 overflow-hidden rounded-3xl bg-steel-900 text-white">
      {/* CTA band */}
      <div className="flex flex-col gap-7 border-b border-white/10 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-12 md:py-14">
        <div>
          <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand">
            <span className="inline-block h-2 w-2 rounded-full bg-brand" />
            Start a Project
          </p>
          <h2 className="max-w-xl font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-tight md:text-6xl">
            Let's make
            <span className="font-medium normal-case italic text-steel-400">
              {" "}something.
            </span>
          </h2>
        </div>
        <a
          href="/contact"
          className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-brand px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-steel-900 transition-colors hover:bg-brand-dark"
        >
          Get in touch
          <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Link columns */}
      <div className="grid grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 md:px-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel-300">
            A photography and cinematography studio turning moments into stories —
            shot, directed and finished in-house.
          </p>
        </div>

        {/* Navigate */}
        <FooterColumn title="Navigate">
          {navColumn.map((l) => (
            <FooterLink key={l.title} href={l.href}>
              {l.title}
            </FooterLink>
          ))}
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterColumn>

        {/* Services */}
        <FooterColumn title="Services">
          {SERVICES.map((s) => (
            <FooterLink key={s.slug} href={`/services/${s.slug}`}>
              {s.title}
            </FooterLink>
          ))}
        </FooterColumn>

        {/* Get in touch */}
        <FooterColumn title="Get In Touch">
          {CONTACT.map(({ Icon, value, href }) => {
            const inner = (
              <span className="flex items-start gap-3 text-sm leading-relaxed text-steel-300">
                <Icon className="mt-0.5 shrink-0 text-base text-brand" />
                {value}
              </span>
            );
            return href ? (
              <a
                key={value}
                href={href}
                className="block transition-colors hover:text-white"
              >
                {inner}
              </a>
            ) : (
              <div key={value}>{inner}</div>
            );
          })}

          {/* Socials */}
          <div className="flex gap-3 pt-2">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-base text-steel-200 ring-1 ring-white/10 transition-colors hover:bg-brand hover:text-steel-900"
              >
                <Icon />
              </a>
            ))}
          </div>
        </FooterColumn>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-6 text-xs text-steel-400 sm:flex-row sm:items-center sm:justify-between md:px-12">
        <p>© {new Date().getFullYear()} MK Productions. All rights reserved.</p>
        <p className="font-bold uppercase tracking-[0.2em] text-steel-300">
          Photography <span className="text-brand">|</span> Cinematography
        </p>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, children }) => (
  <div>
    <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-steel-500">
      {title}
    </h3>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="group flex w-fit items-center gap-1.5 text-sm font-medium text-steel-200 transition-colors hover:text-brand"
  >
    {children}
    <FiArrowUpRight className="text-xs opacity-0 transition-opacity group-hover:opacity-100" />
  </a>
);

export default Footer;
