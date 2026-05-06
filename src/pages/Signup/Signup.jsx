import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import IconButtons from "../../components/AuthButtons/AuthButtons.jsx";
import PasswordInput from "../../components/PasswordInput/PasswordInput.jsx";
import { getUsers, addUser, setCurrentUser, findUserByEmail } from "../../services/storage.js";
import logo from "../../assets/images/main_logo.png";
import "./Signup.css";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setEmailError("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    const storedUsers = await getUsers();
    const emailExists = await findUserByEmail(trimmedEmail);

    if (emailExists) {
      setEmailError("Email already registered");
      return;
    }

    const newUser = {
      id: storedUsers.length + 1,
      name: trimmedName,
      email: trimmedEmail,
      password,
    };

    await addUser(newUser);
    setCurrentUser(newUser);
    navigate("/dashboard");
  };

  return (
    <main className="signup-page">
      <section className="signup-brand-panel">
        <div className="signup-brand-content">
          <div className="signup-logo-box">
            <img src={logo} alt="BudgetBee logo" />
          </div>

          <p className="signup-brand-eyebrow">BudgetBee finance workspace</p>

          <h1 className="signup-brand-title">
            Start building better money habits.
          </h1>

          <p className="signup-brand-description">
            Create your account to manage budgets, expenses, savings goals, and
            financial insights in one modern workspace.
          </p>

          <div className="signup-preview-grid">
            <div className="signup-preview-card signup-preview-card-wide">
              <span>Monthly budget</span>
              <strong>$10,000</strong>
              <small>$5,880 remaining this month</small>
            </div>

            <div className="signup-preview-card">
              <span>Savings goal</span>
              <strong>62%</strong>
            </div>

            <div className="signup-preview-card">
              <span>Expenses</span>
              <strong>$4,120</strong>
            </div>
          </div>

          <Link to="/login" className="signup-login-link">
            Already have an account? Log in
          </Link>
        </div>
      </section>

      <section className="signup-form-panel">
        <div className="signup-card">
          <div className="signup-card-header">
            <img src={logo} alt="BudgetBee logo" />
            <p className="signup-card-eyebrow">Welcome to BudgetBee</p>
            <h2>Create your account</h2>
            <p>Set up your workspace and start tracking your financial progress.</p>
          </div>

          <IconButtons />

          <div className="signup-divider">
            <span></span>
            <p>or continue with email</p>
            <span></span>
          </div>

          <form className="signup-form" onSubmit={handleSignup}>
            <div className="signup-field-group">
              <label htmlFor="signup-full-name">Full name</label>
              <input
                id="signup-full-name"
                className="signup-field"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                autoComplete="name"
                required
              />
            </div>

            <div className="signup-field-group">
              <label htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                className="signup-field"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError("");
                }}
                autoComplete="email"
                required
              />
              {emailError && <span className="signup-error">{emailError}</span>}
            </div>

            <div className="signup-field-group">
              <label htmlFor="signup-password">Password</label>
              <PasswordInput
                id="signup-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Choose a password"
                autoComplete="new-password"
              />
            </div>

            <button className="signup-submit-btn" type="submit">
              Create account
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}