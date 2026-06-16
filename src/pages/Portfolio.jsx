import RoundedDrawerNav from "../components/RoundedDrawerNav";
import { TextParallaxContentExample } from "../components/TextParallaxContent";
import { NAV_LINKS } from "../navLinks";
import { useScrollToSection } from "../useScrollToSection";

// Section ids here must match the ids rendered by TextParallaxContentExample.
const CHAPTERS = [
  { id: "expeditions", label: "Expeditions" },
  { id: "automotive", label: "Automotive" },
  { id: "cinematography", label: "Cinematography" },
];

const Portfolio = ({ chapterId }) => {
  // /portfolio/<chapter> scrolls straight to that project chapter.
  useScrollToSection(chapterId);

  return (
    <div className="bg-steel-500">
      <RoundedDrawerNav
        links={NAV_LINKS}
        navBackground="bg-steel-500"
        bodyBackground="bg-white"
        clipBody={false}
      >
        {/* Page header — same visual language as the rest of the site */}
        <section className="bg-white text-steel-900">
          <div className="mx-auto w-full max-w-container-max px-margin-mobile pb-10 pt-14 md:px-margin-desktop md:pb-14 md:pt-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-end md:gap-12">
              {/* Left — title block */}
              <div>
                <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                  Selected Work
                </p>
                <h1 className="font-display text-6xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                  <span className="block">Our</span>
                  <span className="block font-medium normal-case italic text-steel-500">
                    Portfolio<span className="text-brand-dark">.</span>
                  </span>
                </h1>
              </div>

              {/* Right — intro copy + jump-to-chapter links */}
              <div className="md:pb-3">
                <p className="max-w-md text-base leading-relaxed text-steel-600">
                  A scroll through the stories we've shaped — expeditions,
                  automotive campaigns and films, each captured with intent.
                  Jump straight to a chapter below.
                </p>
                <nav className="mt-7 flex flex-wrap gap-3">
                  {CHAPTERS.map((chapter, index) => (
                    <a
                      key={chapter.id}
                      href={`/portfolio/${chapter.id}`}
                      className="group flex items-center gap-2 rounded-full border border-steel-200 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-steel-700 transition-colors hover:border-steel-900 hover:bg-steel-900 hover:text-white"
                    >
                      <span className="text-brand-dark transition-colors group-hover:text-brand">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {chapter.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </section>

        <TextParallaxContentExample />
      </RoundedDrawerNav>
    </div>
  );
};

export default Portfolio;
