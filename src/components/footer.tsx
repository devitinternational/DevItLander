"use client";
import { useState } from "react";
import { m as motion } from "framer-motion";
import { SiGithub, SiX, SiLinkedin, SiDribbble } from "react-icons/si";
import Image from "next/image";
import logo from "@/assets/images/DevItLHMMSquareTransparentYellow.png";
import { LegalDialog, type PolicyType } from "@/components/legal-dialog";

const socialLinks = [
  { icon: SiX, href: "https://x.com/devitinternational", label: "Twitter" },
  { icon: SiLinkedin, href: "https://www.linkedin.com/company/devitintl/", label: "LinkedIn" },
];

const footerLinks = [
  {
    title: "Services",
    links: ["Branding and Marketing", "Web Development", "Mobile Apps", "SEO & Analytics"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export default function Footer() {
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, groupTitle: string, link: string) => {
    e.preventDefault();
    if (groupTitle === "Legal") {
      setActivePolicy(link as PolicyType);
    }
  };

  return (
    <>
      <footer className="relative border-t border-border/30 pt-8 pb-4" data-testid="section-footer">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-start gap-9">
              <div className="flex flex-col items-center text-center gap-[0.5px]">
                <Image
                  src={logo}
                  alt="DevIt Logo"
                  className="h-16 lg:h-20 w-auto object-contain"
                />
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
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

            {footerLinks.map((group) => (
              <div key={group.title} className="flex flex-col">
                <h4 className="font-display font-semibold text-sm text-foreground mb-3">{group.title}</h4>
                <ul className="flex flex-col justify-start gap-[18px] flex-1 pb-1">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        onClick={(e) => handleLinkClick(e, group.title, link)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground" data-testid="text-copyright">
              {new Date().getFullYear()} DevIt. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Crafted with precision in Malaysia
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

