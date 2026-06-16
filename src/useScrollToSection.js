import { useEffect } from "react";

// Smooth-scrolls to the element with the given id when `id` changes; scrolls to
// the top of the page when there's no id. Used by pages that can deep-link to a
// section (e.g. /services, /portfolio/automotive).
export function useScrollToSection(id) {
  useEffect(() => {
    if (id) {
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo(0, 0);
  }, [id]);
}
