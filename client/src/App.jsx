import "./App.scss";
import { ExamPage } from "./pages/ExamPage/ExamPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
import Routing from "./routes/route";
import Header from "./components/Header/Header";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:developerName" element={<TestPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      <Header />
    </Router>
  );
}

export default App;
