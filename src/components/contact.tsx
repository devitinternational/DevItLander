"use client";
import { m as motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import InteractiveGradient from "./interactive-gradient";

function GradientCard({
  children,
  className = "",
  testId,
}: {
  children: React.ReactNode;
  className?: string;
  testId?: string;
}) {
  return (
    <Card
      className={`relative overflow-hidden border-border/50 ${className}`}
      data-testid={testId}
    >
      <InteractiveGradient
        color1="rgba(252, 189, 28, 0.18)"
        color2="rgba(220, 165, 20, 0.12)"
        color3="rgba(255, 205, 60, 0.10)"
        blur={60}
        brightness={1}
        loopDuration={20}
        orbitRadius={30}
        followStrength={0.4}
      />
      <div className="relative z-10">{children}</div>
    </Card>
  );
}

interface ContactProps {
  onBookDemoClick?: () => void;
}

export default function Contact({ onBookDemoClick }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.target as HTMLFormElement;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      projectType: (form.elements.namedItem("projectType") as HTMLInputElement)
        .value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    } catch {
      toast({
        title: "Failed to send!",
        description: "Please try again or email us directly.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-32"
      data-testid="section-contact"
    >
      <div className="absolute top-0 left-0 right-0 h-px glow-line" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-[#fcbd1c] rounded-full opacity-[0.03] blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-mono text-[#fcbd1c] tracking-wider uppercase">
            Get in touch
          </span>
          <h2
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mt-4 tracking-tight"
            data-testid="text-contact-title"
          >
            Ready When <span className="text-[#fcbd1c]">You Are</span>
          </h2>
          <p className="mt-6 text-[16px] lg:text-[18px] text-[#ECECEC] max-w-2xl mx-auto">
            Drop us a message. We reply within 24 hours.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GradientCard
                className="bg-card/50 backdrop-blur-sm h-full"
                testId="card-contact-email"
              >
                <div className="flex items-start gap-4 p-6">
                  <div className="w-10 h-10 rounded-md bg-[#ffff00]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#fcbd1c]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      Reach Out
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      tech@devitinternational.com
                    </p>
                  </div>
                </div>
              </GradientCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GradientCard
                className="bg-card/50 backdrop-blur-sm h-full"
                testId="card-contact-location"
              >
                <div className="flex items-start gap-4 p-6">
                  <div className="w-10 h-10 rounded-md bg-[#fcbd1c]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#fcbd1c]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      Based In
                    </h3>
                    <p className="text-sm text-muted-foreground">Malaysia</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Working with clients worldwide
                    </p>
                  </div>
                </div>
              </GradientCard>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GradientCard
              className="bg-card/50 backdrop-blur-sm"
              testId="card-contact-form"
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-6 md:p-8"
                data-testid="form-contact"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Name
                    </label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-background/50 border-border/50 cursor-text"
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      className="bg-background/50 border-border/50 cursor-text"
                      data-testid="input-email"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Project type
                  </label>
                  <Input
                    name="projectType"
                    placeholder="e.g. Web Application, Mobile App, Redesign"
                    className="bg-background/50 border-border/50 cursor-text"
                    data-testid="input-project-type"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    rows={5}
                    required
                    className="bg-background/50 border-border/50 resize-none cursor-text"
                    data-testid="input-message"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#fcbd1c] border-0 text-black font-semibold"
                  data-testid="button-send-message"
                >
                  {sending ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                    />
                  ) : (
                    <>
                      Send message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </GradientCard>
          </motion.div>

          {/* Book a Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-6">
              Prefer a quick call instead? Book a free 30-minute demo call with our
              team.
            </p>
            <Button
              onClick={onBookDemoClick}
              className="bg-transparent border-2 border-[#fcbd1c] text-[#fcbd1c] font-semibold px-8 py-3 hover:bg-[#fcbd1c] hover:text-black transition-all"
              data-testid="button-contact-book-demo"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book A Call
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
