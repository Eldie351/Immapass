import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { FileCheck, Briefcase, Zap, PiggyBank, GraduationCap, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-pgwp.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const PGWP = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: FileCheck,
            title: t("pgwp.features.review.title"),
            description: t("pgwp.features.review.description")
        },
        {
            icon: GraduationCap,
            title: t("pgwp.features.guidance.title"),
            description: t("pgwp.features.guidance.description")
        },
        {
            icon: Briefcase,
            title: t("pgwp.features.working.title"),
            description: t("pgwp.features.working.description")
        },
        {
            icon: Zap,
            title: t("pgwp.features.tools.title"),
            description: t("pgwp.features.tools.description")
        },
        {
            icon: PiggyBank,
            title: t("pgwp.features.savings.title"),
            description: t("pgwp.features.savings.description")
        },
        {
            icon: TrendingUp,
            title: t("pgwp.features.support.title"),
            description: t("pgwp.features.support.description")
        }
    ];

    return (
        <Layout>
            <HeroSection
                title={t("pgwp.hero.title")}
                subtitle={t("pgwp.hero.subtitle")}
                description={t("pgwp.hero.description")}
                primaryCta={{ label: t("pgwp.hero.cta"), href: "/become-a-member" }}
                image={heroImage}
                imageAlt="Graduate celebrating"
                variant="teal"
            />

            <FeaturesSection
                title={t("pgwp.features.title")}
                subtitle={t("pgwp.features.subtitle")}
                features={features}
            />

            <CTASection
                title={t("pgwp.cta.title")}
                description={t("pgwp.cta.description")}
                primaryCta={{ label: t("pgwp.cta.primary"), href: "/become-a-member" }}
                variant="dark"
            />
        </Layout>
    );
};

export default PGWP;
