import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiMenu } from "react-icons/fi";
import Logo from "./Logo";
import Footer from "./Footer";

// A top link is active when the current path matches its href — exactly for
// "/", or as a prefix for nested routes (e.g. /portfolio/automotive → Portfolio).
const isActiveRoute = (href, pathname) => {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
};

const RoundedDrawerNav = ({
  children,
  navBackground = "bg-steel-700",
  bodyBackground = "bg-white",
  links = [],
  // `position: sticky` breaks inside an `overflow-hidden` ancestor, so pages
  // with sticky/parallax content can opt out of the clipped rounded body.
  clipBody = true,
}) => {
  const [hovered, setHovered] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Pointer over the nav — never hide it while the user is interacting with it.
  const navHoverRef = useRef(false);

  // Hide the nav on scroll-down, reveal it on scroll-up. Never hide while the
  // mobile menu is open, the pointer is over the nav, or near the top.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (mobileNavOpen || navHoverRef.current || y < 80) {
        setHidden(false);
      } else if (y > last + 10) {
        setHidden(true);
      } else if (y < last - 10) {
        setHidden(false);
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileNavOpen]);

  const activeSublinks = useMemo(() => {
    if (!hovered) return [];
    const link = links.find((l) => l.title === hovered);

    return link && link.sublinks ? link.sublinks : [];
  }, [hovered, links]);

  // Which top link the underline sits under: the hovered one, else the link
  // matching the current route.
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const activeTitle =
    links.find((l) => isActiveRoute(l.href, pathname))?.title ?? null;
  const indicator = hovered ?? activeTitle;

  return (
    <>
      <nav
        onMouseEnter={() => {
          navHoverRef.current = true;
        }}
        onMouseLeave={() => {
          navHoverRef.current = false;
          setHovered(null);
        }}
        className={`sticky top-2 z-50 mx-2 mt-2 rounded-2xl transition-transform duration-300 ease-out ${
          hidden ? "-translate-y-[150%]" : "translate-y-0"
        } ${navBackground} px-4 py-4 md:px-6`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <Logo />
            <DesktopLinks
              links={links}
              setHovered={setHovered}
              hovered={hovered}
              activeSublinks={activeSublinks}
              indicator={indicator}
            />
          </div>
          <a
            href="/contact"
            className="hidden rounded-full bg-brand px-7 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-steel-900 transition-colors hover:bg-brand-dark md:block"
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
      <motion.main layout className={`${navBackground} px-2 pb-2 pt-2`}>
        <div
          className={`${bodyBackground} rounded-3xl ${
            clipBody ? "overflow-hidden" : ""
          }`}
        >
          {children}
        </div>
        <Footer />
      </motion.main>
    </>
  );
};

const DesktopLinks = ({ links, setHovered, hovered, activeSublinks, indicator }) => {
  return (
    <div className="ml-12 mt-3 hidden md:block">
      <div className="flex gap-8">
        {links.map((l) => (
          <TopLink
            key={l.title}
            setHovered={setHovered}
            title={l.title}
            href={l.href}
            showIndicator={indicator === l.title}
          >
            {l.title}
          </TopLink>
        ))}
      </div>
      <AnimatePresence mode="popLayout">
        {hovered && activeSublinks.length > 0 && (
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
          className="py-6 md:hidden"
        >
          <div className="grid grid-cols-2 gap-6">
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
                  {l.sublinks?.map((sl) => (
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
          </div>
          <a
            href="/contact"
            className="mt-6 block rounded-full bg-brand px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-steel-900 transition-colors hover:bg-brand-dark"
          >
            Contact
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TopLink = ({ children, setHovered, title, href, showIndicator }) => {
  const className = `relative cursor-pointer pb-2 text-sm font-bold uppercase tracking-[0.18em] transition-colors ${
    showIndicator ? "text-white" : "text-steel-100 hover:text-white"
  }`;

  const inner = (
    <>
      {children}
      {showIndicator && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-0.5 left-0 right-0 h-[3px] rounded-full bg-brand"
          transition={{ type: "spring", stiffness: 450, damping: 35 }}
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onMouseEnter={() => setHovered(title)}
        className={className}
      >
        {inner}
      </a>
    );
  }

  return (
    <span onMouseEnter={() => setHovered(title)} className={className}>
      {inner}
    </span>
  );
};

export default RoundedDrawerNav;
