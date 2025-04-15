import React from "react";
import Section from "../Components/Section";

const BlogsPage = () => {
  return (
    <Section className="bg-[#0f1f3b] text-white" title="Theory Lessons">
      <p className="text-lg mb-4">Learn Sorting, Recursion, DP and more with structured lessons.</p>
      <button className="bg-[#4a78a6] text-white px-4 py-2 rounded " onClick={() => alert("Open lesson")}>
        Learn Now
      </button>
    </Section>
  );
};

export default BlogsPage;
