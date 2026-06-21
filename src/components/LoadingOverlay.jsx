import { motion } from "motion/react";
import ShuffleLoader from "./ShuffleLoader";

// Full-screen branded loading veil. Appears instantly (covers the page swap)
// and fades out via AnimatePresence in App.
const LoadingOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-9 bg-steel-950"
    >
      <ShuffleLoader />
      <div className="flex flex-col items-center gap-2">
        <span className="font-display text-lg font-extrabold uppercase tracking-[0.32em] text-white">
          MK Productions
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-steel-400">
          Photography <span className="text-brand">|</span> Cinematography
        </span>
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;
