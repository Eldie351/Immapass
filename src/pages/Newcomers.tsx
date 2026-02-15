import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { BookOpen, Briefcase, GraduationCap, CheckCircle2, Handshake, Zap } from "lucide-react";
import heroImage from "@/assets/hero-newcomers.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Newcomers = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: GraduationCap,
            title: t("newcomers.feature1.title"),
            description: t("newcomers.feature1.description")
        },
        {
            icon: Briefcase,
            title: t("newcomers.feature2.title"),
            description: t("newcomers.feature2.description")
        },
        {
            icon: BookOpen,
            title: t("newcomers.feature3.title"),
            description: t("newcomers.feature3.description")
        },
        {
            icon: Zap,
            title: t("newcomers.feature4.title"),
            description: t("newcomers.feature4.description")
        },
        {
            icon: CheckCircle2,
            title: t("newcomers.feature5.title"),
            description: t("newcomers.feature5.description")
        },
        {
            icon: Handshake,
            title: t("newcomers.feature6.title"),
            description: t("newcomers.feature6.description")
        }
    ];

    return (
        <Layout>
            <HeroSection
                title={t("newcomers.hero.title")}
                subtitle={t("newcomers.hero.subtitle")}
                description={t("newcomers.hero.description")}
                primaryCta={{ label: t("newcomers.hero.cta.primary"), href: "/become-a-member" }}
                image={heroImage}
                imageAlt="Newcomers arriving in Canada"
                variant="teal"
            />

            <FeaturesSection
                title={t("newcomers.features.title")}
                subtitle={t("newcomers.features.subtitle")}
                features={features}
            />

            <CTASection
                title={t("newcomers.cta.title")}
                description={t("newcomers.cta.description")}
                primaryCta={{ label: t("newcomers.cta.primary"), href: "/become-a-member" }}
                variant="dark"
            />
        </Layout>
    );
};

export default Newcomers;
