import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { FileSearch, AlertCircle, Scale, HelpCircle, CheckSquare, Gavel } from "lucide-react";
import heroImage from "@/assets/hero-visa-refusal.jpg";

const VisaRefusal = () => {
    const features = [
        {
            icon: FileSearch,
            title: "Request Reconsideration",
            description: "If key details were missed in your original application, or if there was an error in processing, we can help you request a reconsideration to get your application back on track."
        },
        {
            icon: AlertCircle,
            title: "Detailed Analysis",
            description: "Immipass will help you learn why your application was refused. We analyze the refusal letter and officer notes to determine the best strategy."
        },
        {
            icon: CheckSquare,
            title: "Reapply with Strength",
            description: "Reapply with a stronger case using our expert guidance. We help you address the specific concerns raised by the immigration officer."
        },
        {
            icon: Scale,
            title: "Judicial Review",
            description: "Seek a judicial review to challenge an unfair refusal. Our legal team can represent you in Federal Court if the decision was unreasonable."
        },
        {
            icon: Gavel,
            title: "Expert Legal Support",
            description: "Immipass is the lawyer-backed digital platform designed to make immigration clearer and more affordable, especially when facing complex refusals."
        },
        {
            icon: HelpCircle,
            title: "Explore Options",
            description: "Don't give up. We help you explore all available options for approval, ensuring you have the best chance of success moving forward."
        }
    ];

    return (
        <Layout>
            <HeroSection
                title="Get Help After a Visa Refusal"
                subtitle="VISA REFUSAL"
                description="If your study permit, work permit, or other visa was refused, Immipass will help you learn why, and explore all available options for approval."
                primaryCta={{ label: "Find Path Forward", href: "/refusal-help" }}
                image={heroImage}
                imageAlt="Person looking at documents concerned"
                variant="teal"
            />

            <FeaturesSection
                title="Find the Best Path Forward"
                subtitle="SOLUTIONS"
                features={features}
            />

            <CTASection
                title="Don't let a refusal stop your journey"
                description="Get expert legal help to challenge the decision or submit a stronger application."
                primaryCta={{ label: "Get Help Now", href: "/become-a-member" }}
                variant="dark"
            />
        </Layout>
    );
};

export default VisaRefusal;
