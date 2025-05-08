import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Section from "../../Components/Section";

// Custom Section component with animation
const AnimatedSection = ({ className, children }) => {
  return (
    <div className={`${className} animate-fadeIn`}>
      {children}
    </div>
  );
};

const BronzePage = () => {
  const level = "bronze";
  const [activeSection, setActiveSection] = useState(null);

  // Animation for counting up stats
  const [counts, setCounts] = useState({
    modulesTotal: 0,
    problemsTotal: 0
  });

  // Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.reveal').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Count-up animation
  useEffect(() => {
    const modulesTotal = 12;
    const problemsTotal = 99;
    
    const interval = setInterval(() => {
      setCounts(prev => ({
        modulesTotal: prev.modulesTotal < modulesTotal ? prev.modulesTotal + 1 : modulesTotal,
        problemsTotal: prev.problemsTotal < problemsTotal ? prev.problemsTotal + 4 : problemsTotal
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const sections = [
    {
      category: "Getting Started",
      modules: [
        ["Time Complexity", "Measuring the number of operations an algorithm performs."],
        ["Introduction to Data Structures", "What a data structure is, (dynamic) arrays, pairs, and tuples."],
        ["Simulation", "Directly simulating the problem statement."]
      ]
    },
    {
      category: "Complete Search",
      modules: [
        ["Basic Complete Search", "Problems involving iterating through the entire solution space."],
        ["Complete Search with Recursion", "Harder problems involving generating subsets and permutations."]
      ]
    },
    {
      category: "Sorting & Sets",
      modules: [
        ["Introduction to Sorting", "Arranging collections in increasing order."],
        ["(Optional) Introduction to Sets & Maps", "Maintaining collections of distinct elements/keys."]
      ]
    },
    {
      category: "Additional",
      modules: [
        ["Ad Hoc Problems", "Problems that do not fall into standard categories."],
        ["Introduction to Greedy Algorithms", "Choosing best options at every step."],
        ["Introduction to Graphs", "What graphs are."],
        ["Rectangle Geometry", "Problems involving rectangles parallel to axes."]
      ]
    },
    {
      category: "Conclusion",
      modules: [
        ["Additional Practice for USACO Bronze", "Final tips for Bronze and extra practice."]
      ]
    }
  ];

  return (
    <div className="text-black min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header with background image */}
      <div className="relative h-64 bg-gradient-to-r from-amber-700 to-yellow-600 text-white text-center flex flex-col justify-center items-center overflow-hidden animate-fadeIn">
        <div className="absolute inset-0 z-0 transition-transform duration-1000 ease-out transform scale-100">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1569098644584-210bcd375b59?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
        </div>
        
        <h1 className="text-6xl font-extrabold mb-4 relative z-10 text-white drop-shadow-lg animate-slideDown">
          Bronze
        </h1>
        
        <div className="h-1 w-32 bg-white mb-6 relative z-10 animate-expandWidth"></div>
        
        <p className="text-lg max-w-3xl mx-auto relative z-10 text-white bg-black/30 px-6 py-3 rounded-lg animate-fadeIn">
          The topics below are not exhaustive for this division. <br />
          Contest problems may contain topics not covered in the guide, or topics listed under different divisions!
        </p>
      </div>

      {/* Progress Stats */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 reveal">
          Your Learning Progress
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mb-16">
          {[
            { title: "Modules Progress", completed: 0, inProgress: 0, skipped: 0, notStarted: 12, total: counts.modulesTotal },
            { title: "Problems Progress", completed: 0, inProgress: 0, skipped: 0, notStarted: 99, total: counts.problemsTotal },
          ].map(({ title, completed, inProgress, skipped, notStarted, total }, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl overflow-hidden shadow-xl w-full md:w-[480px] border border-gray-200 hover:shadow-2xl transition-shadow duration-300 reveal"
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-6">
                <h3 className="text-2xl font-bold">{title}</h3>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between mb-8">
                  {[
                    { label: "COMPLETED", value: completed, color: "bg-green-500", labelColor: "text-green-600", icon: "✓" },
                    { label: "IN PROGRESS", value: inProgress, color: "bg-yellow-400", labelColor: "text-yellow-600", icon: "→" },
                    { label: "SKIPPED", value: skipped, color: "bg-blue-400", labelColor: "text-blue-600", icon: "↷" },
                    { label: "NOT STARTED", value: notStarted, color: "bg-gray-200", labelColor: "text-gray-600", icon: "○" },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex flex-col items-center transform hover:scale-110 transition-transform duration-200"
                      style={{ animation: 'fadeIn 0.5s ease-out forwards', animationDelay: `${0.3 + i * 0.1}s` }}
                    >
                      <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-md`}>
                        {item.value}
                      </div>
                      <p className={`mt-2 text-xs font-semibold ${item.labelColor}`}>{item.label}</p>
                    </div>
                  ))}
                </div>
                
                <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 animate-expandWidth"
                    style={{ width: `${(completed / total) * 100}%`, animationDelay: '0.8s' }}
                  />
                </div>
                
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-500">0%</p>
                  <p className="text-sm font-medium text-gray-700">{total} total</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Content Timeline - Phiên bản mới với các module ở một bên */}
      <div className="container mx-auto pb-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-800 reveal">
          Course Content
        </h2>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Main vertical timeline line */}
          <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded"></div>
          
          {sections.map((section, i) => (
            <div 
              key={i} 
              className="mb-16 reveal"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              {/* Section title with fancy background */}
              <div className="flex mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ml-16">
                  <h3 className="text-xl font-bold text-white">{section.category}</h3>
                </div>
              </div>
              
              {/* Modules stacked vertically */}
              <div className="space-y-4 ml-16">
                {section.modules.map(([title, desc], j) => {
                  const id = title.toLowerCase().replaceAll(" ", "-").replace(/[()]/g, "");
                  return (
                    <div 
                      key={j}
                      className="relative reveal"
                      style={{ animationDelay: `${0.2 + j * 0.1}s` }}
                    >
                      {/* Module dot on timeline */}
                      <div className="absolute left-0 top-1/2 w-5 h-5 rounded-full bg-white border-4 border-blue-500 shadow-lg transform -translate-x-[40px] -translate-y-1/2 z-10"></div>
                      
                      {/* Module card with hover effect */}
                      <Link
                        to={`/${level}/module/${id}`}
                        className="block bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-102 border-l-4 border-indigo-500"
                      >
                        <h4 className="text-xl font-bold text-indigo-700 mb-2">{title}</h4>
                        <p className="text-gray-600 text-sm">{desc}</p>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs text-gray-400">Module {i + 1}.{j + 1}</span>
                          <span className="text-indigo-600 font-medium text-sm">Start Learning →</span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-16 text-center reveal">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Begin with the first module and track your progress as you advance through the Bronze level.</p>
          <button 
            className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-indigo-100 transition-colors duration-300 hover:scale-105 transform"
          >
            Start First Module
          </button>
        </div>
      </div>
    </div>
  );
};

// CSS animations - thêm vào file CSS của bạn
const cssAnimations = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes expandWidth {
  from { width: 0; }
  to { width: 100%; }
}

.animate-fadeIn {
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-slideDown {
  animation: slideDown 0.7s ease-out forwards;
}

.animate-expandWidth {
  width: 0;
  animation: expandWidth 0.8s ease-out forwards;
}

.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.reveal.animate-fadeIn {
  opacity: 1;
  transform: translateY(0);
}
`;

export default BronzePage;