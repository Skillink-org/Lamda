import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
import Routing from './routes/route'
import Header from './components/Header/Header';
import HomePage from './pages/homePage/HomePage';
import AuthForm from './components/AuthForm/AuthForm';
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
    // <Router>
    //   <Routes>
    //     <Route path="/:developerName" element={<TestPage />} />
    //   </Routes>
    //   {/* </Router> */}
    //   <Header />
    //   <ExamPage />
    // <Router>
    //   <Routes>
    //     <Route path="/:developerName" element={<TestPage />} />
    //   </Routes>
    //   {/* </Router> */}
    //   <Header />
    //   <ExamPage />

    //   {/* <Routing /> */}
    // </Router>
    <HomePage></HomePage>
    //   {/* <Routing /> */}
    // </Router>
    <HomePage></HomePage>
  )
   
}

export default App;