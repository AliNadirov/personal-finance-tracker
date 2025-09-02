import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo-footer.svg";
import stripes from "../../../assets/images/button-stripe.png";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose }) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <>
            {isOpen && <div className="overlay"></div>}

            <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
                <div className="sidebar-top">
                    <img src={logo} alt="Logo" className="sidebar-logo" />
                    <img
                        src={stripes}
                        alt="Close menu"
                        className="sidebar-burger"
                        onClick={onClose}
                    />
                </div>

                <ul className="sidebar-menu">
                    <li>
                        <Link to="/" className="sidebar-link" onClick={onClose}>
                            Home page
                        </Link>
                    </li>
                    <li>
                        <Link to="/transactions" className="sidebar-link" onClick={onClose}>
                            Transactions
                        </Link>
                    </li>
                    <li>
                        <Link to="/categories" className="sidebar-link" onClick={onClose}>
                            Categories
                        </Link>
                    </li>
                    <li>
                        <span className="submenu-title" onClick={toggleSettings}>
                            Settings
                        </span>
                        {isSettingsOpen && (
                            <ul className="submenu">
                                <li>
                                    <Link to="/profile" className="sidebar-link" onClick={onClose}>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/additional-income" className="sidebar-link" onClick={onClose}>
                                        Additional Income
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link to="/about" className="sidebar-link" onClick={onClose}>
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;