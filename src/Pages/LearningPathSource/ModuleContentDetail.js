import React from "react";
import { useParams } from "react-router-dom";

const allModuleGroups = {
  bronze: [
    {
      category: "Getting Started",
      modules: [
        ["time-complexity", "Time Complexity"],
        ["intro-data-structures", "Introduction to Data Structures"],
        ["simulation", "Simulation"],
      ],
    },
    {
      category: "Complete Search",
      modules: [
        ["basic-complete-search", "Basic Complete Search"],
        ["recursion", "Complete Search with Recursion"],
      ],
    },
    {
      category: "Sorting & Sets",
      modules: [
        ["sorting", "Introduction to Sorting"],
        ["sets-maps", "(Optional) Introduction to Sets & Maps"],
      ],
    },
    {
      category: "Additional",
      modules: [
        ["ad-hoc", "Ad Hoc Problems"],
        ["greedy", "Introduction to Greedy"],
      ],
    },
  ],
  silver: [
    {
      category: "Prefix Sums",
      modules: [
        ["1d-prefix-sums", "1D Prefix Sums"],
        ["2d-prefix-sums", "2D Prefix Sums"],
      ],
    },
    {
      category: "Sorting & Searching",
      modules: [
        ["sorting-review", "Sorting Review"],
        ["binary-search", "Binary Search"],
      ],
    },
    {
      category: "Additional Topics",
      modules: [["bitwise", "Intro to Bitwise Operators"]],
    },
    {
      category: "Conclusion",
      modules: [["silver-practice", "Additional Practice for USACO Silver"]],
    },
  ],
  gold: [
    {
      category: "Math",
      modules: [
        ["divisibility", "Divisibility"],
        ["modular-arithmetic", "Modular Arithmetic"],
        ["combinatorics", "Combinatorics"],
      ],
    },
    {
      category: "Dynamic Programming",
      modules: [
        ["intro-dp", "Introduction to DP"],
        ["knapsack", "Knapsack DP"],
        ["bitmask-dp", "Bitmask DP"],
      ],
    },
    {
      category: "Graphs",
      modules: [
        ["graph-traversal", "Graph Traversal"],
        ["flood-fill", "Flood Fill"],
      ],
    },
    {
      category: "Additional Topics",
      modules: [
        ["hashing", "Hashing"],
        ["hashmaps", "(Optional) Hashmaps"],
      ],
    },
    {
      category: "Conclusion",
      modules: [["gold-practice", "Additional Practice for USACO Gold"]],
    },
  ],
  platinum: [
    {
      category: "Range Queries",
      modules: [
        ["segment-tree-apps", "More Applications of Segment Tree"],
        ["range-sweep-line", "Range Queries with Sweep Line"],
        ["range-update", "Range Update Range Query"],
        ["sparse-segment", "Sparse Segment Trees"],
        ["2d-range", "2D Range Queries"],
      ],
    },
    {
      category: "Trees",
      modules: [
        ["binary-jumping", "Binary Jumping"],
        ["small-large", "Small-To-Large Merging"],
        ["heavy-light", "Heavy-Light Decomposition"],
        ["centroid", "Centroid Decomposition"],
        ["virtual-tree", "Virtual Tree"],
        ["kruskal-reconstruct", "Kruskal Reconstruction Tree"],
      ],
    },
    {
      category: "Geometry",
      modules: [
        ["geometry-primitives", "Geometry Primitives"],
        ["sweep-line", "Sweep Line"],
        ["convex-hull", "Convex Hull"],
        ["convex-hull-trick", "Convex Hull Trick"],
      ],
    },
    {
      category: "Misc. Topics",
      modules: [
        ["inclusion-exclusion", "Inclusion-Exclusion Principle"],
        ["matrix-exp", "Matrix Exponentiation"],
        ["bitsets", "(Optional) Bitsets"],
        ["divide-dp", "Divide & Conquer - DP"],
        ["subset-dp", "Sum over Subsets DP"],
      ],
    },
    {
      category: "Conclusion",
      modules: [["platinum-practice", "Additional Practice for USACO Platinum"]],
    },
  ],
};

const ModuleContentDetail = () => {
  const { level, moduleId } = useParams(); // Lấy từ URL

  const moduleGroups = allModuleGroups[level] || [];

  const selectedTitle =
    moduleGroups
      .flatMap((group) => group.modules)
      .find(([key]) => key === moduleId)?.[1] || "Module Not Found";

  return (
    <div className="text-black flex">
      {/* Sidebar */}
      <div className="w-[300px] bg-white p-4 border-r border-gray-600 min-h-screen">
        <h2 className="text-xl font-bold mb-4 capitalize">
          Learning Path ({level})
        </h2>
        {moduleGroups.map((section, i) => (
          <div key={i} className="mb-4">
            <h4 className="text-md font-semibold mb-1">{section.category}</h4>
            <ul className="ml-2 space-y-1">
              {section.modules.map(([key, title]) => (
                <li key={key}>
                  <a
                    href={`/${level}/module/${key}`}
                    className={`${
                      key === moduleId ? "text-yellow-400" : "text-blue-400"
                    } hover:underline`}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-4">{selectedTitle}</h1>
        <p>
          Đây là nội dung tạm thời của module <strong>{selectedTitle}</strong>.
        </p>
      </div>
    </div>
  );
};

export default ModuleContentDetail;
