import logofooter from "../../assets/images/logo-footer.svg"
import facebook from "../../assets/icons/facebook.png"
import linkedin from "../../assets/icons/linkedin.png"
import telegram from "../../assets/icons/telegram.png"
import "./Footer.css"

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Support</a>
                <a href="#">Terms of use</a>
                <a href="#">Settings</a>
                <a href="#">About</a>
            </div>
            <img src={logofooter} alt="logo" />
            <div className="footer-contact">
                <a href="">Contact us</a>
                <div className="social-icons">
                    <img src={linkedin} alt="linkedin" />
                    <img src={facebook} alt="facebook" />
                    <img src={telegram} alt="telegram" />
                </div>
            </div>

        </footer>
    )
}

export default Footer;