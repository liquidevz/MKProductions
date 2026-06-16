import { motion } from "motion/react";

const DURATION = 0.25;
const STAGGER = 0.025;

const SOCIALS = [
  // Positioned to form a plus/cross on md+ screens.
  { label: "Twitter", href: "https://twitter.com", place: "md:col-start-2 md:row-start-1" },
  { label: "Linkedin", href: "https://linkedin.com", place: "md:col-start-1 md:row-start-2" },
  { label: "Facebook", href: "https://facebook.com", place: "md:col-start-3 md:row-start-2" },
  { label: "Instagram", href: "https://instagram.com", place: "md:col-start-2 md:row-start-3" },
];

export const RevealLinks = () => {
  return (
    <section className="bg-steel-900 px-margin-mobile py-28 text-white md:px-margin-desktop md:py-40">
      <div className="mx-auto max-w-container-max">
        <p className="mb-12 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand md:mb-20">
          <span className="inline-block h-2 w-2 rounded-full bg-brand" />
          Follow Along
        </p>

        <div className="grid grid-cols-1 place-items-center gap-1 md:grid-cols-3 md:gap-x-2 md:gap-y-1">
          {SOCIALS.map((social) => (
            <FlipLink key={social.label} href={social.href} className={social.place}>
              {social.label}
            </FlipLink>
          ))}
        </div>
      </div>
    </section>
  );
};

const FlipLink = ({ children, href, className = "" }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block overflow-hidden whitespace-nowrap font-display text-4xl font-black uppercase leading-none sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${className}`}
      style={{ lineHeight: 0.75 }}
    >
      {/* Resting copy (white) */}
      <div>
        {children.split("").map((letter, i) => (
          <motion.span
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
            transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
            className="inline-block"
            key={i}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      {/* Revealed copy (brand yellow) */}
      <div className="absolute inset-0 text-brand">
        {children.split("").map((letter, i) => (
          <motion.span
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
            transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
            className="inline-block"
            key={i}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export default RevealLinks;
