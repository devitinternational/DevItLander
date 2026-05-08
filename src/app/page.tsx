"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import { StarsBackground } from "@/components/ui/stars-background";
import BookingModal from "@/components/ui/booking-modal";
import ScrollToTop from "@/components/scroll-to-top";

const Services = dynamic(() => import("@/components/services"));
const Portfolio = dynamic(() => import("@/components/portfolio"));
const Process = dynamic(() => import("@/components/process"));
const FAQ = dynamic(() => import("@/components/ui/faq"));
const Testimonials = dynamic(() => import("@/components/testimonials"));
const Contact = dynamic(() => import("@/components/contact"));
const Footer = dynamic(() => import("@/components/footer"));

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar onBookDemoClick={() => setBookingModalOpen(true)} />
      <StarsBackground>
        <Hero />
      </StarsBackground>
      <Services />
      <Portfolio />
      <Process />
      <FAQ onBookDemoClick={() => setBookingModalOpen(true)} />
      <Contact onBookDemoClick={() => setBookingModalOpen(true)} />
      <Footer />
      <ScrollToTop />
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
