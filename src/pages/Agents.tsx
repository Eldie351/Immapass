import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Users, Scale, Shield, DollarSign, Award, Handshake } from "lucide-react";
import heroImage from "@/assets/hero-agents.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Agents = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Scale,
      title: t("agents.features.compliance.title"),
      description: t("agents.features.compliance.description")
    },
    {
      icon: Shield,
      title: t("agents.features.risk.title"),
      description: t("agents.features.risk.description")
    },
    {
      icon: Users,
      title: t("agents.features.management.title"),
      description: t("agents.features.management.description")
    },
    {
      icon: DollarSign,
      title: t("agents.features.revenue.title"),
      description: t("agents.features.revenue.description")
    },
    {
      icon: Award,
      title: t("agents.features.success.title"),
      description: t("agents.features.success.description")
    },
    {
      icon: Handshake,
      title: t("agents.features.partnership.title"),
      description: t("agents.features.partnership.description")
    }
  ];

  return (
    <Layout>
      <HeroSection
        title={t("agents.hero.title")}
        subtitle={t("agents.hero.subtitle")}
        description={t("agents.hero.description")}
        primaryCta={{ label: t("agents.hero.cta"), href: "/contact" }}
        image={heroImage}
        imageAlt="Education agent working at computer"
        variant="teal"
      />

      <FeaturesSection
        title={t("agents.features.title")}
        subtitle={t("agents.features.subtitle")}
        features={features}
      />

      <CTASection
        title={t("agents.cta.title")}
        description={t("agents.cta.description")}
        primaryCta={{ label: t("agents.cta.primary"), href: "/contact" }}
        variant="dark"
      />
    </Layout>
  );
};

export default Agents;
