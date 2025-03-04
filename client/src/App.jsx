import './App.scss'
import Routing from './routes/route'
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {TestPage} from "./pages/TestPage";

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/:developerName" element={<TestPage />} />
      <Router>
        <Header />
        {/* <Routing /> */}
      </Router>
    </Routes>
  </Router>
  )
}

export default App
