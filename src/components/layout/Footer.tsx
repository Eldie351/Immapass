import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    services: [
      { label: t("nav.newcomers"), href: "/newcomers" },
      { label: t("nav.schools"), href: "/institutions" },
      { label: t("nav.employers"), href: "/employers" },
      { label: t("footer.education_agents"), href: "/agents" },
      { label: t("nav.visa_refusal"), href: "/visa-refusal" },
      { label: t("nav.visitor_visas"), href: "/visitor-visas" },
      { label: t("nav.pgwp"), href: "/pgwp" },
      { label: t("nav.express_entry"), href: "/express-entry" },
      { label: t("nav.iec"), href: "/iec" },
    ],
    about: [
      { label: t("footer.about_us"), href: "#" },
      { label: t("footer.contact"), href: "#" },
      { label: t("footer.careers"), href: "#" },
    ],
    legal: [
      { label: t("footer.terms"), href: "#" },
      { label: t("footer.privacy"), href: "#" },
      { label: t("footer.accessibility"), href: "#" },
    ],
  };

  return (
    <footer className="bg-foreground text-primary-foreground relative overflow-hidden">
      {/* Colorful accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-primary-foreground tracking-tight">Immipass</span>
            </Link>
            <p className="text-sm text-primary-foreground/70 max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t("footer.services")}</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t("footer.about")}</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t("footer.legal")}</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} Immipass. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
