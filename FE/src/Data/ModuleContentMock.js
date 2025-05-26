

export const moduleContentDetails = {
    "binary-search": {
        title: "Binary Search",
        description: "Learn how to efficiently find elements in sorted arrays and optimize solutions.",
        objectives: [
            "Understand binary search algorithm",
            "Implement binary search on arrays",
            "Apply binary search to optimization problems"
        ],
        content: `
  Binary search is a divide-and-conquer algorithm that finds a target value in a sorted array.
  - Reduces search space by half each time: O(log n)
  - Works on monotonic functions (always increasing/decreasing)
  - Two variants: finding exact value, finding optimal value
  
  Implementation pattern:
  1. Define search space [left, right]
  2. While left <= right:
     - Calculate mid = left + (right - left) / 2
     - If found target, return
     - Else, eliminate half of the range
      `,
        example: `
  // Find 7 in sorted array [1, 3, 5, 7, 9]
  let left = 0, right = 4;
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (arr[mid] === 7) return mid;     // Found at index 3
    else if (arr[mid] < 7) left = mid + 1;
    else right = mid - 1;
  }`,
        exercises: [
            "Implement binary search to find a value in a sorted array",
            "Solve the 'Find First and Last Position' problem",
            "Use binary search to find the minimum value that satisfies a condition"
        ]
    },

    "greedy-algorithms": {
        title: "Greedy Algorithms",
        description: "Make locally optimal choices to find globally optimal solutions.",
        objectives: [
            "Understand greedy algorithm paradigm",
            "Identify problems suitable for greedy approach",
            "Implement and analyze greedy solutions"
        ],
        content: `
  Greedy algorithms build up a solution piece by piece, always choosing the next piece that offers the most immediate benefit.
  
  Key characteristics:
  - Make the locally optimal choice at each step
  - Never reconsider choices once made
  - Often faster than other paradigms: typically O(n log n) or better
  - Not all problems can be solved optimally with greedy approach
  
  Common greedy problems:
  - Interval scheduling
  - Coin change (with certain denominations)
  - Huffman coding
  - Minimum spanning trees
      `,
        example: `
  // Activity selection problem - select maximum number of activities
  // Sort by end time and select non-overlapping activities
  function activitySelection(start, end) {
    // Activities sorted by end time
    let result = [0];  // First activity
    let j = 0;
    
    for (let i = 1; i < start.length; i++) {
      if (start[i] >= end[j]) {
        result.push(i);
        j = i;
      }
    }
    return result;
  }`,
        exercises: [
            "Solve the coin change problem",
            "Implement a fractional knapsack algorithm",
            "Find the minimum number of platforms needed for a train station"
        ]
    },

    "dynamic-programming": {
        title: "Dynamic Programming",
        description: "Solve complex problems by breaking them down into simpler subproblems.",
        objectives: [
            "Understand dynamic programming principles",
            "Identify overlapping subproblems and optimal substructure",
            "Implement top-down (memoization) and bottom-up (tabulation) approaches"
        ],
        content: `
  Dynamic Programming (DP) solves problems by:
  - Breaking them into overlapping subproblems
  - Solving each subproblem once
  - Storing the solutions to avoid redundant computation
  
  Two main approaches:
  - Top-down (memoization): Recursive with caching
  - Bottom-up (tabulation): Iterative, building from base cases
  
  Key elements for a DP solution:
  1. Define state clearly
  2. Establish recurrence relation
  3. Identify base cases
  4. Determine computation order
  5. Extract final answer from completed DP array/table
      `,
        example: `
  // Fibonacci using DP (bottom-up)
  function fibonacci(n) {
    let dp = new Array(n+1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
  }
  
  // Time complexity: O(n), Space complexity: O(n)`,
        exercises: [
            "Solve the 0/1 Knapsack problem",
            "Implement Longest Common Subsequence",
            "Find the number of ways to make change for a given amount"
        ]
    },

    "graph-traversal": {
        title: "Graph Traversal",
        description: "Explore graph structures with depth-first search (DFS) and breadth-first search (BFS).",
        objectives: [
            "Represent graphs in code (adjacency list/matrix)",
            "Implement DFS and BFS traversals",
            "Solve classic graph problems using traversal algorithms"
        ],
        content: `
  Graph traversal techniques systematically visit all vertices in a graph.
  
  Depth-First Search (DFS):
  - Uses stack (or recursion)
  - Explores as far as possible along each branch
  - Time and space complexity: O(V + E)
  - Applications: Topological sort, cycle detection, path finding
  
  Breadth-First Search (BFS):
  - Uses queue
  - Explores all neighbors before moving to next level
  - Time and space complexity: O(V + E)
  - Applications: Shortest path (unweighted), connected components, level order traversal
  
  Graph representation:
  - Adjacency List: Space O(V + E), better for sparse graphs
  - Adjacency Matrix: Space O(V²), better for dense graphs
      `,
        example: `
  // DFS implementation
  function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    console.log(start); // Process current node
    
    for (let neighbor of graph[start]) {
      if (!visited.has(neighbor)) {
        dfs(graph, neighbor, visited);
      }
    }
  }
  
  // BFS implementation
  function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);
    
    while (queue.length > 0) {
      const vertex = queue.shift();
      console.log(vertex); // Process current node
      
      for (let neighbor of graph[vertex]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }`,
        exercises: [
            "Implement DFS to detect cycles in a directed graph",
            "Use BFS to find the shortest path in an unweighted graph",
            "Check if a graph is bipartite using graph traversal"
        ]
    },

    "shortest-paths": {
        title: "Shortest Paths",
        description: "Find optimal paths in weighted graphs using specialized algorithms.",
        objectives: [
            "Understand Dijkstra's algorithm for single-source shortest paths",
            "Implement Bellman-Ford algorithm for graphs with negative weights",
            "Apply Floyd-Warshall for all-pairs shortest paths"
        ],
        content: `
  Shortest path algorithms find minimal-weight paths between vertices in a weighted graph.
  
  Dijkstra's Algorithm:
  - For graphs with non-negative weights
  - Greedy approach using priority queue
  - Time complexity: O(E log V) with binary heap
  - Cannot handle negative weight edges
  
  Bellman-Ford Algorithm:
  - Works with negative weight edges
  - Can detect negative weight cycles
  - Time complexity: O(V * E)
  
  Floyd-Warshall Algorithm:
  - Finds shortest paths between all pairs of vertices
  - Dynamic programming approach
  - Time complexity: O(V³)
  - Works with negative weights (no cycles)
      `,
        example: `
  // Dijkstra's Algorithm (simplified)
  function dijkstra(graph, start) {
    const dist = {};
    const pq = new PriorityQueue();
    
    // Initialize distances
    for (let vertex in graph) {
      dist[vertex] = Infinity;
    }
    dist[start] = 0;
    pq.enqueue(start, 0);
    
    while (!pq.isEmpty()) {
      let { element: u } = pq.dequeue();
      
      for (let [v, weight] of graph[u]) {
        let newDist = dist[u] + weight;
        if (newDist < dist[v]) {
          dist[v] = newDist;
          pq.enqueue(v, newDist);
        }
      }
    }
    
    return dist;
  }`,
        exercises: [
            "Implement Dijkstra's algorithm using a priority queue",
            "Use Bellman-Ford to detect negative cycles",
            "Solve the 'Network Delay Time' problem"
        ]
    },

    "minimum-spanning-trees": {
        title: "Minimum Spanning Trees",
        description: "Find the subset of edges that connects all vertices with minimum total weight.",
        objectives: [
            "Understand the concept of spanning trees",
            "Implement Kruskal's algorithm using Union-Find",
            "Implement Prim's algorithm using priority queue"
        ],
        content: `
  A Minimum Spanning Tree (MST) connects all vertices with the minimum possible total edge weight.
  
  Kruskal's Algorithm:
  - Sort edges by weight
  - Add edges to MST if they don't create a cycle
  - Uses Union-Find data structure
  - Time complexity: O(E log E) or O(E log V)
  
  Prim's Algorithm:
  - Start from any vertex
  - Grow tree by adding the minimum weight edge connecting a tree vertex to a non-tree vertex
  - Uses priority queue
  - Time complexity: O(E log V) with binary heap
  
  Applications:
  - Network design
  - Approximation algorithms
  - Cluster analysis
      `,
        example: `
  // Kruskal's Algorithm with Union-Find
  function kruskal(graph, vertices) {
    const edges = []; // Collect and sort all edges
    const mst = [];
    const uf = new UnionFind(vertices);
    
    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);
    
    for (let edge of edges) {
      const { src, dest, weight } = edge;
      
      // If including this edge doesn't create a cycle
      if (uf.find(src) !== uf.find(dest)) {
        mst.push(edge);
        uf.union(src, dest);
      }
      
      // Stop when we have V-1 edges
      if (mst.length === vertices - 1) break;
    }
    
    return mst;
  }`,
        exercises: [
            "Implement Union-Find data structure",
            "Solve the 'Connecting Cities With Minimum Cost' problem",
            "Compare runtime of Kruskal's vs Prim's algorithm on different graph types"
        ]
    },

    "trees": {
        title: "Tree Algorithms",
        description: "Explore specialized algorithms for tree data structures.",
        objectives: [
            "Understand tree properties and traversals",
            "Implement tree-specific algorithms",
            "Solve problems using tree concepts"
        ],
        content: `
  Trees are connected acyclic graphs with special properties:
  - N nodes, N-1 edges
  - Exactly one path between any two nodes
  - Hierarchical structure
  
  Key tree algorithms:
  - Traversals: preorder, inorder, postorder, level-order
  - Lowest Common Ancestor (LCA)
  - Diameter calculation
  - Tree DP algorithms
  
  Binary trees:
  - Each node has at most two children
  - Binary Search Trees (BST): left < root < right
  - Height-balanced trees: AVL, Red-Black
  
  Specialized tree structures:
  - Trie (prefix tree)
  - Segment tree
  - Fenwick tree (Binary Indexed Tree)
      `,
        example: `
  // Find Lowest Common Ancestor (LCA) in a tree
  function lca(root, p, q) {
    if (!root || root === p || root === q) return root;
    
    const left = lca(root.left, p, q);
    const right = lca(root.right, p, q);
    
    // If p and q are found in different subtrees, current node is LCA
    if (left && right) return root;
    
    // Otherwise, return the non-null result
    return left ? left : right;
  }`,
        exercises: [
            "Calculate the diameter of a binary tree",
            "Find the maximum path sum in a binary tree",
            "Implement a function to check if a binary tree is a valid BST"
        ]
    },

    "range-queries": {
        title: "Range Queries",
        description: "Efficiently query and update ranges in arrays and trees.",
        objectives: [
            "Understand prefix sum arrays",
            "Implement Segment Trees for range queries",
            "Use Binary Indexed Trees for cumulative operations"
        ],
        content: `
  Range query data structures allow efficient operations over ranges:
  - Range sum
  - Range minimum/maximum
  - Range updates
  
  Techniques:
  - Prefix Sums: O(1) query, O(n) preprocessing
  - Difference Array: Efficient range updates
  - Segment Tree: O(log n) query and update
  - Binary Indexed Tree (Fenwick): O(log n) query and update
  - Sparse Table: O(1) query, O(n log n) preprocessing (for idempotent operations)
  
  Segment Tree applications:
  - Range minimum/maximum query
  - Range sum query with updates
  - Lazy propagation for range updates
      `,
        example: `
  // Prefix Sum Array for range sum queries
  function buildPrefixSum(arr) {
    const prefix = [0];
    for (let i = 0; i < arr.length; i++) {
      prefix.push(prefix[i] + arr[i]);
    }
    return prefix;
  }
  
  // Query sum in range [left, right] (inclusive)
  function querySum(prefix, left, right) {
    return prefix[right + 1] - prefix[left];
  }
  
  // Example usage
  const arr = [1, 3, 4, 8, 6, 1, 4, 2];
  const prefix = buildPrefixSum(arr);
  console.log(querySum(prefix, 2, 5)); // Sum of arr[2:5] = 4 + 8 + 6 + 1 = 19`,
        exercises: [
            "Implement a Segment Tree for range minimum queries",
            "Solve the 'Range Sum Query - Mutable' problem",
            "Use Fenwick Tree for prefix sum queries with updates"
        ]
    },

    "string-algorithms": {
        title: "String Algorithms",
        description: "Efficiently process and analyze text data with specialized algorithms.",
        objectives: [
            "Implement pattern matching algorithms",
            "Build and use advanced string data structures",
            "Solve common string manipulation problems"
        ],
        content: `
  String algorithms efficiently process text data:
  
  Pattern Matching:
  - Naive approach: O(n*m)
  - Knuth-Morris-Pratt (KMP): O(n+m)
  - Rabin-Karp: O(n+m) average case
  - Z-algorithm: O(n+m)
  
  String Data Structures:
  - Trie (Prefix Tree): Fast lookups for words
  - Suffix Array: Sorted suffixes for pattern matching
  - Suffix Tree: Compact representation of all suffixes
  
  String Operations:
  - String hashing for comparison
  - Longest Common Substring
  - Longest Palindromic Substring (Manacher's Algorithm)
  - Edit Distance (Levenshtein)
      `,
        example: `
  // Trie (Prefix Tree) implementation
  class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }
  
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
    
    insert(word) {
      let current = this.root;
      
      for (let char of word) {
        if (!current.children[char]) {
          current.children[char] = new TrieNode();
        }
        current = current.children[char];
      }
      
      current.isEndOfWord = true;
    }
    
    search(word) {
      let current = this.root;
      
      for (let char of word) {
        if (!current.children[char]) {
          return false;
        }
        current = current.children[char];
      }
      
      return current.isEndOfWord;
    }
    
    startsWith(prefix) {
      let current = this.root;
      
      for (let char of prefix) {
        if (!current.children[char]) {
          return false;
        }
        current = current.children[char];
      }
      
      return true;
    }
  }`,
        exercises: [
            "Implement the Knuth-Morris-Pratt (KMP) algorithm",
            "Build a trie and use it to implement an autocomplete feature",
            "Solve the 'Longest Palindromic Substring' problem"
        ]
    },

    "number-theory": {
        title: "Number Theory",
        description: "Explore mathematical concepts and algorithms related to integers.",
        objectives: [
            "Implement efficient algorithms for prime numbers",
            "Understand modular arithmetic operations",
            "Apply number theory techniques to solve computational problems"
        ],
        content: `
  Number theory focuses on integers and their properties:
  
  Prime Numbers:
  - Primality test: Trial division, Miller-Rabin
  - Sieve of Eratosthenes: Generate all primes up to n
  - Prime factorization
  
  Modular Arithmetic:
  - Modular addition, subtraction, multiplication
  - Modular exponentiation (fast power)
  - Modular inverse
  - Chinese Remainder Theorem
  
  Greatest Common Divisor (GCD):
  - Euclidean algorithm
  - Extended Euclidean algorithm
  - Applications in fraction simplification
  
  Combinatorics:
  - Factorial, permutation, combination calculation
  - Pascal's triangle
  - Catalan numbers
      `,
        example: `
  // Sieve of Eratosthenes for finding all primes up to n
  function sieveOfEratosthenes(n) {
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    for (let i = 2; i * i <= n; i++) {
      if (isPrime[i]) {
        for (let j = i * i; j <= n; j += i) {
          isPrime[j] = false;
        }
      }
    }
    
    const primes = [];
    for (let i = 2; i <= n; i++) {
      if (isPrime[i]) primes.push(i);
    }
    
    return primes;
  }
  
  // Fast modular exponentiation: Calculate (base^exponent) % modulus
  function modPow(base, exponent, modulus) {
    if (modulus === 1) return 0;
    
    let result = 1;
    base = base % modulus;
    
    while (exponent > 0) {
      // If exponent is odd, multiply result with base
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
      }
      
      // Exponent = exponent/2
      exponent = Math.floor(exponent / 2);
      // Base = base^2
      base = (base * base) % modulus;
    }
    
    return result;
  }`,
        exercises: [
            "Implement the Euclidean algorithm for GCD",
            "Find all prime factors of a number efficiently",
            "Calculate nCr mod p using Fermat's Little Theorem"
        ]
    },

    "advanced-data-structures": {
        title: "Advanced Data Structures",
        description: "Master complex data structures for handling specialized problems efficiently.",
        objectives: [
            "Understand and implement Segment Trees and Binary Indexed Trees",
            "Use Disjoint Set Union (Union-Find) for connected components",
            "Apply specialized data structures to solve complex problems"
        ],
        content: `
  Advanced data structures enable efficient operations for specific use cases:
  
  Segment Tree:
  - Range queries and updates in O(log n)
  - Supports various operations (sum, min, max, etc.)
  - Lazy propagation for range updates
  
  Binary Indexed Tree (Fenwick Tree):
  - Prefix sums with updates in O(log n)
  - More memory efficient than segment tree
  - Simpler implementation for cumulative operations
  
  Union-Find (Disjoint Set Union):
  - Track connected components
  - Path compression and union by rank optimizations
  - Nearly constant amortized operations
  
  Sparse Table:
  - O(1) range queries for idempotent operations
  - O(n log n) preprocessing
  - Immutable structure
  
  Advanced Tree Structures:
  - Treap: BST + Heap properties
  - Skip List: Probabilistic alternative to balanced trees
  - Cartesian Tree: Binary tree derived from array
      `,
        example: `
  // Union-Find (Disjoint Set) implementation with optimizations
  class UnionFind {
    constructor(size) {
      this.parent = Array(size).fill().map((_, i) => i);
      this.rank = Array(size).fill(0);
      this.count = size; // Number of components
    }
    
    // Find root of the component
    find(x) {
      if (this.parent[x] !== x) {
        // Path compression
        this.parent[x] = this.find(this.parent[x]);
      }
      return this.parent[x];
    }
    
    // Union by rank
    union(x, y) {
      const rootX = this.find(x);
      const rootY = this.find(y);
      
      if (rootX === rootY) return false;
      
      if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
      
      this.count--; // Decrease component count
      return true;
    }
    
    // Check if two elements are in the same component
    connected(x, y) {
      return this.find(x) === this.find(y);
    }
    
    // Get number of connected components
    getCount() {
      return this.count;
    }
  }`,
        exercises: [
            "Implement a Segment Tree with lazy propagation",
            "Solve the 'Number of Islands II' problem using Union-Find",
            "Use a Binary Indexed Tree to solve the 'Range Sum Query - Mutable' problem"
        ]
    },

    "computational-geometry": {
        title: "Computational Geometry",
        description: "Solve geometric problems with specialized algorithms.",
        objectives: [
            "Implement basic geometric primitives and operations",
            "Understand convex hull algorithms",
            "Apply geometric algorithms to real-world problems"
        ],
        content: `
  Computational geometry deals with algorithms for geometric objects:
  
  Geometric Primitives:
  - Points, lines, vectors
  - Distance calculations
  - Area of polygons
  - Line segment intersection
  
  Convex Hull Algorithms:
  - Graham scan: O(n log n)
  - Jarvis march (Gift wrapping): O(nh)
  - Andrew's monotone chain: O(n log n)
  
  Closest Pair of Points:
  - Divide and conquer: O(n log n)
  - Sweep line technique
  
  Line Sweep Algorithms:
  - Finding all intersections
  - Area of union of rectangles
  
  Geometric Data Structures:
  - Quad-tree
  - R-tree
  - k-d tree for nearest neighbor search
      `,
        example: `
  // Point class for 2D geometry
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    
    // Euclidean distance between two points
    distanceTo(other) {
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
    
    // Cross product of vectors (this - origin) and (p - origin)
    static crossProduct(origin, p1, p2) {
      return (p1.x - origin.x) * (p2.y - origin.y) -
             (p1.y - origin.y) * (p2.x - origin.x);
    }
  }
  
  // Calculate area of a polygon using Shoelace formula
  function polygonArea(points) {
    let area = 0;
    const n = points.length;
    
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
    }
    
    return Math.abs(area) / 2;
  }`,
        exercises: [
            "Implement Graham scan algorithm for convex hull",
            "Calculate if a point is inside a polygon",
            "Find the closest pair of points in a set of 2D points"
        ]
    }
};
