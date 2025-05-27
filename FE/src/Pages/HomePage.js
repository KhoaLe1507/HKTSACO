import React, { useState, useEffect, useRef } from "react";

const HomePage = () => {
  // Thay thế useNavigate với giả lập hàm điều hướng
  const handleGetStarted = () => {
    console.log("Navigating to login page");
    // Trong ứng dụng thực, bạn sẽ sử dụng: navigate("/login");
  };
  
  const handleExplore = () => {
    console.log("Navigating to explore page");
    // Trong ứng dụng thực, bạn sẽ sử dụng: navigate("/explore");
  };
  
  // State cho animations
  const [isVisible, setIsVisible] = useState(false);
  const [featureIndex, setFeatureIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [titleVisible, setTitleVisible] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const statsRef = useRef(null);
  const heroRef = useRef(null);
  
  const features = [
    "Solve algorithmic challenges",
    "Compete in real-time contests", 
    "Track your progress with analytics",
    "Learn from expert tutorials"
  ];
  
  const targetText = features[featureIndex];
  
  // Mouse tracking for hero section
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };
    
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);
  
  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Text typing animation
  useEffect(() => {
    setIsVisible(true);
    setTitleVisible(true);
    
    let timeout;
    if (isTyping) {
      if (typedText.length < targetText.length) {
        timeout = setTimeout(() => {
          setTypedText(targetText.slice(0, typedText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1500);
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(typedText.slice(0, typedText.length - 1));
        }, 50);
      } else {
        setFeatureIndex((featureIndex + 1) % features.length);
        setIsTyping(true);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [typedText, isTyping, featureIndex, targetText]);
  
  // Stats for countup animations
  const [stats] = useState({
    problems: 1200,
    users: 50000,
    contests: 120,
    countries: 75
  });
  
  // Animated counter component
  const AnimatedCounter = ({ target, suffix = "+", delay = 0 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!statsInView) return;
      
      const timer = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
        
        return () => clearInterval(counter);
      }, delay);
      
      return () => clearTimeout(timer);
    }, [statsInView, target, delay]);
    
    return (
      <span className="tabular-nums">
        {count.toLocaleString()}{suffix}
      </span>
    );
  };
  
  // Testimonials
  const testimonials = [
    {
      text: "HKTOJ transformed how I approach algorithmic problems. I went from barely solving easy problems to acing competitive coding interviews.",
      author: "Alex Chen, Software Engineer",
      rating: 5
    },
    {
      text: "The structured learning path and real-time contests prepared me perfectly for coding competitions. HKTOJ is simply the best platform out there.",
      author: "Maria Rodriguez, CS Student",
      rating: 5
    },
    {
      text: "As an educator, I've found HKTOJ to be invaluable for my students. The analytics help me understand where they need guidance.",
      author: "Dr. James Wilson, University Professor",
      rating: 5
    }
  ];
  
  // Algorithm terms for floating effect
  const algorithmTerms = ['O(n)', 'DFS', 'BFS', 'Tree', 'Hash', '[]', '{}', '()', '==', '!=', '&&', '||', 'Sort', 'DP', 'Heap', 'Graph', 'Array', 'Stack', 'Queue', 'BST'];
  
  // Title letters animation
  const titleText = "HKT ONLINE JUDGE";
  const letters = titleText.split("");
  
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Enhanced Custom Styles */}
      <style jsx>{`
        @keyframes letterReveal {
          0% { 
            opacity: 0; 
            transform: translateY(30px) rotateX(90deg) scale(0.8);
            filter: blur(10px);
          }
          50% { 
            opacity: 0.7; 
            transform: translateY(10px) rotateX(45deg) scale(0.9);
            filter: blur(5px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) rotateX(0deg) scale(1);
            filter: blur(0px);
          }
        }
        
        @keyframes lightScan {
          0% { 
            transform: translateX(-200%) skewX(-15deg); 
            opacity: 0;
          }
          50% { 
            opacity: 1;
          }
          100% { 
            transform: translateX(400%) skewX(-15deg); 
            opacity: 0;
          }
        }
        
        @keyframes gradientWave {
          0%, 100% { 
            background-position: 0% 50%; 
            transform: scale(1);
          }
          25% { 
            background-position: 100% 50%;
            transform: scale(1.02);
          }
          50% { 
            background-position: 200% 50%;
            transform: scale(1.01);
          }
          75% { 
            background-position: 300% 50%;
            transform: scale(1.02);
          }
        }
        
        @keyframes neonGlow {
          0%, 100% { 
            text-shadow: 
              0 0 5px rgba(59, 130, 246, 0.5),
              0 0 10px rgba(59, 130, 246, 0.4),
              0 0 20px rgba(59, 130, 246, 0.3),
              0 0 40px rgba(59, 130, 246, 0.2);
          }
          50% { 
            text-shadow: 
              0 0 10px rgba(59, 130, 246, 0.8),
              0 0 20px rgba(59, 130, 246, 0.7),
              0 0 40px rgba(59, 130, 246, 0.6),
              0 0 80px rgba(59, 130, 246, 0.4);
          }
        }
        
        @keyframes floatAlgorithm {
          0% { 
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-20px) rotate(5deg) scale(1.1);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-40px) rotate(0deg) scale(1);
            opacity: 1;
          }
          75% { 
            transform: translateY(-20px) rotate(-5deg) scale(1.1);
            opacity: 0.8;
          }
          100% { 
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.6;
          }
        }
        
        @keyframes codeMatrix {
          0% { 
            transform: translateY(-100vh) scale(0.8);
            opacity: 0;
          }
          10% { 
            opacity: 1;
          }
          90% { 
            opacity: 1;
          }
          100% { 
            transform: translateY(100vh) scale(1.2);
            opacity: 0;
          }
        }
        
        @keyframes aurora {
          0%, 100% { 
            background-position: 0% 50%;
            transform: scale(1) rotate(0deg);
          }
          25% { 
            background-position: 100% 50%;
            transform: scale(1.1) rotate(1deg);
          }
          50% { 
            background-position: 200% 50%;
            transform: scale(1.2) rotate(0deg);
          }
          75% { 
            background-position: 300% 50%;
            transform: scale(1.1) rotate(-1deg);
          }
        }
        
        @keyframes hologram {
          0%, 100% { 
            background-position: 0% 0%;
            opacity: 0.8;
          }
          50% { 
            background-position: 100% 100%;
            opacity: 1;
          }
        }
        
        @keyframes rippleWave {
          0% { 
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% { 
            transform: scale(2) rotate(180deg);
            opacity: 0.7;
          }
          100% { 
            transform: scale(4) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes scanLine {
          0% { 
            transform: translateX(-100%);
            opacity: 0;
          }
          50% { 
            opacity: 1;
          }
          100% { 
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes circuitPulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        @keyframes typingGlow {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(147, 51, 234, 0.3);
          }
          50% { 
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.8),
                        0 0 30px rgba(59, 130, 246, 0.6);
          }
        }
        
        @keyframes hexFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          33% { 
            transform: translateY(-30px) rotate(120deg);
          }
          66% { 
            transform: translateY(-15px) rotate(240deg);
          }
        }
        
        .letter-reveal { animation: letterReveal 0.8s ease-out forwards; opacity: 0; }
        .light-scan { position: relative; overflow: hidden; }
        .light-scan::after {
          content: '';
          position: absolute;
          top: 0;
          left: -200%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);
          animation: lightScan 4s ease-in-out infinite;
          animation-delay: 3s;
        }
        .gradient-wave {
          background-size: 400% 400%;
          animation: gradientWave 6s ease-in-out infinite;
        }
        .neon-glow { animation: neonGlow 3s ease-in-out infinite; }
        .float-algorithm { animation: floatAlgorithm 4s ease-in-out infinite; }
        .code-matrix { animation: codeMatrix 8s linear infinite; }
        .aurora-bg {
          background-size: 400% 400%;
          animation: aurora 8s ease-in-out infinite;
        }
        .hologram {
          background-size: 200% 200%;
          animation: hologram 3s ease-in-out infinite;
        }
        .ripple-wave { animation: rippleWave 0.6s ease-out; }
        .scan-line { animation: scanLine 2s ease-in-out infinite; }
        .circuit-pulse { animation: circuitPulse 2s ease-in-out infinite; }
        .typing-glow { animation: typingGlow 1.5s ease-in-out infinite; }
        .hex-float { animation: hexFloat 6s ease-in-out infinite; }
        
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .code-rain {
          position: absolute;
          color: rgba(59, 130, 246, 0.6);
          font-family: 'Courier New', monospace;
          font-size: 14px;
          animation: codeMatrix 12s linear infinite;
          z-index: 1;
        }
      `}</style>
      
      {/* Hero Section với Advanced Effects */}
      <div 
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 min-h-screen flex items-center"
      >
        {/* Code Matrix Rain Background */}
        {algorithmTerms.map((term, index) => (
          <div
            key={index}
            className="code-rain"
            style={{
              left: `${(index * 7) % 100}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${8 + (index % 4)}s`
            }}
          >
            {term}
          </div>
        ))}
        
        {/* Enhanced Floating Algorithm Terms */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {algorithmTerms.slice(0, 12).map((term, index) => (
            <div
              key={index}
              className="absolute text-2xl font-mono font-bold text-blue-400/40 float-algorithm"
              style={{
                left: `${10 + (index * 8) % 80}%`,
                top: `${10 + (index * 6) % 80}%`,
                animationDelay: `${index * 0.7}s`,
                animationDuration: `${4 + (index % 3)}s`
              }}
            >
              {term}
            </div>
          ))}
        </div>
        
        {/* Dynamic Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '40px 40px'
               }}></div>
        </div>
        
        {/* Mouse-follow Radial Glow */}
        <div 
          className="absolute w-96 h-96 aurora-bg opacity-30 rounded-full blur-3xl pointer-events-none"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            background: `
              radial-gradient(circle, 
                rgba(59,130,246,0.6) 0%, 
                rgba(147,51,234,0.4) 50%, 
                transparent 100%)
            `
          }}
        ></div>
        
        {/* Circuit Board Overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#3b82f6" className="circuit-pulse"/>
                <line x1="10" y1="0" x2="10" y2="20" stroke="#3b82f6" strokeWidth="0.5"/>
                <line x1="0" y1="10" x2="20" y2="10" stroke="#3b82f6" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} flex flex-col items-center text-center space-y-8`}>
            {/* Enhanced Title - Properly Sized */}
            <div className="relative inline-block group light-scan">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight relative mb-8 leading-tight">
                <span className="text-gray-900 drop-shadow-lg" style={{
                  textShadow: '0 0 15px rgba(59, 130, 246, 0.2), 0 0 30px rgba(147, 51, 234, 0.1)'
                }}>
                  {letters.map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block letter-reveal hover:text-blue-800 transition-colors duration-300"
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </span>
                
                {/* Enhanced Glow Layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-15 blur-xl scale-110 group-hover:opacity-30 transition-all duration-500 animate-pulse"></div>
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse delay-500"></div>
                
                {/* Light sweep effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-2000 ease-out"></div>
                </div>
                
                {/* Floating accent dots */}
                <div className="absolute -inset-8">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-60"
                      style={{
                        left: `${10 + i * 12}%`,
                        top: `${20 + (i % 3) * 30}%`,
                        animationDelay: `${i * 0.7}s`,
                        animationDuration: '3s'
                      }}
                    ></div>
                  ))}
                </div>
              </h1>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
                <span className="font-semibold text-blue-700">Master algorithms.</span> 
                <span className="font-semibold text-purple-700"> Elevate your code.</span>
                <br className="hidden md:block" />
                <span className="text-gray-600"> Join the next generation of problem solvers.</span>
              </p>
              
              {/* Enhanced Typing Animation */}
              <div className="h-16 flex items-center justify-center">
                <div className="relative glass-effect rounded-xl px-6 py-3 typing-glow">
                  {/* Code Matrix Background */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl opacity-20">
                    <div className="code-matrix text-xs text-blue-500 opacity-50">
                      {`function solve(){ return "algorithm"; }`}
                    </div>
                  </div>
                  
                  <span className="text-lg md:text-xl font-mono relative z-10">
                    <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent font-semibold">
                      {typedText}
                    </span>
                    <span className="text-purple-600 animate-pulse ml-1 text-2xl">|</span>
                  </span>
                  
                  {/* Pulse Border */}
                  <div className="absolute inset-0 rounded-xl border-2 border-blue-400/30 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Ultimate CTA Buttons */}
            <div className="flex flex-wrap gap-6 justify-center mt-12">
              <button
                onClick={handleGetStarted}
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white text-lg font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none transform perspective-1000"
              >
                {/* Hologram Effect */}
                <div className="absolute inset-0 hologram opacity-0 group-hover:opacity-100"
                     style={{
                       background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)'
                     }}></div>
                
                {/* Aurora Trail */}
                <div className="absolute inset-0 aurora-bg opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                     style={{
                       background: 'linear-gradient(-45deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)'
                     }}></div>
                
                {/* Ripple on Click */}
                <div className="absolute inset-0 opacity-0 group-active:opacity-100">
                  <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 ripple-wave"></div>
                </div>
                
                {/* Glow Layers */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                
                <span className="relative z-10 flex items-center">
                  Start Your Journey
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              
              <button
                onClick={handleExplore}
                className="group relative px-10 py-5 glass-effect text-blue-700 text-lg font-bold rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-100 hover:scale-105 focus:ring-4 focus:ring-blue-100 focus:outline-none overflow-hidden"
              >
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-blue-400 to-purple-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Scan Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                  <div className="scan-line absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                </div>
                
                <span className="relative z-10 flex items-center">
                  <svg className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Explore Problems
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Hexagon Floating Elements */}
        <div className="absolute bottom-20 right-20 hex-float opacity-20">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-500">
            <polygon points="13 2 3 14 12 22 22 14"/>
          </svg>
        </div>
        <div className="absolute top-32 left-20 hex-float opacity-30" style={{animationDelay: '2s'}}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-500">
            <polygon points="13 2 3 14 12 22 22 14"/>
          </svg>
        </div>
      </div>
      
      {/* Enhanced Stats Section */}
      <div ref={statsRef} className="py-24 bg-gradient-to-r from-white via-blue-50 to-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(stats).map(([key, value], index) => (
              <div 
                key={key}
                className="group text-center transform transition-all duration-700 hover:scale-110 glass-effect rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <div className="relative">
                  {/* Glow Ring */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 animate-pulse"></div>
                  
                  <div className="text-4xl md:text-5xl font-black relative z-10">
                    <span className="bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent group-hover:from-blue-800 group-hover:to-purple-800 transition-all duration-300">
                      <AnimatedCounter target={value} delay={index * 200} />
                    </span>
                  </div>
                  
                  {/* Orbiting Particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-500"></div>
                  </div>
                </div>
                
                <div className="text-gray-600 mt-4 capitalize font-semibold tracking-wide text-sm md:text-base">
                  {key === 'problems' ? 'Problems' : key === 'users' ? 'Active Users' : key === 'contests' ? 'Contests' : 'Countries'}
                </div>
                
                {/* Stats Icon */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {key === 'problems' && (
                    <svg className="w-6 h-6 mx-auto text-blue-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  {key === 'users' && (
                    <svg className="w-6 h-6 mx-auto text-purple-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  )}
                  {key === 'contests' && (
                    <svg className="w-6 h-6 mx-auto text-cyan-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                  {key === 'countries' && (
                    <svg className="w-6 h-6 mx-auto text-indigo-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Enhanced Features Section */}
      <div className="py-28 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        {/* Algorithm Symbols Background */}
        <div className="absolute inset-0 opacity-5">
          {algorithmTerms.slice(0, 15).map((term, index) => (
            <div
              key={index}
              className="absolute text-6xl font-mono font-bold text-blue-500 float-algorithm"
              style={{
                left: `${5 + (index * 6) % 90}%`,
                top: `${5 + (index * 8) % 90}%`,
                animationDelay: `${index * 0.8}s`,
                animationDuration: `${6 + (index % 4)}s`
              }}
            >
              {term}
            </div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 relative">
              <span className="bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                Why Choose HKTOJ?
              </span>
              {/* Underline Animation */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse delay-500"></div>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            {[
              {
                number: "01",
                title: "Curated Problem Set",
                description: "Over 1,200 carefully selected algorithmic challenges across all difficulty levels, from basic to IOI/ICPC competition standard.",
                gradient: "from-blue-500 to-cyan-500",
                icon: "🧩",
                delay: "0ms"
              },
              {
                number: "02", 
                title: "Real-time Contests",
                description: "Participate in weekly competitions with live leaderboards. Test your skills against coders from around the world.",
                gradient: "from-purple-500 to-pink-500",
                icon: "⚡",
                delay: "200ms"
              },
              {
                number: "03",
                title: "Advanced Analytics", 
                description: "Track your progress with detailed performance metrics. Identify your strengths and areas for improvement.",
                gradient: "from-indigo-500 to-blue-500",
                icon: "📊",
                delay: "400ms"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative glass-effect rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 overflow-hidden"
                style={{ 
                  animationDelay: feature.delay,
                  transform: `perspective(1000px) rotateX(${index % 2 === 0 ? '2deg' : '-2deg'})`
                }}
              >
                {/* 3D Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Scan Lines */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="scan-line absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100"></div>
                </div>
                
                {/* Floating Icon */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl group-hover:shadow-3xl group-hover:scale-110 transition-all duration-500 relative z-10 hex-float`}>
                    <span className="text-3xl">{feature.icon}</span>
                    {feature.number}
                    
                    {/* Orbiting Ring */}
                    <div className="absolute -inset-2 border-2 border-white/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin"></div>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 blur-xl scale-150 group-hover:opacity-40 group-hover:scale-200 transition-all duration-500 rounded-full`}></div>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-gray-800 group-hover:text-blue-700 transition-colors duration-300 relative z-10">
                  {feature.title}
                  {/* Underline on hover */}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 relative z-10 text-lg">
                  {feature.description}
                </p>
                
                {/* Corner Decorations */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-200"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Enhanced Testimonials */}
      <div className="py-28 bg-white relative overflow-hidden">
        {/* Simple Background - removed DNA helix */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-100 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 relative">
              <span className="bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                Success Stories
              </span>
              {/* Animated Stars */}
              <div className="absolute -top-4 -right-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400 animate-pulse" style={{animationDelay: `${i * 0.2}s`}} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group relative glass-effect rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 overflow-hidden"
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  transform: `perspective(1000px) rotateY(${(index - 1) * 5}deg)`
                }}
              >
                {/* Floating Quote */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                  <span className="text-white text-2xl font-bold">"</span>
                  {/* Quote Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                </div>
                
                {/* Simple Background Effect - removed holographic pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
                
                <p className="text-gray-700 mb-8 italic leading-relaxed group-hover:text-gray-800 transition-colors duration-300 relative z-10 text-lg">
                  {testimonial.text}
                </p>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 via-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 group-hover:scale-110 transition-transform duration-300 relative">
                      {testimonial.author.split(' ')[0][0]}
                      {/* Avatar Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-blue-700 group-hover:text-blue-800 transition-colors duration-300">
                        {testimonial.author}
                      </div>
                      {/* Star Rating */}
                      <div className="flex mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400 animate-pulse" style={{animationDelay: `${i * 0.1}s`}} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Scan Line Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="scan-line absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Ultimate CTA Section */}
      <div className="py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Algorithm Matrix Rain */}
        <div className="absolute inset-0">
          {algorithmTerms.map((term, index) => (
            <div
              key={index}
              className="absolute text-blue-400/30 font-mono text-sm code-matrix"
              style={{
                left: `${(index * 5) % 100}%`,
                animationDelay: `${index * 0.7}s`,
                animationDuration: `${10 + (index % 5)}s`
              }}
            >
              {term}
            </div>
          ))}
        </div>
        
        {/* Hexagon Grid */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, index) => (
            <div
              key={index}
              className="absolute hex-float"
              style={{
                left: `${10 + (index * 4) % 80}%`,
                top: `${10 + (index * 5) % 80}%`,
                animationDelay: `${index * 0.3}s`
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-400">
                <polygon points="13 2 3 14 12 22 22 14"/>
              </svg>
            </div>
          ))}
        </div>
        
        {/* Circuit Board Effect */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="circuit-advanced" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="#3b82f6" className="circuit-pulse"/>
                <line x1="10" y1="0" x2="10" y2="20" stroke="#3b82f6" strokeWidth="0.5" opacity="0.7"/>
                <line x1="0" y1="10" x2="20" y2="10" stroke="#3b82f6" strokeWidth="0.5" opacity="0.7"/>
                <rect x="8" y="8" width="4" height="4" fill="none" stroke="#8b5cf6" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-advanced)"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight relative">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent neon-glow gradient-wave"
                    style={{
                      background: 'linear-gradient(-45deg, #ffffff, #bfdbfe, #c4b5fd, #ffffff)',
                      backgroundSize: '400% 400%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                Ready to elevate your{" "}
                <span className="relative">
                  coding skills
                  {/* DNA Helix around text */}
                  <div className="absolute -inset-4 opacity-50">
                    <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                      <path d="M0,50 Q50,20 100,50 Q150,80 200,50" stroke="#06b6d4" strokeWidth="2" fill="none" className="animate-pulse"/>
                      <path d="M0,50 Q50,80 100,50 Q150,20 200,50" stroke="#8b5cf6" strokeWidth="2" fill="none" className="animate-pulse delay-500"/>
                    </svg>
                  </div>
                </span>
                ?
              </span>
              
              {/* Floating Algorithm Symbols */}
              <div className="absolute -inset-10">
                {['{}', '[]', '()', '==', '!=', '&&'].map((symbol, i) => (
                  <div
                    key={i}
                    className="absolute text-blue-400/60 text-xl font-mono float-algorithm"
                    style={{
                      left: `${10 + i * 15}%`,
                      top: `${20 + (i % 2) * 60}%`,
                      animationDelay: `${i * 0.8}s`
                    }}
                  >
                    {symbol}
                  </div>
                ))}
              </div>
            </h2>
            
            <p className="text-xl text-blue-100 mb-16 max-w-3xl mx-auto leading-relaxed">
              Join over <span className="font-bold text-cyan-300">50,000 programmers</span> who have transformed their algorithmic thinking with HKTOJ.
            </p>
            
            <div className="mb-12">
              <button
                onClick={handleGetStarted}
                className="group relative px-16 py-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white text-2xl font-black rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/40 hover:scale-110 focus:ring-4 focus:ring-cyan-300 focus:outline-none transform"
              >
                {/* Aurora Background */}
                <div className="absolute inset-0 aurora-bg opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                     style={{
                       background: 'linear-gradient(-45deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)'
                     }}></div>
                
                {/* Scan Lines */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                  <div className="scan-line absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                  <div className="scan-line absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent" style={{animationDelay: '0.5s'}}></div>
                </div>
                
                {/* Hologram Grid */}
                <div className="absolute inset-0 hologram opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                     style={{
                       background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
                     }}></div>
                
                {/* Ripple Effects */}
                <div className="absolute inset-0 opacity-0 group-active:opacity-100">
                  <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 ripple-wave"></div>
                  <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white/50 rounded-full transform -translate-x-1/2 -translate-y-1/2 ripple-wave delay-100"></div>
                </div>
                
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="mr-3 w-8 h-8 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Start Your Journey Today
                  <svg className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
            
            <p className="text-blue-200 text-lg">
              <span className="inline-flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No credit card required
              </span>
              <span className="mx-4 text-blue-300">•</span>
              <span className="inline-flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Free tier available
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;