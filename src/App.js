import React from "react";
import {  Routes, Route,HashRouter } from "react-router-dom";
import { Home, Personal, Experience, Education, Resume } from "./pages/index";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route index="/" element={<Home />} />
          <Route path="personal" element={<Personal />} />
          <Route path="experience" element={<Experience />} />
          <Route path="education" element={<Education />} />
          <Route path="resume" element={<Resume />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
