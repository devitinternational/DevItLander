"use client";
import { useState, useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface StaggeredCountdownProps {
  targetNumber: string;
  duration?: number;
  color?: string;
  prefix?: string;
  suffix?: string;
  prefixColor?: string;
  suffixColor?: string;
  easing?: "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut";
  spacing?: number;
  direction?: "up" | "down";
  className?: string;
  fontSize?: string;
  fontFamily?: string;
}

export default function StaggeredCountdown({
  targetNumber = "1234",
  duration = 2,
  color = "#fcbd1c",
  prefix = "",
  suffix = "",
  prefixColor,
  suffixColor,
  easing = "easeInOut",
  spacing = 0,
  direction = "up",
  className = "",
  fontSize = "48px",
  fontFamily = "'Press Start 2P', cursive",
}: StaggeredCountdownProps) {
  const targetString = (targetNumber ?? "").toString();
  const targetChars = targetString.split("");

  const digitIndices: number[] = [];
  let digitCounter = 0;
  for (const ch of targetChars) {
    if (ch >= "0" && ch <= "9") {
      digitIndices.push(digitCounter);
      digitCounter += 1;
    } else {
      digitIndices.push(-1);
    }
  }
  const digitCount = digitCounter;

  const [animatedDigits, setAnimatedDigits] = useState<number[]>(
    Array(digitCount).fill(0)
  );

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    setAnimatedDigits(Array(digitCount).fill(0));

    const timeouts: number[] = [];

    targetChars.forEach((digitChar, charIndex) => {
      const digitIndex = digitIndices[charIndex];
      if (digitIndex === -1) return;

      const targetDigit = parseInt(digitChar, 10);
      if (isNaN(targetDigit)) return;

      const staggerDelay = digitIndex * 0.1;
      const digitDuration = duration * 0.8;

      const timeoutId = window.setTimeout(() => {
        animate(0, targetDigit, {
          duration: digitDuration,
          ease: easing,
          onUpdate: (value) => {
            setAnimatedDigits((prev) => {
              const newDigits = [...prev];
              newDigits[digitIndex] = Math.max(0, Math.min(9, value));
              return newDigits;
            });
          },
        });
      }, staggerDelay * 1000);

      timeouts.push(timeoutId);
    });

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [isInView, targetString, duration, easing]);

  const fontStyle: React.CSSProperties = {
    fontFamily,
    fontSize,
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1.4,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        justifyContent: "center",
        color,
      }}
    >
      {prefix && (
        <span style={{ ...fontStyle, color: prefixColor || color }}>
          {prefix}
        </span>
      )}

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: `${spacing}px`,
        }}
      >
        {targetChars.map((ch, charIndex) => {
          const digitIndex = digitIndices[charIndex];

          if (digitIndex === -1) {
            return (
              <span
                key={charIndex}
                style={{
                  ...fontStyle,
                  color,
                  textAlign: "center",
                }}
              >
                {ch}
              </span>
            );
          }

          const animatedValue = animatedDigits[digitIndex] ?? 0;
          const currentDigit = Math.floor(animatedValue);
          const progress = animatedValue - currentDigit;
          const nextDigit = currentDigit + 1;

          return (
            <div
              key={charIndex}
              style={{
                position: "relative",
                overflow: "hidden",
                ...fontStyle,
              }}
            >
              <span style={{ visibility: "hidden" }}>0</span>

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ...fontStyle,
                  color,
                  transform:
                    direction === "up"
                      ? `translateY(${progress * -100}%)`
                      : `translateY(${progress * 100}%)`,
                }}
              >
                {currentDigit}
              </div>
              {progress > 0 && nextDigit <= 9 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ...fontStyle,
                    color,
                    transform:
                      direction === "up"
                        ? `translateY(${(1 - progress) * 100}%)`
                        : `translateY(${(1 - progress) * -100}%)`,
                  }}
                >
                  {nextDigit}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {suffix && (
        <span style={{ ...fontStyle, color: suffixColor || color }}>
          {suffix}
        </span>
      )}
    </div>
  );
}

