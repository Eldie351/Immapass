import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialsSectionProps {
  title: string;
  testimonials: Testimonial[];
}

export function TestimonialsSection({ title, testimonials }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 md:py-24 bg-foreground text-primary-foreground overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image collage */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[500px]">
              {/* Decorative shapes */}
              <div className="absolute top-0 left-0 w-48 h-48 clip-hexagon-vertical bg-teal/20" />
              <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow/30 rounded-lg rotate-12" />
              
              {/* Main images */}
              <motion.div 
                className="absolute top-10 left-20 w-56 h-72 overflow-hidden rounded-2xl shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className="w-full h-full bg-gradient-to-br from-teal/40 to-teal-dark/40" />
              </motion.div>
              <motion.div 
                className="absolute bottom-10 right-10 w-48 h-64 overflow-hidden rounded-2xl shadow-2xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-cream/20 to-cream-dark/20" />
              </motion.div>
            </div>
          </motion.div>

          {/* Testimonial content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-balance">{title}</h2>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center gap-3 mb-8">
              <p className="text-sm text-primary-foreground/60">What students are saying</p>
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Testimonial card */}
            <div className="relative min-h-[250px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-primary-foreground/10"
                >
                  <Quote className="w-10 h-10 text-teal mb-4" />
                  <blockquote className="text-xl md:text-2xl font-serif mb-6 leading-relaxed">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-lg">{testimonials[currentIndex].author}</p>
                    <p className="text-primary-foreground/60">{testimonials[currentIndex].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-teal w-6" : "bg-primary-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
