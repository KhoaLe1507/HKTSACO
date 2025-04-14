import React from "react";
import HomePage from "../Pages/HomePage";
import ProblemsPage from "../Pages/ProblemsPage";
import BlogsPage from "../Pages/BlogsPage";
import RankingPage from "../Pages/RankingPage";

import GeneralPage from "../Pages/LearningPathSource/GeneralPage";
import BronzePage from "../Pages/LearningPathSource/BronzePage";
import SilverPage from "../Pages/LearningPathSource/SilverPage";
import GoldPage from "../Pages/LearningPathSource/GoldPage";
import PlatinumPage from "../Pages/LearningPathSource/PlatinumPage";
import AdvancedPage from "../Pages/LearningPathSource/AdvancedPage";

const MainRouter = ({ activePage }) => {
    switch (activePage) {
        case "home":
            return <HomePage />;
        case "problems":
            return <ProblemsPage />;
        case "blogs":
            return <BlogsPage />;
        case "ranking":
            return <RankingPage />;
        case "general":
            return <GeneralPage />;
        case "bronze":
            return <BronzePage />;
        case "silver":
            return <SilverPage />;
        case "gold":
            return <GoldPage />;
        case "platinum":
            return <PlatinumPage />;
        case "advanced":
            return <AdvancedPage />;
        default:
            return <HomePage />;
      }
};

export default MainRouter;
