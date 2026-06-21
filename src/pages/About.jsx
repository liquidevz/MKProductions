import { useEffect } from "react";
import { motion } from "motion/react";
import {
  FiArrowUpRight,
  FiCompass,
  FiAward,
  FiLayers,
  FiHeart,
} from "react-icons/fi";
import RoundedDrawerNav from "../components/RoundedDrawerNav";
import { NAV_LINKS } from "../navLinks";

// Staggered film-strip imagery for the header.
const STRIP = [
  {
    src: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=800&auto=format&fit=crop",
    offset: "sm:mt-0",
  },
  {
    src: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=800&auto=format&fit=crop",
    offset: "sm:mt-10",
  },
  {
    src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
    offset: "sm:mt-0",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop",
    offset: "sm:mt-10",
  },
];

const STATS = [
  { value: "8+", label: "Years Behind the Lens" },
  { value: "350+", label: "Projects Delivered" },
  { value: "60+", label: "Brands Worldwide" },
  { value: "24,000 km", label: "On the Road" },
];

const VALUES = [
  {
    Icon: FiHeart,
    title: "Story First",
    copy: "Gear is a tool. Emotion is the point. Every decision we make serves the story.",
  },
  {
    Icon: FiCompass,
    title: "Earned, Not Staged",
    copy: "We go to the places others won't, and wait for the moments others miss.",
  },
  {
    Icon: FiLayers,
    title: "Finished In-House",
    copy: "From first frame to final grade, the vision stays intact at every step.",
  },
  {
    Icon: FiAward,
    title: "Built to Last",
    copy: "We protect our craft — and our clients' stories — like they're irreplaceable.",
  },
];

const STORY = [
  "MK Productions began with a single camera and an appetite for the road. What started as a way to document our own expeditions grew into a studio trusted by brands to capture the moments that matter most.",
  "Over 24,000 kilometers, six countries and countless freezing sunrises later, our philosophy hasn't changed: show up, stay patient and let the story reveal itself. Whether we're flying a drone over the Tibetan plateau or lighting a product on a studio table, the craft is the same.",
  "Today we shoot, direct, fly and finish every project in-house — a small team obsessed with light, motion and the kind of detail you only notice when it's missing.",
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-steel-700">
      <RoundedDrawerNav
        links={NAV_LINKS}
        navBackground="bg-steel-700"
        bodyBackground="bg-white"
      >
        {/* Header — cinematic dark intro + staggered film strip */}
        <section className="relative overflow-hidden bg-steel-950 text-white">
          {/* Subtle brand glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />

          <div className="relative mx-auto w-full max-w-container-max px-margin-mobile pb-0 pt-14 md:px-margin-desktop md:pt-24">
            <div className="max-w-4xl">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                About MK Productions
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-[7.5rem]"
              >
                We chase
                <span className="block font-medium normal-case italic text-steel-500">
                  the unrepeatable
                </span>
                <span className="block">
                  moment<span className="text-brand">.</span>
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-8 max-w-xl text-base leading-relaxed text-steel-300 md:text-lg"
              >
                A photography and cinematography studio chasing stories across
                the world's most demanding places — and bringing them home as
                images worth remembering.
              </motion.p>
            </div>
          </div>

          {/* Staggered image strip — bleeds into the next section */}
          <div className="relative mx-auto mt-12 w-full max-w-container-max px-margin-mobile md:mt-16 md:px-margin-desktop">
            <div className="grid translate-y-12 grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:translate-y-16">
              {STRIP.map((item, index) => (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.08 }}
                  className={`overflow-hidden rounded-2xl ring-1 ring-white/10 ${item.offset}`}
                >
                  <img
                    src={item.src}
                    alt="MK Productions field work"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
          {/* Spacer for the overlapping strip */}
          <div className="h-24 md:h-28" />
        </section>

        {/* Story */}
        <section className="border-t border-steel-200 bg-white text-steel-900">
          <div className="mx-auto grid w-full max-w-container-max grid-cols-1 gap-10 px-margin-mobile py-16 md:px-margin-desktop md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
                <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                Our Story
              </p>
              <h2 className="max-w-sm font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-4xl">
                From the road
                <span className="font-medium normal-case italic text-steel-400">
                  {" "}to the screen
                </span>
              </h2>
            </div>
            <div className="space-y-5">
              {STORY.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-steel-600 md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-steel-50">
          <div className="mx-auto w-full max-w-container-max px-margin-mobile py-16 md:px-margin-desktop md:py-24">
            <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
              <span className="inline-block h-2 w-2 rounded-full bg-brand" />
              What Drives Us
            </p>
            <h2 className="mb-10 max-w-2xl font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
              How we work
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="group rounded-2xl bg-white p-6 ring-1 ring-steel-200 transition-shadow hover:shadow-xl"
                >
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-steel-900 text-xl text-brand transition-colors group-hover:bg-brand group-hover:text-steel-900">
                    <value.Icon />
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-steel-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-500">
                    {value.copy}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="bg-steel-900 text-white">
          <div className="mx-auto grid w-full max-w-container-max grid-cols-2 gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-16 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl">
                  {stat.value}
                  <span className="text-brand">.</span>
                </p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-steel-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white text-steel-900">
          <div className="mx-auto flex max-w-container-max flex-col items-start justify-between gap-8 px-margin-mobile py-16 md:flex-row md:items-center md:px-margin-desktop md:py-20">
            <h2 className="max-w-2xl font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-5xl">
              Got a story
              <span className="font-medium normal-case italic text-steel-400">
                {" "}worth telling?
              </span>
            </h2>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-steel-900 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-steel-800"
            >
              Work with us <FiArrowUpRight className="text-base" />
            </motion.a>
          </div>
        </section>
      </RoundedDrawerNav>
    </div>
  );
};

export default About;
