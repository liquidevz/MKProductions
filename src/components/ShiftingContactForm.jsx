import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SERVICES } from "../servicesData";

const BASE_TRANSITION = { ease: "anticipate", duration: 0.75 };
const SERVICE_OPTIONS = SERVICES.map((s) => s.title);

// Brand-themed contact form. Designed to sit in a column (e.g. the right half
// of the contact page) — it fills its container's width and shifts between two
// steel shades as you toggle individual / company.
const ShiftingContactForm = () => {
  const [selected, setSelected] = useState("individual");
  const [service, setService] = useState("");
  return (
    <Form
      selected={selected}
      setSelected={setSelected}
      service={service}
      setService={setService}
    />
  );
};

const Form = ({ selected, setSelected, service, setService }) => {
  const isCompany = selected === "company";

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`w-full rounded-3xl p-8 text-white shadow-xl ring-1 ring-black/5 transition-colors duration-[750ms] md:p-10 ${
        isCompany ? "bg-steel-900" : "bg-steel-700"
      }`}
    >
      <h3 className="mb-6 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
        Contact us
      </h3>

      {/* Name input */}
      <div className="mb-6">
        <p className="mb-2 text-xl md:text-2xl">Hi 👋! My name is...</p>
        <input
          type="text"
          placeholder="Your name..."
          className={`w-full rounded-md p-2.5 outline-none ring-brand transition-colors duration-[750ms] placeholder:text-white/60 focus:ring-2 ${
            isCompany ? "bg-steel-950" : "bg-steel-800"
          }`}
        />
      </div>

      {/* Company/individual toggle */}
      <div className="mb-6">
        <p className="mb-2 text-xl md:text-2xl">and I represent...</p>
        <FormSelect selected={selected} setSelected={setSelected} />
      </div>

      {/* Company name */}
      <AnimatePresence>
        {isCompany && (
          <motion.div
            initial={{ marginTop: -104, opacity: 0 }}
            animate={{ marginTop: 0, opacity: 1 }}
            exit={{ marginTop: -104, opacity: 0 }}
            transition={BASE_TRANSITION}
            className="mb-6"
          >
            <p className="mb-2 text-xl md:text-2xl">by the name of...</p>
            <input
              type="text"
              placeholder="Your company name..."
              className="w-full rounded-md bg-steel-950 p-2.5 outline-none ring-brand transition-colors duration-[750ms] placeholder:text-white/60 focus:ring-2"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service */}
      <div className="mb-6">
        <p className="mb-3 text-xl md:text-2xl">and I'm looking for...</p>
        <div className="flex flex-wrap gap-2">
          {SERVICE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setService(option)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors duration-300 ${
                service === option
                  ? "bg-brand text-steel-900"
                  : isCompany
                  ? "bg-steel-950 text-white hover:bg-steel-800"
                  : "bg-steel-800 text-white hover:bg-steel-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="mb-6">
        <p className="mb-2 text-xl md:text-2xl">I'd love to ask about...</p>
        <textarea
          placeholder="Whatever your heart desires :)"
          className={`min-h-[150px] w-full resize-none rounded-md p-2.5 outline-none ring-brand transition-colors duration-[750ms] placeholder:text-white/60 focus:ring-2 ${
            isCompany ? "bg-steel-950" : "bg-steel-800"
          }`}
        />
      </div>

      {/* Submit */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        className="w-full rounded-lg bg-brand py-3 text-center text-sm font-bold uppercase tracking-[0.18em] text-steel-900 transition-colors duration-[750ms] hover:bg-brand-dark"
      >
        Submit
      </motion.button>
    </form>
  );
};

const FormSelect = ({ selected, setSelected }) => {
  return (
    <div className="w-fit overflow-hidden rounded border border-white font-medium">
      <button
        type="button"
        className={`relative px-3 py-1.5 text-sm transition-colors duration-[750ms] ${
          selected === "individual" ? "text-steel-900" : "text-white"
        }`}
        onClick={() => setSelected("individual")}
      >
        <span className="relative z-10">An individual</span>
        {selected === "individual" && (
          <motion.div
            transition={BASE_TRANSITION}
            layoutId="form-tab"
            className="absolute inset-0 z-0 bg-brand"
          />
        )}
      </button>
      <button
        type="button"
        className={`relative px-3 py-1.5 text-sm transition-colors duration-[750ms] ${
          selected === "company" ? "text-steel-900" : "text-white"
        }`}
        onClick={() => setSelected("company")}
      >
        <span className="relative z-10">A company</span>
        {selected === "company" && (
          <motion.div
            transition={BASE_TRANSITION}
            layoutId="form-tab"
            className="absolute inset-0 z-0 bg-brand"
          />
        )}
      </button>
    </div>
  );
};

export default ShiftingContactForm;
