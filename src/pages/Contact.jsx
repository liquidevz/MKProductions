import { useEffect } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";
import { SiBehance } from "react-icons/si";
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

const SOCIALS = [
  {
    Icon: FiInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/mk__productions/",
  },
  {
    Icon: FiFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/milind.kale.128917/",
  },
  {
    Icon: SiBehance,
    label: "Behance",
    href: "https://www.behance.net/milindkale",
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
          {/* Header — matches Services / Blog */}
          <div className="mx-auto w-full max-w-container-max px-margin-mobile pb-10 pt-14 md:px-margin-desktop md:pb-14 md:pt-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-end md:gap-12">
              <div>
                <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                  Get In Touch
                </p>
                <h1 className="font-display text-6xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                  <span className="block">Let's</span>
                  <span className="block font-medium normal-case italic text-steel-500">
                    make something<span className="text-brand-dark">.</span>
                  </span>
                </h1>
              </div>
              <div className="md:pb-3">
                <p className="max-w-md text-base leading-relaxed text-steel-600">
                  Tell us about the shoot — expedition, campaign or film. We'll
                  get back within one business day with availability and a
                  tailored quote.
                </p>
              </div>
            </div>
          </div>

          {/* Info panel + form */}
          <div className="mx-auto w-full max-w-container-max px-margin-mobile pb-20 md:px-margin-desktop md:pb-28">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-stretch">
              {/* Left — contact info panel */}
              <div className="relative flex flex-col overflow-hidden rounded-3xl bg-steel-950 p-8 text-white md:p-10">
                {/* Brand glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand/15 blur-3xl" />

                <div className="relative">
                  <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand">
                    <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                    Direct Line
                  </p>
                  <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.0] tracking-tight md:text-4xl">
                    Reach us
                    <span className="font-medium normal-case italic text-steel-400">
                      {" "}directly.
                    </span>
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-steel-300">
                    Prefer to skip the form? We're a quick message away — pick
                    whichever channel suits you.
                  </p>
                </div>

                {/* Details */}
                <div className="relative mt-8 space-y-3 border-t border-white/10 pt-8">
                  {DETAILS.map(({ Icon, label, value, href }) => {
                    const content = (
                      <>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/8 text-base text-brand ring-1 ring-white/10">
                          <Icon />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-steel-500">
                            {label}
                          </span>
                          <span className="text-base font-semibold text-steel-100">
                            {value}
                          </span>
                        </span>
                      </>
                    );

                    return href ? (
                      <a
                        key={label}
                        href={href}
                        className="flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-white/5"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={label} className="flex items-center gap-4 p-2">
                        {content}
                      </div>
                    );
                  })}
                </div>

                {/* Socials — pinned to the bottom */}
                <div className="relative mt-auto pt-10">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-steel-500">
                    Follow the work
                  </p>
                  <div className="flex gap-3">
                    {SOCIALS.map(({ Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-base text-steel-200 ring-1 ring-white/10 transition-colors hover:bg-brand hover:text-steel-900"
                      >
                        <Icon />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — brand-themed shifting form */}
              <ShiftingContactForm />
            </div>
          </div>
        </section>

        {/* Social links — large flip-link section */}
        <RevealLinks />
      </RoundedDrawerNav>
    </div>
  );
};

export default Contact;
