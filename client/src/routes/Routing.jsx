import React from "react";
import { Routes, Route } from "react-router-dom";
import { TestPage } from "../pages/TestPage";
import UserProfile from "../components/UserProfile/UserProfile";
// import Home from "../pages/homePage/HomePage";
import About from "../pages/AboutPage/AboutPage"; 
import Contact from "../pages/contactPage/ContactPage";
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/:developerName" element={<TestPage />} />
    </Routes>
  );
};

export default Routing;
