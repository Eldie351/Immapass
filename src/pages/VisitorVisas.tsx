import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Plane, Users, Calendar, ShieldCheck, MapPin, Gift } from "lucide-react";
import heroImage from "@/assets/hero-visitor.jpg";

const VisitorVisas = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Expert Support",
      description: "Apply with confidence on the platform backed by certified immigration lawyers. We assume your application meets all requirements for a smoother approval process."
    },
    {
      icon: Users,
      title: "Family & Friends",
      description: "Reunite with family and friends in Canada. We guide you through crafting invitation letters and preparing essential documents to show strong ties."
    },
    {
      icon: MapPin,
      title: "Tourism & Business",
      description: "Canada's natural wonders and vibrant cities await. Immipass helps ensure your itinerary and documentation showcase your trip's purpose clearly."
    },
    {
      icon: Calendar,
      title: "Super Visas",
      description: "For parents and grandparents. Stay for up to 5 years at a time. We help ensure your application meets financial, medical, and eligibility requirements."
    },
    {
      icon: Plane,
      title: "Short-Term Study",
      description: "For Visiting Research Scholars or short-term exchanges less than 6 months. Ensure endorsements and support letters are correct."
    },
    {
      icon: Gift,
      title: "Free Membership",
      description: "Apply for your visitor visa and receive a free one-year Immipass Membership ($120 value) for continued support and exclusive offers."
    }
  ];

  return (
    <Layout>
      <HeroSection
        title="Travel with Confidence: Buyer Your Visitor Visa"
        subtitle="VISITOR VISAS"
        description="Apply for Your Visitor Visa or Super Visa with Immipass. Expert affordable legal support for your trip to Canada."
        primaryCta={{ label: "Apply Now", href: "/become-a-member" }}
        image={heroImage}
        imageAlt="Travelers in Canada"
        variant="teal"
      />

      <FeaturesSection
        title="Why choose Immipass?"
        subtitle="BENEFITS"
        features={features}
      />

      <CTASection
        title="Start your Canadian adventure"
        description="Travel with confidence knowing your application has been reviewed by experts."
        primaryCta={{ label: "Start Application", href: "/become-a-member" }}
        variant="dark"
      />
    </Layout>
  );
};

export default VisitorVisas;
