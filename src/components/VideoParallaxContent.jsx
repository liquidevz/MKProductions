import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FiArrowUpRight, FiYoutube } from "react-icons/fi";
import ScrollAutoplayVideo from "./ScrollAutoplayVideo";

// Grid-based video layout: 2 columns on desktop, 1 on mobile.
// Videos are compact cards with hover effects, reducing scroll height while
// maintaining professional aesthetics.
const VideoParallaxContent = ({ videos = [] }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-container-max px-margin-mobile py-12 md:px-margin-desktop md:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

const VideoCard = ({ video }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "center center"],
  });

  // Subtle scale and fade on scroll
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      id={video.id}
      style={{ opacity, scale }}
      className="flex flex-col overflow-hidden rounded-2xl bg-steel-50 transition-shadow hover:shadow-xl"
    >
      {/* Video Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-steel-950">
        <ScrollAutoplayVideo
          youtubeId={video.youtubeId}
          title={video.title}
          mode="contain"
          aspect="16/9"
          className="absolute inset-0 h-full w-full"
        />
        {/* Subtle gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-steel-950/40 to-transparent" />
        {/* Category badge */}
        <div className="pointer-events-none absolute left-4 top-4">
          <span className="inline-block rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-steel-900">
            {video.category}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col px-5 py-6 md:px-6 md:py-7">
        <h3 className="mb-2 font-display text-lg font-bold uppercase leading-tight tracking-tight text-steel-900 md:text-xl">
          {video.title}
        </h3>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-steel-600">
          {video.description}
        </p>
        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <a
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-steel-900 transition-colors hover:bg-brand-dark sm:flex-none sm:px-5"
          >
            <FiYoutube className="text-base" /> Watch
          </a>
          <a
            href="/contact"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-steel-900 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-steel-800 sm:flex-none sm:px-5"
          >
            Inquire <FiArrowUpRight className="text-base" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoParallaxContent;
