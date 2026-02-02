import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const getNavLinks = (t: (key: string) => string) => [
  { label: t("nav.newcomers"), href: "/newcomers" },
  { label: t("nav.schools"), href: "/institutions" },
  { label: t("nav.employers"), href: "/employers" },
  { label: t("nav.agents"), href: "/agents" },
  { label: t("nav.visa_refusal"), href: "/visa-refusal" },
  { label: t("nav.visitor_visas"), href: "/visitor-visas" },
  { label: t("nav.pgwp"), href: "/pgwp" },
  { label: t("nav.express_entry"), href: "/express-entry" },
  { label: t("nav.iec"), href: "/iec" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  const navLinks = getNavLinks(t);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-foreground backdrop-blur-sm border-b border-border">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-primary-foreground tracking-tight">Immipass</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary-foreground ${
                  location.pathname === link.href
                    ? "text-primary-foreground border-b-2 border-primary-foreground"
                    : "text-primary-foreground/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            
            <Button variant="hero" asChild className="group">
              <Link to="/become-a-member">
                {t("nav.get_started")}
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {t("nav.account")}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("nav.sign_out")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/auth"
                className="text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                {t("nav.login")}
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-primary-foreground" /> : <Menu className="w-6 h-6 text-primary-foreground" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    location.pathname === link.href
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-2 border-t border-border mt-4">
                <LanguageSwitcher variant="mobile" />
                <Button variant="hero" asChild className="w-full group">
                  <Link to="/become-a-member" onClick={() => setIsOpen(false)}>
                    {t("nav.get_started")}
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                {user ? (
                  <Button variant="ghost" onClick={handleSignOut} className="w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("nav.sign_out")}
                  </Button>
                ) : (
                  <Button variant="ghost" asChild className="w-full">
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      {t("nav.login")}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
