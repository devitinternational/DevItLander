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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[#fcbd1c] animate-pulse" />
              <span className="text-sm text-muted-foreground">Available for new projects</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl"
            data-testid="text-hero-title"
          >
            <TextPressure
              text="We Build Digital"
              textColor="#ffffff"
              strokeColor="#fcbd1c"
              minFontSize={36}
              weight={true}
              width={true}
              italic={true}
              alpha={false}
              flex={true}
              stroke={true}
              scale={false}
              className="mb-2"
            />
            <TextPressure
              text="Experiences"
              textColor="#fcbd1c"
              strokeColor="#fcbd1c"
              minFontSize={36}
              weight={true}
              width={true}
              italic={true}
              alpha={false}
              flex={true}
              stroke={true}
              scale={false}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            data-testid="text-hero-description"
          >
            DevIt is a premium development studio that transforms your vision into
            high-performance websites and applications with cutting-edge technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => scrollTo("#contact")}
              className="bg-[#fcbd1c] border-0 text-black font-semibold"
              data-testid="button-hero-start"
            >
              Start a project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("#work")}
              data-testid="button-hero-work"
            >
              View our work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {[
              { value: "15", suffix: "+", label: "Projects Delivered" },
              { value: "98", suffix: "%", label: "Client Satisfaction" },
              { value: "3", suffix: "+", label: "Years Experience" },
              { value: "24", suffix: "/7", label: "Support Available" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 + i * 0.1 }}
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
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute left-8 top-1/2 hidden xl:flex flex-col items-center gap-3"
        >
          <Code2 className="w-4 h-4 text-muted-foreground/50" />
          <div className="w-px h-20 bg-gradient-to-b from-muted-foreground/30 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute right-8 top-1/2 hidden xl:flex flex-col items-center gap-3"
        >
          <Zap className="w-4 h-4 text-muted-foreground/50" />
          <div className="w-px h-20 bg-gradient-to-b from-muted-foreground/30 to-transparent" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
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
      </motion.div>
    </section>
  );
}

