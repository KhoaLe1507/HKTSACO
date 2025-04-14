import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MainRouter from "./Routes/MainRouter";

const App = () => {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="bg-[#000000] min-h-screen text-white font-[Inter] flex flex-col justify-between">
      {/* Navbar truyền hàm điều hướng */}
      <Navbar showPage={setActivePage} />

      {/* Main content */}
      <main className="bg-[#000000] mt-20 p-6 space-y-8 flex-grow mb-20">
        <MainRouter activePage={activePage} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
