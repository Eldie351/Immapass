import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Plane, Users, Calendar, ShieldCheck, MapPin, Gift } from "lucide-react";
import heroImage from "@/assets/hero-visitor.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const VisitorVisas = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: ShieldCheck,
      title: t("visitor.features.support.title"),
      description: t("visitor.features.support.description")
    },
    {
      icon: Users,
      title: t("visitor.features.family.title"),
      description: t("visitor.features.family.description")
    },
    {
      icon: MapPin,
      title: t("visitor.features.tourism.title"),
      description: t("visitor.features.tourism.description")
    },
    {
      icon: Calendar,
      title: t("visitor.features.supervisa.title"),
      description: t("visitor.features.supervisa.description")
    },
    {
      icon: Plane,
      title: t("visitor.features.study.title"),
      description: t("visitor.features.study.description")
    },
    {
      icon: Gift,
      title: t("visitor.features.membership.title"),
      description: t("visitor.features.membership.description")
    }
  ];

  return (
    <Layout>
      <HeroSection
        title={t("visitor.hero.title")}
        subtitle={t("visitor.hero.subtitle")}
        description={t("visitor.hero.description")}
        primaryCta={{ label: t("visitor.hero.cta"), href: "/become-a-member" }}
        image={heroImage}
        imageAlt="Travelers in Canada"
        variant="teal"
      />

      <FeaturesSection
        title={t("visitor.features.title")}
        subtitle={t("visitor.features.subtitle")}
        features={features}
      />

      <CTASection
        title={t("visitor.cta.title")}
        description={t("visitor.cta.description")}
        primaryCta={{ label: t("visitor.cta.primary"), href: "/become-a-member" }}
        variant="dark"
      />
    </Layout>
  );
};

export default VisitorVisas;
