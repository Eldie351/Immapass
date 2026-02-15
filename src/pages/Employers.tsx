import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { UserCheck, DollarSign, FileText, CheckCircle2, TrendingUp, Globe } from "lucide-react";
import heroImage from "@/assets/hero-employers.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Employers = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: UserCheck,
      title: t("employers.features.gap.title"),
      description: t("employers.features.gap.description")
    },
    {
      icon: DollarSign,
      title: t("employers.features.costs.title"),
      description: t("employers.features.costs.description")
    },
    {
      icon: CheckCircle2,
      title: t("employers.features.compliant.title"),
      description: t("employers.features.compliant.description")
    },
    {
      icon: FileText,
      title: t("employers.features.guidance.title"),
      description: t("employers.features.guidance.description")
    },
    {
      icon: TrendingUp,
      title: t("employers.features.growth.title"),
      description: t("employers.features.growth.description")
    },
    {
      icon: Globe,
      title: t("employers.features.workforce.title"),
      description: t("employers.features.workforce.description")
    }
  ];

  return (
    <Layout>
      <HeroSection
        title={t("employers.hero.title")}
        subtitle={t("employers.hero.subtitle")}
        description={t("employers.hero.description")}
        primaryCta={{ label: t("employers.hero.cta"), href: "/demo" }}
        image={heroImage}
        imageAlt="Employers reviewing documents"
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
        primaryCta={{ label: t("employers.cta.primary"), href: "/sales" }}
        variant="dark"
      />
    </Layout>
  );
};

export default Employers;
