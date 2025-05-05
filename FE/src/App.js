import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import ProblemsPage from "./Pages/ProblemsPage";
import Submit from "./Pages/Submit";
import BlogsPage from "./Pages/BlogsPage";
import RankingPage from "./Pages/RankingPage";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";

import BronzePage from "./Pages/LearningPathSource/BronzePage";
import SilverPage from "./Pages/LearningPathSource/SilverPage";
import GoldPage from "./Pages/LearningPathSource/GoldPage";
import PlatinumPage from "./Pages/LearningPathSource/PlatinumPage";
import ModuleContentDetail from "./Pages/LearningPathSource/ModuleContentDetail";

import Submission from "./Pages/Submission";

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen text-white font-[Inter] flex flex-col justify-between">
        <Navbar />

        <main className="mt-20 p-6 space-y-8 flex-grow mb-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="/submit" element={<Submit />} /> 
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/bronze" element={<BronzePage />} />
            <Route path="/silver" element={<SilverPage />} />
            <Route path="/gold" element={<GoldPage />} />
            <Route path="/platinum" element={<PlatinumPage />} />
            <Route path="/:level/module/:moduleId" element={<ModuleContentDetail />} />
            <Route path="/submission" element={<Submission />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
