import logo from "../../../assets/images/logo-footer.svg";
import stripes from "../../../assets/images/button-stripe.png";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose }) {
    return (
        <>
            {isOpen && <div className="overlay" onClick={onClose}></div>}

            <div className={`sidebar ${isOpen ? "open" : ""}`}>
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
                    <li>Home page</li>
                    <li>Transactions</li>
                    <li>Categories</li>
                    <li>
                        <span className="submenu-title">Settings</span>
                        <ul className="submenu">
                            <li>Profile</li>
                            <li>Additional income</li>
                        </ul>
                    </li>
                    <li>About</li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;
