import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, clearCurrentUser } from "../../../services/storage.js";
import "./settingsMenu.css";

export default function SettingsMenu() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleAddAccount = () => {
    navigate("/");
  };

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  return (
    <div className="settings-menu">
      <h2>{user ? user.name : "Guest User"}</h2>
      <p>{user ? user.email : "No email"}</p>

      <div className="menu-buttons">
        <button className="add-btn" onClick={handleAddAccount}>
          Add Account
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <div className="menu-footer">
        <a onClick={() => navigate("/privacy-policy")}>Privacy Policy</a>
        <a onClick={() => navigate("/terms-of-service")}>Terms of Service</a>
      </div>
    </div>
  );
}
