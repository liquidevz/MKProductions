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
    <div className="bg-steel-500">
      <RoundedDrawerNav
        links={NAV_LINKS}
        navBackground="bg-steel-500"
        bodyBackground="bg-white"
      >
        <section className="bg-white text-steel-900">
          <div className="mx-auto w-full max-w-container-max px-margin-mobile py-16 md:px-margin-desktop md:py-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
              {/* Left — intro + contact details */}
              <div>
                <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                  Get In Touch
                </p>
                <h1 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                  <span className="block">Let's</span>
                  <span className="block font-medium normal-case italic text-steel-500">
                    make something<span className="text-brand-dark">.</span>
                  </span>
                </h1>
                <p className="mt-7 max-w-md text-base leading-relaxed text-steel-600">
                  Tell us about the shoot — expedition, campaign or film. We'll
                  get back within one business day with availability and a
                  tailored quote.
                </p>

                <div className="mt-10 space-y-5 border-t border-steel-200 pt-8">
                  {DETAILS.map(({ Icon, label, value, href }) => {
                    const content = (
                      <>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-steel-100 text-lg text-steel-900">
                          <Icon />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-steel-400">
                            {label}
                          </span>
                          <span className="text-base font-semibold text-steel-900">
                            {value}
                          </span>
                        </span>
                      </>
                    );

                    return href ? (
                      <a
                        key={label}
                        href={href}
                        className="group flex items-center gap-4 transition-opacity hover:opacity-70"
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
