import { useState, useRef, useEffect } from "react";
import logo from "../../assets/images/main_logo.svg";
import Vector from "../../assets/images/Vector.png";
import stripes from "../../assets/images/button-stripe.png";
import SettingsMenu from "./SettingsMenu/SettingsMenu";
import { getCurrentUser } from "../../services/storage.js";
import "./Header.css";

function Header({ onMenuClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const menuRef = useRef(null);

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      if (user.name) {
        setUserName(user.name);
      } else if (user.displayName) {
        setUserName(user.displayName);
      } else if (user.email) {
        setUserName(user.email.split("@")[0]);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="left">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <img
          className="stripes"
          src={stripes}
          alt="menu"
          onClick={onMenuClick}
        />
      </div>

      <h1 className="h1">Have a good day, {userName}</h1>

      <div ref={menuRef} className="settings-wrapper">
        <img
          src={Vector}
          alt="Settings"
          className="settings-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        {menuOpen && <SettingsMenu />}
      </div>
    </header>
  );
}

export default Header;