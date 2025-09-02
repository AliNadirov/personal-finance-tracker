import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Transaction from "./pages/Transaction/Transaction.jsx";
import ProfileSettings from "./pages/Settings/Profile/profilesettings.jsx";
import AdditionalIncome from "./pages/Settings/AdditionalIncome/AdditionalIncome.jsx";
import Categories from "./pages/Categories/Categories.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import About from "./pages/About/About.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/additional-income" element={<AdditionalIncome />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;