import React, { useState, useEffect, useRef } from "react";
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
  Linkedin,
  Network,
  Layers,
  GitBranch,
  Box,
  Activity,
  Sparkles,
  Globe,
  Lock,
  Gauge,
} from "lucide-react";

/* =============================================================================
   CUSTOM ANIMATIONS & STYLES
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

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes node-pulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.2); opacity: 1; }
  }

  @keyframes flow-right {
    0% { transform: translateX(-100%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
  }

  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes scale-in {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.1); }
    50% { box-shadow: 0 0 40px rgba(255,255,255,0.3); }
  }

  @keyframes data-flow {
    0% { stroke-dashoffset: 100; }
    100% { stroke-dashoffset: 0; }
  }

  @keyframes particle-float {
    0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient-shift 8s ease infinite;
  }

  .animate-node-pulse {
    animation: node-pulse 2s ease-in-out infinite;
  }

  .animate-flow-right {
    animation: flow-right 3s ease-in-out infinite;
  }

  .animate-rotate-slow {
    animation: rotate-slow 20s linear infinite;
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
    opacity: 0;
  }

  .animate-scale-in {
    animation: scale-in 0.5s ease-out forwards;
    opacity: 0;
  }

  .animate-shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }

  .animate-glow-pulse {
    animation: glow-pulse 3s ease-in-out infinite;
  }

  .animate-data-flow {
    animation: data-flow 2s linear infinite;
  }

  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  .stagger-5 { animation-delay: 0.5s; }

  .glass-card {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .grid-bg {
    background-image: 
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  .perspective-1000 {
    perspective: 1000px;
  }

  .transform-style-3d {
    transform-style: preserve-3d;
  }
`;

/* =============================================================================
   VISUAL PIPELINE COMPONENT - Shows data flowing through processing stages
   ============================================================================= */

interface PipelineStage {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const VisualPipeline: React.FC = () => {
  const stages: PipelineStage[] = [
    {
      id: "ingest",
      label: "Ingest",
      icon: <UploadCloud size={20} />,
      description: "Raw Data",
    },
    {
      id: "embed",
      label: "Embed",
      icon: <Layers size={20} />,
      description: "Vectorize",
    },
    {
      id: "store",
      label: "Store",
      icon: <Database size={20} />,
      description: "Vector DB",
    },
    {
      id: "retrieve",
      label: "Retrieve",
      icon: <Search size={20} />,
      description: "Semantic Search",
    },
    {
      id: "generate",
      label: "Generate",
      icon: <Sparkles size={20} />,
      description: "LLM Response",
    },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Pipeline Container */}
      <div className="flex items-center justify-between relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 z-0"></div>

        {/* Animated Flow Particles */}
        <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2 z-0 overflow-hidden">
          <div className="absolute w-2 h-1 bg-white/60 rounded-full animate-flow-right"></div>
        </div>

        {stages.map((stage, index) => (
          <div
            key={stage.id}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Stage Icon */}
            <div
              className={`
                w-16 h-16 rounded-xl flex items-center justify-center
                bg-slate-900/80 border border-white/20
                hover:border-white/60 hover:bg-slate-800/80
                transition-all duration-300 group
                ${index === 2 ? "animate-node-pulse" : ""}
              `}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="text-white/80 group-hover:text-white transition-colors">
                {stage.icon}
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Label */}
            <div className="mt-3 text-center">
              <span className="text-xs font-medium text-white/90 tracking-wide">
                {stage.label}
              </span>
              <p className="text-[10px] text-white/40 mt-0.5">
                {stage.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Data Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${15 + i * 14}%`,
              top: "50%",
              animation: `particle-float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* =============================================================================
   KNOWLEDGE GRAPH COMPONENT - Interactive knowledge visualization
   ============================================================================= */

interface GraphNode {
  id: string;
  label: string;
  type: "core" | "entity" | "relation";
  x: number;
  y: number;
}

const KnowledgeGraph: React.FC = () => {
  const nodes: GraphNode[] = [
    { id: "1", label: "Core", type: "core", x: 50, y: 50 },
    { id: "2", label: "Doc", type: "entity", x: 20, y: 30 },
    { id: "3", label: "Data", type: "entity", x: 80, y: 30 },
    { id: "4", label: "Query", type: "entity", x: 20, y: 70 },
    { id: "5", label: "Memory", type: "entity", x: 80, y: 70 },
    { id: "6", label: "Link", type: "relation", x: 35, y: 40 },
    { id: "7", label: "Link", type: "relation", x: 65, y: 40 },
    { id: "8", label: "Link", type: "relation", x: 35, y: 60 },
    { id: "9", label: "Link", type: "relation", x: 65, y: 60 },
  ];

  const connections = [
    ["1", "2"],
    ["1", "3"],
    ["1", "4"],
    ["1", "5"],
    ["2", "6"],
    ["3", "7"],
    ["4", "8"],
    ["5", "9"],
  ];

  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Connections */}
        {connections.map(([from, to], i) => {
          const fromNode = nodes.find((n) => n.id === from)!;
          const toNode = nodes.find((n) => n.id === to)!;
          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.5"
              className="animate-data-flow"
              style={{ strokeDasharray: "2 1", animationDelay: `${i * 0.2}s` }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={node.id} style={{ animationDelay: `${i * 0.15}s` }}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.type === "core" ? 6 : node.type === "entity" ? 4 : 2}
              fill={
                node.type === "core"
                  ? "rgba(255,255,255,0.9)"
                  : node.type === "entity"
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(255,255,255,0.3)"
              }
              className="animate-node-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            <text
              x={node.x}
              y={node.y + (node.type === "core" ? 10 : 8)}
              fontSize="4"
              fill="rgba(255,255,255,0.5)"
              textAnchor="middle"
              className="pointer-events-none"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Center Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse-slow"></div>
    </div>
  );
};

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
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-white/10 py-3 shadow-lg shadow-black/20"
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
            <div className="relative">
              <VectorLogo className="w-10 h-10 text-white group-hover:text-slate-300 transition-colors duration-300" />
              <div className="absolute inset-0 bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-slate-300 transition-colors duration-300">
              VectorThink
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
              >
                {link.name}
              </a>
            ))}

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 border border-white/10 hover:border-white/30"
            >
              <Github size={16} />
              <span className="text-sm font-medium">GitHub</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/10 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-3 text-base font-medium text-white hover:bg-white/5 rounded-lg transition-colors"
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Grid Background */}
        <div className="absolute inset-0 grid-bg"></div>

        {/* Gradient Orbs */}
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-brand-glow/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/5 to-transparent rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div
            className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center space-x-2 bg-slate-900/50 border border-slate-800 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm animate-fade-in-up stagger-1">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
                v1 Public Beta
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight animate-fade-in-up stagger-2">
              Give Your AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 animate-gradient">
                Infinite Memory
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up stagger-3">
              VectorThink is the memory engine for AI LLMs. Create an account,
              dump your data, and make your AI smart with persistent memory
              through semantic recall.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up stagger-4">
              <a
                href="https://vector-think.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-lg font-bold text-lg hover:bg-slate-200 transition-all duration-300 flex items-center justify-center space-x-2 group hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                <span>Get Started</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="https://github.com/0xtusharganotra/VectorThink"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900/50 text-white border border-slate-700 rounded-lg font-bold text-lg hover:bg-slate-800 transition-all duration-300 flex items-center justify-center space-x-2 hover:border-white/50"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-white/10 flex justify-center lg:justify-start gap-8 animate-fade-in-up stagger-5">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  Vectors
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  Accuracy
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">&lt;50ms</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  Latency
                </div>
              </div>
            </div>
          </div>

          {/* Visual Pipeline & Abstract Visual */}
          <div
            className={`hidden lg:flex flex-col items-center justify-center relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            {/* Main Visual Container */}
            <div className="w-full max-w-2xl">
              <div className="glass-card rounded-2xl p-8 border border-white/10 animate-glow-pulse">
                <div className="text-center mb-6">
                  <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">
                    How It Works
                  </span>
                </div>

                {/* Visual Pipeline */}
                <VisualPipeline />
              </div>

              {/* Knowledge Graph Preview */}
              <div className="mt-6 flex gap-6 justify-center">
                <div className="glass-card rounded-xl p-4 border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                    <Network size={20} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Graph Nodes</div>
                    <div className="text-sm font-medium text-white">10K+</div>
                  </div>
                </div>
                <div className="glass-card rounded-xl p-4 border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                    <Activity size={20} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Queries/sec</div>
                    <div className="text-sm font-medium text-white">1K+</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `particle-float ${4 + Math.random() * 2}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
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
    <section
      id="problem"
      className="py-32 bg-slate-950 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* The Problem */}
          <div className="bg-slate-900/50 rounded-2xl p-8 border border-red-500/20 relative overflow-hidden group hover:border-red-500/40 transition-colors">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <AlertCircle size={140} className="text-red-500" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <AlertCircle size={20} className="text-red-400" />
                </div>
                <h3 className="text-red-400 font-bold tracking-widest uppercase text-sm">
                  The Problem
                </h3>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6">
                LLMs Don't Have Memory
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Large Language Models are powerful but forgetful. They don't
                have native memory - once a session ends, everything is lost.
                VectorThink gives your AI a dedicated memory layer.
              </p>
              <ul className="space-y-4">
                {[
                  "LLMs can't remember past conversations",
                  "No persistent knowledge storage",
                  "Every session starts fresh",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-300">
                    <span className="w-1.5 h-1.5 bg-red-500/50 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The Solution */}
          <div
            id="solution"
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-green-500/30 relative overflow-hidden group hover:border-green-500/60 transition-colors shadow-2xl"
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <CheckCircle2 size={140} className="text-green-500" />
            </div>

            {/* Animated Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-green-400" />
                </div>
                <h3 className="text-green-400 font-bold tracking-widest uppercase text-sm">
                  The Solution
                </h3>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6">
                VectorThink
              </h2>
              <p className="text-slate-300 leading-relaxed mb-8">
                A memory engine for AI LLMs. Create an account, dump your data,
                and make your AI assistant smart with semantic recall.
              </p>
              <ul className="space-y-5">
                {[
                  {
                    title: "Store Everything",
                    desc: "PDFs, videos, links, notes, documents - dump it all.",
                  },
                  {
                    title: "Semantic Recall",
                    desc: "Ask questions based on your stored memory.",
                  },
                  {
                    title: "Developer API",
                    desc: "Integrate memory into your own applications.",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <CheckCircle2 className="text-green-400" size={14} />
                    </div>
                    <div>
                      <strong className="text-white block text-sm font-semibold">
                        {item.title}
                      </strong>
                      <span className="text-slate-400 text-sm">
                        {item.desc}
                      </span>
                    </div>
                  </li>
                ))}
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
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: "Create Account",
      description:
        "Sign up for VectorThink and start building your AI's memory layer.",
      icon: <FileText size={32} className="text-white" />,
      detail: "Get started in seconds",
    },
    {
      id: 2,
      title: "Dump Your Data",
      description:
        "Upload PDFs, videos, links, notes, and any documents. We handle everything.",
      icon: <Cpu size={32} className="text-white" />,
      detail: "Multi-format support",
    },
    {
      id: 3,
      title: "Semantic Recall",
      description:
        "Ask questions to your AI assistant. It retrieves relevant memories from your data.",
      icon: <Search size={32} className="text-white" />,
      detail: "Intelligent retrieval",
    },
    {
      id: 4,
      title: "Smart Conversations",
      description:
        "Your AI assistant responds with context-aware, personalized answers.",
      icon: <Zap size={32} className="text-white" />,
      detail: "Context-aware AI",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-32 bg-slate-950 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-50"></div>
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/3 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-glow/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            The Semantic Engine
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Built on a Retrieval-Augmented Generation (RAG) architecture that
            transforms raw data into active intelligence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Knowledge Graph Visualization */}
          <div className="relative order-2 lg:order-1">
            <div className="glass-card rounded-2xl p-8 border border-white/10 relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

              {/* Knowledge Graph */}
              <div className="relative z-10">
                <KnowledgeGraph />
              </div>

              {/* Floating Labels */}
              <div className="absolute top-4 left-4 text-xs font-medium text-slate-500 uppercase tracking-widest">
                Knowledge Graph
              </div>
              <div className="absolute bottom-4 right-4 text-xs text-slate-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></span>
                Live Connection
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-white/10 rounded-full animate-rotate-slow opacity-30"></div>
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 border border-white/5 rounded-full animate-rotate-slow opacity-20"
              style={{
                animationDirection: "reverse",
                animationDuration: "30s",
              }}
            ></div>
          </div>

          {/* Steps */}
          <div className="order-1 lg:order-2 space-y-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`
                  relative p-6 rounded-xl border transition-all duration-500 cursor-pointer group
                  ${
                    activeStep === step.id
                      ? "bg-white/10 border-white/30 scale-[1.02]"
                      : "bg-slate-900/50 border-white/5 hover:border-white/20 hover:bg-slate-900/80"
                  }
                `}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="flex items-start gap-4">
                  {/* Step Number */}
                  <div
                    className={`
                    w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold
                    transition-all duration-300
                    ${
                      activeStep === step.id
                        ? "bg-white text-slate-900"
                        : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                    }
                  `}
                  >
                    {String(step.id).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">
                        {step.title}
                      </h3>
                      {activeStep === step.id && (
                        <Sparkles
                          size={16}
                          className="text-white/80 animate-pulse"
                        />
                      )}
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-2">
                      {step.description}
                    </p>
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                      {step.detail}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    transition-all duration-300
                    ${
                      activeStep === step.id
                        ? "bg-white/20 text-white"
                        : "bg-slate-800 text-slate-500 group-hover:text-white/80"
                    }
                  `}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Active Indicator */}
                {activeStep === step.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-l-xl"></div>
                )}
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
  stats?: string;
}

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      title: "Multi-Format Storage",
      description:
        "Store any data type seamlessly - PDFs, videos, links, notes, and documents. We handle parsing automatically.",
      icon: UploadCloud,
      stats: "50+ formats",
    },
    {
      title: "Semantic Recall",
      description:
        "Retrieve memories intelligently through semantic search. Ask questions and get answers based on your stored data.",
      icon: MessageSquare,
      stats: "99.9% accuracy",
    },
    {
      title: "RAG-Based AI",
      description:
        "Retrieval-Augmented Generation powers personalized conversations. Your AI assistant recalls context from your memory.",
      icon: Brain,
      stats: "Real-time",
    },
    {
      title: "Developer API",
      description:
        "Integrate memory into your own apps. Build persistent chat and smart AI applications with our RESTful API.",
      icon: Code,
      stats: "SDK available",
    },
  ];

  return (
    <section
      id="capabilities"
      className="py-32 bg-slate-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Key Capabilities
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-white to-slate-600 rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative bg-slate-950/50 p-6 rounded-2xl border border-white/5 hover:border-white/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center mb-5 text-white group-hover:bg-white group-hover:text-slate-900 transition-all duration-300 group-hover:scale-110">
                  <feature.icon size={28} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Stats Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <Gauge size={12} className="text-white/60" />
                  <span className="text-xs font-medium text-white/70">
                    {feature.stats}
                  </span>
                </div>
              </div>
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
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900"></div>
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-brand-glow/10 rounded-full blur-[100px] animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Main CTA Card */}
        <div className="glass-card rounded-3xl p-12 border border-white/10 relative overflow-hidden">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8">
              <Sparkles size={16} className="text-white/80" />
              <span className="text-sm font-medium text-white/80">
                Start Building Today
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Get Started with the API
            </h2>

            <p className="text-slate-400 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
              Integrate VectorThink's memory engine into your own applications.
              Build persistent chat, smart AI agents, and more.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button
                onClick={() => alert("Coming Soon...")}
                className="px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] flex items-center justify-center gap-2 group"
              >
                <span>Get API Access</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <a
                href="https://github.com/0xtusharganotra/VectorThink"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Github size={20} />
                <span>View on GitHub</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-slate-500">
                <Lock size={16} />
                <span className="text-sm">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Gauge size={16} />
                <span className="text-sm">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Globe size={16} />
                <span className="text-sm">Global CDN</span>
              </div>
            </div>
          </div>
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
    <footer className="bg-slate-950 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <VectorLogo className="w-8 h-8 text-white" />
            <span className="text-lg font-bold text-white">VectorThink</span>
          </div>

          {/* Copyright */}
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} VectorThink Project. All rights
            reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://www.linkedin.com/in/tusharganotra/"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/0xtusharganotra/VectorThink"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <span>Built with Vector DB + LLM</span>
            <span>•</span>
            <span>RAG Architecture</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500/50 rounded-full animate-pulse"></span>
            <span>All systems operational</span>
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
