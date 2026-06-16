import { useEffect, useRef, useState } from "react";

// Minimal drop-in replacement for `react-use-measure` (avoids adding a dep).
// Returns [ref, bounds] — attach ref to an element, read bounds.width/height.
export function useMeasure() {
  const ref = useRef(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBounds({ width, height });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, bounds];
}
