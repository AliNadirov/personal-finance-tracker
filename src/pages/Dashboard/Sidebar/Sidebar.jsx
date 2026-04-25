import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/main_logo.svg";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose }) {
  const handleNavClick = () => {
    onClose();
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`sidebar ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="sidebar-header">
          <button
            type="button"
            className="sidebar-brand"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <img src={logo} alt="BudgetBee Logo" className="sidebar-logo" />
            <div className="sidebar-brand-text">
              <h2>BudgetBee</h2>
              <p>Quick Navigation</p>
            </div>
          </button>
        </div>

        <div className="sidebar-body">
          <p className="sidebar-section-label">Workspace</p>

          <nav className="sidebar-nav">
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={handleNavClick}
            >
              <span>Categories</span>
            </NavLink>

            <NavLink
              to="/settings/additional-income"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={handleNavClick}
            >
              <span>Additional Income</span>
            </NavLink>

            <NavLink
              to="/budget-planning"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={handleNavClick}
            >
              <span>Budget Planning</span>
            </NavLink>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;