import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  image: string;
  imageAlt: string;
  variant?: "default" | "teal" | "dark";
  children?: ReactNode;
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  image,
  imageAlt,
  variant = "default",
  children,
}: HeroSectionProps) {
  const bgClass = {
    default: "bg-background",
    teal: "bg-teal-light",
    dark: "bg-foreground text-primary-foreground",
  }[variant];

  const buttonVariant = variant === "dark" ? "light" : "hero";

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className={`relative min-h-[80vh] py-16 md:py-24 overflow-hidden ${bgClass}`}>
      {/* Colorful floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-yellow/20 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-blue/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-green/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[60vh]">
          {/* Image with hexagonal shape */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            className="relative order-1 lg:order-1"
          >
            <div className="relative">
              {/* Decorative zigzag pattern */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 0.6, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-8 -right-8 w-full h-full pointer-events-none"
              >
                <svg 
                  viewBox="0 0 400 400" 
                  className="w-full h-full"
                  fill="none"
                >
                  {[...Array(25)].map((_, i) => (
                    <path
                      key={i}
                      d={`M${i * 20} 400 L${i * 20 + 200} 0`}
                      stroke="hsl(var(--teal))"
                      strokeWidth="1.5"
                      strokeOpacity="0.35"
                    />
                  ))}
                </svg>
              </motion.div>
              
              {/* Main image with organic hexagon shape */}
              <motion.div 
                className="relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden" style={{
                  clipPath: "polygon(25% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%, 0% 25%)"
                }}>
                  <motion.img
                    src={image}
                    alt={imageAlt}
                    className="w-full max-w-lg mx-auto object-cover aspect-[4/5]"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center lg:text-left order-2 lg:order-2"
          >
            {subtitle && (
              <motion.p 
                variants={itemVariants}
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4"
              >
                {subtitle}
              </motion.p>
            )}
            <motion.h1 
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-normal leading-tight mb-6 text-balance"
            >
              {title}
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className={`text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 ${variant === "dark" ? "text-primary-foreground/80" : "text-muted-foreground"}`}
            >
              {description}
            </motion.p>
            
            {children}

            {(primaryCta || secondaryCta) && (
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                {primaryCta && (
                  <Button variant={buttonVariant} size="lg" asChild className="group">
                    <Link to={primaryCta.href}>
                      {primaryCta.label}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                )}
                {secondaryCta && (
                  <Link 
                    to={secondaryCta.href}
                    className={`text-base font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-current after:origin-left after:scale-x-100 hover:after:scale-x-0 after:transition-transform after:duration-300 ${variant === "dark" ? "text-primary-foreground" : "text-foreground"}`}
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Scroll indicator - hexagon shape */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex justify-center mt-16"
        >
          <motion.a
            href="#content"
            className="w-20 h-20 clip-hexagon-vertical bg-teal flex items-center justify-center hover:bg-teal-dark transition-colors duration-300 cursor-pointer shadow-lg shadow-teal/30"
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.2, 
              ease: "easeInOut",
              delay: 0.5 
            }}
          >
            <ArrowDown className="w-7 h-7 text-foreground" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
