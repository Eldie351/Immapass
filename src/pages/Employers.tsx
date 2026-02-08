import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { UserCheck, DollarSign, FileText, CheckCircle2, TrendingUp, Globe } from "lucide-react";
import heroImage from "@/assets/hero-employers.jpg";

const Employers = () => {
  const features = [
    {
      icon: UserCheck,
      title: "Close Skills Gap",
      description: "Secure critical hires quickly and efficiently. Access pre-vetted, work-ready talent to fill you labour needs."
    },
    {
      icon: DollarSign,
      title: "Reduce Costs",
      description: "Reduce legal and administrative costs. Scale international hiring with ease and a unified platform."
    },
    {
      icon: CheckCircle2,
      title: "Stay Compliant",
      description: "Stay audit-ready with real-time compliance oversight. Streamline visa management and documentation."
    },
    {
      icon: FileText,
      title: "Expert Guidance",
      description: "Work Permits, Express Entry Applications, LMIA, Provincial Nominee Programs (PNP), and Permanent Residency Pathways."
    },
    {
      icon: TrendingUp,
      title: "Focus on Growth",
      description: "Retain top talent by supporting their long-term immigration goals. Fast-track permanent residency for key hires."
    },
    {
      icon: Globe,
      title: "Global Workforce",
      description: "Enable a global workforce and stay compliant. Enhance success rates for extensions, reviews, and appeals."
    }
  ];

  return (
    <Layout>
      <HeroSection
        title="Optimize International Hiring. Reduce Costs. Stay Compliant."
        subtitle="EMPLOYERS"
        description="The premier immigration management platform for employers. Enable a global workforce and stay compliant with regulatory requirements."
        primaryCta={{ label: "Book a Demo", href: "/demo" }}
        image={heroImage}
        imageAlt="Employers reviewing documents"
        variant="teal"
      />

      <FeaturesSection
        title="Why Employers Choose Immipass"
        subtitle="BENEFITS"
        features={features}
      />

      <CTASection
        title="Ready to simplify your international hiring?"
        description="Book a call with our team to learn how we can help you scale your workforce."
        primaryCta={{ label: "Contact Sales", href: "/sales" }}
        variant="dark"
      />
    </Layout>
  );
};

export default Employers;
