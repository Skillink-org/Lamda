import './App.scss'
<<<<<<< HEAD
import { ExamPage } from './pages/ExamPage/ExamPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {TestPage} from "./pages/TestPage";
=======
import Routing from './routes/route'
import Header from './components/Header/Header';
import { BrowserRouter as Router } from "react-router-dom";
>>>>>>> 8aba971ffb3b3cd41f1b39c0625588b7645cce3d

function App() {

  return (
    <Router>
<<<<<<< HEAD
    <ExamPage/>
    <Routes>
      <Route path="/:developerName" element={<TestPage />} />
    </Routes>
  </Router>
=======
      <Header />
      {/* <Routing /> */}
    </Router>
>>>>>>> 8aba971ffb3b3cd41f1b39c0625588b7645cce3d
  )
}

export default App
