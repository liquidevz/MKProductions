import { motion } from "motion/react";
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

const TOP_BRANDS = [
  { Icon: SiNike, name: "Nike" },
  { Icon: Si3M, name: "3M" },
  { Icon: SiSony, name: "Sony" },
  { Icon: SiNikon, name: "Nikon" },
  { Icon: SiRedbull, name: "Red Bull" },
  { Icon: SiAdidas, name: "Adidas" },
  { Icon: SiPuma, name: "Puma" },
  { Icon: SiBurton, name: "Burton" },
  { Icon: SiNetflix, name: "Netflix" },
  { Icon: SiShell, name: "Shell" },
];

const BOTTOM_BRANDS = [
  { Icon: SiBmw, name: "BMW" },
  { Icon: SiAudi, name: "Audi" },
  { Icon: SiPorsche, name: "Porsche" },
  { Icon: SiFerrari, name: "Ferrari" },
  { Icon: SiToyota, name: "Toyota" },
  { Icon: SiHonda, name: "Honda" },
  { Icon: SiSuzuki, name: "Suzuki" },
  { Icon: SiTata, name: "Tata" },
  { Icon: SiMahindra, name: "Mahindra" },
  { Icon: SiEpicgames, name: "Epic Games" },
];

const RibbonLogos = ({
  eyebrow = "Trusted Collaborations",
  title = "Brands We Have",
  titleAccent = "Worked With",
  topBrands = TOP_BRANDS,
  bottomBrands = BOTTOM_BRANDS,
}) => {
  return (
    <section className="overflow-hidden bg-brand py-24 md:py-32">
      <div className="mx-auto mb-16 max-w-container-max px-margin-mobile text-center md:px-margin-desktop">
        <p className="mb-4 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-steel-800">
          <span className="inline-block h-2 w-2 rounded-full bg-steel-900" />
          {eyebrow}
        </p>
        <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-steel-900 md:text-6xl">
          {title}{" "}
          <span className="bg-steel-900 px-2 font-normal italic text-brand md:px-3">
            {titleAccent}
          </span>
        </h2>
      </div>

      {/* White ribbon */}
      <div className="flex translate-y-[50%] rotate-[7deg] scale-110 overflow-hidden border-y-4 border-steel-900 bg-white">
        <TranslateWrapper>
          <LogoItems brands={topBrands} variant="white" />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItems brands={topBrands} variant="white" />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItems brands={topBrands} variant="white" />
        </TranslateWrapper>
      </div>

      {/* Gray ribbon */}
      <div className="flex -translate-y-[50%] -rotate-[7deg] scale-110 overflow-hidden border-y-4 border-white bg-steel-900">
        <TranslateWrapper reverse>
          <LogoItems brands={bottomBrands} variant="gray" />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItems brands={bottomBrands} variant="gray" />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItems brands={bottomBrands} variant="gray" />
        </TranslateWrapper>
      </div>
    </section>
  );
};

const TranslateWrapper = ({ children, reverse }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="flex px-2"
    >
      {children}
    </motion.div>
  );
};

const LogoItem = ({ Icon, name, variant }) => {
  const styles =
    variant === "white"
      ? "text-steel-900 hover:bg-steel-100"
      : "text-steel-300 hover:bg-steel-800 hover:text-brand";

  return (
    <a
      href="/"
      rel="nofollow"
      target="_blank"
      className={`flex items-center justify-center gap-4 px-4 py-4 transition-colors md:py-6 ${styles}`}
    >
      <Icon className="text-3xl md:text-4xl" />
      <span className="whitespace-nowrap text-2xl font-bold uppercase md:text-3xl">
        {name}
      </span>
    </a>
  );
};

const LogoItems = ({ brands, variant }) => (
  <>
    {brands.map((b) => (
      <LogoItem key={b.name} Icon={b.Icon} name={b.name} variant={variant} />
    ))}
  </>
);

export default RibbonLogos;
