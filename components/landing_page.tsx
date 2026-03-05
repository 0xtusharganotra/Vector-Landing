import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Github,
  Menu,
  X,
  ArrowRight,
  Database,
  Brain,
  FileText,
  Search,
  Zap,
  UploadCloud,
  MessageSquare,
  Code,
  Linkedin,
  Play,
  Layers,
  Network,
  Sparkles,
  ChevronRight,
  Globe,
  Lock,
  BarChart3,
  Cpu,
  Workflow,
  GitBranch,
  Terminal,
  Shield,
  Clock,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";

/* =============================================================================
   TYPES & INTERFACES
   ============================================================================= */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

/* =============================================================================
   CUSTOM STYLES & ANIMATIONS
   ============================================================================= */

const customStyles = `
  :root {
    --primary-glow: rgba(99, 102, 241, 0.5);
    --secondary-glow: rgba(168, 85, 247, 0.5);
    --accent-glow: rgba(56, 189, 248, 0.5);
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(-2deg); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.4; transform: scale(1); filter: blur(40px); }
    50% { opacity: 0.8; transform: scale(1.1); filter: blur(60px); }
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%) rotate(0deg); }
    100% { transform: translateX(100%) rotate(0deg); }
  }
  
  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes rotate-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(40px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  @keyframes scale-in {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes slide-in-right {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  
  @keyframes data-pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
    to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
  }
  
  @keyframes orbit-reverse {
    from { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
    to { transform: rotate(0deg) translateX(80px) rotate(0deg); }
  }
  
  @keyframes draw-line {
    to { stroke-dashoffset: 0; }
  }
  
  @keyframes node-glow {
    0%, 100% { filter: drop-shadow(0 0 5px rgba(255,255,255,0.3)); }
    50% { filter: drop-shadow(0 0 20px rgba(255,255,255,0.8)); }
  }
  
  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }
  
  @keyframes blink {
    50% { border-color: transparent; }
  }
  
  @keyframes wave {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-5px); }
    75% { transform: translateY(5px); }
  }
  
  @keyframes border-flow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; animation-delay: 1s; }
  .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
  .animate-rotate-slow { animation: rotate-slow 30s linear infinite; }
  .animate-rotate-reverse { animation: rotate-reverse 25s linear infinite; }
  .animate-shimmer { animation: shimmer 3s infinite; }
  .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
  .animate-data-pulse { animation: data-pulse 2s ease-in-out infinite; }
  .animate-node-glow { animation: node-glow 2s ease-in-out infinite; }
  .animate-orbit { animation: orbit 20s linear infinite; }
  .animate-orbit-reverse { animation: orbit-reverse 15s linear infinite; }
  
  .glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .glass-strong {
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .glass-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  
  .gradient-text {
    background: linear-gradient(135deg, #fff 0%, #a5b4fc 25%, #c084fc 50%, #fff 75%, #fff 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradient-shift 5s ease infinite;
  }
  
  .gradient-text-animated {
    background: linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6, #60a5fa);
    background-size: 300% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradient-shift 3s linear infinite;
  }
  
  .gradient-border {
    position: relative;
    background: linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.7));
    border-radius: inherit;
  }
  
  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(99,102,241,0.5), rgba(168,85,247,0.5), rgba(56,189,248,0.5));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: border-flow 4s linear infinite;
    background-size: 200% 200%;
  }
  
  .glow-button {
    position: relative;
    overflow: hidden;
  }
  
  .glow-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.6s;
  }
  
  .glow-button:hover::before {
    left: 100%;
  }
  
  .glow-button::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(90deg, #6366f1, #a855f7, #38bdf8);
    border-radius: inherit;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s;
    filter: blur(8px);
  }
  
  .glow-button:hover::after {
    opacity: 0.6;
  }
  
  .card-hover {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .card-hover:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 80px rgba(99,102,241,0.15);
  }
  
  .scroll-reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .scroll-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-grid {
    background-image: 
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  }
  
  .mesh-gradient {
    background: 
      radial-gradient(at 40% 20%, rgba(99,102,241,0.15) 0px, transparent 50%),
      radial-gradient(at 80% 0%, rgba(168,85,247,0.15) 0px, transparent 50%),
      radial-gradient(at 0% 50%, rgba(56,189,248,0.15) 0px, transparent 50%),
      radial-gradient(at 80% 50%, rgba(236,72,153,0.1) 0px, transparent 50%),
      radial-gradient(at 0% 100%, rgba(99,102,241,0.1) 0px, transparent 50%);
  }
  
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
  }
  
  .typing-effect {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid rgba(255,255,255,0.6);
    animation: typing 3s steps(40) 1s forwards, blink 0.75s step-end infinite;
  }
  
  .pipeline-connector {
    position: relative;
    overflow: hidden;
  }
  
  .pipeline-connector::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.8), transparent);
    animation: shimmer 2s infinite;
  }
  
  .noise-bg {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
  }
`;

/* =============================================================================
   PARTICLE NETWORK BACKGROUND
   ============================================================================= */

const ParticleNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        // Mouse interaction
        const mouseDx = mouseRef.current.x - particle.x;
        const mouseDy = mouseRef.current.y - particle.y;
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

        if (mouseDistance < 200) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.3 * (1 - mouseDistance / 200)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

/* =============================================================================
   VECTOR LOGO COMPONENT
   ============================================================================= */

const VectorLogo: React.FC<{ className?: string }> = ({
  className = "w-12 h-12",
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <path
        d="M50 90 L10 20"
        stroke="url(#logoGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M50 90 L90 20"
        stroke="url(#logoGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M50 90 L50 35"
        stroke="url(#logoGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M50 90 L30 40"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M50 90 L70 40"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M10 20 L30 25 L50 35 L70 25 L90 20"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        strokeOpacity="0.8"
        strokeLinecap="round"
      />
      <path
        d="M25 35 L38 42 L50 50 L62 42 L75 35"
        stroke="url(#logoGradient)"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="20" r="4" fill="url(#logoGradient)" />
      <circle cx="30" cy="25" r="4" fill="url(#logoGradient)" />
      <circle cx="50" cy="35" r="4" fill="url(#logoGradient)" />
      <circle cx="70" cy="25" r="4" fill="url(#logoGradient)" />
      <circle cx="90" cy="20" r="4" fill="url(#logoGradient)" />
      <circle cx="50" cy="90" r="5" fill="url(#logoGradient)" />
    </svg>
  );
};

/* =============================================================================
   ENHANCED KNOWLEDGE GRAPH VISUALIZATION
   ============================================================================= */

const KnowledgeGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 500 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDimensions({ width: 320, height: 280 });
      } else if (window.innerWidth < 768) {
        setDimensions({ width: 400, height: 350 });
      } else if (window.innerWidth < 1024) {
        setDimensions({ width: 500, height: 420 });
      } else {
        setDimensions({ width: 600, height: 500 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Responsive node positions
    const scale = dimensions.width / 600;
    const nodes = [
      {
        x: 300,
        y: 60,
        label: "Documents",
        icon: "📄",
        size: 22,
        type: "input",
        color: "#60a5fa",
      },
      {
        x: 150,
        y: 140,
        label: "Media",
        icon: "🎬",
        size: 18,
        type: "input",
        color: "#a78bfa",
      },
      {
        x: 450,
        y: 140,
        label: "Links",
        icon: "🔗",
        size: 18,
        type: "input",
        color: "#38bdf8",
      },
      {
        x: 80,
        y: 240,
        label: "Notes",
        icon: "📝",
        size: 16,
        type: "input",
        color: "#f472b6",
      },
      {
        x: 180,
        y: 220,
        label: "Chat",
        icon: "💬",
        size: 16,
        type: "input",
        color: "#34d399",
      },
      {
        x: 420,
        y: 220,
        label: "Code",
        icon: "💻",
        size: 16,
        type: "input",
        color: "#fbbf24",
      },
      {
        x: 520,
        y: 240,
        label: "API",
        icon: "⚡",
        size: 16,
        type: "input",
        color: "#fb923c",
      },
      {
        x: 300,
        y: 180,
        label: "Embed",
        icon: "🔢",
        size: 28,
        type: "process",
        color: "#6366f1",
      },
      {
        x: 300,
        y: 320,
        label: "Vector DB",
        icon: "🗄️",
        size: 32,
        type: "process",
        color: "#8b5cf6",
      },
      {
        x: 300,
        y: 440,
        label: "LLM",
        icon: "🧠",
        size: 38,
        type: "output",
        color: "#ec4899",
      },
    ].map((n) => ({
      ...n,
      x: n.x * scale,
      y: n.y * scale,
      size: n.size * scale,
    }));

    let animationFrame: number;
    let time = 0;
    const particles: { node: number; progress: number; speed: number }[] = [];

    // Initialize flow particles
    for (let i = 0; i < 15; i++) {
      particles.push({
        node: Math.floor(Math.random() * 3),
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.01,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const connections = [
        [0, 7],
        [1, 7],
        [2, 7],
        [3, 8],
        [4, 8],
        [5, 8],
        [6, 8],
        [7, 8],
        [8, 9],
      ];

      // Draw animated connections
      connections.forEach(([from, to], idx) => {
        const start = nodes[from];
        const end = nodes[to];

        // Create gradient
        const gradient = ctx.createLinearGradient(
          start.x,
          start.y,
          end.x,
          end.y,
        );
        gradient.addColorStop(0, `${start.color}40`);
        gradient.addColorStop(0.5, `${end.color}80`);
        gradient.addColorStop(1, `${end.color}40`);

        // Animated line width
        const lineWidth = 1.5 + Math.sin(time * 2 + idx) * 0.5;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = lineWidth * scale;
        ctx.stroke();
      });

      // Draw flow particles
      particles.forEach((particle) => {
        particle.progress += particle.speed;
        if (particle.progress > 1) {
          particle.progress = 0;
          particle.node = Math.floor(Math.random() * 7);
        }

        const start = nodes[particle.node];
        const end = nodes[particle.node < 7 ? 7 : 8];

        const x = start.x + (end.x - start.x) * particle.progress;
        const y = start.y + (end.y - start.y) * particle.progress;

        ctx.beginPath();
        ctx.arc(x, y, 4 * scale, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = end.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes
      nodes.forEach((node, idx) => {
        const isHovered =
          Math.abs(mouseRef.current.x - node.x) < node.size * 2 &&
          Math.abs(mouseRef.current.y - node.y) < node.size * 2;

        // Outer glow
        const pulseSize = node.size * (2 + Math.sin(time * 3 + idx) * 0.3);
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          pulseSize * 2,
        );
        gradient.addColorStop(0, `${node.color}${isHovered ? "60" : "30"}`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Node background
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
        ctx.fill();

        // Node border
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2 * scale;
        ctx.stroke();

        // Inner glow
        const innerGradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.size,
        );
        innerGradient.addColorStop(0, `${node.color}40`);
        innerGradient.addColorStop(1, "transparent");
        ctx.fillStyle = innerGradient;
        ctx.fill();

        // Icon
        ctx.font = `${node.size}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.icon, node.x, node.y);

        // Label
        ctx.font = `${11 * scale}px Inter, sans-serif`;
        ctx.fillStyle = isHovered ? "#fff" : "rgba(255,255,255,0.7)";
        ctx.fillText(node.label, node.x, node.y + node.size + 15 * scale);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="max-w-full h-auto cursor-crosshair"
    />
  );
};

/* =============================================================================
   ENHANCED DATA PIPELINE VISUALIZATION
   ============================================================================= */

const DataPipeline: React.FC = () => {
  const stages = [
    {
      icon: UploadCloud,
      label: "Ingest",
      desc: "Multi-format upload",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Layers,
      label: "Process",
      desc: "Chunk & embed",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Database,
      label: "Store",
      desc: "Vector database",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Search,
      label: "Retrieve",
      desc: "Semantic search",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: Brain,
      label: "Generate",
      desc: "RAG response",
      color: "from-rose-500 to-red-500",
    },
  ];

  return (
    <div className="relative py-12">
      {/* Connection line background */}
      <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 hidden lg:block">
        <div className="h-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/50 to-pink-500/0 animate-shimmer"
          style={{ backgroundSize: "200% 100%" }}
        />
      </div>

      {/* Pipeline stages */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4">
        {stages.map((stage, idx) => (
          <React.Fragment key={idx}>
            <div className="relative group w-full lg:w-auto">
              {/* Card */}
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transition-all duration-500 hover:border-white/30 hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] overflow-hidden">
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stage.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer" />

                <div className="relative z-10 flex items-center lg:flex-col lg:text-center gap-4 lg:gap-0">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-gradient-to-br ${stage.color} flex items-center justify-center mb-0 lg:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                  >
                    <stage.icon size={28} className="text-white" />
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-lg lg:text-xl mb-1">
                      {stage.label}
                    </h4>
                    <p className="text-sm text-slate-400 hidden lg:block">
                      {stage.desc}
                    </p>
                  </div>
                </div>

                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-slate-400">
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Pulse indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <div
                  className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 animate-ping"
                  style={{ animationDuration: "2s" }}
                />
              </div>
            </div>

            {/* Connector arrow */}
            {idx < stages.length - 1 && (
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <ChevronRight size={24} className="text-slate-600" />
                  <div className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-data-pulse" />
                </div>
              </div>
            )}

            {/* Mobile connector */}
            {idx < stages.length - 1 && (
              <div className="lg:hidden flex items-center justify-center py-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <ChevronRight
                    size={16}
                    className="text-slate-500 rotate-90"
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Data flow animation */}
      <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 hidden lg:block overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 w-20 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
            style={{
              animation: `shimmer 3s linear infinite`,
              animationDelay: `${i * 0.6}s`,
              left: `${-20 + i * 25}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* =============================================================================
   SCROLL REVEAL WRAPPER
   ============================================================================= */

const ScrollReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* =============================================================================
   ANIMATED COUNTER
   ============================================================================= */

const AnimatedCounter: React.FC<{
  end: number;
  suffix?: string;
  duration?: number;
}> = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

/* =============================================================================
   NAVBAR
   ============================================================================= */

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Docs", href: "#docs" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "glass-strong py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <VectorLogo className="w-10 h-10 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold text-white">VectorThink</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full transition-all duration-300 border border-white/10 hover:border-white/30 glow-button"
            >
              <Github size={18} />
              <span className="font-medium">GitHub</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong border-t border-white/10 absolute top-full left-0 w-full">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 text-base font-medium text-white hover:bg-white/5 rounded-xl transition-colors"
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
  const [typedText, setTypedText] = useState("");
  const fullText = "Infinite Memory";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0 mesh-gradient" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-indigo-500/20 rounded-full orb animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-purple-500/15 rounded-full orb animate-pulse-glow"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-white/5 to-transparent rounded-full" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-bg" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-indigo-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Now in Public Beta
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Give Your AI
                <br />
                <span className="gradient-text-animated">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                VectorThink is the memory engine for AI. Create an account, dump
                your data, and make your AI smart with persistent memory through
                semantic recall.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="https://vector-think.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2 glow-button group"
                >
                  <span>Get Started Free</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
                <a
                  href="https://github.com/0xtusharganotra/VectorThink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 glass border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <Github size={20} />
                  <span>Star on GitHub</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Trust badges */}
            <ScrollReveal delay={400}>
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-500">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-emerald-400" />
                  <span className="text-sm">Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-blue-400" />
                  <span className="text-sm">Global CDN</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-yellow-400" />
                  <span className="text-sm">99.9% Uptime</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Knowledge Graph Visualization */}
          <div className="order-1 lg:order-2 flex justify-center items-center relative">
            <ScrollReveal delay={200}>
              <div className="relative">
                {/* Glow effect behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-radial from-indigo-500/20 via-purple-500/10 to-transparent rounded-full animate-pulse-glow" />

                {/* Rotating rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full animate-rotate-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full animate-rotate-reverse" />

                {/* Main visualization */}
                <div className="relative glass-card rounded-3xl p-4 md:p-8">
                  <KnowledgeGraph />
                </div>

                {/* Floating badges */}
                <div className="hidden sm:block absolute -top-4 -right-4 glass rounded-xl px-4 py-2 border border-white/20 animate-float">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-yellow-400" />
                    <span className="text-sm font-medium text-white">
                      RAG Powered
                    </span>
                  </div>
                </div>

                <div className="hidden sm:block absolute -bottom-4 -left-4 glass rounded-xl px-4 py-2 border border-white/20 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <Network size={16} className="text-blue-400" />
                    <span className="text-sm font-medium text-white">
                      Vector Embeddings
                    </span>
                  </div>
                </div>

                <div className="hidden sm:block absolute top-1/2 -right-8 glass rounded-xl px-3 py-2 border border-white/20 animate-bounce-subtle">
                  <div className="flex items-center gap-2">
                    <Brain size={16} className="text-purple-400" />
                    <span className="text-xs font-medium text-white">
                      AI Ready
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2 animate-bounce-subtle">
          <div className="w-1 h-2 bg-slate-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

/* =============================================================================
   STATS SECTION
   ============================================================================= */

const StatsSection: React.FC = () => {
  const stats = [
    {
      value: 1000000,
      suffix: "+",
      label: "Vectors Stored",
      icon: Database,
      color: "text-blue-400",
    },
    {
      value: 50,
      suffix: "ms",
      label: "Query Speed",
      icon: Zap,
      color: "text-yellow-400",
    },
    {
      value: 99.9,
      suffix: "%",
      label: "Uptime SLA",
      icon: BarChart3,
      color: "text-emerald-400",
    },
    {
      value: 10,
      suffix: "+",
      label: "Data Formats",
      icon: Layers,
      color: "text-purple-400",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="group text-center p-6 rounded-2xl glass-card card-hover"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <stat.icon
                  size={28}
                  className={`mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`}
                />
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
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
      step: "01",
      title: "Connect Your Data",
      description:
        "Upload PDFs, videos, links, notes, or connect your existing data sources seamlessly.",
      icon: UploadCloud,
      color: "from-blue-500 to-cyan-500",
      features: ["Multi-format support", "Automatic parsing", "Real-time sync"],
    },
    {
      step: "02",
      title: "Auto-Embed",
      description:
        "We chunk, vectorize, and store your data using state-of-the-art embedding models.",
      icon: Layers,
      color: "from-purple-500 to-pink-500",
      features: ["Smart chunking", "Vector embeddings", "Optimized storage"],
    },
    {
      step: "03",
      title: "Semantic Search",
      description:
        "Query your data using natural language. Find exactly what you need, instantly.",
      icon: Search,
      color: "from-emerald-500 to-teal-500",
      features: ["Natural language", "Context aware", "Instant results"],
    },
    {
      step: "04",
      title: "AI Responses",
      description:
        "Get context-aware answers powered by RAG and your personal knowledge base.",
      icon: Brain,
      color: "from-orange-500 to-red-500",
      features: ["RAG powered", "Contextual answers", "Personalized AI"],
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-purple-900/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <Workflow size={14} className="text-indigo-400" />
              <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
                How It Works
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              From Raw Data to
              <span className="gradient-text"> AI Intelligence</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Our intelligent pipeline transforms your data into semantic memory
              that AI can understand and recall.
            </p>
          </div>
        </ScrollReveal>

        {/* Data Pipeline Visualization */}
        <ScrollReveal delay={200}>
          <div className="mb-20">
            <DataPipeline />
          </div>
        </ScrollReveal>

        {/* Step cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 150}>
              <div className="group relative h-full">
                <div className="relative h-full bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 card-hover overflow-hidden">
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Step number */}
                  <div className="text-6xl font-bold text-slate-800/50 mb-4 group-hover:text-slate-700/50 transition-colors">
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                  >
                    <item.icon size={28} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2">
                    {item.features.map((feature, fidx) => (
                      <li
                        key={fidx}
                        className="flex items-center gap-2 text-xs text-slate-500"
                      >
                        <CheckCircle size={12} className="text-emerald-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =============================================================================
   FEATURES SECTION
   ============================================================================= */

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Multi-Format Storage",
      description:
        "Store any data type seamlessly - PDFs, videos, links, notes, and documents. Automatic parsing included.",
      icon: UploadCloud,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Semantic Recall",
      description:
        "Retrieve memories intelligently through semantic search. Ask questions and get answers based on your stored data.",
      icon: MessageSquare,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "RAG-Based AI",
      description:
        "Retrieval-Augmented Generation powers personalized conversations with context from your memory.",
      icon: Brain,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Developer API",
      description:
        "Integrate memory into your own apps. Build persistent chat and smart AI applications with our RESTful API.",
      icon: Code,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Real-time Sync",
      description:
        "Your data stays synchronized across all devices. Add new information and it's instantly available everywhere.",
      icon: Zap,
      gradient: "from-yellow-500 to-amber-500",
    },
    {
      title: "Enterprise Security",
      description:
        "Bank-grade encryption for your data at rest and in transit. SOC 2 compliant infrastructure.",
      icon: Lock,
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 hero-grid opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
                Features
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to
              <span className="gradient-text"> Power Your AI</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Built for developers who want to add persistent memory to their AI
              applications.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <ScrollReveal key={idx} delay={idx * 100}>
              <div className="group h-full bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 card-hover overflow-hidden relative">
                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                >
                  <feature.icon size={28} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center gap-2 text-sm text-slate-500 group-hover:text-white transition-colors">
                  <span>Learn more</span>
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </div>
              </div>
            </ScrollReveal>
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
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-indigo-500/10 via-purple-500/5 to-transparent rounded-full" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-20 h-20 border border-white/5 rounded-full animate-rotate-slow" />
      <div className="absolute bottom-20 right-20 w-32 h-32 border border-white/5 rounded-full animate-rotate-reverse" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Give Your AI
            <br />
            <span className="gradient-text">Infinite Memory?</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="text-slate-400 mb-10 text-lg max-w-xl mx-auto">
            Join thousands of developers building AI applications with
            persistent memory. Start for free, scale as you grow.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://vector-think.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all shadow-[0_0_60px_rgba(255,255,255,0.2)] glow-button group"
            >
              <span className="flex items-center justify-center gap-2">
                <span>Start Building Free</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </a>
            <a
              href="https://github.com/0xtusharganotra/VectorThink"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 glass border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <Github size={20} />
                <span>View on GitHub</span>
              </span>
            </a>
          </div>
        </ScrollReveal>

        {/* Bottom trust indicators */}
        <ScrollReveal delay={300}>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-400" />
              <span>Free tier forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-400" />
              <span>Open source</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* =============================================================================
   FOOTER
   ============================================================================= */

const Footer: React.FC = () => {
  const footerLinks = {
    Product: ["Features", "Pricing", "API", "Integrations"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Resources: ["Documentation", "Guides", "Community", "Support"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <VectorLogo className="w-8 h-8" />
              <span className="text-xl font-bold text-white">VectorThink</span>
            </div>
            <p className="text-slate-500 text-sm mb-6 max-w-xs">
              The memory engine for AI. Give your LLMs persistent memory through
              semantic recall.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/0xtusharganotra/VectorThink"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/30 transition-all"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/tusharganotra/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/30 transition-all"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-500 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} VectorThink. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <Shield size={14} className="text-emerald-400" />
              <span>SOC 2 Compliant</span>
            </span>
            <span className="flex items-center gap-2">
              <Globe size={14} className="text-blue-400" />
              <span>Global Infrastructure</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* =============================================================================
   MAIN LANDING PAGE
   ============================================================================= */

const LandingPage: React.FC = () => {
  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-slate-950 selection:bg-indigo-500/30 selection:text-white">
        <ParticleNetwork />
        <Navbar />
        <main className="relative z-10">
          <HeroSection />
          <StatsSection />
          <HowItWorksSection />
          <FeaturesSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
