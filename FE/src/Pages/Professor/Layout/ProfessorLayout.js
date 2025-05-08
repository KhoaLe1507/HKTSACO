// src/Pages/Professor/Layout/ProfessorLayout.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfessorHomePage from "../Dashboard/ProfessorHomePage";

// Problems
// import AllProblem from "../Problems/AllProblem";
import ProblemsPage from '../../ProblemsPage';
import AddProblem from "../Problems/AddProblem";
import EditProblem from "../Problems/EditProblem";
import ProblemDetail from "../Problems/ProblemDetail";
import MyProblem from "../Problems/MyProblem";
import SubmissionOfProblem from "../Problems/SubmissionOfProblem";

// Blogs
import AllBlog from "../Blogs/AllBlog";
import MyBlog from "../Blogs/MyBlog";
import AddBlog from "../Blogs/AddBlog";
import EditBlog from "../Blogs/EditBlog";

// Learning Path
import AllLearningPath from "../LearningPath/AllLearningPath";
import EditModule from "../LearningPath/EditModule";
import AddModuleContent from "../LearningPath/AddModuleContent";
import EditMyModuleContent from "../LearningPath/EditMyModuleContent";
import ModuleContentDetail from "../LearningPath/ModuleContentDetail";
import EditModuleContent from "../LearningPath/EditModuleContent";

const ProfessorLayout = () => {
  return (
    <div className="flex bg-white text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto ml-64">
        <Routes>
          {/* Dashboard */}
          <Route path="" element={<ProfessorHomePage />} />

          {/* Problems */}
          {/* <Route path="problems" element={<AllProblem />} /> */}
          <Route path="problems" element={<ProblemsPage />} />
          <Route path="problems/add" element={<AddProblem />} />
          <Route path="problems/:id" element={<ProblemDetail />} />
          <Route path="problems/:id/edit" element={<EditProblem />} />
          <Route path="problems/:id/submissions" element={<SubmissionOfProblem />} />
          <Route path="my-problems" element={<MyProblem />} />

          {/* Blogs */}
          <Route path="blogs" element={<AllBlog />} />
          <Route path="blogs/add" element={<AddBlog />} />
          <Route path="my-blogs" element={<MyBlog />} />
          <Route path="blogs/:id/edit" element={<EditBlog />} />

          {/* Learning Path */}
          <Route path="sections" element={<AllLearningPath />} />
          <Route path="my-module-content" element={<EditMyModuleContent />} />
          <Route path="modules/:id/edit" element={<EditModule />} />
          <Route path="modules/:id/add-content" element={<AddModuleContent />} />
          <Route path="modules/content/:id" element={<ModuleContentDetail />} />
          <Route path="modules/content/:id/edit" element={<EditModuleContent />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/professor" />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProfessorLayout;
