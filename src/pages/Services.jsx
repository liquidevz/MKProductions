import { useEffect } from "react";
import { motion } from "motion/react";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import RoundedDrawerNav from "../components/RoundedDrawerNav";
import { NAV_LINKS } from "../navLinks";
import { SERVICES } from "../servicesData";

const Services = () => {
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
        <section className="bg-white text-steel-900">
          {/* Header */}
          <div className="mx-auto w-full max-w-container-max px-margin-mobile pb-10 pt-14 md:px-margin-desktop md:pb-14 md:pt-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-end md:gap-12">
              <div>
                <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                  What We Do
                </p>
                <h1 className="font-display text-6xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                  <span className="block">Our</span>
                  <span className="block font-medium normal-case italic text-steel-500">
                    Services<span className="text-brand-dark">.</span>
                  </span>
                </h1>
              </div>
              <div className="md:pb-3">
                <p className="max-w-md text-base leading-relaxed text-steel-600">
                  Four disciplines, one studio. From the first still to the final
                  master, we shape every frame in-house — pick a craft below to
                  see how we work.
                </p>
              </div>
            </div>
          </div>

          {/* Service cards */}
          <div className="mx-auto w-full max-w-container-max px-margin-mobile pb-20 md:px-margin-desktop md:pb-28">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {SERVICES.map((service, index) => (
                <ServiceCard key={service.slug} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-steel-900 text-white">
          <div className="mx-auto flex max-w-container-max flex-col items-start justify-between gap-8 px-margin-mobile py-16 md:flex-row md:items-center md:px-margin-desktop md:py-20">
            <h2 className="max-w-2xl font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-5xl">
              Have a project that needs{" "}
              <span className="text-brand">all of it?</span>
            </h2>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-steel-900 transition-colors hover:bg-brand-dark"
            >
              Start a project <FiArrowUpRight className="text-base" />
            </motion.a>
          </div>
        </section>
      </RoundedDrawerNav>
    </div>
  );
};

const ServiceCard = ({ service, index }) => {
  return (
    <motion.a
      href={`/services/${service.slug}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-3xl bg-steel-900 p-7 text-white md:min-h-[420px] md:p-9"
    >
      {/* Background image */}
      <img
        src={service.heroImage}
        alt={service.title}
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/55 to-steel-950/10" />

      {/* Index + icon */}
      <div className="relative z-10 mb-auto flex items-center justify-between">
        <span className="font-display text-sm font-bold tracking-[0.2em] text-brand">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-brand backdrop-blur-sm ring-1 ring-white/20">
          <service.Icon />
        </span>
      </div>

      {/* Copy */}
      <div className="relative z-10">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-brand">
          {service.descriptor}
        </p>
        <h3 className="font-display text-3xl font-extrabold uppercase leading-[1.02] tracking-tight md:text-4xl">
          {service.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-steel-200">
          {service.summary}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors group-hover:text-brand">
          Explore
          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </motion.a>
  );
};

export default Services;
