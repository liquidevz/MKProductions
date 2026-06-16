import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";

const SECTIONS = [
  {
    id: "expeditions",
    subheading: "Expeditions",
    heading: "Where few cameras go.",
    imgUrl:
      "https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop",
    body: {
      heading: "Remote terrain, harsh light, real stories.",
      paragraphs: [
        "From high-altitude ridgelines to expedition base camps, we document where the conditions are unforgiving and the moments are once-in-a-lifetime. Every frame is earned on location.",
        "Self-sufficient kits, weather-sealed bodies and a small footprint let us move fast and stay out of the story while we capture it.",
      ],
    },
  },
  {
    id: "automotive",
    subheading: "Automotive",
    heading: "Machines, made alive.",
    imgUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2564&auto=format&fit=crop",
    body: {
      heading: "Rolling shots, rigs and studio precision.",
      paragraphs: [
        "Dynamic tracking, motion-control rigs and controlled studio lighting come together to make metal feel like it's moving even when it's standing still.",
        "Campaign-ready stills and motion, delivered as one cohesive package for brands that demand the best.",
      ],
    },
  },
  {
    id: "cinematography",
    subheading: "Cinematography",
    heading: "Story, frame by frame.",
    imgUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2670&auto=format&fit=crop",
    body: {
      heading: "Concept, direction, shoot and final grade.",
      paragraphs: [
        "End-to-end film production handled in-house — from the first storyboard to the final colour grade — so the vision stays intact at every step.",
        "Cinematic language, considered pacing and a finishing touch that makes the work unmistakably yours.",
      ],
    },
  },
];

export const TextParallaxContentExample = () => {
  return (
    <div className="bg-white">
      {SECTIONS.map((section) => (
        <TextParallaxContent
          key={section.id}
          id={section.id}
          imgUrl={section.imgUrl}
          subheading={section.subheading}
          heading={section.heading}
        >
          <ExampleContent body={section.body} />
        </TextParallaxContent>
      ))}
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ id, imgUrl, subheading, heading, children }) => {
  return (
    <div
      id={id}
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl uppercase tracking-[0.3em] text-brand md:mb-4 md:text-2xl">
        {subheading}
      </p>
      <p className="text-center font-display text-4xl font-bold md:text-7xl">
        {heading}
      </p>
    </motion.div>
  );
};

const ExampleContent = ({ body }) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 font-display text-3xl font-bold uppercase tracking-tight text-steel-900 md:col-span-4">
      {body.heading}
    </h2>
    <div className="col-span-1 md:col-span-8">
      {body.paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="mb-4 text-lg text-steel-600 md:text-xl"
        >
          {paragraph}
        </p>
      ))}
      <a
        href="/contact"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-steel-900 px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-steel-800 md:w-fit"
      >
        Start a project <FiArrowUpRight className="text-base" />
      </a>
    </div>
  </div>
);
