import React from "react";
import { Link } from 'react-router-dom';
import Section from "../../Components/Section";

const BronzePage = () => {
  const level = "bronze"; // thêm để tái sử dụng

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
    <div className="text-black">
      {/* Header */}
      <Section className="bg-[#99480c] text-black text-center py-10"> 
        <h1 className="text-5xl font-extrabold mb-6">Bronze</h1>
        <p className="text-lg max-w-3xl mx-auto">
          The topics below are not exhaustive for this division. <br />
          Contest problems may contain topics not covered in the guide, or topics listed under different divisions!
        </p>
      </Section>

      {/* Progress Stats */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 my-10 px-4">
        {[
          { title: "Modules Progress", completed: 0, inProgress: 0, skipped: 0, notStarted: 12 },
          { title: "Problems Progress", completed: 0, inProgress: 0, skipped: 0, notStarted: 99 },
        ].map(({ title, completed, inProgress, skipped, notStarted }, idx) => (
          <div key={idx} className="bg-[#0f172a] text-white p-6 rounded-xl w-full md:w-[480px] shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-6">{title}</h3>
            <div className="flex justify-between mb-6">
              {[
                { label: "COMPLETED", value: completed, color: "bg-green-600", labelColor: "text-green-400" },
                { label: "IN PROGRESS", value: inProgress, color: "bg-yellow-600", labelColor: "text-yellow-300" },
                { label: "SKIPPED", value: skipped, color: "bg-blue-600", labelColor: "text-blue-300" },
                { label: "NOT STARTED", value: notStarted, color: "bg-white text-black", labelColor: "text-white" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`${item.color} w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold`}>
                    {item.value}
                  </div>
                  <p className={`mt-2 text-sm font-semibold ${item.labelColor}`}>{item.label}</p>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-700 h-2 rounded">
              <div className="bg-green-500 h-2 rounded" style={{ width: "0%" }}></div>
            </div>
            <p className="text-right text-sm mt-2 text-gray-400">
              {(completed + inProgress + skipped + notStarted)} total
            </p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="px-8">
        {sections.map((section, i) => (
          <div key={i} className="flex justify-center mb-16">
            <div className="flex w-full max-w-5xl">
              {/* Left column: Category name */}
              <div className="w-1/2 flex justify-end pr-8">
                <h4 className="text-2xl font-bold text-right">{section.category}</h4>
              </div>

              {/* Right column: Modules list */}
              <div className="w-1/2 relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-600"></div>

                <div className="space-y-6">
                  {section.modules.map(([title, desc], j) => {
                    const id = title.toLowerCase().replaceAll(" ", "-").replace(/[()]/g, "");
                    return (
                      <div key={j} className="relative pl-6">
                        <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-gray-400"></div>
                        <Link
                          to={`/${level}/module/${id}`}
                          className="text-blue-400 hover:underline font-semibold text-lg"
                        >
                          {title}
                        </Link>
                        <p className="text-sm text-gray-400">{desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BronzePage;
