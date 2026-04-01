"use client";
import { useState } from "react";
import { m as motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 400);
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.88 }}
          onClick={handleClick}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          aria-label="Scroll to top"
          data-testid="button-scroll-to-top"
          className="fixed bottom-8 right-8 z-50 group"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {/* Outer glow ring */}
          <motion.span
            animate={hovered ? { scale: 1.55, opacity: 0.18 } : { scale: 1, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-[#fcbd1c] pointer-events-none"
            aria-hidden
          />

          {/* Pulsing ambient glow (always on) */}
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0, 0.12] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-[#fcbd1c] pointer-events-none"
            aria-hidden
          />

          {/* Main button face */}
          <motion.span
            animate={hovered ? { backgroundColor: "#fcbd1c" } : { backgroundColor: "rgba(252,189,28,0.12)" }}
            transition={{ duration: 0.25 }}
            className="relative flex items-center justify-center w-12 h-12 rounded-full border border-[#fcbd1c]/60 backdrop-blur-md overflow-hidden"
          >
            {/* Dot-grid texture (matches hero aesthetic) */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(252,189,28,0.35) 1px, transparent 0)",
                backgroundSize: "6px 6px",
                opacity: hovered ? 0 : 0.6,
                transition: "opacity 0.25s",
              }}
              aria-hidden
            />

            {/* Arrow icon */}
            <motion.span
              animate={hovered ? { y: -2, color: "#000" } : { y: 0, color: "#fcbd1c" }}
              transition={{ duration: 0.25 }}
              className="relative z-10 flex items-center justify-center"
            >
              <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
            </motion.span>
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
