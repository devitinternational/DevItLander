"use client";
import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Discovery",
    description: "We dive deep into your vision, goals, and requirements. Understanding the 'why' behind your project is where great work begins.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Design",
    description: "Wireframes evolve into polished designs. We iterate closely with you until every detail is pixel-perfect and aligned with your brand.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Develop",
    description: "Clean, maintainable code powers your application. We use modern tech stacks and best practices to build products that last.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Deploy",
    description: "Launch day is just the beginning. We handle deployment, monitoring, and ongoing optimization to ensure peak performance.",
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="relative py-32" data-testid="section-process">
      <div className="absolute top-0 left-0 right-0 h-px glow-line" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-mono text-[#fcbd1c] tracking-wider uppercase">How we work</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mt-4 tracking-tight" data-testid="text-process-title">
            Our <span className="text-gradient">Process</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven methodology that turns complex ideas into polished products, on time and on budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
              data-testid={`process-step-${i}`}
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+32px)] right-[-calc(50%-32px)] w-[calc(100%-32px)]">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.2 }}
                    className="h-px bg-gradient-to-r from-[#fcbd1c]/30 to-transparent origin-left"
                  />
                </div>
              )}

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-md bg-[#fcbd1c]/10 flex items-center justify-center border border-[#ffff00]/15">
                    <step.icon className="w-7 h-7 text-[#fcbd1c]" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-mono text-[#fcbd1c] bg-background px-1.5 py-0.5 rounded-md border border-border/50">{step.step}</span>
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

