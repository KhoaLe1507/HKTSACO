import React, { useState, useEffect } from "react";

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
  
  const features = [
    "Solve algorithmic challenges",
    "Compete in real-time contests",
    "Track your progress with analytics",
    "Learn from expert tutorials"
  ];
  
  const targetText = features[featureIndex];
  
  // Text typing animation
  useEffect(() => {
    setIsVisible(true);
    
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
  
  // Testimonials
  const testimonials = [
    {
      text: "HKTOJ transformed how I approach algorithmic problems. I went from barely solving easy problems to acing competitive coding interviews.",
      author: "Alex Chen, Software Engineer"
    },
    {
      text: "The structured learning path and real-time contests prepared me perfectly for coding competitions. HKTOJ is simply the best platform out there.",
      author: "Maria Rodriguez, CS Student"
    },
    {
      text: "As an educator, I've found HKTOJ to be invaluable for my students. The analytics help me understand where they need guidance.",
      author: "Dr. James Wilson, University Professor"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white">
      {/* Hero Section with animated gradient border */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse opacity-20"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} flex flex-col items-center text-center space-y-8`}>
            <div className="relative inline-block">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-blue-300">
                HKT ONLINE JUDGE
              </h1>
              <div className="absolute -inset-1 -z-10 rounded-lg blur-xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-50 animate-pulse"></div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
              <span className="font-semibold text-purple-300">Master algorithms.</span> <span className="font-semibold text-blue-300">Elevate your code.</span><br />
              <span className="typing-text h-8 inline-block">{typedText}<span className="animate-pulse">|</span></span>
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-lg font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transform transition duration-300 ease-in-out hover:-translate-y-1 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              >
                Get Started Now
              </button>
              <button
                onClick={handleExplore}
                className="px-8 py-4 bg-transparent border-2 border-purple-400 text-lg font-bold rounded-lg hover:bg-purple-900/30 transform transition duration-300 ease-in-out hover:-translate-y-1 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              >
                Explore Problems
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section with animation */}
      <div className="py-16 bg-white backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(stats).map(([key, value], index) => (
              <div 
                key={key}
                className="transition-all duration-1000 transform text-center"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                  {value}+
                </div>
                <div className="text-gray-500 mt-2 capitalize">
                  {key}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Why Choose HKTOJ?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white from-gray-800 to-gray-900 p-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-2xl font-bold">
                01
              </div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">Curated Problem Set</h3>
              <p className="text-gray-500">Over 1,200 carefully selected algorithmic challenges across all difficulty levels, from basic to IOI/ICPC competition standard.</p>
            </div>
            
            <div className="bg-white from-gray-800 to-gray-900 p-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-2xl font-bold">
                02
              </div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">Real-time Contests</h3>
              <p className="text-gray-500">Participate in weekly competitions with live leaderboards. Test your skills against coders from around the world.</p>
            </div>
            
            <div className="bg-white from-gray-800 to-gray-900 p-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-2xl font-bold">
                03
              </div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">Advanced Analytics</h3>
              <p className="text-gray-500">Track your progress with detailed performance metrics. Identify your strengths and areas for improvement.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Success Stories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white from-gray-900 to-black p-6 rounded-xl border border-purple-900/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-purple-500 text-4xl font-serif mb-4">"</div>
                <p className="text-gray-500 mb-6 italic">{testimonial.text}</p>
                <div className="text-sm text-purple-500 font-semibold">{testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to elevate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">coding skills</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join over 50,000 programmers who have transformed their algorithmic thinking with HKTOJ.
            </p>
            <button
              onClick={handleGetStarted}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-lg font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transform transition duration-300 ease-in-out hover:-translate-y-1 focus:ring-2 focus:ring-purple-400 focus:outline-none animate-pulse"
            >
              Start Your Journey Today
            </button>
            <p className="mt-6 text-gray-500">
              No credit card required • Free tier available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;