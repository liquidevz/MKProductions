import { motion } from "motion/react";

const DURATION = 0.25;
const STAGGER = 0.025;

const SOCIALS = [
  { label: "Behance", href: "https://www.behance.net/milindkale" },
  { label: "Instagram", href: "https://www.instagram.com/mk__productions/" },
  { label: "Facebook", href: "https://www.facebook.com/milind.kale.128917/" },
];

export const RevealLinks = () => {
  return (
    <section className="grid place-content-center gap-2 bg-steel-900 px-8 py-24 text-white md:py-32">
      {SOCIALS.map((social) => (
        <FlipLink key={social.label} href={social.href}>
          {social.label}
        </FlipLink>
      ))}
    </section>
  );
};

const FlipLink = ({ children, href }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block overflow-hidden whitespace-nowrap font-display text-4xl font-extrabold uppercase leading-none sm:text-7xl md:text-8xl lg:text-9xl"
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
