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
    title: "The Cradle",
    category: "Montessori School Website",
    description: "A school that deserved a website as warm as its classrooms.",
    tags: ["React", "Node.js", "TailwindCSS"],
    image: cradle,
    link: "https://thecradle.co.in/",
  },
  {
    title: "CodeChoreo",
    category: "Real-time Collaborative Platform",
    description: "Built for teams who code together from different time zones.",
    tags: ["React", "Node.js", "Socket.IO", "Render", "Docker"],
    image: codeChoreo,
    link: "https://codechoreo.onrender.com/",
  },
  {
    title: "GatePass",
    category: "Visitor Management Mobile App",
    description: "Tighter security, less paperwork — visitor management on mobile.",
    tags: ["Flutter", "Firebase", "Dart"],
    image: gatePass,
  },
  {
    title: "AI Resume Analyzer",
    category: "Resume Analysis Web App",
    description: "Paste your CV. Know exactly what's holding it back.",
    tags: ["React", "TailwindCSS", "Zustand", "Puter.js"],
    image: analyzer,
    link: "https://ai-resume-analyzer-six-nu.vercel.app/",
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="work" className="relative pt-20 pb-32" data-testid="section-work">
      <div className="absolute top-0 left-0 right-0 h-px glow-line" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-mono text-[#fcbd1c] tracking-wider uppercase">Portfolio</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4 tracking-tight" data-testid="text-work-title">
            Things We've <span className="text-[#fcbd1c]">Shipped</span>
          </h2>
          <p className="mt-6 text-[16px] lg:text-[18px] text-[#ECECEC] max-w-2xl mx-auto">
            A few projects we're proud of.
          </p>
        </motion.div>

        <div className="hidden lg:flex gap-10 items-stretch min-h-[480px]">
          <div className="flex-[0_0_65%] flex flex-col justify-center">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  if (project.link) {
                    window.open(project.link, "_blank");
                  }
                }}
                className={`group cursor-pointer border-b border-border/30 last:border-b-0 ${project.link ? 'hover:bg-muted/10 transition-colors' : ''}`}
                data-testid={`card-project-${i}`}
              >
                <div className="flex items-center justify-start gap-12 py-4 px-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col items-start gap-1">
                      <motion.h3
                        animate={{
                          opacity: activeIndex === i ? 1 : 0.35,
                          scale: activeIndex === i ? 1.04 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="font-display font-bold text-2xl xl:text-3xl text-foreground tracking-tight origin-left"
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
                        opacity: activeIndex === i ? 1 : 0,
                        height: activeIndex === i ? "auto" : 0,
                        marginTop: activeIndex === i ? 8 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 30 }}
                      className="text-base text-[#ECECEC] max-w-md overflow-hidden"
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
                    {project.link && (
                      <div className="relative pointer-events-none">
                        {/* Outer glow ring */}
                        <motion.span
                          animate={activeIndex === i ? { scale: 1.55, opacity: 0.18 } : { scale: 1, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full bg-[#fcbd1c]"
                          aria-hidden
                        />

                        {/* Pulsing ambient glow */}
                        <motion.span
                          animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0, 0.12] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-0 rounded-full bg-[#fcbd1c]"
                          aria-hidden
                        />

                        {/* Main button face */}
                        <motion.div
                          animate={activeIndex === i ? { backgroundColor: "#fcbd1c" } : { backgroundColor: "rgba(252,189,28,0.12)" }}
                          transition={{ duration: 0.25 }}
                          className="relative flex items-center justify-center w-12 h-12 rounded-full border border-[#fcbd1c]/60 backdrop-blur-md overflow-hidden"
                        >
                          <span
                            className="absolute inset-0"
                            style={{
                              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(252,189,28,0.35) 1px, transparent 0)",
                              backgroundSize: "6px 6px",
                              opacity: activeIndex === i ? 0 : 0.6,
                              transition: "opacity 0.25s",
                            }}
                            aria-hidden
                          />
                          <motion.span
                            animate={activeIndex === i ? { x: 2, y: -2, color: "#000" } : { x: 0, y: 0, color: "#fcbd1c" }}
                            transition={{ duration: 0.25 }}
                            className="relative z-10 flex items-center justify-center"
                          >
                            <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
                          </motion.span>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex-[0_0_35%] relative overflow-hidden rounded-md">
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
              className={`relative overflow-hidden rounded-md ${project.link ? 'cursor-pointer group' : ''}`}
              onClick={() => project.link && window.open(project.link, "_blank")}
              data-testid={`card-project-mobile-${i}`}
            >
              <Image
                src={project.image}
                alt={project.title}
                placeholder="blur"
                className="w-full aspect-video object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <span className="text-xs font-mono text-[#fcbd1c] tracking-wider uppercase">
                  {project.category}
                </span>
                <h3 className="font-display font-bold text-2xl text-white mt-1 flex items-center gap-2">
                  {project.title}
                  {project.link && <ArrowUpRight className="w-5 h-5 text-[#fcbd1c]" />}
                </h3>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
