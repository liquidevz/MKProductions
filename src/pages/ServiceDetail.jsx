import { useEffect } from "react";
import { motion } from "motion/react";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiPlay,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import RoundedDrawerNav from "../components/RoundedDrawerNav";
import StickyServiceCards from "../components/StickyServiceCards";
import { NAV_LINKS } from "../navLinks";
import { SERVICES, getService } from "../servicesData";

const ServiceDetail = ({ slug }) => {
  const service = getService(slug) || SERVICES[0];
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  // Sticky-card decks for "What's included" and "Our process".
  const capabilityCards = service.capabilities.map((cap) => ({
    Icon: cap.Icon,
    kicker: service.title,
    title: cap.title,
    copy: cap.copy,
  }));
  const processCards = service.process.map((step, index) => ({
    kicker: `Step ${String(index + 1).padStart(2, "0")}`,
    title: step.title,
    copy: step.copy,
  }));

  // Reset scroll whenever the service changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  return (
    <div className="bg-steel-700">
      <RoundedDrawerNav
        links={NAV_LINKS}
        navBackground="bg-steel-700"
        bodyBackground="bg-white"
        clipBody={false}
      >
        <article className="text-steel-900">
          {/* Hero */}
          <header className="relative isolate overflow-hidden rounded-t-3xl">
            <img
              key={service.slug}
              src={service.heroImage}
              alt={service.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/60 to-steel-950/20" />

            <div className="relative mx-auto flex min-h-[60vh] w-full max-w-container-max flex-col px-margin-mobile pb-12 pt-8 sm:min-h-[66vh] md:min-h-[74vh] md:px-margin-desktop md:pb-16">
              <a
                href="/services"
                className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
              >
                <FiArrowLeft /> All services
              </a>

              <div className="mt-auto max-w-4xl">
                <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/20 text-lg text-brand ring-1 ring-brand/40">
                    <service.Icon />
                  </span>
                  {service.tagline}
                </p>
                <h1 className="font-display text-4xl font-extrabold uppercase leading-[1.0] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  {service.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-steel-200 md:text-lg">
                  {service.summary}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-steel-900 transition-colors hover:bg-brand-dark"
                  >
                    Start a project <FiArrowUpRight className="text-base" />
                  </a>
                  <a
                    href={service.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10"
                  >
                    <FiPlay className="text-sm" /> Watch the reel
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Statement + intro + stats */}
          <section className="relative overflow-hidden bg-white">
            <div className="mx-auto w-full max-w-container-max px-margin-mobile py-16 md:px-margin-desktop md:py-24">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-16">
                {/* Statement — black card */}
                <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-steel-950 p-8 text-white md:p-12">
                  {/* Brand glow accents */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand/20 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />

                  <div className="relative">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 text-2xl text-brand ring-1 ring-brand/30">
                        <service.Icon />
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-display text-6xl font-extrabold leading-[0.5] text-brand md:text-7xl"
                      >
                        &ldquo;
                      </span>
                    </div>
                    <h2 className="font-display text-4xl font-extrabold uppercase leading-[1.0] tracking-tight text-white md:text-6xl">
                      {service.statement}
                    </h2>
                  </div>

                  <div className="relative mt-8 flex items-center gap-4">
                    <span className="h-1 w-16 rounded-full bg-brand" />
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-steel-400">
                      {service.tagline}
                    </span>
                  </div>
                </div>
                {/* Intro + stats */}
                <div className="flex flex-col justify-center">
                  <p className="text-base leading-relaxed text-steel-600 md:text-lg">
                    {service.intro}
                  </p>
                  <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
                    {service.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl bg-steel-50 p-4 ring-1 ring-steel-200 sm:p-5"
                      >
                        <p className="font-display text-2xl font-extrabold tracking-tight text-steel-900 sm:text-3xl md:text-4xl">
                          {stat.value}
                          <span className="text-brand">.</span>
                        </p>
                        <p className="mt-1 text-[10px] font-bold uppercase leading-snug tracking-[0.16em] text-steel-400">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Approach — narrative + image */}
          <section className="border-t border-steel-200">
            <div className="mx-auto grid w-full max-w-container-max grid-cols-1 gap-10 px-margin-mobile py-16 md:px-margin-desktop md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className="order-2 lg:order-1">
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src={service.gallery[0]}
                    alt={`${service.title} in practice`}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                  Our Approach
                </p>
                <h2 className="mb-6 max-w-md font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-4xl">
                  How we make it
                </h2>
                <div className="space-y-5">
                  {service.approach.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-relaxed text-steel-600 md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <a
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-steel-900 transition-colors hover:text-brand-dark"
                >
                  Talk to the team
                  <FiArrowRight className="text-brand-dark" />
                </a>
              </div>
            </div>
          </section>

          {/* What's included + Our process — sticky stacking decks */}
          <StickyServiceCards
            variant="capabilities"
            intro={{
              eyebrow: "Capabilities",
              title: "What's included",
              copy: `Everything that ships with a ${service.title.toLowerCase()} engagement — the craft, the coverage and the finish.`,
              unit: "capabilities",
            }}
            cards={capabilityCards}
          />
          <StickyServiceCards
            variant="process"
            intro={{
              eyebrow: "How It Works",
              title: "Our process",
              copy: `From first conversation to final delivery, here's how a ${service.title.toLowerCase()} project comes together.`,
              unit: "steps",
            }}
            cards={processCards}
          />

          {/* Deliverables */}
          <section className="bg-steel-900 text-white">
            <div className="mx-auto grid w-full max-w-container-max grid-cols-1 gap-10 px-margin-mobile py-16 md:px-margin-desktop md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                  Deliverables
                </p>
                <h2 className="max-w-sm font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-4xl">
                  What you'll receive
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-steel-300">
                  Every engagement is delivered complete and ready to use —
                  nothing left half-finished, no surprises at handover.
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-steel-800 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 bg-steel-900 p-5"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-sm text-steel-900">
                      <FiCheck />
                    </span>
                    <span className="text-sm font-medium leading-snug text-steel-100">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Gallery */}
          <section className="mx-auto w-full max-w-container-max px-margin-mobile py-16 md:px-margin-desktop md:py-24">
            <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
              <span className="inline-block h-2 w-2 rounded-full bg-brand" />
              Selected Frames
            </p>
            <h2 className="mb-10 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
              From the {service.title.toLowerCase()} reel
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.4fr_1fr]">
              {/* Feature image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="group h-full overflow-hidden rounded-2xl"
              >
                <img
                  src={service.gallery[0]}
                  alt={`${service.title} 1`}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:aspect-auto sm:h-full"
                />
              </motion.div>
              {/* Two stacked images */}
              <div className="flex flex-col gap-4">
                {service.gallery.slice(1).map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: (i + 1) * 0.08 }}
                    className="group overflow-hidden rounded-2xl"
                  >
                    <img
                      src={src}
                      alt={`${service.title} ${i + 2}`}
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </article>

        {/* Other services */}
        <section className="overflow-hidden rounded-b-3xl bg-steel-900 text-white">
          <div className="mx-auto w-full max-w-container-max px-margin-mobile py-16 md:px-margin-desktop md:py-20">
            <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand">
              <span className="inline-block h-2 w-2 rounded-full bg-brand" />
              Keep Exploring
            </p>
            <h2 className="mb-10 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
              Other services
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {others.map((other) => (
                <a
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl bg-steel-800 p-6 transition-colors hover:bg-steel-700"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-steel-900 text-xl text-brand">
                      <other.Icon />
                    </span>
                    <span className="font-display text-lg font-bold uppercase tracking-tight">
                      {other.title}
                    </span>
                  </div>
                  <FiArrowRight className="shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </RoundedDrawerNav>
    </div>
  );
};

export default ServiceDetail;
