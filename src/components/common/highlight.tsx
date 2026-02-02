"use client";

import useCustomMediaQuery from "@/hooks/useCustomMediaQuery";
import { motion } from "framer-motion";

export default function Highlight({
  children,
  animateHighlight,
}: {
  children: React.ReactNode;
  animateHighlight: boolean;
}) {
  const { isTablet } = useCustomMediaQuery();
  return (
    <span className="relative inline-block">
      {/* Animated background */}
      <motion.span
        initial={{ width: 0, padding: 0 }}
        animate={
          animateHighlight
            ? {
                width: isTablet ? "100px" : "152px",
                padding: "5px 20px 5px 20px",
              }
            : { width: 0, padding: 0 }
        }
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease: "easeIn",
        }}
        className="
          absolute
          bottom-0 top-[-1px] left-[-1px]
          h-[90%]
          bg-[#FDB022] opacity-15
          -ml-[15px] -mr-[5px] max-lg:-ml-[2px]
          [transform:rotate(5deg)]
        "
      />

      {/* The text */}
      <span className="relative z-10">{children}</span>
    </span>
  );
}
