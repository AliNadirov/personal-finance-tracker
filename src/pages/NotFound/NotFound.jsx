import { Link } from "react-router-dom";
import { getCurrentUser } from "../../services/storage";
import "./NotFound.css";

const NotFound = () => {
  const currentUser = getCurrentUser();
  const redirectPath = currentUser ? "/dashboard" : "/home";

  return (
    <div className="notfound-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to={redirectPath} className="back-home-btn">
        {currentUser ? "Go to Dashboard" : "Go to Home Page"}
      </Link>
    </div>
  );
};

export default NotFound;