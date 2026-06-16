import { HiOutlineArrowLongRight } from "react-icons/hi2";

import heroImage from "/hero-photographer.png";

const STATS = [
  { value: "8+", label: "Years Experience" },
  { value: "350+", label: "Projects Delivered" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "60+", label: "Brands Worldwide" },
];

const SERVICES = [
  {
    title: "Expedition Photography",
    description:
      "Remote terrain, harsh light, real stories — documented where few cameras go.",
  },
  {
    title: "Automotive Campaigns",
    description:
      "Dynamic rigs, rolling shots and studio work that make machines feel alive.",
  },
  {
    title: "Industrial & Corporate",
    description:
      "Plants, people and processes captured with precision for brands at work.",
  },
  {
    title: "Cinematography",
    description:
      "End-to-end film production — concept, direction, shoot and final grade.",
  },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white text-steel-900">
      <div className="mx-auto w-full max-w-container-max px-margin-mobile pt-14 md:px-margin-desktop md:pt-20">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.15fr_auto_0.55fr] md:gap-8 lg:gap-12">
          {/* Left — intro, headline, copy, CTA */}
          <div className="order-2 flex flex-col items-start md:order-1">
            <p className="mb-5 text-sm font-semibold tracking-wide text-steel-600">
              Hey, we're{" "}
              <span className="font-bold text-steel-900">MK Productions</span>,
            </p>

            <h1 className="font-display text-5xl font-black uppercase leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">Capturing</span>
              <span className="block font-medium normal-case italic text-steel-500">
                &amp; Defining
              </span>
              <span className="block">
                Visions<span className="text-brand-dark">.</span>
              </span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-relaxed text-steel-600">
              Transforming moments into stunning visuals — photography and
              cinematography that captivates, engages, and delivers your story
              with clarity and soul.
            </p>

            <a
              href="/contact"
              className="group mt-9 flex items-center gap-3 rounded-full bg-steel-900 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-steel-800"
            >
              Book a Session
              <span className="flex h-2 w-2 rounded-full bg-brand transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Center — photographer in an upside-down yellow arch. Two aligned
              copies of the cutout: layer A is clipped inside the arch (head
              fills the top); layer B is the same figure unclipped, with its top
              clipped away so only the lower hand + camera spill past the arch
              bottom onto white. Both imgs share identical position/size so they
              line up seamlessly.
              Tuning knobs: img h-[…] = zoom (bigger = figure fills more);
              box h-[…] = where the arch curve cuts; clipPath inset % on layer B
              = how high up the "spill out" starts. */}
          <div className="order-1 -mt-14 flex justify-center md:order-2 md:-mt-20 md:self-start">
            <div className="relative h-[26rem] w-64 sm:h-[32rem] sm:w-80 lg:h-[38rem] lg:w-[22rem]">
              {/* Layer A — figure clipped to the yellow arch */}
              <div className="absolute inset-0 overflow-hidden rounded-b-full bg-brand">
                <img
                  alt="Professional photographer standing with camera equipment"
                  src={heroImage}
                  className="absolute left-1/2 -top-64 -ml-8 h-[72rem] w-auto max-w-none -translate-x-1/2 sm:-top-80 sm:-ml-12 sm:h-[88rem] lg:-top-96 lg:-ml-16 lg:h-[100rem]"
                />
              </div>
              {/* Layer B — same figure, only the camera/hand below the arch */}
              <img
                aria-hidden="true"
                src={heroImage}
                style={{ clipPath: "polygon(0% 0%, 46% 0%, 46% 100%, 0% 100%)" }}
                className="pointer-events-none absolute left-1/2 -top-64 -ml-8 z-10 h-[72rem] w-auto max-w-none -translate-x-1/2 sm:-top-80 sm:-ml-12 sm:h-[88rem] lg:-top-96 lg:-ml-16 lg:h-[100rem]"
              />
            </div>
          </div>

          {/* Right — stats column */}
          <div className="order-3 flex flex-row flex-wrap justify-between gap-6 md:flex-col md:items-end md:gap-0 md:divide-y md:divide-steel-200">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-start gap-1 md:items-end md:py-5 md:first:pt-0 md:last:pb-0"
              >
                <span className="font-display text-3xl font-bold text-steel-900 lg:text-4xl">
                  {stat.value}
                  <span className="text-brand-dark">.</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-steel-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services strip */}
      <div className="mt-10 border-t-2 border-steel-200 bg-steel-100 md:mt-8">
        <div className="mx-auto grid w-full max-w-container-max grid-cols-1 divide-y divide-steel-200 px-margin-mobile sm:grid-cols-2 sm:divide-y-0 md:px-margin-desktop lg:grid-cols-4 lg:divide-x">
          {SERVICES.map((service) => (
            <div key={service.title} className="px-0 py-7 lg:px-7 lg:first:pl-0 lg:last:pr-0">
              <h3 className="mb-2 flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.14em] text-steel-900">
                <span className="h-2 w-2 shrink-0 bg-brand" />
                {service.title}
              </h3>
              <p className="text-xs leading-relaxed text-steel-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
