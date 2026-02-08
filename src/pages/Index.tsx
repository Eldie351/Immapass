import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Plane, FileCheck, Shield, Users, Briefcase, GraduationCap, User, Cpu, FileText, ListOrdered, Target, FileSearch, Sparkles, UserPlus, BookOpen, Globe, Wallet, Handshake, Lock, Languages, Scale, EyeOff } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const Index = () => {
    const howItWorks = [
        {
            icon: User,
            title: "Create a profile",
            description: "Users securely enter personal background, education, work history, and language results."
        },
        {
            icon: Cpu,
            title: "Run the assessment",
            description: "A rules-based system compares their profile with major federal and provincial immigration programs."
        },
        {
            icon: FileText,
            title: "Receive an action plan",
            description: "Users get a ranked list of suitable programs, explanations, next steps, and the option to consult a professional."
        }
    ];

    const paidAssessmentFeatures = [
        {
            icon: ListOrdered,
            title: "Ranked Program List",
            description: "A ranked list of the most relevant immigration programs tailored to your specific profile and goals."
        },
        {
            icon: Target,
            title: "Estimated Scores",
            description: "Detailed estimated scores for point-based systems like Express Entry to help you understand where you stand."
        },
        {
            icon: FileSearch,
            title: "Strengths & Weaknesses",
            description: "Comprehensive explanations of the strengths and weaknesses in your profile to identify gaps."
        },
        {
            icon: Sparkles,
            title: "Personalized Advice",
            description: "Actionable, personalized advice on how to improve your eligibility and increase your points."
        },
        {
            icon: UserPlus,
            title: "Professional Consultation",
            description: "The option to add a private consultation with a licensed immigration professional at a preferred rate."
        }
    ];

    const assessmentCoverage = [
        {
            icon: User,
            title: "Personal Details",
            description: "We collect key personal and family details to ensure accurate eligibility assessment for all family members."
        },
        {
            icon: BookOpen,
            title: "Education & Language",
            description: "Deep dive into your Canadian and foreign education (including ECA status) and language test results."
        },
        {
            icon: Briefcase,
            title: "Work Experience",
            description: "Detailed analysis of your work history both inside and outside Canada to maximize your points."
        },
        {
            icon: Globe,
            title: "Regional Preferences",
            description: "We consider your job offers and provincial preferences to match you with the right PNP streams."
        },
        {
            icon: Wallet,
            title: "Financial Capacity",
            description: "Assessment of your settlement funds and financial capacity to meet program requirements."
        },
        {
            icon: Handshake,
            title: "Special Considerations",
            description: "We identify complex situations like refugee claims or H&C factors to flag when legal consultation is needed."
        }
    ];

    const trustFeatures = [
        {
            icon: Lock,
            title: "Encrypted Data",
            description: "Your data is stored securely with industry-standard encryption. We prioritize the protection of your personal information."
        },
        {
            icon: EyeOff,
            title: "Privacy First",
            description: "We use your personal information strictly for assessments and requested services. Your data is not sold to third parties."
        },
        {
            icon: Languages,
            title: "Bilingual Support",
            description: "Full availability in both English and French to support you in the official language of your choice."
        },
        {
            icon: Scale,
            title: "Legal Disclaimer",
            description: "This tool is for guidance only. Official immigration decisions are made solely by IRCC and provincial authorities."
        }
    ];

    const features = [
        {
            icon: Plane,
            title: "Apply for Visas",
            description: "Navigate the immigration process with clear understanding and automatic updates. Study, work, or visit Canada with confidence."
        },
        {
            icon: FileCheck,
            title: "Lawyer Review",
            description: "Get guidance and expertise from expert immigration lawyers to help prepare your strongest application. Avoid common mistakes."
        },
        {
            icon: Shield,
            title: "Stay Organized",
            description: "Keep your critical documents organized and on-hand in your personal Immipass Document Vault. Never lose track of important files."
        },
        {
            icon: Users,
            title: "Arrive Prepared",
            description: "Get special offers on mobile phone, internet, and more with extensive services for Immipass Members to help you settle in."
        },
        {
            icon: Briefcase,
            title: "Continue Journey",
            description: "Plan your path to permanent residence with tools, tips, and expert legal guidance. We support you from arrival to citizenship."
        },
        {
            icon: GraduationCap,
            title: "Student Support",
            description: "Immipass stands by international students with additional services like tax filing, credit building, auto leases, and loans."
        }
    ];

    return (
        <Layout>
            <HeroSection
                title="Your trusted guide along your immigration journey"
                subtitle="WELCOME"
                description="Students, workers, and visitors: Immipass is with you at every step. Apply for your visa, submit for lawyer review, and stay organized."
                primaryCta={{ label: "Get Started", href: "/become-a-member" }}
                image={heroImage}
                imageAlt="Happy people in Canada"
                variant="teal"
            />

            <FeaturesSection
                title="How the Platform Works"
                subtitle="SIMPLE PROCESS"
                features={howItWorks}
            />

            <FeaturesSection
                title="Go Further with a Paid Assessment"
                subtitle="DETAILED ANALYSIS"
                features={paidAssessmentFeatures}
                variant="teal"
            />

            <FeaturesSection
                title="What We Analyze"
                subtitle="COMPREHENSIVE COVERAGE"
                features={assessmentCoverage}
            />

            <FeaturesSection
                title="Our Commitment to You"
                subtitle="TRUST & TRANSPARENCY"
                features={trustFeatures}
                variant="teal"
            />

            <FeaturesSection
                title="Why Immipass?"
                subtitle="KEY BENEFITS"
                features={features}
            />

            <CTASection
                title="Ready to start your journey?"
                description="Join thousands of newcomers who trust Immipass for their immigration needs."
                primaryCta={{ label: "Create Account", href: "/become-a-member" }}
                variant="dark"
            />
        </Layout>
    );
};

export default Index;
