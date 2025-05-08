import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
import ContactPage  from "./pages/contactPage/ContactPage.jsx";
import Header from "./components/Header/Header";
import UserProfile from "./components/UserProfile/UserProfile";
import { useEffect } from "react";
import Routing from "./routes/Routing";
import {ExamPage} from "./pages/ExamPage/ExamPage";


function App() {
  useEffect(() => {
    alert("Welcome to Lamda!"); 
  }, []);


  return (
    <Router>
      <Routing/>
      <Routes>
        {/* <Route path="/:developerName" element={<TestPage />} /> */}
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
      <Header />
      <ExamPage/>
    </Router>
  );
}

export default App;


