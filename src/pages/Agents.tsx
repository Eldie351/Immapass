import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Users, Scale, Shield, DollarSign, Award, Handshake } from "lucide-react";
import heroImage from "@/assets/hero-agents.jpg";

const Agents = () => {
  const features = [
    {
      icon: Scale,
      title: "Legal Compliance",
      description: "Ensure all applications meets the latest regulatory requirements. Reduce the risk of refusals with lawyer-backed reviews."
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Protect your reputation and your clients with our verifiable, secure platform. Avoid unauthorized representation issues."
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Manage all your student and client applications in one dashboard. Track status, documents, and communications easily."
    },
    {
      icon: DollarSign,
      title: "Revenue Growth",
      description: "Expand your service offerings with admitted legal support. Earn commission on value-added services."
    },
    {
      icon: Award,
      title: "Higher Success Rates",
      description: "Leverage our data-driven approach and legal expertise to improve visa approval rates for your clients."
    },
    {
      icon: Handshake,
      title: "Trusted Partnership",
      description: "Partner with a Canadian law firm to offer regulated immigration advice without being a lawyer yourself."
    }
  ];

  return (
    <Layout>
      <HeroSection
        title="Empower Your Agency with Legal Tech"
        subtitle="AGENTS"
        description="The trusted platform for education agents. Ensure compliance, increase success rates, and scale your business with Immipass."
        primaryCta={{ label: "Partner with Us", href: "/contact" }}
        image={heroImage}
        imageAlt="Education agent working at computer"
        variant="teal"
      />

      <FeaturesSection
        title="Why Agents Choose Immipass"
        subtitle="BENEFITS"
        features={features}
      />

      <CTASection
        title="Ready to scale your business?"
        description="Join the network of top agents using Immipass to deliver better results for their students."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
        variant="dark"
      />
    </Layout>
  );
};

export default Agents;
