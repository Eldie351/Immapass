import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Shield, Lock, Smartphone, School, BarChart, Users } from "lucide-react";
import heroImage from "@/assets/hero-institutions.jpg";

const Institutions = () => {
    const features = [
        {
            icon: Lock,
            title: "Private",
            description: "Privacy is paramount in our design. Expertly crafted by legal professionals and software engineers, we prioritize the confidentiality of your institution and student data."
        },
        {
            icon: Shield,
            title: "Secure",
            description: "Trust is the foundation of our security. With SOC 2 certification and secure cloud infrastructure, our platform meets the highest industry standards."
        },
        {
            icon: Smartphone,
            title: "Accessible",
            description: "Immipass is designed for effortless integration with your institution's systems, providing a streamlined experience through single-sign-on functionality."
        },
        {
            icon: School,
            title: "Elevate Reputation",
            description: "Raise your school's profile by creating a trustworthy, simple, and open process to attract top students. Boost international enrolment with a method supported by Canadian legal know-how."
        },
        {
            icon: BarChart,
            title: "Detailed Reports",
            description: "Measure your school's success through detailed reports including data on post-graduation residency and employment."
        },
        {
            icon: Users,
            title: "Dedicated Assistance",
            description: "Keep students engaged and enrolled with dedicated assistance throughout their journey."
        }
    ];

    return (
        <Layout>
            <HeroSection
                title="Trusted by leading educational institutions & partners"
                subtitle="INSTITUTIONS"
                description="Your partner for a better international student experience. Elevate your school's reputation and support your international students."
                primaryCta={{ label: "Partner with Us", href: "/contact" }}
                image={heroImage}
                imageAlt="University campus interaction"
                variant="teal"
            />

            <FeaturesSection
                title="How Immipass helps DLIs"
                subtitle="FEATURES"
                features={features}
            />

            <CTASection
                title="Lets see how we can work together"
                description="Immipass is designed for effortless integration with your institution's systems."
                primaryCta={{ label: "Contact Us", href: "/contact" }}
                variant="dark"
            />
        </Layout>
    );
};

export default Institutions;
