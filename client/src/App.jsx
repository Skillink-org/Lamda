import './App.scss'
import Routing from './routes/route'
import { BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header/Header';

function App() {

  return (
    <>
      <Router>
        <Header />
        {/* <Routing /> */}
      </Router>
    </>
  )
}

export default App
