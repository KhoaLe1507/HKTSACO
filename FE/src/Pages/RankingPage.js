import React from "react";
import Section from "../Components/Section";

const RankingPage = () => {
  return (
    <Section className="bg-[#0f1f3b] text-white" title="Ranking">
      <ol className="space-y-1">
        <li>🥇 Alice - 320 pts</li>
        <li>🥈 Bob - 300 pts</li>
        <li>🥉 Charlie - 270 pts</li>
      </ol>
    </Section>
  );
};

export default RankingPage;
