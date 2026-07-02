import { FiYoutube } from "react-icons/fi";
import ScrollAutoplayVideo from "./ScrollAutoplayVideo";

// Vertical (9:16) shorts.
//  • Mobile  → full-screen sections in the normal page flow (the portfolio
//    header sits above; scroll down to reach the shorts, each plays as it
//    comes into view — same model as the videos page).
//  • Desktop → 9:16 cards with their info alongside, alternating sides.
const ShortsFeed = ({ shorts = [], isMobile }) => {
  if (isMobile) {
    // A snap-scroll feed: one short fills the screen, scrolling snaps to the
    // next (YouTube-shorts style). Lives inline after the portfolio header,
    // so the header is still visible above it.
    return (
      <div className="h-[100dvh] snap-y snap-mandatory overflow-y-auto overscroll-y-contain bg-steel-950">
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
              threshold={0.55}
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
