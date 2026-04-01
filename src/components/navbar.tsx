"use client";
import { useState, useEffect } from "react";
import { m as motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSVGUnderline from "@/components/animated-svg-underline";
import Image from "next/image";
import logo from "@/assets/images/DevItLHMMSquareTransparentYellow.png";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  // { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  onBookDemoClick?: () => void;
}

export default function Navbar({ onBookDemoClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    setScrolled(latest > 20);
    
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        initial="hidden"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
          }`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-20 lg:h-24">
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="link-logo"
            >
              <Image
                src={logo}
                alt="DevIt Logo"
                className="h-28 lg:h-40 w-auto object-contain"
              />
            </motion.a>

            <div className="hidden lg:flex items-baseline gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <AnimatedSVGUnderline
                    onClick={() => scrollTo(link.href)}
                    underlineColor="#fcbd1c"
                    strokeWidth={2.5}
                    gap={0}
                    duration={0.45}
                    className="px-5 py-2 text-base lg:text-lg text-muted-foreground"
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </AnimatedSVGUnderline>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="hidden lg:block"
              >
                <Button
                  onClick={onBookDemoClick}
                  className="bg-transparent border border-[#fcbd1c] text-[#fcbd1c] font-semibold text-base px-6 py-2 hover:bg-[#fcbd1c] hover:text-black transition-colors"
                  data-testid="button-book-demo"
                >
                  Book a Demo
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="hidden lg:block"
              >
                <Button
                  onClick={() => scrollTo("#contact")}
                  className="bg-[#fcbd1c] border-0 text-black font-semibold text-base px-6 py-2"
                  data-testid="button-get-started"
                >
                  Get Started
                </Button>
              </motion.div>

              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-20 px-6"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-2xl font-display font-medium py-3 text-foreground border-b border-border/30"
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="pt-4 space-y-3"
              >
                <Button
                  onClick={onBookDemoClick}
                  className="w-full bg-transparent border border-[#fcbd1c] text-[#fcbd1c] font-semibold hover:bg-[#fcbd1c] hover:text-black transition-colors"
                  data-testid="button-mobile-book-demo"
                >
                  Book a Demo
                </Button>
                <Button
                  onClick={() => scrollTo("#contact")}
                  className="w-full bg-[#fcbd1c] text-black font-semibold"
                  data-testid="button-mobile-get-started"
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
  

