import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { FileSearch, AlertCircle, Scale, HelpCircle, CheckSquare, Gavel } from "lucide-react";
import heroImage from "@/assets/hero-visa-refusal.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const VisaRefusal = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: FileSearch,
            title: t("refusal.features.reconsideration.title"),
            description: t("refusal.features.reconsideration.description")
        },
        {
            icon: AlertCircle,
            title: t("refusal.features.analysis.title"),
            description: t("refusal.features.analysis.description")
        },
        {
            icon: CheckSquare,
            title: t("refusal.features.reapply.title"),
            description: t("refusal.features.reapply.description")
        },
        {
            icon: Scale,
            title: t("refusal.features.review.title"),
            description: t("refusal.features.review.description")
        },
        {
            icon: Gavel,
            title: t("refusal.features.support.title"),
            description: t("refusal.features.support.description")
        },
        {
            icon: HelpCircle,
            title: t("refusal.features.options.title"),
            description: t("refusal.features.options.description")
        }
    ];

    return (
        <Layout>
            <HeroSection
                title={t("refusal.hero.title")}
                subtitle={t("refusal.hero.subtitle")}
                description={t("refusal.hero.description")}
                primaryCta={{ label: t("refusal.hero.cta"), href: "/refusal-help" }}
                image={heroImage}
                imageAlt="Person looking at documents concerned"
                variant="teal"
            />

            <FeaturesSection
                title={t("refusal.features.title")}
                subtitle={t("refusal.features.subtitle")}
                features={features}
            />

            <CTASection
                title={t("refusal.cta.title")}
                description={t("refusal.cta.description")}
                primaryCta={{ label: t("refusal.cta.primary"), href: "/become-a-member" }}
                variant="dark"
            />
        </Layout>
    );
};

export default VisaRefusal;
