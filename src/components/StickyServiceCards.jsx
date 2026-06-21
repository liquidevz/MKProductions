import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { FiArrowDown } from "react-icons/fi";

// Full-bleed cards that pin to the top and peel away as you scroll. Each deck
// opens with a distinct intro/title card, then its items. Two `variant`s give
// the decks separate colour identities so "What's included" and "Our process"
// read as clearly different sections:
//   • capabilities → vivid (alternating brand-yellow / near-black), icon-led
//   • process      → moody  (alternating near-black / steel-grey),  number-led
//
// NOTE: relies on `position: sticky`, which breaks inside an `overflow-hidden`
// ancestor — the host page must render RoundedDrawerNav with `clipBody={false}`.
const CARD_HEIGHT = 600;

const VARIANTS = {
  capabilities: {
    intro: "bg-steel-950 text-white",
    introEyebrow: "text-brand",
    introDot: "bg-brand",
    introCopy: "text-steel-300",
    // Item backgrounds cycle for peel readability.
    items: [
      {
        bg: "bg-brand text-steel-900",
        dot: "bg-steel-900",
        iconBg: "bg-steel-900 text-brand",
        copy: "text-steel-800",
      },
      {
        bg: "bg-steel-950 text-white",
        dot: "bg-brand",
        iconBg: "bg-brand text-steel-900",
        copy: "text-steel-300",
      },
    ],
  },
  process: {
    intro: "bg-brand text-steel-900",
    introEyebrow: "text-steel-900",
    introDot: "bg-steel-900",
    introCopy: "text-steel-800",
    items: [
      {
        bg: "bg-steel-950 text-white",
        dot: "bg-brand",
        numColor: "text-brand",
        copy: "text-steel-300",
      },
      {
        bg: "bg-steel-800 text-white",
        dot: "bg-brand",
        numColor: "text-brand",
        copy: "text-steel-300",
      },
    ],
  },
};

const StickyServiceCards = ({ variant = "capabilities", intro, cards = [] }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const theme = VARIANTS[variant] || VARIANTS.capabilities;
  const deck = [{ isIntro: true }, ...cards];

  return (
    <div ref={ref} className="relative">
      {deck.map((card, idx) => (
        <Card
          key={card.isIntro ? "intro" : `${card.title}-${idx}`}
          card={card}
          theme={theme}
          intro={intro}
          itemIndex={idx} // 0 = intro, 1..N = items
          itemCount={cards.length}
          scrollYProgress={scrollYProgress}
          position={idx + 1}
          total={deck.length}
        />
      ))}
    </div>
  );
};

const Card = ({
  position,
  total,
  card,
  theme,
  intro,
  itemIndex,
  itemCount,
  scrollYProgress,
}) => {
  const startPct = (position - 1) / total;
  const y = useTransform(scrollYProgress, [startPct, 1], [0, -CARD_HEIGHT]);

  const style = {
    height: CARD_HEIGHT,
    y: position === total ? undefined : y,
  };

  // ---- Intro / title card ----
  if (card.isIntro) {
    return (
      <motion.div
        style={style}
        className={`sticky top-0 w-full origin-top overflow-hidden ${theme.intro}`}
      >
        <div className="mx-auto flex h-full w-full max-w-container-max flex-col justify-center px-margin-mobile py-12 md:px-margin-desktop md:py-16">
          <p
            className={`mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] ${theme.introEyebrow}`}
          >
            <span className={`inline-block h-2 w-2 rounded-full ${theme.introDot}`} />
            {intro?.eyebrow}
          </p>
          <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-8xl">
            {intro?.title}
          </h2>
          {intro?.copy && (
            <p className={`mt-6 max-w-xl text-base leading-relaxed md:text-lg ${theme.introCopy}`}>
              {intro.copy}
            </p>
          )}
          <p className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] opacity-70">
            <FiArrowDown className="animate-bounce" />
            {String(itemCount).padStart(2, "0")} {intro?.unit || "cards"}
          </p>
        </div>
      </motion.div>
    );
  }

  // ---- Item card ----
  const palette = theme.items[(itemIndex - 1) % theme.items.length];
  const Icon = card.Icon;
  const num = String(itemIndex).padStart(2, "0");

  return (
    <motion.div
      style={style}
      className={`sticky top-0 w-full origin-top overflow-hidden ${palette.bg}`}
    >
      <div className="mx-auto flex h-full w-full max-w-container-max flex-col justify-between px-margin-mobile py-12 md:px-margin-desktop md:py-16">
        {/* Top row — kicker + index */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em]">
            <span className={`inline-block h-2 w-2 rounded-full ${palette.dot}`} />
            {card.kicker}
          </span>
          <span className="font-display text-sm font-bold tracking-[0.2em]">
            {num}
            <span className="opacity-40"> / {String(itemCount).padStart(2, "0")}</span>
          </span>
        </div>

        {/* Bottom — icon/number + title + copy */}
        <div className="max-w-3xl">
          {Icon ? (
            <span
              className={`mb-7 flex h-16 w-16 items-center justify-center rounded-full text-3xl ${palette.iconBg}`}
            >
              <Icon />
            </span>
          ) : (
            <span
              className={`mb-4 block font-display text-7xl font-extrabold leading-none md:text-9xl ${palette.numColor}`}
            >
              {num}
            </span>
          )}
          <h3 className="font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-tight md:text-6xl lg:text-7xl">
            {card.title}
          </h3>
          <p className={`mt-5 max-w-xl text-base leading-relaxed md:text-lg ${palette.copy}`}>
            {card.copy}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StickyServiceCards;
