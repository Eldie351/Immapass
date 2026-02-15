import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const BecomeMember = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t("membership.plans.basic.name"),
      price: t("membership.plans.basic.price"),
      period: t("membership.plans.basic.period"),
      description: t("membership.plans.basic.description"),
      features: [
        t("membership.plans.features.tracker"),
        t("membership.plans.features.checklist"),
        t("membership.plans.features.email"),
        t("membership.plans.features.kb"),
      ],
      cta: t("membership.plans.basic.cta"),
      popular: false,
    },
    {
      name: t("membership.plans.member.name"),
      price: t("membership.plans.member.price"),
      period: t("membership.plans.member.period"),
      description: t("membership.plans.member.description"),
      features: [
        t("membership.plans.features.basic_all"),
        t("membership.plans.features.lawyer"),
        t("membership.plans.features.guidance"),
        t("membership.plans.features.vault"),
        t("membership.plans.features.priority"),
        t("membership.plans.features.tracking"),
      ],
      cta: t("membership.plans.member.cta"),
      popular: true,
    },
    {
      name: t("membership.plans.premium.name"),
      price: t("membership.plans.premium.price"),
      period: t("membership.plans.premium.period"),
      description: t("membership.plans.premium.description"),
      features: [
        t("membership.plans.features.member_all"),
        t("membership.plans.features.consultation"),
        t("membership.plans.features.complex"),
        t("membership.plans.features.appeal"),
        t("membership.plans.features.manager"),
        t("membership.plans.features.express"),
      ],
      cta: t("membership.plans.premium.cta"),
      popular: false,
    },
  ];

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
              {t("membership.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("membership.description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${plan.popular
                  ? "bg-foreground text-primary-foreground border-2 border-teal"
                  : "bg-card border border-border"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-teal text-foreground text-sm font-medium px-3 py-1 rounded-full">
                      {t("membership.popular")}
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
                  <Link to="/become-a-member">
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
