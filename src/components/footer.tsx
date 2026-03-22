"use client";
import { m as motion } from "framer-motion";
import { SiGithub, SiX, SiLinkedin, SiDribbble } from "react-icons/si";
import Image from "next/image";
import logo from "@/assets/images/DevItLHMMSquareTransparentYellow.png";
const socialLinks = [
  { icon: SiGithub, href: "#", label: "GitHub" },
  { icon: SiX, href: "#", label: "X" },
  { icon: SiLinkedin, href: "#", label: "LinkedIn" },
  { icon: SiDribbble, href: "#", label: "Dribbble" },
];

const footerLinks = [
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press"],
  },
  {
    title: "Services",
    links: ["Web Development", "Mobile Apps", "UI/UX Design", "Consulting"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/30 pt-16 pb-8" data-testid="section-footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 flex flex-col items-center">
            <div className="flex flex-col items-center text-center gap-2 mb-4">
              <Image
                src={logo}
                alt="DevIt Logo"
                className="h-28 lg:h-40 w-auto object-contain"
              />
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                Limitless Hustle, Measured Mastery.
              </p>
            </div>

            <div className="flex justify-center gap-3 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-md bg-card border border-border/30 flex items-center justify-center text-muted-foreground hover-elevate"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-display font-semibold text-sm text-foreground mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground"
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
  );
}

