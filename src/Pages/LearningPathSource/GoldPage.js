import React from "react";
import { Link } from 'react-router-dom';
import Section from "../../Components/Section";

const GoldPage = () => {
  const level = "gold";
  const sections = [
    {
      category: "Math",
      modules: [
        ["Divisibility", "Using the information that one integer evenly divides another."],
        ["Modular Arithmetic", "Working with remainders from division."],
        ["Combinatorics", "How to count."]
      ]
    },
    {
      category: "Dynamic Programming",
      modules: [
        ["Introduction to DP", "Speeding up naive recursive solutions with memoization."],
        ["Knapsack DP", "Problems that can be modeled as filling a limited-size container with items."],
        ["Bitmask DP", "DP problems that require iterating over subsets."]
      ]
    },
    {
      category: "Graphs",
      modules: [
        ["Graph Traversal", "Traversing a graph with DFS and BFS."],
        ["Flood Fill", "Finding connected components in a graph represented by a grid."]
      ]
    },
    {
      category: "Additional Topics",
      modules: [
        ["Hashing", "Quickly testing equality of substrings or sets with a small probability of failure."],
        ["(Optional) Hashmaps", "Maintaining collections of distinct elements with hashing."]
      ]
    },
    {
      category: "Conclusion",
      modules: [
        ["Additional Practice for USACO Gold", "Final tips for Gold and additional practice problems."]
      ]
    }
  ];

  return (
    <div className="text-black">
      <Section className="bg-[#8f6f06] text-white text-center py-10">
        <h1 className="text-5xl font-extrabold mb-6">Gold</h1>
        <p className="text-lg max-w-3xl mx-auto">
          The topics below are not exhaustive for this division. <br />
          Contest problems may contain topics not covered in the guide, or topics listed under different divisions!
        </p>
      </Section>

      {/* Progress Stats */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 my-10 px-4">
        {[{ title: "Modules Progress", completed: 0, inProgress: 0, skipped: 0, notStarted: 28 },
        { title: "Problems Progress", completed: 0, inProgress: 0, skipped: 0, notStarted: 388 }].map(
          ({ title, completed, inProgress, skipped, notStarted }, idx) => (
            <div key={idx} className="bg-[#0f172a] text-white p-6 rounded-xl w-full md:w-[480px] shadow-lg text-center">
              <h3 className="text-2xl font-semibold mb-6">{title}</h3>
              <div className="flex justify-between mb-6">
                {[
                  { label: "COMPLETED", value: completed, color: "bg-green-600", labelColor: "text-green-400" },
                  { label: "IN PROGRESS", value: inProgress, color: "bg-yellow-600", labelColor: "text-yellow-300" },
                  { label: "SKIPPED", value: skipped, color: "bg-blue-600", labelColor: "text-blue-300" },
                  { label: "NOT STARTED", value: notStarted, color: "bg-white text-black", labelColor: "text-white" }
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

      {/* Timeline Section */}
      <div className="px-8">
        {sections.map((section, i) => (
          <div key={i} className="flex justify-center mb-16">
            <div className="flex w-full max-w-5xl">
              {/* Left column */}
              <div className="w-1/2 flex justify-end pr-8">
                <h4 className="text-2xl font-bold text-right">{section.category}</h4>
              </div>

              {/* Right column */}
              <div className="w-1/2 relative pl-8">
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

export default GoldPage;
