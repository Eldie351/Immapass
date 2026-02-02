import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    price: "$0",
    period: "to start",
    description: "Get started with basic immigration tools",
    features: [
      "Immigration timeline tracker",
      "Document checklist",
      "Email support",
      "Knowledge base access",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Member",
    price: "$99",
    period: "per application",
    description: "Full support for your immigration application",
    features: [
      "Everything in Basic",
      "Licensed lawyer review",
      "Personalized guidance",
      "Document vault",
      "Priority support",
      "Application tracking",
    ],
    cta: "Become a Member",
    popular: true,
  },
  {
    name: "Premium",
    price: "$299",
    period: "per application",
    description: "Comprehensive legal support",
    features: [
      "Everything in Member",
      "1-on-1 lawyer consultation",
      "Complex case support",
      "Appeal assistance",
      "Dedicated case manager",
      "Express processing",
    ],
    cta: "Get Premium",
    popular: false,
  },
];

const BecomeMember = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
              Join Immipass Today
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that's right for your immigration journey. All plans include access to our platform and community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-foreground text-primary-foreground border-2 border-teal"
                    : "bg-card border border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-teal text-foreground text-sm font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`mt-2 text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "text-teal" : "text-teal-dark"}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "light" : "hero"}
                  className="w-full group"
                  asChild
                >
                  <Link to="#">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BecomeMember;
