import { motion } from "motion/react";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useMeasure } from "../useMeasure";
import BLOG_POSTS from "../blogPosts.json";

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

const BlogCarousel = ({
  posts = BLOG_POSTS,
  activeId,
  eyebrow = "From The Studio",
  title = "The Journal",
}) => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (posts.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) return;
    setOffset((pv) => (pv += CARD_SIZE));
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) return;
    setOffset((pv) => (pv -= CARD_SIZE));
  };

  return (
    <section className="bg-steel-50 py-20 md:py-24" ref={ref}>
      <div className="relative overflow-hidden px-margin-mobile md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
                <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                {eyebrow}
              </p>
              <h2 className="font-display text-4xl font-black uppercase tracking-tight text-steel-900 md:text-6xl">
                {title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                aria-label="Previous posts"
                className={`rounded-full border border-steel-300 bg-white p-2.5 text-xl text-steel-900 transition-colors hover:bg-steel-900 hover:text-white ${
                  CAN_SHIFT_LEFT ? "" : "pointer-events-none opacity-30"
                }`}
                disabled={!CAN_SHIFT_LEFT}
                onClick={shiftLeft}
              >
                <FiArrowLeft />
              </button>
              <button
                aria-label="Next posts"
                className={`rounded-full border border-steel-300 bg-white p-2.5 text-xl text-steel-900 transition-colors hover:bg-steel-900 hover:text-white ${
                  CAN_SHIFT_RIGHT ? "" : "pointer-events-none opacity-30"
                }`}
                disabled={!CAN_SHIFT_RIGHT}
                onClick={shiftRight}
              >
                <FiArrowRight />
              </button>
            </div>
          </div>

          <motion.div
            animate={{ x: offset }}
            transition={{ ease: "easeInOut" }}
            className="flex"
          >
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                active={post.id === activeId}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Post = ({ post, active }) => {
  return (
    <a
      href={`/blog/${post.id}`}
      className="group relative shrink-0 cursor-pointer text-left transition-transform hover:-translate-y-1"
      style={{ width: CARD_WIDTH, marginRight: MARGIN }}
    >
      <img
        src={post.imgUrl}
        loading="lazy"
        className={`mb-4 h-[230px] w-full rounded-2xl object-cover ring-1 transition-shadow group-hover:shadow-xl ${
          active ? "ring-2 ring-brand" : "ring-steel-200"
        }`}
        alt={post.title}
      />
      <span className="rounded-full border border-steel-300 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-steel-500">
        {post.category}
      </span>
      <p className="mt-3 font-display text-xl font-bold uppercase leading-tight tracking-tight text-steel-900 transition-colors group-hover:text-brand-dark">
        {post.title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-steel-500">
        {post.description}
      </p>
      <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-steel-400">
        {post.author} · {post.readTime}
      </p>
    </a>
  );
};

export default BlogCarousel;
