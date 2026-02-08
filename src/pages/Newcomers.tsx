import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { BookOpen, Briefcase, GraduationCap, CheckCircle2, Handshake, Zap } from "lucide-react";
import heroImage from "@/assets/hero-newcomers.jpg";

const Newcomers = () => {
    const features = [
        {
            icon: GraduationCap,
            title: "Study Permits",
            description: "Immipass gives you more clarity and confidence to apply for your Canadian study permit with real legal support at every step. We help you avoid the risks of doing it alone, at a fraction of the cost of traditional legal services."
        },
        {
            icon: Briefcase,
            title: "Work Permits",
            description: "Immipass helps you apply for your Canadian work permit with added clarity, confidence, and legal support from start to finish. Whether you're starting a new job, switching employers, or restoring your status."
        },
        {
            icon: BookOpen,
            title: "Permanent Residence",
            description: "Immipass supports your journey to permanent residence with step-by-step legal guidance—so you don't have to figure it out alone. From matching your NOC code to maximizing your CRS points."
        },
        {
            icon: Zap,
            title: "Rewards and Offers",
            description: "Immipass Members get special offers on banking, mobile, internet, and more to help you in your new home—from some of the country's largest and most trusted providers."
        },
        {
            icon: CheckCircle2,
            title: "Personalized Checklists",
            description: "Every application is reviewed by licensed immigration lawyers to help catch issues before you submit—so you don't have to figure it out on your own."
        },
        {
            icon: Handshake,
            title: "Immigration Support",
            description: "We help support every aspect of your new life with offers for tax filing, credit building, auto leases, loans, and additional settlement services."
        }
    ];

    return (
        <Layout>
            <HeroSection
                title="Trusted guidance for your immigration journey"
                subtitle="NEWCOMERS"
                description="We're here every step of the way. Get guidance and tools for visa applications, study permits, work permits, and more—all with personal support."
                primaryCta={{ label: "Get Started", href: "/become-a-member" }}
                image={heroImage}
                imageAlt="Newcomers arriving in Canada"
                variant="teal"
            />

            <FeaturesSection
                title="We're here every step of the way"
                subtitle="OUR SERVICES"
                features={features}
            />

            <CTASection
                title="Exclusive benefits for Immipass Members"
                description="Get guidance and expertise from expert immigration lawyers to help prepare your strongest application."
                primaryCta={{ label: "Become a Member", href: "/become-a-member" }}
                variant="dark"
            />
        </Layout>
    );
};

export default Newcomers;
