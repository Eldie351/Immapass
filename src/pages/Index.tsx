import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import {
    Plane, FileCheck, Shield, Users, Briefcase, GraduationCap, User, Cpu,
    FileText, ListOrdered, Target, FileSearch, Sparkles, UserPlus, BookOpen,
    Globe, Wallet, Handshake, Lock, Languages, Scale, EyeOff
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-home.jpg";

const Index = () => {
    const { t } = useLanguage();

    const howItWorks = [
        {
            icon: User,
            title: t("index.how.step1.title"),
            description: t("index.how.step1.description")
        },
        {
            icon: Cpu,
            title: t("index.how.step2.title"),
            description: t("index.how.step2.description")
        },
        {
            icon: FileText,
            title: t("index.how.step3.title"),
            description: t("index.how.step3.description")
        }
    ];

    const paidAssessmentFeatures = [
        {
            icon: ListOrdered,
            title: t("index.paid.feature1.title"),
            description: t("index.paid.feature1.description")
        },
        {
            icon: Target,
            title: t("index.paid.feature2.title"),
            description: t("index.paid.feature2.description")
        },
        {
            icon: FileSearch,
            title: t("index.paid.feature3.title"),
            description: t("index.paid.feature3.description")
        },
        {
            icon: Sparkles,
            title: t("index.paid.feature4.title"),
            description: t("index.paid.feature4.description")
        },
        {
            icon: UserPlus,
            title: t("index.paid.feature5.title"),
            description: t("index.paid.feature5.description")
        }
    ];

    const assessmentCoverage = [
        {
            icon: User,
            title: t("index.analyze.feature1.title"),
            description: t("index.analyze.feature1.description")
        },
        {
            icon: BookOpen,
            title: t("index.analyze.feature2.title"),
            description: t("index.analyze.feature2.description")
        },
        {
            icon: Briefcase,
            title: t("index.analyze.feature3.title"),
            description: t("index.analyze.feature3.description")
        },
        {
            icon: Globe,
            title: t("index.analyze.feature4.title"),
            description: t("index.analyze.feature4.description")
        },
        {
            icon: Wallet,
            title: t("index.analyze.feature5.title"),
            description: t("index.analyze.feature5.description")
        },
        {
            icon: Handshake,
            title: t("index.analyze.feature6.title"),
            description: t("index.analyze.feature6.description")
        }
    ];

    const trustFeatures = [
        {
            icon: Lock,
            title: t("index.commitment.feature1.title"),
            description: t("index.commitment.feature1.description")
        },
        {
            icon: EyeOff,
            title: t("index.commitment.feature2.title"),
            description: t("index.commitment.feature2.description")
        },
        {
            icon: Languages,
            title: t("index.commitment.feature3.title"),
            description: t("index.commitment.feature3.description")
        },
        {
            icon: Scale,
            title: t("index.commitment.feature4.title"),
            description: t("index.commitment.feature4.description")
        }
    ];

    const features = [
        {
            icon: Plane,
            title: t("index.feature1.title"),
            description: t("index.feature1.description")
        },
        {
            icon: FileCheck,
            title: t("index.feature2.title"),
            description: t("index.feature2.description")
        },
        {
            icon: Shield,
            title: t("index.feature3.title"),
            description: t("index.feature3.description")
        },
        {
            icon: Users,
            title: t("index.feature4.title"),
            description: t("index.feature4.description")
        },
        {
            icon: Briefcase,
            title: t("index.feature5.title"),
            description: t("index.feature5.description")
        },
        {
            icon: GraduationCap,
            title: t("index.feature6.title"),
            description: t("index.feature6.description")
        }
    ];

    return (
        <Layout>
            <HeroSection
                title={t("index.hero.title")}
                subtitle={t("index.hero.subtitle")}
                description={t("index.hero.description")}
                primaryCta={{ label: t("index.hero.cta.primary"), href: "/become-a-member" }}
                image={heroImage}
                imageAlt={t("index.hero.title")}
                variant="teal"
            />

            <FeaturesSection
                title={t("index.how.title")}
                subtitle={t("index.how.subtitle")}
                features={howItWorks}
            />

            <FeaturesSection
                title={t("index.paid.title")}
                subtitle={t("index.paid.subtitle")}
                features={paidAssessmentFeatures}
                variant="teal"
            />

            <FeaturesSection
                title={t("index.analyze.title")}
                subtitle={t("index.analyze.subtitle")}
                features={assessmentCoverage}
            />

            <FeaturesSection
                title={t("index.commitment.title")}
                subtitle={t("index.commitment.subtitle")}
                features={trustFeatures}
                variant="teal"
            />

            <FeaturesSection
                title={t("index.features.title")}
                subtitle={t("index.features.subtitle")}
                features={features}
            />

            <CTASection
                title={t("index.cta.title")}
                description={t("index.cta.description")}
                primaryCta={{ label: t("index.cta.primary"), href: "/become-a-member" }}
                variant="dark"
            />
        </Layout>
    );
};

export default Index;
