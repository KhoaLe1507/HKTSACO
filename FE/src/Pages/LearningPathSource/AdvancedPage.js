import React from "react";
import Section from "../../Components/Section";

const AdvancedPage = () => {
  return (
    <Section className="bg-[#ba0019] text-white" title="Advanced">
      <p className="text-lg">
        Some of these topics have not appeared in Platinum and probably never will (e.g., Matroid Intersection).
        <br />Others have appeared in Old Gold or Platinum very infrequently (e.g., BCC, Suffix Array).
      </p>
    </Section>
  );
};

export default AdvancedPage;
