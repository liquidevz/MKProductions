import { useEffect, useState } from "react";
import { motion, useAnimate } from "motion/react";

const NUM_BLOCKS = 5;
const BLOCK_SIZE = 28;

const DURATION_IN_MS = 150;
const DURATION_IN_SECS = DURATION_IN_MS * 0.001;

const TRANSITION = {
  ease: "easeInOut",
  duration: DURATION_IN_SECS,
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Brand-themed take on the shuffle loader. Loops until unmounted — the `active`
// flag + try/catch keep it from animating a detached scope after teardown.
const ShuffleLoader = ({
  blockClassName = "bg-brand",
  dividerClassName = "divide-steel-950",
}) => {
  const [blocks, setBlocks] = useState(
    Array.from(Array(NUM_BLOCKS).keys()).map((n) => ({ id: n }))
  );
  const [scope, animate] = useAnimate();

  useEffect(() => {
    let active = true;

    const pickTwoRandom = () => {
      const index1 = Math.floor(Math.random() * blocks.length);
      let index2 = Math.floor(Math.random() * blocks.length);
      while (index2 === index1) {
        index2 = Math.floor(Math.random() * blocks.length);
      }
      return [blocks[index1], blocks[index2]];
    };

    const shuffle = async () => {
      try {
        while (active) {
          const [first, second] = pickTwoRandom();

          animate(`[data-block-id="${first.id}"]`, { y: -BLOCK_SIZE }, TRANSITION);
          await animate(
            `[data-block-id="${second.id}"]`,
            { y: BLOCK_SIZE },
            TRANSITION
          );
          if (!active) break;

          await delay(DURATION_IN_MS);
          if (!active) break;

          setBlocks((pv) => {
            const copy = [...pv];
            const indexForFirst = copy.indexOf(first);
            const indexForSecond = copy.indexOf(second);
            copy[indexForFirst] = second;
            copy[indexForSecond] = first;
            return copy;
          });

          await delay(DURATION_IN_MS * 2);
          if (!active) break;

          animate(`[data-block-id="${first.id}"]`, { y: 0 }, TRANSITION);
          await animate(`[data-block-id="${second.id}"]`, { y: 0 }, TRANSITION);
          if (!active) break;

          await delay(DURATION_IN_MS);
        }
      } catch {
        // Scope unmounted mid-animation — safe to ignore.
      }
    };

    shuffle();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={scope} className={`flex divide-x ${dividerClassName}`}>
      {blocks.map((b) => (
        <motion.div
          layout
          data-block-id={b.id}
          key={b.id}
          transition={TRANSITION}
          style={{ width: BLOCK_SIZE, height: BLOCK_SIZE }}
          className={blockClassName}
        />
      ))}
    </div>
  );
};

export default ShuffleLoader;
