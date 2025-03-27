import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "./container"; // Ensure this import exists
import { MainRoutes } from "../lib/helpers";
import clsx from "clsx"; // Import clsx for better class handling

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  hoverColor: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, hoverColor, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={clsx("transition-colors duration-300", hoverColor)}
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => {
  return (
    <li>
      <Link
        to={to}
        className="hover:underline text-gray-400 transition-colors duration-200 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {MainRoutes.map((route) => (
                <FooterLink key={route.href} to={route.href}>
                  {route.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-semibold text-lg text-white mb-4">About Us</h3>
            <p className="text-sm leading-relaxed">
              We are dedicated to enhancing your interview skills with AI-driven preparation. 
              Our platform offers tailored resources to maximize your career success.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {/* <FooterLink to="/serew-prepvices/intervi">Interview Preparation</FooterLink> */}
              <FooterLink to="/generate">Interview Preparation</FooterLink>
              {/* <FooterLink to="/services/career-coaching">Career Coaching</FooterLink> */}
              <FooterLink to="/resume-builder">Resume Building</FooterLink>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="font-semibold text-lg text-white mb-4">Contact Us</h3>
            <p className="mb-4 text-sm"> 
              Pathankot Punjab 145025</p>
            <div className="flex gap-4">
              <SocialLink
                href="https://facebook.com"
                icon={<Facebook size={24} />}
                hoverColor="hover:text-blue-500"
                label="Facebook"
              />
              <SocialLink
                href="https://twitter.com"
                icon={<Twitter size={24} />}
                hoverColor="hover:text-blue-400"
                label="Twitter"
              />
              <SocialLink
                href="https://instagram.com"
                icon={<Instagram size={24} />}
                hoverColor="hover:text-pink-500"
                label="Instagram"
              />
              <SocialLink
                href="https://linkedin.com"
                icon={<Linkedin size={24} />}
                hoverColor="hover:text-blue-700"
                label="LinkedIn"
              />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Mock Ready. All Rights Reserved By Mohit Dogra.
        </div>
      </Container>
    </footer>
  );
};
