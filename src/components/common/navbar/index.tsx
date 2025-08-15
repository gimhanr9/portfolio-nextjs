"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import LanguageSelector from "../language-selector";
import ThemeToggle from "../theme-toggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [pathname]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { href: "#home", labelKey: "navigation.home", sectionId: "home" },
    { href: "#about", labelKey: "navigation.about", sectionId: "about" },
    {
      href: "#projects",
      labelKey: "navigation.projects",
      sectionId: "projects",
    },
    { href: "#contact", labelKey: "navigation.contact", sectionId: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-background/0"
      }`}
    >
      <div className="container px-4 md:px-6 flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
        >
          {/* Logo Image - Responsive sizing */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200">
            <Image
              src="/images/logo.jpg"
              alt={`${siteConfig.name} Logo`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 32px, (max-width: 768px) 36px, 40px"
              priority
            />
          </div>
          {/* Site Name - Responsive text sizing */}
          <span className="text-lg sm:text-xl md:text-xl font-bold bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.sectionId)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {t(link.labelKey)}
            </button>
          ))}
          <LanguageSelector />
          <ThemeToggle />
        </nav>
        <div className="flex md:hidden items-center gap-4">
          <LanguageSelector />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-sm"
          >
            <div className="container px-4 md:px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => scrollToSection(link.sectionId)}
                    className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                      pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {t(link.labelKey)}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
