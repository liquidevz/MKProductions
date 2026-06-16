import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiMenu } from "react-icons/fi";
import Logo from "./Logo";

const RoundedDrawerNav = ({
  children,
  navBackground = "bg-steel-500",
  bodyBackground = "bg-white",
  links = [],
  // `position: sticky` breaks inside an `overflow-hidden` ancestor, so pages
  // with sticky/parallax content can opt out of the clipped rounded body.
  clipBody = true,
}) => {
  const [hovered, setHovered] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeSublinks = useMemo(() => {
    if (!hovered) return [];
    const link = links.find((l) => l.title === hovered);

    return link ? link.sublinks : [];
  }, [hovered, links]);

  return (
    <>
      <nav
        onMouseLeave={() => setHovered(null)}
        className={`${navBackground} px-4 py-4 md:px-6`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <Logo />
            <DesktopLinks
              links={links}
              setHovered={setHovered}
              hovered={hovered}
              activeSublinks={activeSublinks}
            />
          </div>
          <a
            href="#contact"
            className="hidden rounded-md bg-brand px-6 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-steel-900 transition-colors hover:bg-brand-dark md:block"
          >
            Contact
          </a>
          <button
            onClick={() => setMobileNavOpen((pv) => !pv)}
            aria-label="Toggle navigation menu"
            className="mt-1 block rounded-md p-2 text-2xl text-white transition-colors hover:bg-white/10 md:hidden"
          >
            <FiMenu />
          </button>
        </div>
        <MobileLinks links={links} open={mobileNavOpen} />
      </nav>
      <motion.main layout className={`${navBackground} px-2 pb-2`}>
        <div
          className={`${bodyBackground} rounded-3xl ${
            clipBody ? "overflow-hidden" : ""
          }`}
        >
          {children}
        </div>
      </motion.main>
    </>
  );
};

const DesktopLinks = ({ links, setHovered, hovered, activeSublinks }) => {
  return (
    <div className="ml-12 mt-3 hidden md:block">
      <div className="flex gap-8">
        {links.map((l) => (
          <TopLink
            key={l.title}
            setHovered={setHovered}
            title={l.title}
            href={l.href}
            active={hovered === l.title}
          >
            {l.title}
          </TopLink>
        ))}
      </div>
      <AnimatePresence mode="popLayout">
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 py-6"
          >
            {activeSublinks.map((l) => (
              <a
                className="block font-display text-3xl font-semibold uppercase tracking-tight text-white transition-colors hover:text-brand"
                href={l.href}
                key={l.title}
              >
                {l.title}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileLinks = ({ links, open }) => {
  return (
    <AnimatePresence mode="popLayout">
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-2 gap-6 py-6 md:hidden"
        >
          {links.map((l) => {
            return (
              <div key={l.title} className="space-y-1.5">
                {l.href ? (
                  <a
                    href={l.href}
                    className="block text-xs font-bold uppercase tracking-[0.2em] text-brand transition-colors hover:text-brand-light"
                  >
                    {l.title}
                  </a>
                ) : (
                  <span className="block text-xs font-bold uppercase tracking-[0.2em] text-brand">
                    {l.title}
                  </span>
                )}
                {l.sublinks.map((sl) => (
                  <a
                    className="text-md block py-1 font-semibold text-steel-100 transition-colors hover:text-white"
                    href={sl.href}
                    key={sl.title}
                  >
                    {sl.title}
                  </a>
                ))}
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TopLink = ({ children, setHovered, title, href, active }) => {
  const className = `cursor-pointer border-b-2 pb-1 text-sm font-bold uppercase tracking-[0.18em] transition-colors ${
    active
      ? "border-brand text-white"
      : "border-transparent text-steel-100 hover:text-white"
  }`;

  if (href) {
    return (
      <a
        href={href}
        onMouseEnter={() => setHovered(title)}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <span onMouseEnter={() => setHovered(title)} className={className}>
      {children}
    </span>
  );
};

export default RoundedDrawerNav;
