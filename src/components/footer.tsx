"use client";
import { useState } from "react";
import { m as motion } from "framer-motion";
import { SiGithub, SiX, SiLinkedin, SiDribbble, SiInstagram } from "react-icons/si";
import Image from "next/image";
import logo from "@/assets/images/DevItLHMMSquareTransparentYellow.png";
import { LegalDialog, type PolicyType } from "@/components/legal-dialog";
import AnimatedSVGUnderline from "@/components/animated-svg-underline";

const socialLinks = [
  { icon: SiInstagram, href: "https://instagram.com/devitintl", label: "Instagram" },
  { icon: SiX, href: "https://x.com/devitintl", label: "Twitter" },
  { icon: SiLinkedin, href: "https://www.linkedin.com/company/devitintl/", label: "LinkedIn" },
];

const footerLinks = [
  {
    title: "Services",
    links: ["Branding & Marketing", "Web Development", "Mobile Apps", "SEO & Analytics"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export default function Footer() {
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const handleLinkClick = (e: any, groupTitle: string, link: string) => {
    if (e && e.preventDefault) e.preventDefault();
    if (groupTitle === "Legal") {
      setActivePolicy(link as PolicyType);
    }
  };

  return (
    <>
      <footer className="relative pt-8 pb-2" data-testid="section-footer">
        {/* Top glow rule */}
        <div className="absolute top-0 left-0 right-0 h-px glow-line" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-2">
            <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center gap-9">
              <div className="flex flex-col items-center text-center gap-[0.5px]">
                <Image
                  src={logo}
                  alt="DevIt Logo"
                  className="h-24 lg:h-32 w-auto object-contain"
                />
                <p className="text-sm italic text-[#ECECEC] whitespace-nowrap">
                  Limitless Hustle, Measured Mastery.
                </p>
              </div>

              <div className="flex justify-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 rounded-md bg-card border border-border/30 flex items-center justify-center text-muted-foreground hover-elevate hover:text-foreground transition-colors"
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {footerLinks.map((group, index) => (
              <div
                key={group.title}
                className={`flex flex-col items-center text-center md:items-start md:text-left ${group.title === "Legal" ? "md:-ml-16 lg:-ml-24" : ""
                  }`}
              >
                <h4 className="font-display font-semibold text-lg text-foreground mb-3">{group.title}</h4>
                <ul className="flex flex-col justify-start gap-3 flex-1 pb-1">
                  {group.links.map((link) => (
                    <li key={link}>
                      <AnimatedSVGUnderline
                        onClick={(e: any) => handleLinkClick(e, group.title, link)}
                        underlineColor="#fcbd1c"
                        strokeWidth={2}
                        gap={2}
                        duration={0.45}
                        className="text-base text-[#ECECEC] hover:text-[#fcbd1c] transition-colors cursor-pointer inline-block"
                        data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link}
                      </AnimatedSVGUnderline>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border/20 pt-4 flex justify-center items-center">
            <p className="text-sm text-muted-foreground text-center" data-testid="text-copyright">
              {new Date().getFullYear()} DevIt. All rights reserved. <span className="text-[#fcbd1c]/70 mx-1.5">&middot;</span> Crafted with precision in Malaysia
            </p>
          </div>
        </div>
      </footer>

      <LegalDialog
        policy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </>
  );
}

