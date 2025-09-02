import { useState, useRef, useEffect } from "react";
import logo from "../../assets/images/Logo5.png";
import Vector from "../../assets/images/Vector.png";
import stripes from "../../assets/images/button-stripe.png";
import SettingsMenu from "./SettingsMenu/SettingsMenu"; 
import "./Header.css";

function Header({ onMenuClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          alt="button-stripes"
          onClick={onMenuClick}
        />
      </div>

      <h1 className="h1">Have a good day, David</h1>

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