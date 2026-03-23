"use client";
import { m as motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import serviceBranding from "@/assets/images/service-branding.png";
import serviceDevelopment from "@/assets/images/service-development.png";
import serviceApps from "@/assets/images/service-apps.png";
import serviceAnalytics from "@/assets/images/service-analytics.png";

const services = [
  {
    number: "01",
    title: "Branding",
    description: "We create impactful brand identities that connect with your audience.",
    image: serviceBranding,
  },
  {
    number: "02",
    title: "Development",
    description: "We build seamless websites and platforms that perform at scale.",
    image: serviceDevelopment,
  },
  {
    number: "03",
    title: "Mobile Apps",
    description: "We craft native experiences that grow with your business needs.",
    image: serviceApps,
  },
  {
    number: "04",
    title: "SEO Analytics",
    description: "We develop data-driven strategies that unlock growth potential.",
    image: serviceAnalytics,
  },
];

const transition = { duration: 0.4, ease: [0.44, 0, 0.56, 1] };

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-32 overflow-hidden" data-testid="section-services">
      <div className="absolute top-0 left-0 right-0 h-px glow-line" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-mono text-[#fcbd1c] tracking-wider uppercase" data-testid="text-services-label">What we do</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mt-4 tracking-tight" data-testid="text-services-title">
            Services That <span className="text-gradient">Deliver</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to deployment, we handle every aspect of your digital product with precision and care.
          </p>
        </motion.div>

        <div className="hidden lg:flex gap-8 items-center">
          <div className="flex-[0_0_320px] sticky top-32 z-50">
            <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden">
              <AnimatePresence mode="wait">
                {activeIndex !== null && (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={transition}
                    className="absolute inset-0"
                  >
                    <Image src={services[activeIndex].image} alt={services[activeIndex].title} placeholder="blur" className="w-full h-full object-cover"
                      data-testid={`img-service-${activeIndex}`}
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-1/2"
                      style={{
                        background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)",
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white text-base font-medium leading-relaxed" data-testid={`text-service-desc-${activeIndex}`}>
                        {services[activeIndex].description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {activeIndex === null && (
                <div className="absolute inset-0 rounded-md border border-border/20 flex items-center justify-center">
                  <span className="text-muted-foreground/40 font-mono text-sm tracking-wider" data-testid="text-service-placeholder">
                    Hover a service
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-[1_1_60%]" onMouseLeave={() => setActiveIndex(null)}>
            {services.map((service, i) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                tabIndex={0}
                role="button"
                className="cursor-pointer border-b border-border/30 outline-none focus-visible:ring-2 focus-visible:ring-[#fcbd1c]/50 focus-visible:rounded-md"
                data-testid={`card-service-${i}`}
              >
                <div className="flex items-baseline gap-6 py-8 px-4">
                  <span
                    className={`font-mono text-sm tracking-wider transition-colors duration-300 ${activeIndex === i ? "text-[#fcbd1c]" : "text-muted-foreground"}`}
                    data-testid={`text-service-number-${i}`}
                  >
                    {`{${service.number}}`}
                  </span>
                  <h3
                    className={`font-display font-bold text-5xl xl:text-6xl tracking-tight transition-colors duration-300 ${activeIndex === i ? "text-foreground" : "text-muted-foreground"}`}
                    data-testid={`text-service-title-${i}`}
                  >
                    {service.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:hidden flex flex-col gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative overflow-hidden rounded-md"
              data-testid={`card-service-mobile-${i}`}
            >
              <Image src={service.image} alt={service.title} placeholder="blur" className="w-full h-64 object-cover" />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.85) 100%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="font-mono text-xs text-[#fcbd1c] tracking-wider" data-testid={`text-service-mobile-number-${i}`}>{`{${service.number}}`}</span>
                <h3 className="font-display font-bold text-3xl text-white mt-1" data-testid={`text-service-mobile-title-${i}`}>{service.title}</h3>
                <p className="text-white/70 text-sm mt-2">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

