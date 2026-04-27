import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import IconButtons from "../../components/Buttons/IconButtons/IconButtons.jsx";
import PasswordInput from "../../components/PasswordInput/PasswordInput.jsx";
import { findUserByEmail, setCurrentUser } from "../../services/storage.js";
import budgetBeeLogoMain from "../../assets/images/main_logo.png"
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const currentPassword = password.trim();

    setEmailError("");
    setPasswordError("");

    if (!normalizedEmail) {
      setEmailError("Email is required");
      return;
    }

    if (!currentPassword) {
      setPasswordError("Password is required");
      return;
    }

    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      setEmailError("No account found with this email");
      return;
    }

    if (user.password !== currentPassword) {
      setPasswordError("Incorrect password");
      return;
    }

    setCurrentUser(user);
    navigate("/dashboard");
  };

  return (
    <main className="login-page">
      <section className="login-brand-panel">
        <div className="login-brand-inner">
          <div className="login-brand-mark">
            <img src={budgetBeeLogoMain} alt="BudgetBee logo" />
          </div>

          <p className="login-eyebrow">BudgetBee finance workspace</p>

          <h1>Take control of your money with clarity.</h1>

          <p className="login-brand-description">
            Track income, expenses, budgets, and savings goals from one simple
            personal finance dashboard.
          </p>

          <div className="login-product-preview">
            <div className="login-preview-card primary">
              <span>Monthly budget</span>
              <strong>$2,450</strong>
              <p>70% of income planned</p>
            </div>

            <div className="login-preview-grid">
              <div className="login-preview-card">
                <span>Savings goal</span>
                <strong>62%</strong>
              </div>

              <div className="login-preview-card">
                <span>Expenses</span>
                <strong>$840</strong>
              </div>
            </div>
          </div>

          <Link to="/signup" className="login-create-link">
            Create free account
          </Link>
        </div>
      </section>

      <section className="login-form-panel">
        <div className="login-card">
          <div className="login-header">
            <img src={budgetBeeLogoMain} alt="BudgetBee logo" />
            <p className="login-eyebrow">Welcome back</p>
            <h2>Log in to BudgetBee</h2>
            <p>Continue managing your personal finance workspace.</p>
          </div>

          <IconButtons />

          <div className="login-divider">
            <span></span>
            <p>or continue with email</p>
            <span></span>
          </div>

          <form className="login-form" onSubmit={handleLogin} noValidate>
            <div className="login-field">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError("");
                }}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={emailError ? "true" : "false"}
              />
              {emailError && <span className="login-error">{emailError}</span>}
            </div>

            <div className="login-field">
              <label htmlFor="login-password">Password</label>
              <PasswordInput
                id="login-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError("");
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              {passwordError && (
                <span className="login-error">{passwordError}</span>
              )}
            </div>

            <button type="submit" className="login-submit-btn">
              Log in
            </button>
          </form>

          <p className="login-mobile-signup">
            New to BudgetBee? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}