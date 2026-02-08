import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, ChevronRight } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  variant?: "default" | "teal" | "tabs";
}

function FlipCard({ feature, index }: { feature: Feature; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const colorSchemes = [
    { bg: 'bg-blue/15', text: 'text-blue', border: 'border-blue/40', cardBg: 'bg-blue/90' },
    { bg: 'bg-yellow/20', text: 'text-yellow-dark', border: 'border-yellow/50', cardBg: 'bg-yellow/90' },
    { bg: 'bg-green/15', text: 'text-green', border: 'border-green/40', cardBg: 'bg-green/90' },
    { bg: 'bg-teal/15', text: 'text-teal-dark', border: 'border-teal/40', cardBg: 'bg-teal/90' },
  ];
  const colors = colorSchemes[index % colorSchemes.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-[220px] md:h-[240px]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border flex flex-col`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-5`}>
            <feature.icon className={`w-7 h-7 ${colors.text}`} />
          </div>
          <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
          <p className="text-muted-foreground text-sm">Click to learn more</p>
        </div>
        {/* Back */}
        <div
          className={`absolute inset-0 ${colors.cardBg} p-6 md:p-8 rounded-2xl shadow-lg border ${colors.border} flex flex-col justify-center`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className="text-lg font-semibold mb-3 text-foreground">{feature.title}</h3>
          <p className="text-foreground/90 leading-relaxed">{feature.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FeaturesSection({ title, subtitle, features, variant = "default" }: FeaturesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const bgClass = variant === "teal" ? "bg-teal-light" : "bg-background";

  if (variant === "tabs") {
    return (
      <section id="content" className={`py-16 md:py-24 ${bgClass}`}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {subtitle && (
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
                {subtitle}
              </p>
            )}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif">{title}</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Tabs */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.button
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-300 group ${
                    activeIndex === index
                      ? "bg-card border-teal shadow-md"
                      : "bg-transparent border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium transition-colors ${
                      activeIndex === index ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {feature.title}
                    </span>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      activeIndex === index ? "rotate-90 text-teal-dark" : "text-muted-foreground"
                    }`} />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Content */}
            <div className="relative min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm"
                >
                  <div className="w-14 h-14 rounded-xl bg-teal/20 flex items-center justify-center mb-5">
                    {(() => {
                      const Icon = features[activeIndex].icon;
                      return <Icon className="w-7 h-7 text-teal-dark" />;
                    })()}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{features[activeIndex].title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{features[activeIndex].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="content" className={`py-16 md:py-24 ${bgClass}`}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {subtitle && (
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
              {subtitle}
            </p>
          )}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif">{title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FlipCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
