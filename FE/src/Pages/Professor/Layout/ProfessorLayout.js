// src/Pages/Professor/Layout/ProfessorLayout.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfessorHomePage from "../Dashboard/ProfessorHomePage";

// Problems
// import AllProblem from "../Problems/AllProblem";
import ProblemsPage from '../../ProblemsPage';
import ProblemDetails from "../../ProblemDetail";
import Submit from "../../Submit";
import Submission from "../../Submission";
import AddProblem from "../Problems/AddProblem";
import EditProblem from "../Problems/EditProblem";
import MyProblem from "../Problems/MyProblem";

// Blogs
import BlogsPage from '../../BlogsPage';
import MyBlog from '../../User/MyBlog';
import AddBlog from "../Blogs/AddBlog";
import EditBlog from "../Blogs/EditBlog";

// Learning Path
import LearningPathPage from '../../LearningPathSource/LearningPathPage';

import EditModule from "../LearningPath/EditModule";
// import AddModuleContent from "../LearningPath/AddModuleContent";
import EditMyModuleContent from "../LearningPath/EditMyModuleContent";
import ModuleContentDetail from "../../LearningPathSource/ModuleContentDetail";
import EditModuleContent from "../../Admin/EditModuleContent";

import ViewSolution from "../Problems/ViewSolution";
import AllSubmission from "../Problems/AllSubmission";


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
          <Route path="problems/:id/edit" element={<EditProblem />} />
          <Route path="my-problems" element={<MyProblem />} />

          {/* Blogs */}
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="blogs/add" element={<AddBlog />} />
          <Route path="blogs/my" element={<MyBlog />} />
          <Route path="blogs/:id/edit" element={<EditBlog />} />

          {/* Learning Path */}
          <Route path="learning-path/:sectionId/:level" element={<LearningPathPage />} />
          <Route path="my-module-content" element={<EditMyModuleContent />} />
          <Route path="modules/:id/edit" element={<EditModule />} />
          <Route path="section/:level/module-content/:moduleId/detail" element={<ModuleContentDetail />} />

          <Route path="module/:moduleId/module-content/:modulecontentId/edit" element={<EditModuleContent />} />


          {/* <Route path="modules/:id/add-content" element={<AddModuleContent />} /> */}
          <Route path="modules/content/:id" element={<ModuleContentDetail />} />
          <Route path="modules/content/:id/edit" element={<EditModuleContent />} />

          <Route path="problems/:id/view-solution" element={<ViewSolution />} />
          <Route path="problems/:id/all-submissions" element={<AllSubmission />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/professor" />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProfessorLayout;
