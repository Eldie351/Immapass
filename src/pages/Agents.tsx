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
    { icon: Scale, title: t("agents.feature1.title"), description: t("agents.feature1.description") },
    { icon: Shield, title: t("agents.feature2.title"), description: t("agents.feature2.description") },
    { icon: Users, title: t("agents.feature3.title"), description: t("agents.feature3.description") },
    { icon: DollarSign, title: t("agents.feature4.title"), description: t("agents.feature4.description") },
    { icon: Award, title: t("agents.feature5.title"), description: t("agents.feature5.description") },
    { icon: Handshake, title: t("agents.feature6.title"), description: t("agents.feature6.description") },
  ];

  return (
    <Layout>
      <HeroSection
        title={t("agents.hero.title")}
        description={t("agents.hero.description")}
        primaryCta={{ label: t("agents.hero.cta.primary"), href: "#" }}
        secondaryCta={{ label: t("agents.hero.cta.secondary"), href: "#" }}
        image={heroImage}
        imageAlt="Education agent working at computer"
        variant="dark"
      />

      <FeaturesSection
        title={t("agents.features.title")}
        subtitle={t("agents.features.subtitle")}
        features={features}
        variant="teal"
      />

      <CTASection
        title={t("agents.cta.title")}
        description={t("agents.cta.description")}
        primaryCta={{ label: t("agents.cta.primary"), href: "#" }}
        secondaryCta={{ label: t("agents.cta.secondary"), href: "#" }}
      />
    </Layout>
  );
};

export default Agents;
