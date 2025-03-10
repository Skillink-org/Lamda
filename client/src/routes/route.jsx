import React from "react";
import { Routes, Route } from "react-router-dom";
import { TestPage } from "../pages/TestPage";
import UserProfile from "../components/UserProfile/UserProfile";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/:developerName" element={<TestPage />} />
    </Routes>
  );
};

export default Routing;
