import { useEffect, useRef, useState } from "react";
import {
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiMaximize,
  FiMinimize,
} from "react-icons/fi";

// Lazily loads the YouTube IFrame API once and resolves when it's ready.
let ytApiPromise;
function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.reject();
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === "function") prev();
      resolve(window.YT);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return ytApiPromise;
}

// Cover sizing — scale an iframe of the given aspect to fill + crop a box of
// any aspect (used for full-bleed heroes and full-screen shorts).
const coverStyle = (aspect) => {
  const sixteenNine = aspect === "16/9";
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: sixteenNine ? "max(100%, 177.78vh)" : "max(100%, 56.25vh)",
    height: sixteenNine ? "max(100%, 56.25vw)" : "max(100%, 177.78vw)",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  };
};

// A YouTube video that autoplays (muted) once on screen and pauses when it
// leaves — only the on-screen clip is mounted, so long pages stay light. Uses
// the IFrame API with native chrome hidden, and renders our own themed
// controls (play/pause, mute, progress).
//
// mode="cover"   → fills + crops the container (hero / full-screen shorts)
// mode="contain" → fits the container exactly (cards whose box is the aspect)
const ScrollAutoplayVideo = ({
  youtubeId,
  title = "",
  mode = "contain",
  aspect = "16/9",
  threshold = 0.5,
  className = "",
}) => {
  const wrapRef = useRef(null);
  const holderRef = useRef(null);
  const playerRef = useRef(null);

  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [useHq, setUseHq] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Track fullscreen state (works for the element we requested it on).
  useEffect(() => {
    const onChange = () =>
      setIsFullscreen(document.fullscreenElement === wrapRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
    }
  };

  // Play only while on screen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) =>
        setActive(entry.isIntersecting && entry.intersectionRatio >= threshold),
      { threshold: [0, threshold, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  // Create / destroy the player as it enters / leaves the viewport.
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    let interval;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !holderRef.current) return;
      // YT replaces the target node with the iframe — give it a throwaway
      // child so React never tries to manage the node YT swaps out.
      const el = document.createElement("div");
      el.style.width = "100%";
      el.style.height = "100%";
      holderRef.current.appendChild(el);

      playerRef.current = new YT.Player(el, {
        width: "100%",
        height: "100%",
        videoId: youtubeId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          loop: 1,
          playlist: youtubeId,
          playsinline: 1,
          modestbranding: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e) => {
            if (cancelled) return;
            setReady(true);
            setMuted(true);
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e) => {
            setPlaying(e.data === YT.PlayerState.PLAYING);
            if (e.data === YT.PlayerState.ENDED) e.target.playVideo();
          },
        },
      });
    });

    interval = setInterval(() => {
      const p = playerRef.current;
      if (p && typeof p.getDuration === "function") {
        const d = p.getDuration() || 0;
        const c = p.getCurrentTime() || 0;
        setProgress(d ? (c / d) * 100 : 0);
      }
    }, 250);

    return () => {
      cancelled = true;
      clearInterval(interval);
      const p = playerRef.current;
      playerRef.current = null;
      try {
        p && p.destroy && p.destroy();
      } catch {
        /* ignore */
      }
      if (holderRef.current) holderRef.current.innerHTML = "";
      setReady(false);
      setProgress(0);
    };
  }, [active, youtubeId]);

  const togglePlay = () => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.pauseVideo();
    else p.playVideo();
  };

  const toggleMute = () => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      p.unMute();
      p.setVolume(100);
      setMuted(false);
    } else {
      p.mute();
      setMuted(true);
    }
  };

  const thumb = `https://i.ytimg.com/vi/${youtubeId}/${
    useHq ? "hqdefault" : "maxresdefault"
  }.jpg`;

  const holderStyle =
    mode === "cover"
      ? coverStyle(aspect)
      : { position: "absolute", inset: 0, pointerEvents: "none" };

  return (
    <div
      ref={wrapRef}
      className={`group relative overflow-hidden bg-steel-950 ${className}`}
    >
      {/* Player (the YT iframe is forced to fill this holder) */}
      {active && (
        <div
          ref={holderRef}
          style={holderStyle}
          className="[&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0"
        />
      )}

      {/* Top scrim — masks YouTube's channel/title chip (top-left) */}
      {ready && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-24 bg-gradient-to-b from-steel-950/80 to-transparent" />
      )}

      {/* Thumbnail — shown until the player is ready */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <img
          src={thumb}
          onError={() => setUseHq(true)}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid place-content-center bg-steel-950/30">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/90 text-2xl text-steel-900 ring-4 ring-white/20">
            <FiPlay className="ml-1" />
          </span>
        </div>
      </div>

      {/* Tap layer — toggles play/pause */}
      {ready && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="absolute inset-0 z-10"
        />
      )}

      {/* Centre play/pause flash */}
      {ready && !playing && (
        <div className="pointer-events-none absolute inset-0 z-10 grid place-content-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/90 text-2xl text-steel-900 ring-4 ring-white/20">
            <FiPlay className="ml-1" />
          </span>
        </div>
      )}

      {/* Themed control bar */}
      {ready && (
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 bg-gradient-to-t from-steel-950/80 to-transparent px-4 pb-4 pt-10">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-base text-white backdrop-blur transition-colors hover:bg-brand hover:text-steel-900"
          >
            {playing ? <FiPause /> : <FiPlay className="ml-0.5" />}
          </button>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-brand"
              style={{ width: `${progress}%` }}
            />
          </div>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-base text-white backdrop-blur transition-colors hover:bg-brand hover:text-steel-900"
          >
            {muted ? <FiVolumeX /> : <FiVolume2 />}
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-base text-white backdrop-blur transition-colors hover:bg-brand hover:text-steel-900"
          >
            {isFullscreen ? <FiMinimize /> : <FiMaximize />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ScrollAutoplayVideo;
