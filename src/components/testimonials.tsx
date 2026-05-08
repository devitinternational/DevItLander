"use client";
import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, NovaPay",
    content: "DevIt transformed our payment platform from the ground up. Their attention to detail and technical expertise is unmatched. The result exceeded every expectation.",
    initials: "SC",
    rating: 5,
  },
  {
    name: "Marcus Rivera",
    role: "Founder, Artisan",
    content: "Working with DevIt felt like having a world-class engineering team in-house. They understood our vision from day one and delivered a product that truly stands out.",
    initials: "MR",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "CTO, HealthSync",
    content: "The speed and quality of delivery blew us away. DevIt handled the complexity of our telehealth platform with incredible professionalism and care.",
    initials: "EW",
    rating: 5,
  },
  {
    name: "James Park",
    role: "VP Engineering, Kinetik",
    content: "They shipped our MVP in record time without cutting corners. Clean code, great communication, and a seamless handoff. We've already engaged them for phase two.",
    initials: "JP",
    rating: 5,
  },
  {
    name: "Amara Osei",
    role: "Product Lead, Vyntra",
    content: "DevIt doesn't just build — they think. Their strategic input on UX saved us months of iteration. The final product feels premium and intuitive.",
    initials: "AO",
    rating: 5,
  },
  {
    name: "Liam Foster",
    role: "Co-founder, Stackdrop",
    content: "We came to DevIt with a rough idea and left with a polished product. Their design sensibility and engineering rigor are on another level entirely.",
    initials: "LF",
    rating: 5,
  },
];

const col1 = [testimonials[0], testimonials[1], testimonials[2]];
const col2 = [testimonials[3], testimonials[4], testimonials[5]];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <Card
      className="p-5 bg-card/50 backdrop-blur-sm border-border/50 flex flex-col"
      data-testid={`card-testimonial-${index}`}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, j) => (
          <Star key={j} className="w-3 h-3 fill-[#ffff00] text-[#ffff00]" />
        ))}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5 font-body">
        "{testimonial.content}"
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-border/30">
        <Avatar className="w-9 h-9">
          <AvatarFallback className="bg-[#ffff00]/15 text-[#ffff00] text-xs font-display font-semibold">
            {testimonial.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium text-foreground">{testimonial.name}</div>
          <div className="text-xs text-muted-foreground">{testimonial.role}</div>
        </div>
      </div>
    </Card>
  );
}

function ScrollColumn({
  items,
  direction = "up",
  speed = 25,
  startIndex = 0,
}: {
  items: typeof testimonials;
  direction?: "up" | "down";
  speed?: number;
  startIndex?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden group"
      style={{ height: "600px" }}
    >
      <div
        className="flex flex-col gap-4"
        style={{
          animation: `flow-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard
            key={`${t.name}-${i}`}
            testimonial={t}
            index={startIndex + (i % items.length)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="relative py-32" data-testid="section-testimonials">
      <div className="absolute top-0 left-0 right-0 h-px glow-line" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-mono text-[#ffff00] tracking-wider uppercase">Testimonials</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mt-4 tracking-tight" data-testid="text-testimonials-title">
            What our <span className="text-gradient">clients</span> say
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Don't just take our word for it. Here's what the people we've worked with have to say.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

          <div className="hidden md:grid grid-cols-2 gap-5">
            <ScrollColumn items={col1} direction="up" speed={30} startIndex={0} />
            <ScrollColumn items={col2} direction="down" speed={35} startIndex={3} />
          </div>

          <div className="md:hidden">
            <ScrollColumn items={testimonials} direction="up" speed={40} startIndex={0} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

