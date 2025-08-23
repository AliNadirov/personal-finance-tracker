import { useState } from "react";
import EyeOpen from "../../assets/icons/EyeOpen.jsx";
import EyeClose from "../../assets/icons/EyeClose.jsx";
import "./PasswordInput.css";

export default function PasswordInput({ id, name, value, onChange, placeholder, autoComplete }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input-wrapper">
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        className="password-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="password-eye-button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeClose /> : <EyeOpen />}
      </button>
    </div>
  );
}