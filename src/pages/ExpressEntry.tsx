import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { StepsSection } from "@/components/sections/StepsSection";
import { CTASection } from "@/components/sections/CTASection";
import { Home, Users, FileText, Scale, TrendingUp, Award } from "lucide-react";
import heroImage from "@/assets/hero-express-entry.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const ExpressEntry = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Home, title: t("express.feature1.title"), description: t("express.feature1.description") },
    { icon: Users, title: t("express.feature2.title"), description: t("express.feature2.description") },
    { icon: FileText, title: t("express.feature3.title"), description: t("express.feature3.description") },
    { icon: Scale, title: t("express.feature4.title"), description: t("express.feature4.description") },
    { icon: TrendingUp, title: t("express.feature5.title"), description: t("express.feature5.description") },
    { icon: Award, title: t("express.feature6.title"), description: t("express.feature6.description") },
  ];

  const steps = [
    { number: "01", title: t("express.step1.title"), description: t("express.step1.description") },
    { number: "02", title: t("express.step2.title"), description: t("express.step2.description") },
    { number: "03", title: t("express.step3.title"), description: t("express.step3.description") },
    { number: "04", title: t("express.step4.title"), description: t("express.step4.description") },
  ];

  return (
    <Layout>
      <HeroSection
        subtitle={t("express.hero.subtitle")}
        title={t("express.hero.title")}
        description={t("express.hero.description")}
        primaryCta={{ label: t("express.hero.cta.primary"), href: "/become-a-member" }}
        image={heroImage}
        imageAlt="Happy family in their new home"
      />

      <StepsSection
        title={t("express.steps.title")}
        subtitle={t("express.steps.subtitle")}
        steps={steps}
      />

      <FeaturesSection
        title={t("express.features.title")}
        subtitle={t("express.features.subtitle")}
        features={features}
        variant="teal"
      />

      <CTASection
        title={t("express.cta.title")}
        description={t("express.cta.description")}
        primaryCta={{ label: t("express.cta.primary"), href: "/become-a-member" }}
        variant="dark"
      />
    </Layout>
  );
};

export default ExpressEntry;
