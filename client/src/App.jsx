import './App.scss'
import { ExamPage } from './pages/ExamPage/ExamPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
import Routing from './routes/route'
import Header from './components/Header/Header';
import HomePage from './pages/homePage/HomePage';
import AuthForm from './components/AuthForm/AuthForm';

function App() {

  return (
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
  )
}

export default App
