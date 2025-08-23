import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import IconButtons from "../../components/Buttons/IconButtons/IconButtons.jsx";
import PasswordInput from "../../components/PasswordInput/PasswordInput.jsx";
import { findUserByEmail, setCurrentUser } from "../../services/storage.js";
import budgetBeeLogo2 from "../../assets/images/Logo2.png";
import budgetBeeLogo5 from "../../assets/images/Logo5.png";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    const user = await findUserByEmail(email);

    if (!user) {
      setEmailError("Email not registered");
    } else if (user.password !== password) {
      setPasswordError("Password is wrong");
    } else {
      setCurrentUser(user);
      navigate("/dashboard");
    }
  };

  return (
    <div className="container">
      <div className="login-left-panel">
        <div className="login-page-logo">
          <img
            className="left-panel-logo"
            src={budgetBeeLogo2}
            alt="BudgetBee Logo"
          />
        </div>
        <h2>Hello, Friend!</h2>
        <p>Enter your personal details and start a journey with us!</p>
        <Link to="/signup">
          <button className="link-to-signup">Create Account</button>
        </Link>
      </div>

      <div className="login-right-panel">
        <div className="login-page-logo">
          <img
            className="right-panel-logo"
            src={budgetBeeLogo5}
            alt="BudgetBee Logo"
          />
        </div>
        <h2>Log In</h2>

        <IconButtons />

        <div className="login-type-choice-text">or use your account</div>

        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="from-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
          {emailError && <span className="input-error">{emailError}</span>}

          <label htmlFor="password-input" className="from-label Login-page-pw-text">
            Password
          </label>
          <PasswordInput
            id="password-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          {passwordError && <span className="input-error">{passwordError}</span>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}