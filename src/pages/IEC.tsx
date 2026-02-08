import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Globe2, Plane, Wallet, FileCheck, HelpCircle, Map } from "lucide-react";
import heroImage from "@/assets/hero-iec.jpg";

const IEC = () => {
    const features = [
        {
            icon: Globe2,
            title: "Working Holiday",
            description: "Travel and work in Canada. We help you understand the requirements and apply for your work permit so you can explore the country."
        },
        {
            icon: Wallet,
            title: "Affordable",
            description: "See if you're eligible at no cost, then apply to the IEC pool for just $75. Professional support that fits your travel budget."
        },
        {
            icon: FileCheck,
            title: "Clear Guidance",
            description: "Understand the complex requirements. We monitor your application and provide legal support so you can focus on your move to Canada."
        },
        {
            icon: Plane,
            title: "Young Professionals",
            description: "Gain Canadian professional work experience to better compete in a global economy. We help with employer-specific work permits."
        },
        {
            icon: Map,
            title: "International Co-op",
            description: "Get valuable overseas work experience related to your field of study. Valid for students registered at a post-secondary institution."
        },
        {
            icon: HelpCircle,
            title: "Eligibility Check",
            description: "Not sure if you qualify? Use our tools to check your eligibility for the various IEC pools before you apply."
        }
    ];

    return (
        <Layout>
            <HeroSection
                title="International Experience Canada"
                subtitle="IEC"
                description="Travel in Canada on a Working Holiday with IEC. Get clear guidance, understand requirements, and get legal support."
                primaryCta={{ label: "Check Eligibility", href: "/check-eligibility" }}
                image={heroImage}
                imageAlt="Traveler with backpack in Canada"
                variant="teal"
            />

            <FeaturesSection
                title="Work and Travel in Canada"
                subtitle="PROGRAMS"
                features={features}
            />

            <CTASection
                title="Start your Canadian adventure"
                description="Apply to the International Experience Canada pool today with expert support."
                primaryCta={{ label: "Apply Now", href: "/become-a-member" }}
                variant="dark"
            />
        </Layout>
    );
};

export default IEC;
