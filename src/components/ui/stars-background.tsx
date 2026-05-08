"use client";

import * as React from "react";
import {
  motion,
  type Transition,
  type HTMLMotionProps,
} from "framer-motion";

import { cn } from "@/lib/utils";

type StarLayerProps = HTMLMotionProps<"div"> & {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
};

const generateStars = (count: number, starColor: string) => {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(", ");
};

const StarLayer = React.memo(({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: "linear" },
  starColor = "#fff",
  className,
  ...props
}: StarLayerProps) => {
  const [boxShadow, setBoxShadow] = React.useState<string>("");

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  // If boxShadow is empty, we don't render to avoid hydration mismatch
  if (!boxShadow) return null;

  return (
    <motion.div
      data-slot="star-layer"
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={cn("absolute top-0 left-0 w-full h-[2000px] will-change-transform", className)}
      {...props}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
});

StarLayer.displayName = "StarLayer";

type StarsBackgroundProps = React.ComponentProps<"div"> & {
  speed?: number;
  starColor?: string;
};

export function StarsBackground({
  children,
  className,
  speed = 100,
  starColor = "rgba(255, 255, 255, 0.8)",
  ...props
}: StarsBackgroundProps) {
  return (
    <div
      data-slot="stars-background"
      className={cn(
        "relative size-full overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 pointer-events-none">
        <StarLayer
          count={800}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
          starColor={starColor}
        />
        <StarLayer
          count={300}
          size={1.5}
          transition={{
            repeat: Infinity,
            duration: speed * 1.5,
            ease: "linear",
          }}
          starColor={starColor}
        />
        <StarLayer
          count={150}
          size={2}
          transition={{
            repeat: Infinity,
            duration: speed * 2,
            ease: "linear",
          }}
          starColor={starColor}
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
