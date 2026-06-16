import { motion } from "motion/react";
import { FiCamera, FiVideo, FiSliders, FiPlay, FiArrowUpRight } from "react-icons/fi";
import { TbDrone } from "react-icons/tb";

const SERVICES = [
  {
    title: "Photography",
    Icon: FiCamera,
    descriptor: "Editorial • Product • Portrait",
    span: "md:col-span-4",
    panel: "bg-gradient-to-br from-brand to-brand-deep",
    text: "text-steel-900",
    // Dummy reel link — swap for the real video when available.
    videoUrl: "https://example.com/mk-productions/reels/photography",
    poster:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Cinematography",
    Icon: FiVideo,
    descriptor: "Films • Commercials • Brand",
    span: "md:col-span-8",
    panel: "bg-gradient-to-br from-steel-700 to-steel-950",
    text: "text-brand",
    videoUrl: "https://example.com/mk-productions/reels/cinematography",
    poster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Aerial Cinematography",
    Icon: TbDrone,
    descriptor: "FPV • Drone • Establishing",
    span: "md:col-span-8",
    panel: "bg-gradient-to-br from-steel-800 to-steel-950",
    text: "text-brand",
    videoUrl: "https://example.com/mk-productions/reels/aerial",
    poster:
      "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Post Production",
    Icon: FiSliders,
    descriptor: "Edit • Color • Sound",
    span: "md:col-span-4",
    panel: "bg-gradient-to-br from-brand-light to-brand-dark",
    text: "text-steel-900",
    videoUrl: "https://example.com/mk-productions/reels/post-production",
    poster:
      "https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=1200&auto=format&fit=crop",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="scroll-mt-6 bg-white text-steel-900">
      <div className="mx-auto max-w-container-max px-margin-mobile py-20 md:px-margin-desktop md:py-28">
        <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
              <span className="inline-block h-2 w-2 rounded-full bg-brand" />
              What We Do
            </p>
            <h2 className="max-w-xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl">
              Everything we shoot,
              <span className="font-medium normal-case italic text-steel-400">
                {" "}
                start to finish
              </span>
            </h2>
          </div>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="whitespace-nowrap rounded-full bg-steel-900 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl transition-colors hover:bg-steel-800"
          >
            Learn More
          </motion.a>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {SERVICES.map((service) => (
            <BounceCard key={service.title} className={service.span}>
              <div className="flex items-center justify-center gap-3">
                <service.Icon className="text-3xl text-brand-dark" />
                <CardTitle>{service.title}</CardTitle>
              </div>
              <p className="mx-auto mt-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-steel-400">
                {service.descriptor}
              </p>

              <div
                className={`absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl p-5 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] ${service.panel}`}
              >
                <VideoDisplay service={service} />
              </div>
            </BounceCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const VideoDisplay = ({ service }) => {
  return (
    <a
      href={service.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group/vid block"
    >
      <div
        className="relative aspect-video w-full overflow-hidden rounded-xl ring-1 ring-white/25"
        style={{
          backgroundImage: `url(${service.poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30 transition-colors group-hover/vid:bg-black/15" />
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-steel-900 shadow-lg transition-transform group-hover/vid:scale-110">
          <FiPlay className="ml-0.5 text-xl" />
        </span>
      </div>
      <span
        className={`mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold ${service.text}`}
      >
        Watch the {service.title} reel
        <FiArrowUpRight className="text-base" />
      </span>
    </a>
  );
};

const BounceCard = ({ className, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[340px] cursor-pointer overflow-hidden rounded-2xl bg-steel-100 p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }) => {
  return (
    <h3 className="text-center font-display text-2xl font-bold uppercase tracking-tight text-steel-900 md:text-3xl">
      {children}
    </h3>
  );
};

export default ServicesSection;
