import { motion } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface StepsSectionProps {
  title: string;
  subtitle?: string;
  steps: Step[];
}

export function StepsSection({ title, subtitle, steps }: StepsSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background via-yellow-light/10 to-background overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary bg-primary/10 px-4 py-2 rounded-full mb-4"
            >
              {subtitle}
            </motion.p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif max-w-3xl mx-auto leading-tight">
            {title}
          </h2>
        </motion.div>

        {/* Creative staggered cards layout */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                className={`relative ${index % 2 === 1 ? 'lg:mt-12' : 'lg:-mt-4'}`}
              >
                <motion.div
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 40px -15px hsl(var(--blue) / 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-card border border-border/50 rounded-2xl p-6 h-full overflow-hidden"
                >
                  {/* Colorful gradient overlay based on index */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    index === 0 ? 'bg-gradient-to-br from-blue/10 via-transparent to-teal/10' :
                    index === 1 ? 'bg-gradient-to-br from-yellow/10 via-transparent to-green/10' :
                    index === 2 ? 'bg-gradient-to-br from-green/10 via-transparent to-blue/10' :
                    'bg-gradient-to-br from-teal/10 via-transparent to-yellow/10'
                  }`} />
                  
                  {/* Large background number with color */}
                  <span className={`absolute -top-4 -right-2 text-[120px] font-bold leading-none select-none pointer-events-none ${
                    index === 0 ? 'text-blue/10' :
                    index === 1 ? 'text-yellow/15' :
                    index === 2 ? 'text-green/10' :
                    'text-teal/10'
                  }`}>
                    {step.number}
                  </span>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Step indicator with color */}
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div 
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          index === 0 ? 'bg-blue/15 border border-blue/30' :
                          index === 1 ? 'bg-yellow/20 border border-yellow/40' :
                          index === 2 ? 'bg-green/15 border border-green/30' :
                          'bg-teal/15 border border-teal/30'
                        }`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <span className={`text-sm font-bold ${
                          index === 0 ? 'text-blue' :
                          index === 1 ? 'text-yellow-dark' :
                          index === 2 ? 'text-green' :
                          'text-teal-dark'
                        }`}>{step.number}</span>
                      </motion.div>
                      <div className={`h-px flex-1 bg-gradient-to-r to-transparent ${
                        index === 0 ? 'from-blue/30' :
                        index === 1 ? 'from-yellow/40' :
                        index === 2 ? 'from-green/30' :
                        'from-teal/30'
                      }`} />
                    </div>

                    <h3 className={`text-lg font-semibold mb-3 text-foreground transition-colors duration-300 ${
                      index === 0 ? 'group-hover:text-blue' :
                      index === 1 ? 'group-hover:text-yellow-dark' :
                      index === 2 ? 'group-hover:text-green' :
                      'group-hover:text-teal-dark'
                    }`}>
                      {step.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Corner accent with color */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
                    <div className={`absolute bottom-0 right-0 w-32 h-32 transform translate-x-1/2 translate-y-1/2 rounded-full group-hover:scale-150 transition-transform duration-500 ${
                      index === 0 ? 'bg-gradient-to-tl from-blue/15 to-transparent' :
                      index === 1 ? 'bg-gradient-to-tl from-yellow/20 to-transparent' :
                      index === 2 ? 'bg-gradient-to-tl from-green/15 to-transparent' :
                      'bg-gradient-to-tl from-teal/15 to-transparent'
                    }`} />
                  </div>
                </motion.div>

                {/* Arrow connector for mobile/tablet */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="flex justify-center py-4 lg:hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <svg className="w-6 h-6 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
