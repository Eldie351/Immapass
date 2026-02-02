import { motion } from "framer-motion";
import { useState } from "react";

const partners = [
  { name: "Centennial College", description: "Partnered since 2021, supporting 500+ international students annually." },
  { name: "Queens University", description: "Premium partnership for graduate immigration services." },
  { name: "SAIT", description: "Exclusive PGWP and work permit support provider." },
  { name: "Thompson Rivers University", description: "Comprehensive immigration services for all international programs." },
  { name: "Durham College", description: "Official immigration partner for co-op students." },
  { name: "Nipissing University", description: "Supporting students with Express Entry pathways." },
  { name: "Ontario Tech University", description: "Technology sector immigration specialist partner." },
  { name: "St Thomas University", description: "Maritime region immigration support services." },
  { name: "Northern College", description: "Rural and Northern Immigration Pilot partner." },
  { name: "Trinity Western University", description: "Faith-based education immigration support." },
  { name: "Medicine Hat College", description: "Alberta immigration pathway specialist." },
  { name: "Humber College", description: "GTA's largest college immigration partner." },
  { name: "George Brown College", description: "Downtown Toronto immigration services hub." },
  { name: "Bow Valley College", description: "Calgary region immigration support center." },
  { name: "Fanshawe College", description: "Southwestern Ontario immigration specialist." }
];

function FlipCard({ partner, index }: { partner: typeof partners[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="flex-shrink-0 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative w-[200px] h-[80px]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-primary-foreground/10 px-6 py-4 rounded-lg border border-primary-foreground/20 hover:border-primary-foreground/40 hover:shadow-sm transition-all duration-300 flex items-center justify-center backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-sm font-medium text-primary-foreground/80 whitespace-nowrap hover:text-primary-foreground transition-colors text-center">
            {partner.name}
          </span>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 bg-primary/90 px-4 py-3 rounded-lg border border-primary flex items-center justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-xs text-primary-foreground text-center leading-tight">
            {partner.description}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export function PartnersSection() {
  const duplicatedPartners = [...partners, ...partners];
  
  return (
    <section className="py-16 md:py-20 bg-foreground overflow-hidden relative">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-foreground to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-foreground to-transparent z-10" />

      <div className="container mx-auto mb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-medium uppercase tracking-wider text-primary-foreground/70 text-base mt-0"
        >
          Trusted partner of leading learning institutions
        </motion.p>
      </div>

      {/* Marquee container */}
      <div className="relative mt-[50px]">
        <motion.div
          className="flex gap-6 md:gap-8"
          animate={{ x: [0, -208 * partners.length] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: partners.length * 5,
              ease: "linear"
            }
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <FlipCard key={`${partner.name}-${index}`} partner={partner} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
