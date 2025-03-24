import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
import ContactPage  from "./pages/contactPage/ContactPage.jsx";
import { ExamPage } from "./pages/ExamPage/ExamPage";
import Routing from "./routes/route";
import Header from "./components/Header/Header";
import UserProfile from "./components/UserProfile/UserProfile";
import { useEffect } from "react";


function App() {
  useEffect(() => {
    alert("ברוך הבא לאפליקציה!"); // ההודעה שתופיעה כשנטען הדף
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/:developerName" element={<TestPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/contact" element={<ContactPage />} />

      </Routes>
      <Header />
    </Router>
  );
}

export default App;


