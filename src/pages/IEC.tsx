import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Globe2, Plane, Wallet, FileCheck, HelpCircle, Map } from "lucide-react";
import heroImage from "@/assets/hero-iec.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const IEC = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: Globe2,
            title: t("iec.features.holiday.title"),
            description: t("iec.features.holiday.description")
        },
        {
            icon: Wallet,
            title: t("iec.features.affordable.title"),
            description: t("iec.features.affordable.description")
        },
        {
            icon: FileCheck,
            title: t("iec.features.guidance.title"),
            description: t("iec.features.guidance.description")
        },
        {
            icon: Plane,
            title: t("iec.features.young.title"),
            description: t("iec.features.young.description")
        },
        {
            icon: Map,
            title: t("iec.features.coop.title"),
            description: t("iec.features.coop.description")
        },
        {
            icon: HelpCircle,
            title: t("iec.features.check.title"),
            description: t("iec.features.check.description")
        }
    ];

    return (
        <Layout>
            <HeroSection
                title={t("iec.hero.title")}
                subtitle={t("iec.hero.subtitle")}
                description={t("iec.hero.description")}
                primaryCta={{ label: t("iec.hero.cta"), href: "/check-eligibility" }}
                image={heroImage}
                imageAlt="Traveler with backpack in Canada"
                variant="teal"
            />

            <FeaturesSection
                title={t("iec.features.title")}
                subtitle={t("iec.features.subtitle")}
                features={features}
            />

            <CTASection
                title={t("iec.cta.title")}
                description={t("iec.cta.description")}
                primaryCta={{ label: t("iec.cta.primary"), href: "/become-a-member" }}
                variant="dark"
            />
        </Layout>
    );
};

export default IEC;
