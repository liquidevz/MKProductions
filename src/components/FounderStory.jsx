import { motion } from "motion/react";

// The founder's journey, told as a vertical timeline — years marked on a rail,
// each chapter with its own heading, narrative, optional highlight tags and a
// pull quote. Clean, editorial, in the studio's palette.
const CHAPTERS = [
  {
    year: "The turn",
    title: "Every journey begins with an unexpected turn",
    body: [
      "If someone had asked me years ago whether I would become a filmmaker, I probably would have smiled and said no. Life had different plans.",
      "After losing my father, I stepped into our family business. It wasn't something I had imagined for myself, but it was the responsibility I chose to take — simply trying to move forward one day at a time.",
      "I never imagined that a camera would eventually change my life.",
    ],
  },
  {
    year: "2014",
    title: "The first chapter",
    body: [
      "I picked up photography professionally and spent the next two years shooting weddings. Those years taught me more than camera settings or composition — they taught me how to observe emotions, anticipate moments, and understand the importance of preserving memories.",
      "I genuinely enjoyed the work, but deep down I always felt something was missing. I loved photography. I just hadn't discovered what I truly wanted to photograph.",
    ],
  },
  {
    year: "2016",
    title: "The day everything changed",
    body: [
      "A friend invited me to an off-road event and asked if I'd like to shoot a few photographs. I still remember standing in the middle of flying mud, roaring engines, pouring rain and vehicles pushing through impossible terrain.",
      "Instead of worrying about getting dirty, I found myself smiling behind the camera. That wasn't just another assignment — it was the day I discovered what truly excited me. From then on I dedicated myself to automotive and adventure photography, and to the way I told stories through images.",
    ],
    highlights: ["Adventure", "Movement", "Machines", "Nature"],
  },
  {
    year: "2020",
    title: "Learning to adapt",
    body: [
      "As the world shifted toward video-first content and cinematic filmmaking, I realised photography alone wasn't enough. While much of the world slowed down during the pandemic, I invested my time in learning.",
      "I immersed myself in cinematography, drone filmmaking, editing, colour grading and visual storytelling. I wasn't simply learning new software — I was learning how to make people feel something through motion.",
    ],
    quote:
      "Photography captures a single moment. Cinema captures the entire experience.",
  },
  {
    year: "2023",
    title: "The beginning of MK Productions",
    body: [
      "Years of learning, experimenting, travelling and countless hours behind the camera led me to one important milestone — I founded MK Productions.",
      "It wasn't about starting another production company. It was about creating a platform where adventure, storytelling and visual excellence could come together. Every project carries the same goal: to create films and photographs that people don't just watch, but remember.",
    ],
  },
  {
    year: "On location",
    title: "Where every frame is earned",
    body: [
      "Some of my most meaningful work hasn't happened inside studios. It's happened on roads that don't appear on maps — across mountains, inside rainforests, above glaciers.",
      "In December 2022 I travelled across Brazil, spending four unforgettable days deep inside the Amazon Rainforest. A few months later, in February 2023, another adventure took me to Iceland — driving across the country in Land Rover Defenders, creating cinematic visuals against landscapes that looked almost unreal.",
    ],
    highlights: ["Volcanoes", "Glaciers", "Black sand beaches", "Frozen waterfalls"],
  },
  {
    year: "Why",
    title: "I chase real stories",
    body: [
      "People often ask what inspires my work. The answer is simple — I love stories. Not scripted ones. Real ones.",
      "The kind that happen when the weather refuses to cooperate. When a sunrise lasts only a few seconds. When strangers become friends during an expedition. When a single photograph preserves a moment that will never happen again. Those are the moments I chase.",
    ],
  },
  {
    year: "Ahead",
    title: "One frame at a time",
    body: [
      "Every journey has taught me something. Every client has challenged me to grow. Every destination has changed the way I see the world.",
      "I don't set out to make beautiful visuals — I set out to make meaningful ones. Years from now, people may not remember the equipment I used or the places I travelled, but I hope they'll remember how my work made them feel. And as long as there are stories waiting to be told, I'll keep chasing them.",
    ],
  },
];

const FounderStory = () => {
  return (
    <section className="bg-white text-steel-900">
      <div className="mx-auto w-full max-w-4xl px-margin-mobile py-16 md:px-margin-desktop md:py-24">
        {/* Section header */}
        <div className="mb-14 md:mb-20">
          <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
            <span className="inline-block h-2 w-2 rounded-full bg-brand" />
            The Story
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold uppercase leading-[1.02] tracking-tight md:text-5xl">
            How a camera
            <span className="font-medium normal-case italic text-steel-400">
              {" "}changed everything
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Rail */}
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-steel-200 md:left-[9px]" />

          <div className="space-y-14 md:space-y-20">
            {CHAPTERS.map((chapter, index) => (
              <motion.div
                key={chapter.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="relative pl-10 md:pl-16"
              >
                {/* Marker */}
                <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand ring-4 ring-white md:h-[18px] md:w-[18px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-steel-900" />
                </span>

                <p className="mb-2 font-display text-sm font-bold uppercase tracking-[0.2em] text-brand-dark">
                  {chapter.year}
                </p>
                <h3 className="mb-5 font-display text-2xl font-extrabold uppercase leading-[1.05] tracking-tight text-steel-900 md:text-3xl">
                  {chapter.title}
                </h3>

                <div className="space-y-4">
                  {chapter.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-steel-600 md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {chapter.quote && (
                  <blockquote className="mt-6 border-l-2 border-brand pl-5 font-display text-xl font-medium italic leading-snug text-steel-800 md:text-2xl">
                    {chapter.quote}
                  </blockquote>
                )}

                {chapter.highlights && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {chapter.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-steel-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-steel-700 ring-1 ring-steel-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
