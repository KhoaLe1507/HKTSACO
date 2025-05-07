import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const currentAuthorID = "profA";
const allSections = {
  Bronze: [
    {
      category: "Getting Started",
      modules: [
        { id: 1, title: "Time Complexity", desc: "Measuring the number of operations an algorithm performs.", authorID: "profA" },
        { id: 2, title: "Introduction to Data Structures", desc: "What a data structure is, (dynamic) arrays, pairs, and tuples.", authorID: "profB" },
        { id: 3, title: "Simulation", desc: "Directly simulating the problem statement.", authorID: "profA" },
      ]
    },
    {
      category: "Complete Search",
      modules: [
        { id: 4, title: "Basic Complete Search", desc: "Problems involving iterating through the entire solution space.", authorID: "profA" },
        { id: 5, title: "Complete Search with Recursion", desc: "Harder problems involving generating subsets and permutations.", authorID: "profC" },
      ]
    },
    {
      category: "Sorting & Sets",
      modules: [
        { id: 6, title: "Introduction to Sorting", desc: "Arranging collections in increasing order.", authorID: "profC" },
        { id: 7, title: "(Optional) Introduction to Sets & Maps", desc: "Maintaining collections of distinct elements/keys.", authorID: "profA" },
      ]
    },
    {
      category: "Additional",
      modules: [
        { id: 8, title: "Ad Hoc Problems", desc: "Problems that do not fall into standard categories.", authorID: "profA" },
        { id: 9, title: "Introduction to Greedy Algorithms", desc: "Choosing best options at every step.", authorID: "profB" },
        { id: 10, title: "Introduction to Graphs", desc: "What graphs are.", authorID: "profA" },
        { id: 11, title: "Rectangle Geometry", desc: "Problems involving rectangles parallel to axes.", authorID: "profA" },
      ]
    },
    {
      category: "Conclusion",
      modules: [
        { id: 12, title: "Additional Practice for USACO Bronze", desc: "Final tips for Bronze and extra practice.", authorID: "profA" },
      ]
    }
  ],
  Silver: [
    {
      category: "Prefix Sums",
      modules: [
        { id: 13, title: "1D Prefix Sums", desc: "Using prefix sums to quickly compute subarray sums in constant time.", authorID: "profA" },
        { id: 14, title: "2D Prefix Sums", desc: "Extending the idea to two-dimensional grids for efficient queries.", authorID: "profB" },
      ]
    },
    {
      category: "Sorting & Searching",
      modules: [
        { id: 15, title: "Sorting Review", desc: "Review of built-in sorting methods and custom sort logic.", authorID: "profA" },
        { id: 16, title: "Binary Search", desc: "Efficiently searching in sorted arrays and solving range problems.", authorID: "profB" },
        { id: 17, title: "Two Pointers", desc: "Solving problems with two moving indices.", authorID: "profA" },
        { id: 18, title: "Intro to Divide & Conquer", desc: "Recursive strategies to break down and conquer problems.", authorID: "profA" },
      ]
    },
    {
      category: "Data Structures",
      modules: [
        { id: 19, title: "Sets & Maps", desc: "Using sets, maps, and their unordered versions efficiently.", authorID: "profA" },
        { id: 20, title: "Stacks & Queues", desc: "Managing elements in FIFO and LIFO order.", authorID: "profB" },
        { id: 21, title: "Sliding Window", desc: "Maintaining a dynamic subarray/window while iterating.", authorID: "profA" },
      ]
    },
    {
      category: "Graphs",
      modules: [
        { id: 22, title: "Intro to Graphs", desc: "What graphs are and how to represent them.", authorID: "profA" },
        { id: 23, title: "Breadth First Search", desc: "Exploring graphs layer-by-layer.", authorID: "profB" },
        { id: 24, title: "Depth First Search", desc: "Exploring graphs deeply using recursion.", authorID: "profA" },
        { id: 25, title: "Connected Components", desc: "Identifying clusters of connected nodes.", authorID: "profA" },
      ]
    },
    {
      category: "Conclusion",
      modules: [
        { id: 26, title: "Additional Practice for USACO Silver", desc: "Extra problems to solidify your Silver knowledge.", authorID: "profA" },
      ]
    }
  ],
  Gold: [
    {
      category: "Math",
      modules: [
        { id: 27, title: "Divisibility", desc: "Using the information that one integer evenly divides another.", authorID: "profA" },
        { id: 28, title: "Modular Arithmetic", desc: "Working with remainders from division.", authorID: "profB" },
        { id: 29, title: "Combinatorics", desc: "How to count.", authorID: "profA" },
      ]
    },
    {
      category: "Dynamic Programming",
      modules: [
        { id: 30, title: "Introduction to DP", desc: "Speeding up naive recursive solutions with memoization.", authorID: "profA" },
        { id: 31, title: "Knapsack DP", desc: "Problems that can be modeled as filling a limited-size container with items.", authorID: "profB" },
        { id: 32, title: "Bitmask DP", desc: "DP problems that require iterating over subsets.", authorID: "profA" },
      ]
    },
    {
      category: "Graphs",
      modules: [
        { id: 33, title: "Graph Traversal", desc: "Traversing a graph with DFS and BFS.", authorID: "profA" },
        { id: 34, title: "Flood Fill", desc: "Finding connected components in a graph represented by a grid.", authorID: "profA" },
      ]
    },
    {
      category: "Additional Topics",
      modules: [
        { id: 35, title: "Hashing", desc: "Quickly testing equality of substrings or sets with a small probability of failure.", authorID: "profA" },
        { id: 36, title: "(Optional) Hashmaps", desc: "Maintaining collections of distinct elements with hashing.", authorID: "profA" },
      ]
    },
    {
      category: "Conclusion",
      modules: [
        { id: 37, title: "Additional Practice for USACO Gold", desc: "Final tips for Gold and additional practice problems.", authorID: "profA" },
      ]
    }
  ],
  Platinum: [
    {
      category: "Range Queries",
      modules: [
        { id: 38, title: "More Applications of Segment Tree", desc: "Walking on a Segment Tree, Non-Commutative Combiner Functions", authorID: "profA" },
        { id: 39, title: "Range Queries with Sweep Line", desc: "Solving 2D grid problems using 1D range queries.", authorID: "profB" },
        { id: 40, title: "Range Update Range Query", desc: "Lazy updates on segment trees and two binary indexed trees in conjunction.", authorID: "profA" },
        { id: 41, title: "Sparse Segment Trees", desc: "Querying big ranges.", authorID: "profA" },
        { id: 42, title: "2D Range Queries", desc: "Extending Range Queries to 2D (and beyond).", authorID: "profA" },
        { id: 43, title: "Divide & Conquer - SRQ", desc: "Using Divide & Conquer to answer offline or online range queries on a static array.", authorID: "profA" },
        { id: 44, title: "Square Root Decomposition", desc: "Splitting up data into smaller chunks to speed up processing.", authorID: "profA" },
      ]
    },
    {
      category: "Trees",
      modules: [
        { id: 45, title: "Binary Jumping", desc: "Efficiently finding ancestors of a node.", authorID: "profA" },
        { id: 46, title: "Small-To-Large Merging", desc: "A way to merge two sets efficiently.", authorID: "profA" },
        { id: 47, title: "Heavy-Light Decomposition", desc: "Path and subtree updates and queries.", authorID: "profA" },
        { id: 48, title: "Centroid Decomposition", desc: "Decomposing a tree to facilitate path computations.", authorID: "profA" },
        { id: 49, title: "Virtual Tree", desc: "Compressing a tree to only the necessary nodes.", authorID: "profA" },
        { id: 50, title: "Kruskal Reconstruction Tree", desc: "Decomposing Kruskal's algorithm to solve problems about minimum/maximum edge weights.", authorID: "profA" },
      ]
    },
    {
      category: "Geometry",
      modules: [
        { id: 51, title: "Geometry Primitives", desc: "Basic setup for geometry problems.", authorID: "profA" },
        { id: 52, title: "Sweep Line", desc: "Introduction to line sweep.", authorID: "profA" },
        { id: 53, title: "Convex Hull", desc: "Smallest convex polygon containing a set of points on a grid.", authorID: "profA" },
        { id: 54, title: "Convex Hull Trick", desc: "A way to find the maximum or minimum value of several convex functions at given points.", authorID: "profA" },
      ]
    },
    {
      category: "Misc. Topics",
      modules: [
        { id: 55, title: "Inclusion-Exclusion Principle", desc: "A counting technique to compute the size of union of n finite sets.", authorID: "profA" },
        { id: 56, title: "Matrix Exponentiation", desc: "Repeatedly multiplying a square matrix by itself.", authorID: "profA" },
        { id: 57, title: "(Optional) Bitsets", desc: "Using bitsets for unintended solutions in USACO problems.", authorID: "profA" },
        { id: 58, title: "Divide & Conquer - DP", desc: "Using Divide & Conquer as a DP Optimization.", authorID: "profA" },
        { id: 59, title: "Sum over Subsets DP", desc: "Solving subset sum problems efficiently with DP.", authorID: "profA" },
      ]
    },
    {
      category: "Conclusion",
      modules: [
        { id: 60, title: "Additional Practice for USACO Platinum", desc: "Final tips for Platinum and additional practice problems.", authorID: "profA" },
      ]
    }
  ]
};

const sectionNames = ["Bronze", "Silver", "Gold", "Platinum"];

const AllLearningPath = () => {
  const [selectedSection, setSelectedSection] = useState("Bronze");
  const navigate = useNavigate();
  const sections = allSections[selectedSection];
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">All Learning Path</h2>
      <div className="flex gap-4 mb-8">
        {sectionNames.map(name => (
          <button
            key={name}
            onClick={() => setSelectedSection(name)}
            className={`px-4 py-2 rounded font-bold border-2 ${selectedSection === name ? "bg-yellow-400 text-black border-yellow-400" : "bg-[#22345c] text-white border-[#22345c]"}`}
          >
            {name}
          </button>
        ))}
      </div>
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
                  {section.modules.map((mod, j) => (
                    <div key={j} className="relative pl-6">
                      <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-gray-400"></div>
                      <button
                        onClick={() => navigate(`/professor/modules/content/${mod.id}`)}
                        className="text-blue-400 hover:underline font-semibold text-lg"
                      >
                        {mod.title}
                      </button>
                      {mod.authorID === currentAuthorID && (
                        <span className="ml-2 text-green-400 text-xs font-bold">(Yours)</span>
                      )}
                      <p className="text-sm text-gray-400">{mod.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLearningPath;
