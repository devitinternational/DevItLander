"use client";
import { m as motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
    {
        category: "Timelines",
        question: "How long does it take to build a website or app?",
        answer:
            "Timelines vary by scope — a marketing website typically takes 1-3 weeks, while a full mobile app can take 8–16 weeks. We give you a detailed timeline before work begins, and nothing moves forward without your sign-off.",
    },
    {
        category: "Pricing",
        question: "How much does a project cost?",
        answer:
            "Every project is scoped individually. Pricing depends on complexity, features, and timeline. We offer transparent, fixed-price quotes — no surprise invoices mid-project.",
    },
    {
        category: "Clients",
        question: "Do you work with early-stage startups or only established businesses?",
        answer:
            "Both. We work with founders building their first product and with established brands looking to upgrade or scale. What matters is clarity of vision and commitment to the project.",
    },
    {
        category: "Ownership",
        question: "Will I own the code and design after the project?",
        answer:
            "Yes, 100%. Once the project is delivered and paid for, all code, designs, and assets belong to you entirely.",
    },
    {
        category: "Redesigns",
        question: "Can you redesign an existing website or app?",
        answer:
            "Absolutely. Redesigns and revamps are a significant part of what we do — whether you need a full overhaul or targeted improvements to specific sections or flows.",
    },
    {
        category: "Support",
        question: "Do you offer ongoing support and maintenance after launch?",
        answer:
            "Yes. We offer post-launch support and maintenance packages so your product stays updated, secure, and performant over time. We don't disappear after delivery.",
    },
    {
        category: "Process",
        question: "What's your development process like?",
        answer:
            "We follow a four-stage process: Discovery → Design → Develop → Deploy. Each stage has clear deliverables and client checkpoints. Nothing moves to the next stage until you approve the current one.",
    },
    {
        category: "Mobile",
        question: "Do you build for both iOS and Android?",
        answer:
            "Yes. We build cross-platform mobile apps that run natively on both iOS and Android, keeping costs efficient without sacrificing quality or performance.",
    },
    {
        category: "Branding",
        question: "Can you help with branding before building the product?",
        answer:
            "Yes. Our branding and identity service can run ahead of or alongside the build — logos, colour systems, typography, and brand guidelines that inform the entire product.",
    },
    {
        category: "Growth",
        question: "Do you also handle SEO and post-launch growth?",
        answer:
            "We do. Our SEO and analytics service covers technical SEO, on-page optimisation, and analytics setup so you can measure performance and make informed decisions from day one.",
    },
    {
        category: "Communication",
        question: "How do we communicate during the project?",
        answer:
            "You'll have a dedicated point of contact throughout. We use structured check-ins, shared project boards, and regular updates — so you're never left guessing where things stand.",
    },
    {
        category: "Location",
        question: "Where are you based, and do you work with international clients?",
        answer:
            "We're based in Malaysia and work with clients globally. Our team is remote-ready and experienced in managing projects across time zones.",
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
            className="group"
            data-testid={`faq-item-${index}`}
        >
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full text-left flex items-center gap-4 py-6 focus:outline-none"
                id={`faq-btn-${index}`}
            >
                {/* Category pill — fixed width so questions stay in one column */}
                <span className="shrink-0 inline-flex items-center justify-center w-24 px-2 py-1 rounded-md text-[9px] font-mono tracking-widest uppercase bg-[#fcbd1c]/10 text-[#fcbd1c] border border-[#fcbd1c]/15 truncate">
                    {faq.category}
                </span>

                {/* Question */}
                <span className="flex-1 font-display font-semibold text-base md:text-lg text-foreground leading-snug group-hover:text-[#fcbd1c] transition-colors duration-200">
                    {faq.question}
                </span>

                {/* Toggle icon */}
                <span className="shrink-0 ml-2 w-7 h-7 rounded-md border border-border/60 flex items-center justify-center transition-all duration-200 group-hover:border-[#fcbd1c]/40">
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
                        {/* Indent answer to align under question text (pill width 96px + gap 16px) */}
                        <p className="pb-6 pl-[calc(6rem+1rem)] pr-10 text-muted-foreground leading-relaxed text-sm md:text-base font-body">
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

export default function FAQ() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section id="faq" className="relative py-32" data-testid="section-faq">
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
                    className="text-center mb-20"
                >
                    <span className="text-sm font-mono text-[#fcbd1c] tracking-wider uppercase">
                        FAQ
                    </span>
                    <h2
                        className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mt-4 tracking-tight"
                        data-testid="text-faq-title"
                    >
                        Common <span className="text-gradient">questions</span>
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
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
                    {/* Inner top glow accent */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#fcbd1c]/30 to-transparent" />

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
                    <a
                        href="#contact"
                        className="text-[#fcbd1c] underline underline-offset-4 hover:opacity-80 transition-opacity duration-150 font-medium"
                    >
                        Drop us a message
                    </a>{" "}
                    and we'll get back to you.
                </motion.p>
            </div>
        </section>
    );
}
