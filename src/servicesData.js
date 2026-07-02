import {
  FiCamera,
  FiVideo,
  FiSliders,
  FiAperture,
  FiFilm,
  FiEdit3,
  FiSun,
  FiMusic,
  FiMapPin,
  FiUser,
  FiBox,
  FiLayers,
  FiCrosshair,
  FiWind,
  FiZap,
} from "react-icons/fi";
import { TbDrone } from "react-icons/tb";

// Single source of truth for the Services overview page, the individual
// service detail pages, and the navbar dropdown. Icons are React components,
// so this lives in a .js module (not JSON).
export const SERVICES = [
  {
    slug: "photography",
    title: "Photography",
    Icon: FiCamera,
    descriptor: "Editorial • Product • Portrait",
    tagline: "Stills with intent",
    summary:
      "From editorial spreads to product hero shots, we light and frame every still with cinematic precision.",
    intro:
      "Photography is where the story starts. Whether it's a campaign, a catalogue or a single defining frame, we approach every shoot with the same obsession for light, composition and mood — building images that hold their own and sit perfectly beside the moving picture.",
    statement: "Every frame earns its place.",
    approach: [
      "We treat every brief as a commission, not a transaction. Before a single frame is exposed we build a reference deck, scout the light and lock a shot list — so the day on set is about craft, not guesswork.",
      "Our kit spans full-frame and medium-format bodies, a deep collection of prime lenses and a lighting package that can shape a studio anywhere. Whether the brief calls for a controlled tabletop set or first light on a mountain ridge, we arrive ready to make the picture the moment demands.",
    ],
    deliverables: [
      "Fully retouched, high-resolution stills",
      "Web-optimised and print-ready exports",
      "Colour-managed files in your chosen profile",
      "Usage rights licensed for your campaign",
      "Curated raw selects on request",
    ],
    panel: "bg-gradient-to-br from-brand to-brand-deep",
    accentText: "text-steel-900",
    heroImage:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1600&auto=format&fit=crop",
    poster:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://example.com/mk-productions/reels/photography",
    capabilities: [
      {
        Icon: FiEdit3,
        title: "Editorial",
        copy: "Narrative-driven shoots for magazines, lookbooks and brand stories.",
      },
      {
        Icon: FiBox,
        title: "Product & Still Life",
        copy: "Tabletop, hero and 360° product imagery built for commerce.",
      },
      {
        Icon: FiUser,
        title: "Light Painting",
        copy: "Studio and environmental portraits with character and craft.",
      },
      {
        Icon: FiAperture,
        title: "Advertising Campaigns",
        copy: "Fully lit studio control or run-and-gun on any location.",
      },
    ],
    process: [
      { title: "Brief & Mood", copy: "We align on references, tone and shot list." },
      { title: "Shoot", copy: "Lit and directed on set or location." },
      { title: "Select & Retouch", copy: "Curated edit with high-end retouching." },
      { title: "Deliver", copy: "Web and print-ready files in every format." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1000&auto=format&fit=crop",
    ],
    stats: [
      { value: "12K+", label: "Frames shot" },
      { value: "48hr", label: "Edit turnaround" },
      { value: "4K", label: "Tethered capture" },
    ],
  },
  {
    slug: "cinematography",
    title: "Cinematography",
    Icon: FiVideo,
    descriptor: "Films • Commercials • Brand",
    tagline: "Stories in motion",
    summary:
      "Brand films, commercials and documentary work — directed, lit and shot with a feature-film sensibility.",
    intro:
      "Motion is where mood lives. We craft brand films and commercials that feel cinematic — considered camera movement, sculpted lighting and performances that land. From treatment to final grade, every frame is built to move people.",
    statement: "Tell it like it's a film.",
    approach: [
      "Film is decisions stacked on decisions. We start with a treatment that defines the look, the lensing and the emotional beats, then build a production around it — crew, cast, locations and schedule — so nothing is left to chance on the day.",
      "On set we shoot for the edit, capturing coverage with intent rather than volume. Our cinematographers light to motivate every source and our directors protect the performance, because a beautiful frame means nothing if the moment doesn't land.",
    ],
    deliverables: [
      "Final graded master in your delivery spec",
      "Social cut-downs and vertical edits",
      "Licensed music and a full sound mix",
      "Project files and a selects archive",
      "Behind-the-scenes stills on request",
    ],
    panel: "bg-gradient-to-br from-steel-700 to-steel-950",
    accentText: "text-brand",
    heroImage:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop",
    poster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://example.com/mk-productions/reels/cinematography",
    capabilities: [
      {
        Icon: FiFilm,
        title: "Brand Films",
        copy: "Hero films that capture the soul of a brand in motion.",
      },
      {
        Icon: FiVideo,
        title: "Commercials",
        copy: "Broadcast and social spots, scripted and storyboarded.",
      },
      {
        Icon: FiMusic,
        title: "Music Videos",
        copy: "Performance and concept-led visuals for artists.",
      },
      {
        Icon: FiSun,
        title: "Lighting & Look",
        copy: "Cinematic lighting design and lensing for every scene.",
      },
    ],
    process: [
      { title: "Treatment", copy: "Concept, look and shot design on paper." },
      { title: "Pre-pro", copy: "Casting, location and production planning." },
      { title: "Production", copy: "Directed and shot with a full crew." },
      { title: "Post", copy: "Editorial, grade and sound to final master." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1000&auto=format&fit=crop",
    ],
    stats: [
      { value: "6K", label: "Cinema capture" },
      { value: "120fps", label: "High speed" },
      { value: "Full", label: "Crew & gear" },
    ],
  },
  {
    slug: "aerial-cinematography",
    title: "Aerial Cinematography",
    Icon: TbDrone,
    descriptor: "FPV • Drone • Establishing",
    tagline: "A new perspective",
    summary:
      "FPV chase shots, sweeping establishers and precision drone work — licensed, insured and built for scale.",
    intro:
      "From a single establishing drift to a high-speed FPV chase through impossible spaces, aerial work adds scale and adrenaline. Our certified pilots fly cinema payloads to capture perspectives that ground cameras simply can't reach.",
    statement: "See it from the sky.",
    approach: [
      "Flying for film is half cinematography, half operations. Every shoot begins with a site recce, an airspace check and a risk assessment — because the most cinematic move is worthless if it isn't safe and legal.",
      "Our certified pilots fly cinema-grade platforms, from nimble FPV rigs that thread through impossibly tight spaces to heavy-lift drones carrying full-frame payloads. We plan each move on the ground so the time in the air is spent capturing, not improvising.",
    ],
    deliverables: [
      "Stabilised, graded aerial masters",
      "Raw flight footage on request",
      "Multiple angles and altitudes per setup",
      "Compliance and insurance documentation",
      "Mapping or inspection data where flown",
    ],
    panel: "bg-gradient-to-br from-steel-800 to-steel-950",
    accentText: "text-brand",
    heroImage:
      "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=1600&auto=format&fit=crop",
    poster:
      "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://example.com/mk-productions/reels/aerial",
    capabilities: [
      {
        Icon: FiWind,
        title: "FPV Drone",
        copy: "High-speed, dynamic flight through tight, dramatic spaces.",
      },
      {
        Icon: TbDrone,
        title: "Cinematic Aerials",
        copy: "Smooth, stabilised camera-drone moves for hero shots.",
      },
      {
        Icon: FiCrosshair,
        title: "Establishing Shots",
        copy: "Sweeping reveals that set scale and place.",
      },
      {
        Icon: FiMapPin,
        title: "Survey & Mapping",
        copy: "Inspection, orbit and mapping flights on request.",
      },
    ],
    process: [
      { title: "Recce", copy: "Site survey, airspace and permit checks." },
      { title: "Flight Plan", copy: "Shot design and safety planning." },
      { title: "Fly", copy: "Licensed pilots, cinema payloads in the air." },
      { title: "Deliver", copy: "Stabilised, graded aerial masters." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559611505-cd4628902d4a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1000&auto=format&fit=crop",
    ],
    stats: [
      { value: "100%", label: "Licensed pilots" },
      { value: "7km", label: "Range" },
      { value: "Cinema", label: "Payloads" },
    ],
  },
  {
    slug: "post-production",
    title: "Post Production",
    Icon: FiSliders,
    descriptor: "Edit • Color • Sound",
    tagline: "The final polish",
    summary:
      "Editorial, colour grading, sound design and finishing — where the footage becomes the final film.",
    intro:
      "Post is where it all comes together. Our editors shape the rhythm, our colourists set the mood and our sound team builds the world you hear. Every project is finished in-house to a broadcast-ready master.",
    statement: "Polished to the last frame.",
    approach: [
      "The edit is where the story is really written. Our editors live with the footage, finding the rhythm and the through-line, then refine relentlessly to picture lock before a single colour or sound decision is made.",
      "From there our colourists set the mood with reference-grade grading and our sound team builds the world you hear — dialogue, design and score, mixed to broadcast standard. Everything is finished in-house, so the vision stays intact from first cut to final master.",
    ],
    deliverables: [
      "Broadcast-ready final master",
      "Versioned cuts for every platform",
      "Full colour grade and sound mix",
      "Motion graphics and titles",
      "Archived project and source files",
    ],
    panel: "bg-gradient-to-br from-brand-light to-brand-dark",
    accentText: "text-steel-900",
    heroImage:
      "https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=1600&auto=format&fit=crop",
    poster:
      "https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://example.com/mk-productions/reels/post-production",
    capabilities: [
      {
        Icon: FiEdit3,
        title: "Editing",
        copy: "Story-first editorial that finds the rhythm in the footage.",
      },
      {
        Icon: FiSliders,
        title: "Colour Grading",
        copy: "Reference-grade colour for a consistent, cinematic look.",
      },
      {
        Icon: FiMusic,
        title: "Sound Design",
        copy: "Mix, score and design that builds the world you hear.",
      },
      {
        Icon: FiZap,
        title: "VFX & Finishing",
        copy: "Cleanups, titles, motion graphics and final delivery.",
      },
      {
        Icon: FiZap,
        title: "AI Video Generation",
        copy: "Generative-video prototyping, style transfer and hybrid finishing.",
      },
      
    ],
    process: [
      { title: "Assembly", copy: "Selects, structure and first cut." },
      { title: "Refine", copy: "Editorial polish to picture lock." },
      { title: "Grade & Mix", copy: "Colour and sound to final feel." },
      { title: "Master", copy: "Delivery in every spec you need." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1536240478700-b869ad10e2b5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=1000&auto=format&fit=crop",
    ],
    stats: [
      { value: "In-house", label: "Full pipeline" },
      { value: "HDR", label: "Colour" },
      { value: "5.1", label: "Surround mix" },
    ],
  },
];

export const getService = (slug) =>
  SERVICES.find((service) => service.slug === slug);
