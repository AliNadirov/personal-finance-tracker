import { useState, useRef, useEffect } from "react";
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="left">
        <button
          type="button"
          className="menu-button"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <img className="stripes" src={stripes} alt="" />
        </button>
      </div>

      <div className="header-center">
        <h1 className="header-title">Welcome back, {userName}</h1>
        <p className="header-subtitle">
          Track your budget and spending in one place
        </p>
      </div>

      <div ref={menuRef} className="settings-wrapper">
        <button
          type="button"
          className="settings-button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Open settings menu"
        >
          <img
            src={Vector}
            alt=""
            className="settings-icon"
          />
        </button>

        {menuOpen && <SettingsMenu />}
      </div>
    </header>
  );
}

export default Header;