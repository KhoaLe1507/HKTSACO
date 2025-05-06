import React from "react";

const Section = ({ title, children, className = "" }) => (
  <section className={`p-6 rounded-2xl shadow ${className}`}>
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    {children}
  </section>
);

export default Section;
