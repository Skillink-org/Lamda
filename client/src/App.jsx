import './App.scss'
import { ExamPage } from './pages/ExamPage/ExamPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {TestPage} from "./pages/TestPage";

function App() {

  return (
    <Router>
    <ExamPage/>
    <Routes>
      <Route path="/:developerName" element={<TestPage />} />
    </Routes>
  </Router>
  )
}

export default App
