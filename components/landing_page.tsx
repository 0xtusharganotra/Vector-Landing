import React, { useState, useEffect } from "react";
import {
  Github,
  Menu,
  X,
  ArrowRight,
  Database,
  Brain,
  AlertCircle,
  CheckCircle2,
  FileText,
  Search,
  Zap,
  Cpu,
  UploadCloud,
  MessageSquare,
  Code,
  Twitter,
  Linkedin,
} from "lucide-react";

/* =============================================================================
   STYLES (Tailwind classes are used inline, custom animations defined here)
   ============================================================================= */

const customStyles = `
  @keyframes float {
    0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
    50% { transform: translate(-50%, -50%) translateY(-10px); }
  }
  
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
  }
`;

/* =============================================================================
   VECTOR LOGO COMPONENT
   ============================================================================= */

interface VectorLogoProps {
  className?: string;
  color?: string;
}

const VectorLogo: React.FC<VectorLogoProps> = ({
  className = "w-12 h-12",
  color = "currentColor",
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Lines connecting nodes - "The Network" */}
      <path
        d="M50 90 L10 20"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.8"
      />
      <path
        d="M50 90 L90 20"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.8"
      />
      <path
        d="M50 90 L50 35"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.8"
      />

      {/* Inner V lines */}
      <path
        d="M50 90 L30 40"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <path
        d="M50 90 L70 40"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />

      {/* Cross connections */}
      <path
        d="M10 20 L30 25 L50 35 L70 25 L90 20"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.8"
      />
      <path
        d="M25 35 L38 42 L50 50 L62 42 L75 35"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.5"
      />

      {/* Nodes - "The Data Points" */}
      {/* Top Row */}
      <circle cx="10" cy="20" r="3" fill={color} />
      <circle cx="30" cy="25" r="3" fill={color} />
      <circle cx="50" cy="35" r="3" fill={color} />
      <circle cx="70" cy="25" r="3" fill={color} />
      <circle cx="90" cy="20" r="3" fill={color} />

      {/* Middle Row */}
      <circle cx="25" cy="35" r="2.5" fill={color} opacity="0.8" />
      <circle cx="38" cy="42" r="2.5" fill={color} opacity="0.8" />
      <circle cx="50" cy="50" r="2.5" fill={color} opacity="0.8" />
      <circle cx="62" cy="42" r="2.5" fill={color} opacity="0.8" />
      <circle cx="75" cy="35" r="2.5" fill={color} opacity="0.8" />

      {/* Base Node */}
      <circle cx="50" cy="90" r="4" fill={color} />
    </svg>
  );
};

/* =============================================================================
   NAVBAR SECTION
   ============================================================================= */

const NavbarSection: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Problem", href: "#problem" },
    { name: "Solution", href: "#solution" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Capabilities", href: "#capabilities" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-brand-dark/80 backdrop-blur-md border-slate-800 py-3"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            <VectorLogo className="w-10 h-10 text-white group-hover:text-slate-400 transition-colors duration-300" />
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-slate-400 transition-colors duration-300">
              VectorThink
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-full transition-all duration-300 border border-slate-700 hover:border-white"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-dark border-b border-slate-800 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-3 text-base font-medium text-white hover:bg-slate-800 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Github size={18} />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

/* =============================================================================
   HERO SECTION
   ============================================================================= */

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-brand-glow/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-slate-900/50 border border-slate-800 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
                v1 Public Beta
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Give Your AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                Infinite Memory
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              VectorThink is the memory engine for AI LLMs. Create an account,
              dump your data, and make your AI smart with persistent memory
              through semantic recall.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-lg font-bold text-lg hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2">
                <span>Get Started</span>
                <ArrowRight size={20} />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white border border-slate-700 rounded-lg font-bold text-lg hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2">
                <Github size={20} />
                <span>GitHub</span>
              </button>
            </div>
          </div>

          {/* Abstract Visual / Illustration */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Center Brain */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-slate-950 p-6 rounded-2xl border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.15)] animate-float">
                <Brain size={64} className="text-white" />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-mono text-white">
                  LLM Context
                </div>
              </div>

              {/* Orbital Data Points */}
              <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                  <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <Database size={24} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                  <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <Database size={24} className="text-white" />
                  </div>
                </div>
                <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2">
                  <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <Database size={24} className="text-white" />
                  </div>
                </div>
                <div className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2">
                  <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <Database size={24} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Connection Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-30">
                <circle
                  cx="50%"
                  cy="50%"
                  r="35%"
                  fill="none"
                  stroke="currentColor"
                  className="text-slate-700"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fill="none"
                  stroke="currentColor"
                  className="text-slate-800"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =============================================================================
   PROBLEM & SOLUTION SECTION
   ============================================================================= */

const ProblemSolutionSection: React.FC = () => {
  return (
    <section id="problem" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* The Problem */}
          <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-700/30 relative overflow-hidden group hover:border-slate-600 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertCircle size={120} className="text-slate-500" />
            </div>

            <div className="relative z-10">
              <h3 className="text-slate-400 font-bold tracking-widest uppercase text-sm mb-4">
                The Problem
              </h3>
              <h2 className="text-3xl font-bold text-white mb-6">
                LLMs Don't Have Memory
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Large Language Models are powerful but forgetful. They don't
                have native memory - once a session ends, everything is lost.
                VectorThink gives your AI a dedicated memory layer.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-300">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mr-3"></span>
                  LLMs can't remember past conversations
                </li>
                <li className="flex items-center text-slate-300">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mr-3"></span>
                  No persistent knowledge storage
                </li>
                <li className="flex items-center text-slate-300">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mr-3"></span>
                  Every session starts fresh
                </li>
              </ul>
            </div>
          </div>

          {/* The Solution */}
          <div
            id="solution"
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-white/30 relative overflow-hidden group hover:border-white/60 transition-colors shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle2 size={120} className="text-white" />
            </div>

            <div className="relative z-10">
              <h3 className="text-white font-bold tracking-widest uppercase text-sm mb-4">
                The Solution
              </h3>
              <h2 className="text-3xl font-bold text-white mb-6">
                VectorThink
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                A memory engine for AI LLMs. Create an account, dump your data,
                and make your AI assistant smart with semantic recall.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2
                    className="text-white mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <strong className="text-white block">
                      Store Everything
                    </strong>
                    <span className="text-slate-400 text-sm">
                      PDFs, videos, links, notes, documents - dump it all.
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2
                    className="text-white mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <strong className="text-white block">
                      Semantic Recall
                    </strong>
                    <span className="text-slate-400 text-sm">
                      Ask questions based on your stored memory.
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2
                    className="text-white mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <strong className="text-white block">Developer API</strong>
                    <span className="text-slate-400 text-sm">
                      Integrate memory into your own applications.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =============================================================================
   HOW IT WORKS SECTION
   ============================================================================= */

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: "Create Account",
      description:
        "Sign up for VectorThink and start building your AI's memory layer.",
      icon: <FileText size={32} className="text-white" />,
    },
    {
      id: 2,
      title: "Dump Your Data",
      description:
        "Upload PDFs, videos, links, notes, and any documents. We handle everything.",
      icon: <Cpu size={32} className="text-white" />,
    },
    {
      id: 3,
      title: "Semantic Recall",
      description:
        "Ask questions to your AI assistant. It retrieves relevant memories from your data.",
      icon: <Search size={32} className="text-white" />,
    },
    {
      id: 4,
      title: "Smart Conversations",
      description:
        "Your AI assistant responds with context-aware, personalized answers.",
      icon: <Zap size={32} className="text-white" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The Semantic Engine
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Built on a Retrieval-Augmented Generation (RAG) architecture that
            transforms raw data into active intelligence.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900 -translate-y-1/2 z-0 opacity-30"></div>

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => (
              <div key={step.id} className="group">
                <div className="relative flex flex-col items-center text-center p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-white/50 transition-all duration-300 hover:-translate-y-2 shadow-lg">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 bg-slate-950 border border-slate-700 text-slate-500 font-mono text-xs px-2 py-1 rounded-full">
                    0{step.id}
                  </div>

                  {/* Icon Container */}
                  <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 group-hover:border-white transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    {step.icon}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* =============================================================================
   FEATURES SECTION
   ============================================================================= */

interface Feature {
  title: string;
  description: string;
  icon: React.FC<{ size?: number }>;
}

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      title: "Multi-Format Storage",
      description:
        "Store any data type seamlessly - PDFs, videos, links, notes, and documents. We handle parsing automatically.",
      icon: UploadCloud,
    },
    {
      title: "Semantic Recall",
      description:
        "Retrieve memories intelligently through semantic search. Ask questions and get answers based on your stored data.",
      icon: MessageSquare,
    },
    {
      title: "RAG-Based AI",
      description:
        "Retrieval-Augmented Generation powers personalized conversations. Your AI assistant recalls context from your memory.",
      icon: Brain,
    },
    {
      title: "Developer API",
      description:
        "Integrate memory into your own apps. Build persistent chat and smart AI applications with our RESTful API.",
      icon: Code,
    },
  ];

  return (
    <section id="capabilities" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Key Capabilities
          </h2>
          <div className="h-1 w-20 bg-white rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-brand-card p-6 rounded-xl border border-white/10 hover:border-white/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-brand-dark border border-white/10 rounded-lg flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-slate-950 transition-all">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =============================================================================
   CTA SECTION
   ============================================================================= */

const CTASection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl font-bold text-white mb-6">
          Get Started with the API
        </h2>
        <p className="text-slate-400 mb-8 text-lg">
          Integrate VectorThink's memory engine into your own applications.
          Build persistent chat, smart AI agents, and more.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            Get API Access
          </button>
          <button className="px-8 py-3 bg-transparent border border-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors">
            View on GitHub
          </button>
        </div>
      </div>
    </section>
  );
};

/* =============================================================================
   FOOTER SECTION
   ============================================================================= */

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <VectorLogo className="w-8 h-8 text-white" />
            <span className="text-lg font-bold text-white">VectorThink</span>
          </div>

          <div className="text-slate-500 text-sm mb-6 md:mb-0">
            © {new Date().getFullYear()} VectorThink Project. All rights
            reserved.
          </div>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* =============================================================================
   MAIN LANDING PAGE COMPONENT
   ============================================================================= */

const LandingPage: React.FC = () => {
  return (
    <>
      {/* Inject Custom Styles */}
      <style>{customStyles}</style>

      <div className="min-h-screen bg-brand-dark selection:bg-white/30 selection:text-white">
        <NavbarSection />
        <main>
          <HeroSection />
          <ProblemSolutionSection />
          <HowItWorksSection />
          <FeaturesSection />
          <CTASection />
        </main>
        <FooterSection />
      </div>
    </>
  );
};

export default LandingPage;
