import React from "react";
import { Link } from "react-router-dom";
import Section from "../../Components/Section";

const PlatinumPage = () => {
  const level = "platinum";

  const modulesProgress = { completed: 0, inProgress: 0, skipped: 0, notStarted: 23 };
  const problemsProgress = { completed: 0, inProgress: 0, skipped: 0, notStarted: 267 };

  const sections = [
    {
      category: "Range Queries",
      modules: [
        ["More Applications of Segment Tree", "Walking on a Segment Tree, Non-Commutative Combiner Functions"],
        ["Range Queries with Sweep Line", "Solving 2D grid problems using 1D range queries."],
        ["Range Update Range Query", "Lazy updates on segment trees and two binary indexed trees in conjunction."],
        ["Sparse Segment Trees", "Querying big ranges."],
        ["2D Range Queries", "Extending Range Queries to 2D (and beyond)."],
        ["Divide & Conquer - SRQ", "Using Divide & Conquer to answer offline or online range queries on a static array."],
        ["Square Root Decomposition", "Splitting up data into smaller chunks to speed up processing."]
      ]
    },
    {
      category: "Trees",
      modules: [
        ["Binary Jumping", "Efficiently finding ancestors of a node."],
        ["Small-To-Large Merging", "A way to merge two sets efficiently."],
        ["Heavy-Light Decomposition", "Path and subtree updates and queries."],
        ["Centroid Decomposition", "Decomposing a tree to facilitate path computations."],
        ["Virtual Tree", "Compressing a tree to only the necessary nodes."],
        ["Kruskal Reconstruction Tree", "Decomposing Kruskal's algorithm to solve problems about minimum/maximum edge weights."]
      ]
    },
    {
      category: "Geometry",
      modules: [
        ["Geometry Primitives", "Basic setup for geometry problems."],
        ["Sweep Line", "Introduction to line sweep."],
        ["Convex Hull", "Smallest convex polygon containing a set of points on a grid."],
        ["Convex Hull Trick", "A way to find the maximum or minimum value of several convex functions at given points."]
      ]
    },
    {
      category: "Misc. Topics",
      modules: [
        ["Inclusion-Exclusion Principle", "A counting technique to compute the size of union of n finite sets."],
        ["Matrix Exponentiation", "Repeatedly multiplying a square matrix by itself."],
        ["(Optional) Bitsets", "Using bitsets for unintended solutions in USACO problems."],
        ["Divide & Conquer - DP", "Using Divide & Conquer as a DP Optimization."],
        ["Sum over Subsets DP", "Solving subset sum problems efficiently with DP."]
      ]
    },
    {
      category: "Conclusion",
      modules: [
        ["Additional Practice for USACO Platinum", "Final tips for Platinum and additional practice problems."]
      ]
    }
  ];

  return (
    <div className="text-black">
      {/* Header */}
      <Section className="bg-[#9d07ad] text-white text-center py-10">
        <h1 className="text-5xl font-extrabold mb-6">Platinum</h1>
        <p className="text-lg max-w-3xl mx-auto">
          The topics below are not exhaustive for this division.
          <br />
          Contest problems may contain topics not covered in the guide, or topics listed under different divisions!
        </p>
      </Section>

      {/* Progress Cards */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 my-10 px-4">
        {[{ title: "Modules Progress", ...modulesProgress }, 
        { title: "Problems Progress", ...problemsProgress }].map(
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
          )
        )}
      </div>

      {/* Timeline Section */}
      {sections.map((section, i) => (
        <div key={i} className="flex justify-center mb-16">
          <div className="flex w-full max-w-5xl">
            {/* Left column */}
            <div className="w-1/2 flex justify-end pr-8">
              <h4 className="text-2xl font-bold text-right">{section.category}</h4>
            </div>

            {/* Right column */}
            <div className="w-1/2 relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-600"></div>

              <div className="space-y-6">
                {section.modules.map(([title, desc], j) => {
                  const id = title.toLowerCase().replaceAll(" ", "-").replace(/[()]/g, "");
                  return (
                    <div key={j} className="relative pl-6">
                      <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-gray-400" />
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
  );
};

export default PlatinumPage;
