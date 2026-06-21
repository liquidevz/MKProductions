import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { useState } from "react";
import {
  SiNike,
  Si3M,
  SiSony,
  SiNikon,
  SiRedbull,
  SiAdidas,
  SiPuma,
  SiBurton,
  SiNetflix,
  SiShell,
  SiBmw,
  SiAudi,
  SiPorsche,
  SiFerrari,
  SiToyota,
  SiHonda,
  SiSuzuki,
  SiTata,
  SiMahindra,
  SiEpicgames,
} from "react-icons/si";
import { useMeasure } from "../useMeasure";

const LOGOS = [
  { id: "nike", name: "Nike", Icon: SiNike, brandColor: "#000000" },
  { id: "3m", name: "3M", Icon: Si3M, brandColor: "#ff0000" },
  { id: "sony", name: "Sony", Icon: SiSony, brandColor: "#0070d1" },
  { id: "nikon", name: "Nikon", Icon: SiNikon, brandColor: "#f7c600" },
  { id: "redbull", name: "Red Bull", Icon: SiRedbull, brandColor: "#cc1e4a" },
  { id: "adidas", name: "Adidas", Icon: SiAdidas, brandColor: "#000000" },
  { id: "puma", name: "Puma", Icon: SiPuma, brandColor: "#e31b23" },
  { id: "burton", name: "Burton", Icon: SiBurton, brandColor: "#111827" },
  { id: "netflix", name: "Netflix", Icon: SiNetflix, brandColor: "#e50914" },
  { id: "shell", name: "Shell", Icon: SiShell, brandColor: "#dd1d21" },
  { id: "bmw", name: "BMW", Icon: SiBmw, brandColor: "#1c69d3" },
  { id: "audi", name: "Audi", Icon: SiAudi, brandColor: "#bb0a14" },
  { id: "porsche", name: "Porsche", Icon: SiPorsche, brandColor: "#9c1b1c" },
  { id: "ferrari", name: "Ferrari", Icon: SiFerrari, brandColor: "#cc0000" },
  { id: "toyota", name: "Toyota", Icon: SiToyota, brandColor: "#eb0a1e" },
  { id: "honda", name: "Honda", Icon: SiHonda, brandColor: "#cc0000" },
  { id: "suzuki", name: "Suzuki", Icon: SiSuzuki, brandColor: "#1f4e9a" },
  { id: "tata", name: "Tata", Icon: SiTata, brandColor: "#003265" },
  { id: "mahindra", name: "Mahindra", Icon: SiMahindra, brandColor: "#dc143c" },
  { id: "epicgames", name: "Epic Games", Icon: SiEpicgames, brandColor: "#313131" },
];

const SCROLL_SPEED = 56;

const RibbonLogos = () => {
  return (
    <section className="overflow-hidden bg-white text-steel-900">
      <div className="px-4">
        <div className="mx-auto max-w-7xl border-x border-steel-200" />
      </div>

      <div className="px-4">
        <div className="mx-auto max-w-7xl border-x border-steel-200 py-10 md:py-14">
          <p className="mb-8 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
            <span className="inline-block h-2 w-2 rounded-full bg-brand" />
            Trusted Collaborations
          </p>
          <HoverGreyscaleLogoCarousel />
        </div>
      </div>

      <div className="px-4">
        <div className="mx-auto max-w-7xl border-x border-steel-200" />
      </div>
    </section>
  );
};

const HoverGreyscaleLogoCarousel = () => {
  const [hoveredLogo, setHoveredLogo] = useState(null);
  const [measureRef, { width }] = useMeasure();
  const x = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (hoveredLogo || !width) return;
    const next = x.get() - (delta / 1000) * SCROLL_SPEED;
    x.set(next <= -width ? next + width : next);
  });

  return (
    <div className="border-y border-steel-200">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden bg-white"
      >
        <div className="overflow-hidden">
          <motion.div style={{ x }} className="flex w-max">
            <div ref={measureRef} className="flex">
              {LOGOS.map((logo) => (
                <LogoCell
                  key={`primary-${logo.id}`}
                  hoveredLogo={hoveredLogo}
                  logo={logo}
                  setHoveredLogo={setHoveredLogo}
                />
              ))}
            </div>
            <div className="flex">
              {LOGOS.map((logo) => (
                <LogoCell
                  key={`duplicate-${logo.id}`}
                  hoveredLogo={hoveredLogo}
                  logo={logo}
                  setHoveredLogo={setHoveredLogo}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const LogoCell = ({ hoveredLogo, logo, setHoveredLogo }) => {
  const isDimmed = hoveredLogo !== null && hoveredLogo !== logo.id;

  return (
    <motion.button
      type="button"
      onPointerEnter={() => setHoveredLogo(logo.id)}
      onPointerLeave={() =>
        setHoveredLogo((current) => (current === logo.id ? null : current))
      }
      onFocus={() => setHoveredLogo(logo.id)}
      onBlur={() =>
        setHoveredLogo((current) => (current === logo.id ? null : current))
      }
      animate={{
        filter: isDimmed ? "grayscale(1)" : "grayscale(0)",
        opacity: isDimmed ? 0.4 : 1,
      }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex h-[72px] min-w-[148px] items-center justify-center px-5 md:h-[82px] md:min-w-[176px] md:px-7"
      aria-label={logo.name}
    >
      <div
        className="flex items-center gap-3 whitespace-nowrap transition-transform duration-200"
        style={{ color: logo.brandColor }}
      >
        <logo.Icon className="text-[1.15rem] md:text-[1.3rem]" />
        <span className="text-[1rem] font-semibold tracking-[-0.04em] md:text-[1.35rem]">
          {logo.name}
        </span>
      </div>
    </motion.button>
  );
};

export default RibbonLogos;
