// src/Pages/ViewSolution.js
import React from "react";

const ViewSolution = () => {
  // Dữ liệu giả (placeholder)
  const problemTitle = "Shortest Path";
  const professorName = "Prof.An";
  const explanation = "We use Dijkstra algorithm to find the shortest path from the source node to all other nodes in a graph with non-negative weights.";
  const language = "C++";
  const code = `
#include <bits/stdc++.h>
using namespace std;
typedef pair<int, int> pii;

void dijkstra(int start, vector<vector<pii>>& adj, vector<int>& dist) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        int u = pq.top().second, d = pq.top().first;
        pq.pop();
        if (d > dist[u]) continue;

        for (auto [v, w] : adj[u]) {
            if (dist[v] > d + w) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }
}
  `.trim();

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md animate-fadeIn">
      <h2 className="text-2xl font-bold text-navy mb-6">📘 Official Solution</h2>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">🔖 Problem Title:</label>
        <p className="text-xl font-bold text-blue-600">{problemTitle}</p>
      </div>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">👤 Professor:</label>
        <p className="text-base text-gray-800">{professorName}</p>
      </div>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">📖 Explanation:</label>
        <p className="text-base text-gray-800 whitespace-pre-line">{explanation}</p>
      </div>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">💻 Language:</label>
        <p className="text-base text-indigo-600">{language}</p>
      </div>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">🧠 Code:</label>
        <pre className="bg-gray-100 p-4 rounded border border-gray-300 overflow-x-auto whitespace-pre-wrap text-sm text-black">
{code}
        </pre>
      </div>
    </div>
  );
};

export default ViewSolution;
