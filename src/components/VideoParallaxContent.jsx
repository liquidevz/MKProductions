import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FiArrowUpRight, FiYoutube } from "react-icons/fi";
import ScrollAutoplayVideo from "./ScrollAutoplayVideo";

// One full-bleed 16:9 video per section (uncut — it fills the width at its
// native ratio, so no empty space and no cropping). The title sits over the
// video and fades/lifts as the clip scrolls up, revealing it playing.
const VideoParallaxContent = ({ videos = [] }) => {
  return (
    <div className="bg-white">
      {videos.map((video) => (
        <VideoSection key={video.id} video={video} />
      ))}
    </div>
  );
};

const VideoSection = ({ video }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Title fades + lifts as the video scrolls up toward the centre.
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.9], [1, 0]);
  const textY = useTransform(scrollYProgress, [0.45, 0.9], [0, -60]);
  const veil = useTransform(scrollYProgress, [0.45, 0.9], [0.45, 0]);

  return (
    <>
      <div ref={ref} id={video.id} className="px-2 pt-2">
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-steel-950">
          <ScrollAutoplayVideo
            youtubeId={video.youtubeId}
            title={video.title}
            mode="contain"
            aspect="16/9"
            className="absolute inset-0 h-full w-full"
          />
          {/* Veil for legibility — lifts as you scroll */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-steel-950/70 via-steel-950/20 to-steel-950/50"
            style={{ opacity: veil }}
          />
          {/* Title overlay */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
          >
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-brand md:mb-3 md:text-base">
              {video.category}
            </p>
            <p className="font-display text-2xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-4xl md:text-6xl">
              {video.title}
            </p>
          </motion.div>
        </div>
      </div>
      <VideoInfo video={video} />
    </>
  );
};

const VideoInfo = ({ video }) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 pb-20 pt-6 md:grid-cols-12 md:gap-8">
    <div className="col-span-1 md:col-span-4">
      <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-dark">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
        {video.category}
      </p>
      <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-steel-900 md:text-3xl">
        {video.title}
      </h2>
    </div>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-6 text-base text-steel-600 md:text-lg">{video.description}</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-steel-900 transition-colors hover:bg-brand-dark"
        >
          <FiYoutube className="text-base" /> Watch on YouTube
        </a>
        <a
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-steel-900 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-steel-800"
        >
          Start a project <FiArrowUpRight className="text-base" />
        </a>
      </div>
    </div>
  </div>
);

export default VideoParallaxContent;
