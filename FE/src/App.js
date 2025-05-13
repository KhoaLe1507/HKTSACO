import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";

import ProblemsPage from "./Pages/ProblemsPage";
import ProblemDetails from "./Pages/ProblemDetail";
import Submit from "./Pages/Submit";
import Submission from "./Pages/Submission";

import BlogsPage from "./Pages/BlogsPage";
import RankingPage from "./Pages/RankingPage";
import ContactUsPage from "./Pages/ContactUsPage";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";

import LearningPathPage from "./Pages/LearningPathSource/LearningPathPage";
import ModuleContentDetail from "./Pages/LearningPathSource/ModuleContentDetail";

import ProfessorLayout from "./Pages/Professor/Layout/ProfessorLayout";
import AdminLayout from "./Pages/Admin/Layout/AdminLayout";

import { AuthProvider } from "./Context/AuthContext";

import MyProfile from "./Pages/User/MyProfile";
import EditProfile from "./Pages/User/EditProfile";
import MyBlog from "./Pages/User/MyBlog";
import AddBlog from "./Pages/Professor/Blogs/AddBlog";
import EditBlog from "./Pages/Professor/Blogs/EditBlog";
import MyProgress from "./Pages/User/MyProgress";
import MySubmission from "./Pages/User/MySubmission";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-white min-h-screen text-gray-800 font-[Inter] flex flex-col justify-between">
          <Navbar />

          <main className="mt-20 p-6 space-y-8 flex-grow mb-20 animate-fadeIn">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/problems" element={<ProblemsPage />} />
              <Route path="/problem-details" element={<ProblemDetails />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/submission" element={<Submission />} />
              <Route path="/submission/:id" element={<Submission />} />
              <Route path="/blogs" element={<BlogsPage />} />
              
              <Route path="/ranking" element={<RankingPage />} />

              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Learning Path Routes */}
              <Route path="/:level" element={<LearningPathPage />} />
              <Route path="/learning-path/:level" element={<LearningPathPage />} />

              <Route path="/admin/*" element={<AdminLayout />} />
              
              <Route path="/learn/:level/module/:moduleId" element={<ModuleContentDetail />} />
              
              <Route path="/professor/*" element={<ProfessorLayout />} />

              <Route path="/profile" element={<MyProfile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/my-blog" element={<MyBlog />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/blogs/edit/:id" element={<EditBlog />} />
              <Route path="/my-progress" element={<MyProgress />} />
              <Route path="/my-submission" element={<MySubmission />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
