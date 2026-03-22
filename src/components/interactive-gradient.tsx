"use client";
import { useRef, useEffect, useCallback } from "react";
import {
  m as motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
  animate,
} from "framer-motion";

interface InteractiveGradientProps {
  color1?: string;
  color2?: string;
  color3?: string;
  loopDuration?: number;
  orbitRadius?: number;
  followStrength?: number;
  blur?: number;
  brightness?: number;
  className?: string;
}

export default function InteractiveGradient({
  color1 = "rgba(255, 255, 0, 0.35)",
  color2 = "rgba(204, 204, 0, 0.25)",
  color3 = "rgba(255, 255, 80, 0.2)",
  loopDuration = 18,
  orbitRadius = 28,
  followStrength = 0.35,
  blur = 70,
  brightness = 1,
  className = "",
}: InteractiveGradientProps) {
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  const pX = useSpring(pointerX, { stiffness: 200, damping: 28, mass: 0.8 });
  const pY = useSpring(pointerY, { stiffness: 200, damping: 28, mass: 0.8 });

  const x1 = useTransform(pX, (v) => 50 + (v - 50) * followStrength);
  const y1 = useTransform(pY, (v) => 50 + (v - 50) * followStrength);

  const phase = useMotionValue(0);

  useEffect(() => {
    const controls = animate(phase, Math.PI * 2, {
      duration: Math.max(0.1, loopDuration),
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [loopDuration, phase]);

  const x2 = useTransform(phase, (t) => 50 + Math.cos(t) * orbitRadius);
  const y2 = useTransform(phase, (t) => 50 + Math.sin(t) * orbitRadius);
  const x3 = useTransform(
    phase,
    (t) => 50 + Math.cos(t + (2 * Math.PI) / 3) * orbitRadius
  );
  const y3 = useTransform(
    phase,
    (t) => 50 + Math.sin(t + (2 * Math.PI) / 3) * orbitRadius
  );

  const background = useMotionTemplate`
    radial-gradient(circle at ${x1}% ${y1}%, ${color1} 0%, transparent 60%),
    radial-gradient(circle at ${x2}% ${y2}%, ${color2} 0%, transparent 60%),
    radial-gradient(circle at ${x3}% ${y3}%, ${color3} 0%, transparent 60%)
  `;

  const rectRef = useRef<DOMRect | null>(null);

  const triggerReturn = useCallback(() => {
    animate(pointerX, 50, { duration: 0.35, ease: "easeOut" });
    animate(pointerY, 50, { duration: 0.35, ease: "easeOut" });
  }, [pointerX, pointerY]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      pointerX.set(Math.max(0, Math.min(100, x)));
      pointerY.set(Math.max(0, Math.min(100, y)));
    },
    [pointerX, pointerY]
  );

  const onPointerLeave = useCallback(() => {
    triggerReturn();
  }, [triggerReturn]);

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-auto cursor-auto ${className}`}
      style={{
        background,
        filter: `blur(${blur}px) brightness(${brightness})`,
        willChange: "background",
      }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    />
  );
}

