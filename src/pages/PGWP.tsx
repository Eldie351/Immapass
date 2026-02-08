import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { FileCheck, Briefcase, Zap, PiggyBank, GraduationCap, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-pgwp.jpg";

const PGWP = () => {
    const features = [
        {
            icon: FileCheck,
            title: "Expert Legal Review",
            description: "Your PGWP application is reviewed by licensed immigration lawyers to help catch issues and submit a strong, complete application."
        },
        {
            icon: GraduationCap,
            title: "Step-by-Step Guidance",
            description: "Navigate your PGWP application with confidence. Personalized checklists, smart reminders, and clear instructions so you know what's next."
        },
        {
            icon: Briefcase,
            title: "Start Working ASAP",
            description: "Get a personalized legal letter to share with your employer so you can start working with confidence without risking your status."
        },
        {
            icon: Zap,
            title: "Smart Job Tools",
            description: "Find jobs that support your long-term plans. Our AI tools focus on roles aligned with your NOC code for future PR options."
        },
        {
            icon: PiggyBank,
            title: "Savings for PR",
            description: "Your PGWP fees carry forward as a credit toward PR planning. Save money as you move from work to permanent residence."
        },
        {
            icon: TrendingUp,
            title: "Long-term Support",
            description: "Immipass stays with you beyond PGWP. Get continued guidance and legal support in one place for your future in Canada."
        }
    ];

    return (
        <Layout>
            <HeroSection
                title="Apply for your PGWP the Smarter Way"
                subtitle="POST-GRAD WORK PERMIT"
                description="You did the hard part—now let us handle the paperwork. Get expert legal review and start working sooner."
                primaryCta={{ label: "Apply for PGWP", href: "/become-a-member" }}
                image={heroImage}
                imageAlt="Graduate celebrating"
                variant="teal"
            />

            <FeaturesSection
                title="One Platform from PGWP to PR"
                subtitle="WHY CHOOSE Immipass"
                features={features}
            />

            <CTASection
                title="Secure your work status today"
                description="Apply with confidence and plan your path to Permanent Residence."
                primaryCta={{ label: "Get Started", href: "/become-a-member" }}
                variant="dark"
            />
        </Layout>
    );
};

export default PGWP;
