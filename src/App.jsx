import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./pages/Login/Login.jsx"));
const Landing = lazy(() => import("./pages/Landing/Landing.jsx"));
const Signup = lazy(() => import("./pages/Signup/Signup.jsx"));
const ProfileSettings = lazy(() =>
  import("./pages/Settings/Profile/ProfileSettings.jsx")
);
const IncomeSources = lazy(() =>
  import("./pages/IncomeSources/IncomeSources.jsx")
);
const Categories = lazy(() => import("./pages/Categories/Categories.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard.jsx"));
const About = lazy(() => import("./pages/About/About.jsx"));
const Support = lazy(() => import("./pages/Support/Support"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse/TermsOfUse.jsx"));
const PrivacyPolicy = lazy(() =>
  import("./pages/PrivacyPolicy/PrivacyPolicy.jsx")
);
const BudgetPlanning = lazy(() =>
  import("./pages/BudgetPlanning/BudgetPlanning.jsx")
);

function App() {
  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/budget-planning" element={<BudgetPlanning />} />
          <Route path="/settings/profile" element={<ProfileSettings />} />
          <Route path="/settings/income-sources" element={<IncomeSources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;