import dynamic from 'next/dynamic';
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ScrollToTop from "@/components/scroll-to-top";

const Services = dynamic(() => import("@/components/services"));
const Portfolio = dynamic(() => import("@/components/portfolio"));
const Process = dynamic(() => import("@/components/process"));
const Testimonials = dynamic(() => import("@/components/testimonials"));
const Contact = dynamic(() => import("@/components/contact"));
const Footer = dynamic(() => import("@/components/footer"));

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
