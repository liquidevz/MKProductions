import { FiFilm, FiSmartphone, FiYoutube } from "react-icons/fi";
import ScrollAutoplayVideo from "./ScrollAutoplayVideo";

// Vertical (9:16) shorts.
//  • Mobile  → a full-screen overlay: each clip fills the whole screen and
//    plays as it snaps into view (a native shorts/reels experience), with a
//    floating tab switch so you can jump back to Videos.
//  • Desktop → 9:16 cards with their info alongside, alternating sides.
const ShortsFeed = ({
  shorts = [],
  isMobile,
  tab,
  setTab,
  chapters = [],
  category,
  setCategory,
}) => {
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[60] h-[100dvh] w-full bg-steel-950">
        {/* Floating tab switch + chapter chips */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-col items-center gap-2 px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div className="pointer-events-auto inline-flex rounded-full bg-steel-950/70 p-1 ring-1 ring-white/15 backdrop-blur">
            {[
              { key: "videos", label: "Videos", Icon: FiFilm },
              { key: "shorts", label: "Shorts", Icon: FiSmartphone },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab?.(key)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                  tab === key
                    ? "bg-brand text-steel-900"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <Icon className="text-sm" />
                {label}
              </button>
            ))}
          </div>
          {chapters.length > 0 && (
            <div className="pointer-events-auto flex flex-wrap justify-center gap-2">
              {chapters.map((opt) => (
                <button
                  key={opt.slug}
                  type="button"
                  onClick={() => setCategory?.(opt.slug)}
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ring-1 backdrop-blur transition-colors ${
                    category === opt.slug
                      ? "bg-brand text-steel-900 ring-brand"
                      : "bg-steel-950/60 text-white/80 ring-white/15 hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Snap feed */}
        <div className="h-full snap-y snap-mandatory overflow-y-auto overscroll-contain">
          {shorts.map((short) => (
            <section
              key={short.id}
              id={short.id}
              className="relative h-[100dvh] w-full snap-start snap-always"
            >
              <ScrollAutoplayVideo
                youtubeId={short.youtubeId}
                title={short.title}
                mode="contain"
                aspect="9/16"
                threshold={0.6}
                className="h-full w-full"
              />
              {/* Info — sits above the control bar */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-steel-950/90 via-steel-950/30 to-transparent px-5 pb-24 pt-16 text-white">
                <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-brand">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                  {short.category}
                </p>
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight">
                  {short.title}
                </h3>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-steel-200">
                  {short.description}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  // Desktop — stacked 9:16 cards with info alongside.
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-container-max space-y-16 px-margin-mobile py-16 md:px-margin-desktop md:py-24">
        {shorts.map((short, index) => {
          const flip = index % 2 === 1;
          return (
            <div
              key={short.id}
              id={short.id}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              {/* Video */}
              <div className={flip ? "md:order-2" : ""}>
                <div className="mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-3xl shadow-xl ring-1 ring-steel-200">
                  <ScrollAutoplayVideo
                    youtubeId={short.youtubeId}
                    title={short.title}
                    mode="contain"
                    aspect="9/16"
                    className="h-full w-full"
                  />
                </div>
              </div>
              {/* Info */}
              <div className={flip ? "md:order-1" : ""}>
                <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                  {short.category}
                </p>
                <h3 className="font-display text-4xl font-extrabold uppercase leading-[1.0] tracking-tight text-steel-900 md:text-5xl">
                  {short.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-steel-600 md:text-lg">
                  {short.description}
                </p>
                <a
                  href={`https://www.youtube.com/shorts/${short.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-steel-900 transition-colors hover:bg-brand-dark"
                >
                  <FiYoutube className="text-base" /> Watch on YouTube
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShortsFeed;
