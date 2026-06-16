import { useEffect } from "react";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import RoundedDrawerNav from "../components/RoundedDrawerNav";
import BlogCarousel from "../components/BlogCarousel";
import { NAV_LINKS } from "../navLinks";
import BLOG_POSTS from "../blogPosts.json";

// The open article is driven by the route param (/blog/<id>), so a card click
// on the home page deep-links straight to the right article, and clicking a
// card here swaps the article in place.
const Blog = ({ postId }) => {
  const active = BLOG_POSTS.find((post) => post.id === postId) || BLOG_POSTS[0];

  // Jump back to the top whenever the open article changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [postId]);

  return (
    <div className="bg-steel-500">
      <RoundedDrawerNav
        links={NAV_LINKS}
        navBackground="bg-steel-500"
        bodyBackground="bg-white"
      >
        <article className="bg-white text-steel-900">
          {/* Hero — full-bleed image with the headline overlaid */}
          <header className="relative isolate overflow-hidden">
            <img
              key={active.id}
              src={active.imgUrl}
              alt={active.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/55 to-steel-950/10" />

            <div className="relative mx-auto flex min-h-[58vh] w-full max-w-container-max flex-col px-margin-mobile pb-10 pt-8 sm:min-h-[64vh] md:min-h-[72vh] md:px-margin-desktop md:pb-16">
              <a
                href="/"
                className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
              >
                <FiArrowLeft /> Back home
              </a>

              <div className="mt-auto max-w-4xl">
                <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                  {active.category}
                </p>
                <h1 className="font-display text-3xl font-black uppercase leading-[1.03] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  {active.title}
                </h1>
                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                  <span className="text-white">{active.author}</span>
                  <span>·</span>
                  <span>{active.date}</span>
                  <span>·</span>
                  <span>{active.readTime}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Body — content with a sticky sidebar on large screens */}
          <div className="mx-auto w-full max-w-6xl px-margin-mobile py-12 md:px-margin-desktop md:py-16 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14 xl:gap-20">
              <div>
                <p className="mb-8 text-xl font-medium leading-relaxed text-steel-900 md:text-2xl">
                  {active.description}
                </p>

                {active.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-6 text-lg leading-relaxed text-steel-700 md:text-xl"
                  >
                    {index === 0 ? (
                      <span className="float-left mr-3 mt-1.5 font-display text-6xl font-black leading-[0.7] text-brand-dark">
                        {paragraph.charAt(0)}
                      </span>
                    ) : null}
                    {index === 0 ? paragraph.slice(1) : paragraph}
                  </p>
                ))}
              </div>

              {/* Sidebar */}
              <aside className="lg:sticky lg:top-8 lg:self-start">
                <div className="rounded-2xl border border-steel-200 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-steel-400">
                    Written by
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-steel-900">
                    {active.author}
                  </p>
                  <dl className="mt-5 space-y-3 border-t border-steel-200 pt-5 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold uppercase tracking-[0.14em] text-steel-400">
                        Topic
                      </dt>
                      <dd className="text-right font-semibold text-steel-900">
                        {active.category}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold uppercase tracking-[0.14em] text-steel-400">
                        Published
                      </dt>
                      <dd className="text-right font-semibold text-steel-900">
                        {active.date}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold uppercase tracking-[0.14em] text-steel-400">
                        Length
                      </dt>
                      <dd className="text-right font-semibold text-steel-900">
                        {active.readTime}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-5 rounded-2xl bg-steel-900 p-6 text-white">
                  <p className="font-display text-xl font-bold uppercase leading-tight tracking-tight">
                    Have a project in mind?
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-steel-300">
                    Tell us the story you want to tell and we'll bring the lens.
                  </p>
                  <a
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-steel-900 transition-colors hover:bg-brand-dark"
                  >
                    Start a project <FiArrowUpRight className="text-base" />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {/* Pick another story — swaps the article above in place */}
        <BlogCarousel
          posts={BLOG_POSTS}
          activeId={active.id}
          eyebrow="Keep Reading"
          title="More From The Studio"
        />
      </RoundedDrawerNav>
    </div>
  );
};

export default Blog;
