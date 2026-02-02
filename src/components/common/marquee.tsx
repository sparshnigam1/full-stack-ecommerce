import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

type PropTypes = {
  images: ReactNode[] | string[];
  speed?: number; // pixels per second
  delay?: number; // resume delay on hover
  direction?: "ltr" | "rtl"; // left→right or right→left
};

const Marquee = ({
  images,
  speed = 75,
  delay = 1000,
  direction = "rtl",
}: PropTypes) => {
  const x = useMotionValue(0);
  const isPaused = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [loopWidth, setLoopWidth] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0);

  // Measure width of one full image list
  useEffect(() => {
    if (trackRef.current) {
      setLoopWidth(trackRef.current.offsetWidth);
    }
    if (trackRef.current && containerRef.current) {
      const remainingWidth =
        containerRef.current.offsetWidth - trackRef.current.offsetWidth;
      setOffsetWidth(remainingWidth);
    }
  }, [images]);

  // Animation frame loop
  useAnimationFrame((t, delta) => {
    if (isPaused.current || loopWidth === 0) return;

    const pxPerFrame = (speed * delta) / 1000;

    // LEFT → RIGHT
    if (direction === "ltr") {
      x.set(x.get() + pxPerFrame);

      // reset to negative width once full loop completes
      if (x.get() >= loopWidth) {
        x.set(0);
      }
    }

    // RIGHT → LEFT
    if (direction === "rtl") {
      x.set(x.get() - pxPerFrame);

      if (Math.abs(x.get()) >= loopWidth) {
        x.set(0);
      }
    }
  });

  const pauseAnimation = () => {
    isPaused.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const resumeAfterDelay = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isPaused.current = false;
    }, delay);
  };

  return (
    <div
      className="flex overflow-hidden w-full bg-foreground"
      onMouseEnter={pauseAnimation}
      onMouseLeave={resumeAfterDelay}
      ref={containerRef}
    >
      <motion.div style={{ x }} className="flex flex-shrink-0">
        <div className="flex" ref={trackRef}>
          {images.map((elem, idx) => (
            <span className="pr-11.5 md:pr-20" key={idx}>
              {elem}
            </span>
          ))}
        </div>

        <div className="flex">
          {images.map((elem, idx) => (
            <span className="pr-11.5 md:pr-20" key={`dup-${idx}`}>
              {elem}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;
