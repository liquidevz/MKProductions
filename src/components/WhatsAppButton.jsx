import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX, FiSend } from "react-icons/fi";
import { SERVICES } from "../servicesData";

// WhatsApp business number (India, +91).
const WHATSAPP_NUMBER = "918451010608";
const SERVICE_OPTIONS = SERVICES.map((s) => s.title);

// Floating WhatsApp enquiry button. Opens a compact, in-theme panel that asks
// the same questions as the contact form, then hands off to WhatsApp with a
// cleanly formatted message. `defaultService` pre-selects the service (used on
// individual service pages).
const WhatsAppButton = ({ defaultService = "" }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [represent, setRepresent] = useState("individual");
  const [company, setCompany] = useState("");
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState("");

  const isCompany = represent === "company";

  const sendToWhatsApp = (e) => {
    e.preventDefault();

    const represents = isCompany
      ? `A company${company.trim() ? ` — ${company.trim()}` : ""}`
      : "An individual";

    const lines = [
      "Hi MK Productions! 👋",
      "",
      `*Name:* ${name.trim() || "—"}`,
      `*I represent:* ${represents}`,
      `*Service:* ${service || "—"}`,
      "",
      "*About the project:*",
      message.trim() || "—",
    ];

    const text = encodeURIComponent(lines.join("\n"));
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  return (
    <>
      {/* Enquiry panel */}
      <AnimatePresence>
        {open && (
          <motion.form
            key="wa-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onSubmit={sendToWhatsApp}
            className="fixed bottom-24 right-4 z-[70] flex max-h-[80vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-steel-900 text-white shadow-2xl ring-1 ring-white/10 md:right-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 bg-[#25D366] px-5 py-4 text-steel-900">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-xl">
                  <FaWhatsapp />
                </span>
                <div className="leading-tight">
                  <p className="font-display text-base font-extrabold uppercase tracking-tight">
                    Chat on WhatsApp
                  </p>
                  <p className="text-[11px] font-semibold opacity-80">
                    Usually replies within a day
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-steel-900/70 transition-colors hover:bg-black/10 hover:text-steel-900"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Fields */}
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-steel-400">
                  Your name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name..."
                  className="w-full rounded-lg bg-steel-800 p-2.5 text-sm outline-none ring-brand transition placeholder:text-white/40 focus:ring-2"
                />
              </div>

              {/* Represent toggle */}
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-steel-400">
                  I represent
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "individual", label: "An individual" },
                    { key: "company", label: "A company" },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setRepresent(opt.key)}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                        represent === opt.key
                          ? "bg-brand text-steel-900"
                          : "bg-steel-800 text-white hover:bg-steel-700"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company name (conditional) */}
              <AnimatePresence initial={false}>
                {isCompany && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-steel-400">
                      Company name
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your company name..."
                      className="w-full rounded-lg bg-steel-800 p-2.5 text-sm outline-none ring-brand transition placeholder:text-white/40 focus:ring-2"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Service */}
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-steel-400">
                  Service you're after
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setService(opt)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                        service === opt
                          ? "bg-brand text-steel-900"
                          : "bg-steel-800 text-white hover:bg-steel-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-steel-400">
                  About the project
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about the shoot..."
                  className="min-h-[90px] w-full resize-none rounded-lg bg-steel-800 p-2.5 text-sm outline-none ring-brand transition placeholder:text-white/40 focus:ring-2"
                />
              </div>
            </div>

            {/* Send */}
            <div className="border-t border-white/10 p-4">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 text-sm font-bold uppercase tracking-[0.16em] text-steel-900 transition-colors hover:bg-[#1ebe5b]"
              >
                Send on WhatsApp <FiSend className="text-base" />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        type="button"
        aria-label="Enquire on WhatsApp"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-xl ring-4 ring-[#25D366]/20 transition-colors hover:bg-[#1ebe5b] md:right-6 md:h-16 md:w-16"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <FiX />
            </motion.span>
          ) : (
            <motion.span
              key="wa"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <FaWhatsapp />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default WhatsAppButton;
