import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./dashboard";
import HomePage from "./home";

function App() {
  return (
    <Router>
      <HomePage />
      <Topbar />
      <div className="container">
        <Sidebar />
        <Dashboard />
      </div>
    </Router>
  );
}

export default App;
