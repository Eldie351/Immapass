import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Briefcase, DollarSign, Shield, Clock, Users, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-employers.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Employers = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Briefcase, title: t("employers.feature1.title"), description: t("employers.feature1.description") },
    { icon: DollarSign, title: t("employers.feature2.title"), description: t("employers.feature2.description") },
    { icon: Shield, title: t("employers.feature3.title"), description: t("employers.feature3.description") },
    { icon: Clock, title: t("employers.feature4.title"), description: t("employers.feature4.description") },
    { icon: Users, title: t("employers.feature5.title"), description: t("employers.feature5.description") },
    { icon: CheckCircle, title: t("employers.feature6.title"), description: t("employers.feature6.description") },
  ];

  return (
    <Layout>
      <HeroSection
        title={t("employers.hero.title")}
        description={t("employers.hero.description")}
        primaryCta={{ label: t("employers.hero.cta.primary"), href: "#" }}
        secondaryCta={{ label: t("employers.hero.cta.secondary"), href: "#" }}
        image={heroImage}
        imageAlt="Construction workers reviewing plans"
        variant="teal"
      />

      <FeaturesSection
        title={t("employers.features.title")}
        subtitle={t("employers.features.subtitle")}
        features={features}
      />

      <CTASection
        title={t("employers.cta.title")}
        description={t("employers.cta.description")}
        primaryCta={{ label: t("employers.cta.primary"), href: "#" }}
        secondaryCta={{ label: t("employers.cta.secondary"), href: "#" }}
        variant="dark"
      />
    </Layout>
  );
};

export default Employers;
