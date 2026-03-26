"use client";
import { m as motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import codeChoreo from "@/assets/images/CodeChoreo.jpeg"
import gatePass from "@/assets/images/gatepass.jpeg"
import analyzer from "@/assets/images/analyzer1.jpg"
import cradle from "@/assets/images/cradle.png"

const projects = [
  {
    title: "CodeChoreo",
    category: "Real-time Collaborative Platform",
    description: "A real-time collaborative code editor with AI assistance, built for seamless remote coding sessions.",
    tags: ["React", "Node.js", "Socket.IO", "Render", "Docker"],
    image: codeChoreo,
  },
  {
    title: "GatePass",
    category: "Visitor Management Mobile App",
    description: "GatePass is a Flutter-based mobile application designed for gated communities to manage visitor entry securely and efficiently.",
    tags: ["Flutter", "Firebase", "Dart"],
    image: gatePass,
  },
  {
    title: "AI Resume Analyzer",
    category: "Resume Analysis Web App",
    description: "AI Resume Analyzer is a smart web application that allows users to upload resumes (PDF format) and get instant analysis on formatting, keyword matching, and score insights.",
    tags: ["React", "TailwindCSS", "Zustand", "Puter.js"],
    image: analyzer,
  },
  {
    title: "The Cradle",
    category: "School Website",
    description: "Fully responsive website for a kindergarten school with location and gallery functionality",
    tags: ["React", "Node.js", "TailwindCSS"],
    image: cradle,
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="work" className="relative py-32" data-testid="section-work">
      <div className="absolute top-0 left-0 right-0 h-px glow-line" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-mono text-[#fcbd1c] tracking-wider uppercase">Portfolio</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mt-4 tracking-tight" data-testid="text-work-title">
            Things We've <span className="text-[#fcbd1c]">Shipped</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A few projects we're proud of.
          </p>
        </motion.div>

        <div className="hidden lg:flex gap-0 items-stretch min-h-[480px]">
          <div className="flex-[0_0_60%] flex flex-col justify-center">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setActiveIndex(i)}
                className="group cursor-pointer border-b border-border/30 last:border-b-0"
                data-testid={`card-project-${i}`}
              >
                <div className="flex items-center justify-between gap-4 py-5 px-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 flex-wrap">
                      <motion.h3
                        animate={{
                          opacity: activeIndex === i ? 1 : 0.35,
                          skewY: activeIndex === i ? -3 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 30 }}
                        className="font-display font-bold text-3xl xl:text-4xl text-foreground tracking-tight"
                      >
                        {project.title}
                      </motion.h3>
                      <motion.span
                        animate={{ opacity: activeIndex === i ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs font-mono text-[#fcbd1c] tracking-wider uppercase"
                      >
                        {project.category}
                      </motion.span>
                    </div>
                    <motion.p
                      animate={{
                        opacity: activeIndex === i ? 0.7 : 0,
                        height: activeIndex === i ? "auto" : 0,
                        marginTop: activeIndex === i ? 8 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 30 }}
                      className="text-base text-muted-foreground max-w-md overflow-hidden"
                    >
                      {project.description}
                    </motion.p>
                    <motion.div
                      animate={{
                        opacity: activeIndex === i ? 1 : 0,
                        height: activeIndex === i ? "auto" : 0,
                        marginTop: activeIndex === i ? 10 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 30 }}
                      className="flex flex-wrap gap-2 overflow-hidden"
                    >
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-[#fcbd1c]/10 border-[#ffff00]/30 text-[#fcbd1c] text-xs no-default-hover-elevate no-default-active-elevate"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </motion.div>
                  </div>
                  <motion.div
                    animate={{ opacity: activeIndex === i ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 30 }}
                  >
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex-[0_0_40%] relative overflow-hidden rounded-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 250, damping: 30 }}
                className="absolute inset-0"
              >
                <Image
                  src={projects[activeIndex].image}
                  alt={projects[activeIndex].title}
                  placeholder="blur"
                  className="w-full h-full object-cover object-top"
                  data-testid={`img-project-${activeIndex}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-mono text-[#fcbd1c] tracking-wider uppercase">
                    {projects[activeIndex].category}
                  </span>
                  <h4 className="font-display font-bold text-xl text-white mt-1">
                    {projects[activeIndex].title}
                  </h4>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:hidden flex flex-col gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative overflow-hidden rounded-md"
              data-testid={`card-project-mobile-${i}`}
            >
              <Image
                src={project.image}
                alt={project.title}
                placeholder="blur"
                className="w-full aspect-video object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-mono text-[#fcbd1c] tracking-wider uppercase">
                  {project.category}
                </span>
                <h3 className="font-display font-bold text-2xl text-white mt-1">{project.title}</h3>
                <p className="text-white/80 text-base mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white text-xs no-default-hover-elevate no-default-active-elevate"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
