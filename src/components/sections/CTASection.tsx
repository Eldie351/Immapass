import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  variant?: "default" | "teal" | "dark";
}

export function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = "teal",
}: CTASectionProps) {
  const bgClass = {
    default: "bg-background",
    teal: "bg-teal-light",
    dark: "bg-foreground text-primary-foreground",
  }[variant];

  const buttonVariant = variant === "dark" ? "light" : "hero";

  return (
    <section className={`py-16 md:py-24 ${bgClass} relative overflow-hidden`}>
      {/* Colorful decorative elements */}
      {variant === "teal" && (
        <>
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-green/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow/20 rounded-full blur-2xl" />
        </>
      )}
      {variant === "dark" && (
        <>
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal/10 rounded-full blur-3xl" />
        </>
      )}

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-6 text-balance">
            {title}
          </h2>
          {description && (
            <p className={`text-lg mb-8 ${variant === "dark" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              {description}
            </p>
          )}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button variant={buttonVariant} size="lg" asChild className="group">
              <Link to={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            {secondaryCta && (
              <Button 
                variant={variant === "dark" ? "heroOutline" : "outline"} 
                size="lg" 
                asChild
              >
                <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
