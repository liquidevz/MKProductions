import { motion } from "motion/react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

// "Who we are" block — an editorial, staggered image cluster paired with a
// typographic copy column and a floating brand stat card. Replaces the old
// arch-portrait layout with something more modern and asymmetric.
const IMG_TALL =
  "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1000&auto=format&fit=crop";
const IMG_WIDE =
  "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=1000&auto=format&fit=crop";

const AboutSection = ({ withCta = true }) => {
  return (
    <section id="about" className="overflow-hidden bg-white text-steel-900">
      <div className="mx-auto max-w-container-max px-margin-mobile py-20 md:px-margin-desktop md:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-5">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
              <span className="inline-block h-2 w-2 rounded-full bg-brand" />
              Who We Are
            </p>
            <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
              The studio
              <span className="font-medium normal-case italic text-steel-500">
                {" "}behind{" "}
              </span>
              the stories<span className="text-brand-dark">.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-steel-600">
              MK Productions is a photography and cinematography studio built on
              a love for the road, the wild and the unrepeatable moment. From
              Himalayan passes to Arctic skies, we go where the story lives.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-steel-600">
              We shoot, direct and finish every frame in-house — bringing the
              same obsession to a brand film as we do to a sunrise at 19,000
              feet.
            </p>

            {withCta && (
              <motion.a
                href="/about"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-steel-900 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-steel-800"
              >
                Read our story
                <HiOutlineArrowLongRight className="text-lg text-brand transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            )}
          </div>

          {/* Staggered image cluster */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {/* Tall image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden rounded-3xl"
              >
                <img
                  src={IMG_TALL}
                  alt="MK Productions on location"
                  className="aspect-[3/4] h-full w-full object-cover"
                />
              </motion.div>

              {/* Right column — pushed down for a staggered feel */}
              <div className="flex flex-col gap-4 pt-10 sm:gap-5 sm:pt-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="overflow-hidden rounded-3xl"
                >
                  <img
                    src={IMG_WIDE}
                    alt="On the road with MK Productions"
                    className="aspect-square w-full object-cover"
                  />
                </motion.div>

                {/* Floating brand stat card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col justify-center rounded-3xl bg-brand p-6 text-steel-900 sm:p-7"
                >
                  <p className="font-display text-4xl font-extrabold leading-none tracking-tight sm:text-5xl">
                    24,000<span className="align-top text-xl">km</span>
                  </p>
                  <p className="mt-2 text-[11px] font-bold uppercase leading-snug tracking-[0.16em] text-steel-900/70">
                    On the road, chasing the light
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
