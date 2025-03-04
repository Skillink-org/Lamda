import React from "react";
import { Routes, Route } from "react-router-dom";
import { TestPage } from "../pages/TestPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/:developerName" element={<TestPage />} />
    </Routes>
  );
};

export default Routing;
