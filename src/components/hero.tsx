"use client";
import { m as motion } from "framer-motion";
import { ArrowRight, Code2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextPressure from "@/components/text-pressure";
import StaggeredCountdown from "@/components/staggered-countdown";

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#fcbd1c] rounded-full opacity-[0.04] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#fcbd1c] rounded-full opacity-[0.03] blur-[120px]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(0 0% 20%) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
          opacity: 0.3,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-500 font-medium tracking-wide uppercase">Available for new projects</span>
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-4" data-testid="text-hero-title">
            <div className="w-full max-w-[90vw] md:max-w-3xl">
              <TextPressure
                text="SOFTWARE"
                textColor="#fcbd1c"
                strokeColor="#fcbd1c"
                stroke={true}
                minFontSize={16}
                maxFontSize={110}
                justify="center"
                initialWeight={600}
                disableAnimation={true}
              />
            </div>

            <div className="w-full max-w-[95vw] md:max-w-4xl -mt-2 md:mt-0">
              <TextPressure
                text="WITHOUT LIMITS"
                textColor="#fcbd1c"
                strokeColor="#fcbd1c"
                stroke={true}
                minFontSize={12}
                maxFontSize={70}
                justify="center"
                initialWeight={600}
                disableAnimation={true}
              />
            </div>
          </div>

          <p
            className="mt-8 text-lg md:text-xl text-[#ECECEC] max-w-2xl leading-relaxed"
            data-testid="text-hero-description"
          >
            Turning ideas into products people actually use.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none"
          >
            <Button
              size="lg"
              onClick={() => scrollTo("#contact")}
              className="w-full sm:w-auto bg-[#fcbd1c] border-0 text-black font-semibold"
              data-testid="button-hero-start"
            >
              Start a project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("#work")}
              className="w-full sm:w-auto"
              data-testid="button-hero-work"
            >
              View our work
            </Button>
          </div>

          <div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {[
              { value: "15", suffix: "+", label: "Projects Delivered" },
              { value: "98", suffix: "%", label: "Client Satisfaction" },
              { value: "3", suffix: "+", label: "Years Experience" },
              { value: "24", suffix: "/7", label: "Support Available" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="text-center"
                data-testid={`stat-${i}`}
              >
                <StaggeredCountdown
                  targetNumber={stat.value}
                  suffix={stat.suffix}
                  suffixColor="#fcbd1c"
                  color="#fcbd1c"
                  duration={2}
                  easing="backOut"
                  direction="up"
                  fontSize="clamp(24px, 4vw, 36px)"
                  spacing={4}
                />
                <div className="text-sm text-muted-foreground mt-3 font-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute left-8 top-1/2 hidden xl:flex flex-col items-center gap-3"
        >
          <Code2 className="w-4 h-4 text-muted-foreground/50" />
          <div className="w-px h-20 bg-gradient-to-b from-muted-foreground/30 to-transparent" />
        </div>

        <div
          className="absolute right-8 top-1/2 hidden xl:flex flex-col items-center gap-3"
        >
          <Zap className="w-4 h-4 text-muted-foreground/50" />
          <div className="w-px h-20 bg-gradient-to-b from-muted-foreground/30 to-transparent" />
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground/60 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-[#fcbd1c]" />
        </motion.div>
      </div>
    </section>
  );
}
