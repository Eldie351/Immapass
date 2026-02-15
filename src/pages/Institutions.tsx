import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Shield, Lock, Smartphone, School, BarChart, Users } from "lucide-react";
import heroImage from "@/assets/hero-institutions.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Institutions = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: Lock,
            title: t("institutions.features.private.title"),
            description: t("institutions.features.private.description")
        },
        {
            icon: Shield,
            title: t("institutions.features.secure.title"),
            description: t("institutions.features.secure.description")
        },
        {
            icon: Smartphone,
            title: t("institutions.features.accessible.title"),
            description: t("institutions.features.accessible.description")
        },
        {
            icon: School,
            title: t("institutions.features.reputation.title"),
            description: t("institutions.features.reputation.description")
        },
        {
            icon: BarChart,
            title: t("institutions.features.reports.title"),
            description: t("institutions.features.reports.description")
        },
        {
            icon: Users,
            title: t("institutions.features.assistance.title"),
            description: t("institutions.features.assistance.description")
        }
    ];

    return (
        <Layout>
            <HeroSection
                title={t("institutions.hero.title")}
                subtitle={t("institutions.hero.subtitle")}
                description={t("institutions.hero.description")}
                primaryCta={{ label: t("institutions.hero.cta"), href: "/contact" }}
                image={heroImage}
                imageAlt="University campus interaction"
                variant="teal"
            />

            <FeaturesSection
                title={t("institutions.features.title")}
                subtitle={t("institutions.features.subtitle")}
                features={features}
            />

            <CTASection
                title={t("institutions.cta.title")}
                description={t("institutions.cta.description")}
                primaryCta={{ label: t("nav.contact"), href: "/contact" }}
                variant="dark"
            />
        </Layout>
    );
};

export default Institutions;
