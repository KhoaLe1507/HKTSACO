import React from "react";
import Section from "../../Components/Section";

const GeneralPage = () => {
  return (
    <Section className="bg-blue-600 text-white" title="General">
      <p className="text-lg">
        You don't have to complete all the modules in this section before moving on to Bronze.
        <br />Feel free to mark some as "skipped" and revisit them at a later time!
      </p>
    </Section>
  );
};

export default GeneralPage;
