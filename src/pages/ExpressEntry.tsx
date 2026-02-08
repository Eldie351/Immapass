import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Home, Users, FileText, Scale, TrendingUp, Award } from "lucide-react";
import heroImage from "@/assets/hero-express-entry.jpg";

const ExpressEntry = () => {
  const features = [
    {
      icon: Home,
      title: "Path to PR",
      description: "Understand your eligibility for the three federal programs managed through Express Entry: FSW, FST, and CEC."
    },
    {
      icon: Users,
      title: "Profile Optimization",
      description: "Maximize your CRS score. We help you identify areas for improvement like language scores or education assessments."
    },
    {
      icon: FileText,
      title: "Document Review",
      description: "Ensure your supporting documents are accurate and complete before you receive an Invitation to Apply (ITA)."
    },
    {
      icon: Scale,
      title: "Legal Representation",
      description: "Have a licensed immigration lawyer represent you throughout the process, from profile creation to final PR application."
    },
    {
      icon: TrendingUp,
      title: "Draw Updates",
      description: "Stay informed about the latest Express Entry draws, CRS cut-off scores, and category-based rounds of invitations."
    },
    {
      icon: Award,
      title: "PNP Options",
      description: "Explore Provincial Nominee Programs that align with your Express Entry profile to boost your chances of selection."
    }
  ];

  return (
    <Layout>
      <HeroSection
        title="Your Fastest Path to Permanent Residence"
        subtitle="EXPRESS ENTRY"
        description="Navigate the Express Entry system with confidence. From profile creation to Invitation to Apply, Immipass is with you."
        primaryCta={{ label: "Check Eligibility", href: "/become-a-member" }}
        image={heroImage}
        imageAlt="Happy family in their new home"
        variant="teal"
      />

      <FeaturesSection
        title="Maximize Your Success"
        subtitle="EXPRESS ENTRY BENEFITS"
        features={features}
      />

      <CTASection
        title="Ready to make Canada your home?"
        description="Create your profile today and see how Immipass can help you achieve Permanent Residence."
        primaryCta={{ label: "Get Started", href: "/become-a-member" }}
        variant="dark"
      />
    </Layout>
  );
};

export default ExpressEntry;
