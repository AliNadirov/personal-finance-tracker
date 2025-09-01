import logo from "../../assets/images/logo.png";
import Vector from "../../assets/images/Vector.png"
import stripes from "../../assets/images/button-stripe.png"
import "./Header.css"


function Header({onMenuClick}){
    return (
        <header className="header">
            <div className="left">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
                <img className="stripes" src={stripes} alt="button-stripes" 
                onClick={onMenuClick}/>
            </div>
            <h1 className="h1">Have a good day, David</h1>
            <img src={Vector} alt="Settings" />
        </header>
    )
}

export default Header;