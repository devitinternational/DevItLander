"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { X, Calendar, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// ─── CONFIG ────────────────────────────────────────────────────────────────
// Option A: Set your Calendly URL here and USE_CALENDLY = true
// Option B: Set USE_CALENDLY = false to use the built-in form instead
const CALENDLY_URL = "https://calendly.com/your-username/free-consultation";
const USE_CALENDLY = false; // flip to true once you have a Calendly account
// ───────────────────────────────────────────────────────────────────────────

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const perks = [
  { icon: Clock, text: "30-min focused session" },
  { icon: Calendar, text: "Pick a time that suits you" },
  { icon: Zap, text: "Zero commitment, all value" },
];

function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="calendly-inline-widget w-full"
      data-url={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=fcbd1c`}
      style={{ minWidth: "320px", height: "620px" }}
    />
  );
}

function BookingForm({ onClose }: { onClose: () => void }) {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const slots = [
    "Morning (9am – 12pm)",
    "Afternoon (1pm – 5pm)",
    "Evening (6pm – 9pm)",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.target as HTMLFormElement;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      slot: (form.elements.namedItem("slot") as HTMLSelectElement).value,
      about: (form.elements.namedItem("about") as HTMLTextAreaElement).value,
      type: "consultation",
    };

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast({
        title: "Booking request sent!",
        description: "We'll confirm your slot within a few hours.",
      });
      onClose();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please email us directly at tech@devitinternational.com",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Name</label>
          <Input
            name="name"
            placeholder="Your name"
            required
            className="bg-background/60 border-border/40 h-10 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
          <Input
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            className="bg-background/60 border-border/40 h-10 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block">
          Preferred time slot
        </label>
        <select
          name="slot"
          required
          className="w-full h-10 rounded-md border border-border/40 bg-background/60 px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#fcbd1c]/50"
        >
          <option value="" disabled selected>
            Pick a time of day
          </option>
          {slots.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block">
          What's your project about?
        </label>
        <Textarea
          name="about"
          placeholder="Give us a quick overview — we'll come prepared."
          rows={3}
          required
          className="bg-background/60 border-border/40 resize-none text-sm"
        />
      </div>

      <Button
        type="submit"
        disabled={sending}
        className="w-full bg-[#fcbd1c] text-black font-semibold border-0 h-11 mt-1"
      >
        {sending ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
          />
        ) : (
          "Request My Free Call →"
        )}
      </Button>
    </form>
  );
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle gold glow top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#fcbd1c]/60 to-transparent" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-16 bg-[#fcbd1c] opacity-[0.04] blur-2xl rounded-full" />

              {/* Header */}
              <div className="relative px-6 pt-6 pb-5">
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 rounded-md border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <span className="text-xs font-mono text-[#fcbd1c] tracking-wider uppercase">
                  Free consultation
                </span>
                <h2 className="font-bold text-2xl mt-2 tracking-tight">
                  Let's talk about your{" "}
                  <span className="text-[#fcbd1c]">project</span>
                </h2>
                <p className="text-sm text-muted-foreground mt-1.5">
                  Book a free 30-minute call. No sales pitch — just honest advice.
                </p>

                {/* Perks row */}
                <div className="flex gap-4 mt-4 flex-wrap">
                  {perks.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon className="w-3.5 h-3.5 text-[#fcbd1c]" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/30 mx-6" />

              {/* Body */}
              <div className="px-6 py-5">
                {USE_CALENDLY ? <CalendlyEmbed /> : <BookingForm onClose={onClose} />}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}