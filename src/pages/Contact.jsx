import { useEffect } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import RoundedDrawerNav from "../components/RoundedDrawerNav";
import ShiftingContactForm from "../components/ShiftingContactForm";
import RevealLinks from "../components/RevealLinks";
import { NAV_LINKS } from "../navLinks";

const DETAILS = [
  {
    Icon: FiMail,
    label: "Email",
    value: "hello@mkproductions.studio",
    href: "mailto:hello@mkproductions.studio",
  },
  {
    Icon: FiPhone,
    label: "Phone",
    value: "+1 (555) 024 8190",
    href: "tel:+15550248190",
  },
  {
    Icon: FiMapPin,
    label: "Studio",
    value: "Unit 4, Frame Works, Brooklyn NY",
    href: null,
  },
];

const Contact = () => {
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
          <div className="mx-auto w-full max-w-container-max px-margin-mobile py-16 md:px-margin-desktop md:py-24">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-6">
              {/* Left — dark card matching form height */}
              <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-steel-950 p-8 text-white md:p-10">
                {/* Brand glow */}
                <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -right-12 h-48 w-48 rounded-full bg-brand/8 blur-3xl" />

                {/* Top — label + heading + sub */}
                <div className="relative">
                  <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand">
                    <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                    Get In Touch
                  </p>
                  <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                    <span className="block text-white">Let's</span>
                    <span className="block font-medium normal-case italic text-steel-400">
                      make something<span className="text-brand">.</span>
                    </span>
                  </h1>
                  <p className="mt-7 max-w-md text-base leading-relaxed text-steel-300">
                    Tell us about the shoot — expedition, campaign or film. We'll
                    get back within one business day with availability and a
                    tailored quote.
                  </p>
                </div>

                {/* Middle — decorative brand accent */}
                <div className="relative my-8 flex items-center gap-5">
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="font-display text-6xl font-extrabold leading-none text-brand/20 md:text-7xl">
                    MK
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                {/* Bottom — contact details */}
                <div className="relative space-y-4">
                  {DETAILS.map(({ Icon, label, value, href }) => {
                    const content = (
                      <>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/8 text-base text-brand ring-1 ring-white/10">
                          <Icon />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-steel-500">
                            {label}
                          </span>
                          <span className="text-sm font-semibold text-steel-200">
                            {value}
                          </span>
                        </span>
                      </>
                    );

                    return href ? (
                      <a
                        key={label}
                        href={href}
                        className="flex items-center gap-4 transition-opacity hover:opacity-70"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={label} className="flex items-center gap-4">
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right — brand-themed shifting form */}
              <ShiftingContactForm />
            </div>
          </div>
        </section>

        {/* Social links — plus layout on large screens */}
        <RevealLinks />
      </RoundedDrawerNav>
    </div>
  );
};

export default Contact;
