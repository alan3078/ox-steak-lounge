"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  UtensilsCrossed,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  
  const contactInfo = [
    {
      icon: MapPin,
      text: t("address"),
    },
    {
      icon: Phone,
      text: t("phone"),
    },
    {
      icon: Mail,
      text: t("email"),
    },
    {
      icon: Clock,
      text: t("hours"),
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
  ];

  const quickLinks = [
    { label: t("menu"), href: "/#menu" },
    { label: t("blog"), href: "/blog" },
    { label: t("contact"), href: "/#footer" },
  ];

  return (
    <footer id="footer" className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="w-8 h-8 text-secondary" />
              <span className="text-2xl font-bold">
                {t("brand")}
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              {t("footerDescription")}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 text-secondary">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-secondary transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="text-xl font-bold mb-4 text-secondary">{t("contactUs")}</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <info.icon className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <span>{info.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <Separator className="bg-gray-800 mb-8" />

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-xl font-bold mb-2">{t("newsletter")}</h3>
          <p className="text-muted-foreground mb-4">
            {t("newsletterDescription")}
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="flex-1 px-4 py-2 rounded bg-muted border border-border focus:border-secondary focus:outline-none text-foreground"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded transition-colors"
            >
              {t("subscribe")}
            </motion.button>
          </div>
        </motion.div>

        <Separator className="bg-gray-800 mb-8" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm"
        >
          <p>&copy; {new Date().getFullYear()} {t("copyright")}</p>
          <div className="flex justify-center gap-6 mt-2">
            <a href="#" className="hover:text-secondary transition-colors">
              {t("privacyPolicy")}
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              {t("termsOfService")}
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              {t("cookiePolicy")}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
