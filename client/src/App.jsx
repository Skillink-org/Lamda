import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./components/page/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* הוספת נתיב ל-"/" */}
        <Route path="/" element={<AdminPage />} />

        {/* נתיב לעמוד הניהול */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
