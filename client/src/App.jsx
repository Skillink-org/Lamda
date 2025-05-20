import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
//import ContactPage  from "./pages/contactPage/ContactPage.jsx";
import Header from "./components/Header/Header";
import UserProfile from "./components/UserProfile/UserProfile";
import { useEffect } from "react";
import Conclusion from "./pages/conclusionPage/conclusionPage.jsx";


function App() {
  useEffect(() => {
    alert("Welcome to Lamda!"); 
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/:developerName" element={<TestPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/conclusion" element={<Conclusion />} />
      </Routes>
      <Header />
    </Router>
  );
}

export default App;


