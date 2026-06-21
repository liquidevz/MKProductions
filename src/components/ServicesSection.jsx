import { motion } from "motion/react";
import { FiCamera, FiVideo, FiSliders, FiPlay, FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { TbDrone } from "react-icons/tb";

const SERVICES = [
  {
    title: "Photography",
    slug: "photography",
    Icon: FiCamera,
    descriptor: "Editorial • Product • Portrait",
    // md layout: 4 of 12 cols (left narrow card)
    mdSpan: "md:col-span-4",
    darkPanel: false,
    videoUrl: "https://example.com/mk-productions/reels/photography",
    poster:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Cinematography",
    slug: "cinematography",
    Icon: FiVideo,
    descriptor: "Films • Commercials • Brand",
    mdSpan: "md:col-span-8",
    darkPanel: true,
    videoUrl: "https://example.com/mk-productions/reels/cinematography",
    poster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Aerial Cinematography",
    slug: "aerial-cinematography",
    Icon: TbDrone,
    descriptor: "FPV • Drone • Establishing",
    mdSpan: "md:col-span-8",
    darkPanel: true,
    videoUrl: "https://example.com/mk-productions/reels/aerial",
    poster:
      "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Post Production",
    slug: "post-production",
    Icon: FiSliders,
    descriptor: "Edit • Color • Sound",
    mdSpan: "md:col-span-4",
    darkPanel: false,
    videoUrl: "https://example.com/mk-productions/reels/post-production",
    poster:
      "https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=1200&auto=format&fit=crop",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="scroll-mt-6 bg-white text-steel-900">
      <div className="mx-auto max-w-container-max px-margin-mobile py-20 md:px-margin-desktop md:py-28">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
              <span className="inline-block h-2 w-2 rounded-full bg-brand" />
              What We Do
            </p>
            <h2 className="max-w-xl font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight md:text-6xl">
              Everything we shoot,
              <span className="font-medium normal-case italic text-steel-400">
                {" "}start to finish
              </span>
            </h2>
          </div>
          <motion.a
            href="/services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shrink-0 whitespace-nowrap rounded-full bg-steel-900 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl transition-colors hover:bg-steel-800"
          >
            All Services
          </motion.a>
        </div>

        {/* Cards grid — full-width on mobile, asymmetric 12-col on desktop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.975 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl bg-steel-100 sm:col-span-1 ${service.mdSpan}`}
    >
      {/* Clickable header area */}
      <a
        href={`/services/${service.slug}`}
        className="relative z-10 flex flex-col items-center p-7 pb-4"
      >
        <div className="flex items-center gap-3">
          <service.Icon className="text-2xl text-brand-dark" />
          <h3 className="font-display text-xl font-bold uppercase tracking-tight text-steel-900 md:text-2xl lg:text-3xl">
            {service.title}
          </h3>
        </div>
        <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-steel-400">
          {service.descriptor}
        </p>
      </a>

      {/* Image panel — slides up on hover */}
      <div
        className={`relative mx-3 mb-3 flex-1 translate-y-6 overflow-hidden rounded-xl transition-transform duration-300 group-hover:translate-y-2 ${
          service.darkPanel ? "bg-steel-900" : "bg-brand"
        }`}
      >
        {/* Actual <img> — reliable cross-browser image display */}
        <img
          src={service.poster}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-luminosity"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Play button */}
        <a
          href={service.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/vid absolute inset-0 flex flex-col items-center justify-end p-5"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-steel-900 shadow-lg transition-transform duration-200 group-hover/vid:scale-110">
            <FiPlay className="ml-0.5 text-lg" />
          </span>
          <span
            className={`mt-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] ${
              service.darkPanel ? "text-brand" : "text-steel-900"
            }`}
          >
            Watch reel
            <FiArrowUpRight className="text-sm" />
          </span>
        </a>
      </div>

      {/* Explore link — visible on hover */}
      <a
        href={`/services/${service.slug}`}
        className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-center gap-2 bg-steel-900 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      >
        Explore {service.title}
        <FiArrowRight className="text-sm" />
      </a>
    </motion.div>
  );
};

export default ServicesSection;
