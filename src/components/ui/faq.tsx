"use client";
import { m as motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
    {
        category: "Timelines",
        question: "How long does it take?",
        answer:
            "A marketing website usually takes 1–3 weeks. A full mobile app, 8–16 weeks. You get a detailed timeline upfront, and nothing moves forward without your sign-off.",
    },
    {
        category: "Clients",
        question: "Do you work with early-stage startups or only established businesses?",
        answer:
            "Both. Some of our favourite projects started as napkin ideas. If you've got a clear problem to solve, we can help build the solution.",
    },
    {
        category: "Ownership",
        question: "Will I own the code and design after the project?",
        answer:
            "Yes — fully. Once the project is paid and delivered, everything is yours. No lock-ins, no licensing fees.",
    },
    {
        category: "Location",
        question: "Where are you based, and do you work with clients outside Malaysia?",
        answer:
            "We're based in Malaysia and work with clients worldwide. Most of our process is async-friendly, so time zones rarely get in the way.",
    },
    {
        category: "Support",
        question: "What happens after launch?",
        answer:
            "Launch is the beginning, not the end. We offer ongoing support and maintenance, and stay available if things need tweaking post-go-live.",
    },
];

function FAQItem({
    faq,
    index,
    isOpen,
    onToggle,
}: {
    faq: (typeof faqs)[0];
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className="group relative"
            data-testid={`faq-item-${index}`}
        >
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full text-left flex justify-center md:justify-start items-center py-6 focus:outline-none relative"
                id={`faq-btn-${index}`}
            >
                {/* Category pill — centered on mobile, fixed width on PC */}
                <span className="shrink-0 inline-flex items-center justify-center w-24 px-2 py-1 rounded-md text-[9px] font-mono tracking-widest uppercase bg-[#fcbd1c]/10 text-[#fcbd1c] border border-[#fcbd1c]/15 truncate">
                    {faq.category}
                </span>

                {/* Question (Hidden on mobile) */}
                <span className="hidden md:block md:ml-4 flex-1 font-display font-semibold text-lg text-foreground leading-snug group-hover:text-[#fcbd1c] transition-colors duration-200">
                    {faq.question}
                </span>

                {/* Toggle icon */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 md:static md:translate-y-0 shrink-0 md:ml-2 w-7 h-7 rounded-md border border-border/60 flex items-center justify-center transition-all duration-200 group-hover:border-[#fcbd1c]/40">
                    <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="flex"
                    >
                        <Plus className="w-3.5 h-3.5 text-[#fcbd1c]" />
                    </motion.span>
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                        id={`faq-answer-${index}`}
                    >
                        {/* Mobile Question Header */}
                        <div className="md:hidden flex flex-col items-center text-center px-4 pb-4">
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#fcbd1c]/40 to-transparent mb-5" />
                            <span className="font-display font-semibold text-sm text-foreground leading-snug mb-2">
                                {faq.question}
                            </span>
                        </div>

                        {/* Indent answer to align under question text on PC (pill width 96px + gap 16px) */}
                        <p className="pb-6 md:pl-[calc(6rem+1rem)] md:pr-10 text-foreground/80 leading-relaxed text-sm md:text-base font-body text-center md:text-left px-4 md:px-0">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Divider */}
            <div className="h-px w-full bg-border/40 group-last:hidden" />
        </motion.div>
    );
}

interface FAQProps {
    onBookDemoClick?: () => void;
}

export default function FAQ({ onBookDemoClick }: FAQProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section id="faq" className="relative pt-20 pb-32" data-testid="section-faq">
            {/* Top glow rule */}
            <div className="absolute top-0 left-0 right-0 h-px glow-line" />

            {/* Subtle ambient glow */}
            <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                aria-hidden="true"
            >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#fcbd1c]/4 blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto px-6 lg:px-8" ref={ref}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="text-sm font-mono text-[#fcbd1c] tracking-wider uppercase">
                        FAQ
                    </span>
                    <h2
                        className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mt-4 tracking-tight"
                        data-testid="text-faq-title"
                    >
                        Got <span className="text-gradient">Questions?</span>
                    </h2>
                    <p className="mt-6 text-[16px] lg:text-[18px] text-[#ECECEC] max-w-2xl mx-auto font-body">
                        Everything you need to know before we start building together.
                    </p>
                </motion.div>

                {/* FAQ list */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative rounded-2xl border border-border/50 bg-card/40 overflow-hidden divide-y divide-border/40 px-6 md:px-10"
                >


                    {faqs.map((faq, i) => (
                        <FAQItem
                            key={i}
                            faq={faq}
                            index={i}
                            isOpen={openIndex === i}
                            onToggle={() => toggle(i)}
                        />
                    ))}

                    {/* Inner bottom glow accent */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#fcbd1c]/20 to-transparent" />
                </motion.div>

                {/* Bottom CTA nudge */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center text-sm text-muted-foreground mt-10"
                >
                    Still have questions?{" "}
                    <button
                        onClick={onBookDemoClick}
                        className="text-[#fcbd1c] underline underline-offset-4 hover:opacity-80 transition-opacity duration-150 font-medium"
                    >
                        Send an Email
                    </button>
                </motion.p>
            </div>
        </section>
    );
}
