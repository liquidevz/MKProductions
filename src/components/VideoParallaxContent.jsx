import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FiArrowUpRight, FiYoutube } from "react-icons/fi";
import ScrollAutoplayVideo from "./ScrollAutoplayVideo";

// A pinned, full-frame (16:9, uncut) video per section. The title sits over the
// video and lifts + fades as you scroll, revealing the clip playing. The video
// autoplays muted once on screen.
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
    offset: ["start start", "end end"],
  });

  // Title lifts + fades early; the dark veil clears; the video eases back.
  const textY = useTransform(scrollYProgress, [0.05, 0.3], [0, -160]);
  const textOpacity = useTransform(scrollYProgress, [0.04, 0.12, 0.3], [1, 1, 0]);
  const veil = useTransform(scrollYProgress, [0, 0.3], [0.45, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <>
      <div id={video.id} ref={ref} className="relative h-[150vh]">
        <div className="sticky top-0 flex h-[100svh] items-center px-3 md:px-4">
          <motion.div
            style={{ scale }}
            className="relative mx-auto aspect-video w-full max-w-container-max overflow-hidden rounded-3xl bg-steel-950"
          >
            <ScrollAutoplayVideo
              youtubeId={video.youtubeId}
              title={video.title}
              mode="contain"
              aspect="16/9"
              className="absolute inset-0 h-full w-full"
            />
            {/* Veil for title legibility — lifts as you scroll */}
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-steel-950/70 via-steel-950/30 to-steel-950/50"
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
              <p className="font-display text-3xl font-extrabold uppercase leading-[1.02] tracking-tight md:text-6xl">
                {video.title}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <VideoInfo video={video} />
    </>
  );
};

const VideoInfo = ({ video }) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-4 md:grid-cols-12">
    <div className="col-span-1 md:col-span-4">
      <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-dark">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
        {video.category}
      </p>
      <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-steel-900">
        {video.title}
      </h2>
    </div>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-6 text-lg text-steel-600 md:text-xl">{video.description}</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-steel-900 transition-colors hover:bg-brand-dark"
        >
          <FiYoutube className="text-base" /> Watch on YouTube
        </a>
        <a
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-steel-900 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-steel-800"
        >
          Start a project <FiArrowUpRight className="text-base" />
        </a>
      </div>
    </div>
  </div>
);

export default VideoParallaxContent;
