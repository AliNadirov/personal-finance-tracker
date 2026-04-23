import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, clearCurrentUser } from "../../../../services/storage";
import "./SettingsMenu.css";

export default function SettingsMenu() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleProfileSettings = () => {
    navigate("/settings/profile");
  };

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const displayName =
    user?.name || user?.displayName || user?.email?.split("@")[0] || "Guest User";

  const displayEmail = user?.email || "No email";

  return (
    <div className="settings-menu">
      <h2>{displayName}</h2>
      <p>{displayEmail}</p>

      <div className="menu-buttons">
        <button className="profile-btn" onClick={handleProfileSettings}>
          Profile Settings
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <div className="menu-footer">
        <button type="button" onClick={() => navigate("/privacy-policy")}>
          Privacy Policy
        </button>
        <button type="button" onClick={() => navigate("/terms-of-use")}>
          Terms of Use
        </button>
      </div>
    </div>
  );
}