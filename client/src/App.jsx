import './App.scss'
import { ExamPage } from './pages/ExamPage/ExamPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
import Routing from './routes/route'
import Header from './components/Header/Header';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/:developerName" element={<TestPage />} />
      </Routes>
      {/* </Router> */}
      <Header />
      <ExamPage />

      {/* <Routing /> */}
    </Router>
  )
}

export default App
