import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import IconButtons from "../../components/Buttons/IconButtons/IconButtons.jsx";
import PasswordInput from "../../components/PasswordInput/PasswordInput.jsx";
import { getUsers, addUser, setCurrentUser, findUserByEmail } from "../../services/storage.js";
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

        const storedUsers = await getUsers();
        const emailExists = await findUserByEmail(email);

        if (emailExists) {
            setEmailError("Email already registered");
        } else {
            const newUser = { id: storedUsers.length + 1, name: fullName, email, password };
            await addUser(newUser);
            setCurrentUser(newUser);
            navigate("/dashboard");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-left-panel">
                <div className="signup-left-panel-content">
                    <h1 className="welcome-title">Welcome Back!</h1>
                    <p className="welcome-desciption">
                        To keep connected with us
                        <br />
                        please log in
                        <br />
                        with your personal info
                    </p>
                    <Link to="/login">
                        <button className="left-login-btn">Login</button>
                    </Link>
                </div>
            </div>

            <div className="signup-right-panel">
                <div className="signup-right-panel-content">
                    <h2 className="create-title">Create Account</h2>

                    <div className="social-signup-buttons">
                        <IconButtons />
                    </div>

                    <div className="choice-text">or use your email for registration</div>

                    <form className="signup-form" onSubmit={handleSignup}>
                        <label htmlFor="input-full-name" className="field-label">
                            Enter your full name
                        </label>
                        <input
                            id="input-full-name"
                            className="field"
                            type="text"
                            placeholder="Full name"
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                            required
                        />

                        <label htmlFor="input-email" className="field-label">
                            Enter your e-mail
                        </label>
                        <input
                            id="input-email"
                            className="field"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                        {emailError && <span className="input-error">{emailError}</span>}

                        <label htmlFor="input-password" className="field-label">
                            Password
                        </label>
                        <PasswordInput
                            id="input-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Choose a password"
                            autoComplete="new-password"
                        />

                        <button className="signup-btn" type="submit">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}