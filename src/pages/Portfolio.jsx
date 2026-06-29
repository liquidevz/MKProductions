import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FiFilm, FiSmartphone } from "react-icons/fi";
import RoundedDrawerNav from "../components/RoundedDrawerNav";
import VideoParallaxContent from "../components/VideoParallaxContent";
import ShortsFeed from "../components/ShortsFeed";
import { NAV_LINKS } from "../navLinks";
import PORTFOLIO from "../portfolioVideos.json";

const TABS = [
  { key: "videos", label: "Videos", Icon: FiFilm },
  { key: "shorts", label: "Shorts", Icon: FiSmartphone },
];

const CHAPTERS = PORTFOLIO.chapters; // [{ slug, label }]
const CHAPTER_SLUGS = CHAPTERS.map((c) => c.slug);
// "All" + the three chapters.
const CATEGORY_OPTIONS = [{ slug: "all", label: "All" }, ...CHAPTERS];

// `chapterId` comes from /portfolio/<param> — a chapter slug pins the filter,
// "videos"/"shorts" pins the tab.
const Portfolio = ({ chapterId }) => {
  const getIsMobile = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [tab, setTab] = useState(() => {
    if (chapterId === "videos" || chapterId === "shorts") return chapterId;
    return getIsMobile() ? "shorts" : "videos";
  });
  const [category, setCategory] = useState(() =>
    CHAPTER_SLUGS.includes(chapterId) ? chapterId : "all"
  );

  // Keep `isMobile` in sync; only flip the default tab on a breakpoint change
  // when the URL hasn't pinned a tab.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => {
      setIsMobile(e.matches);
      if (chapterId !== "videos" && chapterId !== "shorts") {
        setTab(e.matches ? "shorts" : "videos");
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [chapterId]);

  // Follow the URL: a chapter slug sets the filter; videos/shorts sets the tab.
  useEffect(() => {
    if (chapterId === "videos" || chapterId === "shorts") setTab(chapterId);
    else if (CHAPTER_SLUGS.includes(chapterId)) setCategory(chapterId);
  }, [chapterId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab, category]);

  // Lock background scroll while the full-screen mobile shorts overlay is open.
  useEffect(() => {
    if (!(isMobile && tab === "shorts")) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobile, tab]);

  const filterByCategory = (list) =>
    category === "all"
      ? list
      : list.filter((item) => item.categorySlug === category);

  const videos = filterByCategory(PORTFOLIO.videos);
  const shorts = filterByCategory(PORTFOLIO.shorts);

  return (
    <div className="bg-steel-700">
      <RoundedDrawerNav
        links={NAV_LINKS}
        navBackground="bg-steel-700"
        bodyBackground="bg-white"
        clipBody={false}
      >
        {/* Header + tabs + chapter filter */}
        <section className="rounded-t-3xl bg-white text-steel-900">
          <div className="mx-auto w-full max-w-container-max px-margin-mobile pb-8 pt-14 md:px-margin-desktop md:pb-10 md:pt-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end md:gap-12">
              <div>
                <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                  Selected Work
                </p>
                <h1 className="font-display text-6xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                  <span className="block">Our</span>
                  <span className="block font-medium normal-case italic text-steel-500">
                    Portfolio<span className="text-brand-dark">.</span>
                  </span>
                </h1>
              </div>
              <div className="md:pb-3">
                <p className="mb-6 max-w-md text-base leading-relaxed text-steel-600">
                  A scroll through the stories we've shaped — expeditions,
                  automotive campaigns and industrial films, each playing as you
                  scroll. Pick a discipline and switch between films and shorts.
                </p>
                {/* Videos / Shorts tab switch */}
                <div className="inline-flex rounded-full bg-steel-100 p-1">
                  {TABS.map(({ key, label, Icon }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTab(key)}
                      className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
                        tab === key
                          ? "text-steel-900"
                          : "text-steel-500 hover:text-steel-700"
                      }`}
                    >
                      {tab === key && (
                        <motion.span
                          layoutId="portfolio-tab"
                          className="absolute inset-0 rounded-full bg-brand"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 32,
                          }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon className="text-sm" />
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chapter filter pills */}
            <nav className="mt-8 flex flex-wrap gap-3">
              {CATEGORY_OPTIONS.map((opt, index) => {
                const isActive = category === opt.slug;
                return (
                  <button
                    key={opt.slug}
                    type="button"
                    onClick={() => setCategory(opt.slug)}
                    className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
                      isActive
                        ? "border-steel-900 bg-steel-900 text-white"
                        : "border-steel-200 text-steel-700 hover:border-steel-900"
                    }`}
                  >
                    <span
                      className={
                        isActive ? "text-brand" : "text-brand-dark"
                      }
                    >
                      {opt.slug === "all"
                        ? "★"
                        : String(index).padStart(2, "0")}
                    </span>
                    {opt.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </section>

        {/* Active tab (desktop shorts inline; mobile shorts overlay is a
            sibling below so `fixed` covers the whole screen) */}
        {tab === "videos" && <VideoParallaxContent videos={videos} />}
        {tab === "shorts" && !isMobile && (
          <ShortsFeed shorts={shorts} isMobile={false} />
        )}
      </RoundedDrawerNav>

      {/* Mobile shorts — full-screen overlay */}
      {tab === "shorts" && isMobile && (
        <ShortsFeed
          shorts={shorts}
          isMobile
          tab={tab}
          setTab={setTab}
          chapters={CATEGORY_OPTIONS}
          category={category}
          setCategory={setCategory}
        />
      )}
    </div>
  );
};

export default Portfolio;
