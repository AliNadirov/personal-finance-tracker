import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "../../../assets/icons/GoogleIcon";
import FacebookIcon from "../../../assets/icons/FacebookIcon";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { addUser, setCurrentUser, findUserByEmail } from "../../../services/storage.js";
import "./IconButtons.css";

export default function IconButtons({ className = "" }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const facebook_app_id = import.meta.env.VITE_FACEBOOK_APP_ID;

  const googleLogin = useGoogleLogin({
    clientId: google_client_id,
    onSuccess: async () => {
      setErrorMessage("");
      const user = { email: "googleuser@example.com", name: "Google User" };
      if (!(await findUserByEmail(user.email))) await addUser(user);
      setCurrentUser(user);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Google login error:", error);
      setErrorMessage("Google login failed. Please try again.");
    },
  });

  const handleGoogleLogin = () => googleLogin();

  const handleFacebookResponse = async (response) => {
    if (!response || !response.email) {
      console.error("Facebook login failed:", response);
      setErrorMessage("Facebook login failed. Please allow email access.");
      return;
    }

    setErrorMessage("");
    const user = { email: response.email, name: response.name };
    if (!(await findUserByEmail(user.email))) await addUser(user);
    setCurrentUser(user);
    navigate("/dashboard");
  };

  return (
    <div className={`social-login-buttons ${className}`}>
      <div className="icons-row">
        <div className="social-btn google" onClick={handleGoogleLogin}>
          <GoogleIcon />
        </div>

        <FacebookLogin
          appId={facebook_app_id}
          autoLoad={false}
          fields="name,email"
          callback={handleFacebookResponse}
          render={(renderProps) => (
            <div className="social-btn facebook" onClick={renderProps.onClick}>
              <FacebookIcon />
            </div>
          )}
        />
      </div>

      <div className="social-button-error-message">{errorMessage}</div>
    </div>
  );
}