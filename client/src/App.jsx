import './App.scss'
import Routing from './routes/route'
import Header from './components/Header/Header';
import { BrowserRouter as Router } from "react-router-dom";

function App() {

  return (
    <Router>
      <Header />
      {/* <Routing /> */}
    </Router>
  )
}

export default App
