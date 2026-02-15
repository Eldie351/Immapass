import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Home, Users, FileText, Scale, TrendingUp, Award } from "lucide-react";
import heroImage from "@/assets/hero-express-entry.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const ExpressEntry = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Home,
      title: t("express.feature1.title"),
      description: t("express.feature1.description")
    },
    {
      icon: Users,
      title: t("express.feature2.title"),
      description: t("express.feature2.description")
    },
    {
      icon: FileText,
      title: t("express.feature3.title"),
      description: t("express.feature3.description")
    },
    {
      icon: Scale,
      title: t("express.feature4.title"),
      description: t("express.feature4.description")
    },
    {
      icon: TrendingUp,
      title: t("express.feature5.title"),
      description: t("express.feature5.description")
    },
    {
      icon: Award,
      title: t("express.feature6.title"),
      description: t("express.feature6.description")
    }
  ];

  return (
    <Layout>
      <HeroSection
        title={t("express.hero.title")}
        subtitle={t("express.hero.subtitle")}
        description={t("express.hero.description")}
        primaryCta={{ label: t("express.hero.cta.primary"), href: "/become-a-member" }}
        image={heroImage}
        imageAlt="Happy family in their new home"
        variant="teal"
      />

      <FeaturesSection
        title={t("express.features.title")}
        subtitle={t("express.features.subtitle")}
        features={features}
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
