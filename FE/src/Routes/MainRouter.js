import React from "react";
import HomePage from "../Pages/HomePage";

import ProblemsPage from "../Pages/ProblemsPage";
import ProblemDetails from "../Pages/ProblemDetails";
import Submit from "../Pages/Submit";
import Submission from "../Pages/Submission";

import BlogsPage from "../Pages/BlogsPage";
import RankingPage from "../Pages/RankingPage";
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";

import BronzePage from "../Pages/LearningPathSource/BronzePage";
import SilverPage from "../Pages/LearningPathSource/SilverPage";
import GoldPage from "../Pages/LearningPathSource/GoldPage";
import PlatinumPage from "../Pages/LearningPathSource/PlatinumPage";
import ModuleContentDetail from "../Pages/LearningPathSource/ModuleContentDetail";

import ProfessorLayout from "../Pages/Professor/Layout/ProfessorLayout";

const MainRouter = ({ activePage }) => {
    switch (activePage) {
        case "home":
            return <HomePage />;
        case "problems":
            return <ProblemsPage />;
        case "problem-details":
            return <ProblemDetails />;
        case "submit":
            return <Submit />;
        case "submission":
            return <Submission />;
        case "blogs":
            return <BlogsPage />;
        case "ranking":
            return <RankingPage />;
        case "login":
            return <LoginPage />;
        case "register":
            return <RegisterPage />;
        case "bronze":
            return <BronzePage />;
        case "silver":
            return <SilverPage />;
        case "gold":
            return <GoldPage />;
        case "platinum":
            return <PlatinumPage />;
        case "module-content":
            const moduleId = window.location.pathname.split("/").pop();
            return <ModuleContentDetail moduleId={moduleId} />;
        case "professor":
            return <ProfessorLayout />;
        default:
            return <HomePage />;
    }
};

export default MainRouter;
