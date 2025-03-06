import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
import ContactPage  from "./pages/contactPage/ContactPage.jsx";

import { useEffect } from 'react';

function App() {

  useEffect(() => {
    alert("ברוך הבא לאפליקציה!"); // ההודעה שתופיעה כשנטען הדף
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/:developerName" element={<TestPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
