import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "../../assets/icons/GoogleIcon.jsx";
import FacebookIcon from "../../assets/icons/FacebookIcon.jsx";
import { addUser, setCurrentUser, findUserByEmail, getUsers } from "../../services/storage.js";
import { loadFacebookSdk, facebookLogin } from "../../services/facebookSdk.js";
import "./AuthButtons.css";

export default function IconButtons({ className = "" }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadFacebookSdk().catch((error) => {
      console.error("Facebook SDK load error:", error);
    });
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setErrorMessage("");

        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        const userInfo = await userInfoResponse.json();
        const existingUser = await findUserByEmail(userInfo.email);

        let user = existingUser;

        if (!user) {
          const users = await getUsers();
          user = {
            id: users.length + 1,
            name: userInfo.name,
            email: userInfo.email,
            password: "",
          };
          await addUser(user);
        }

        setCurrentUser(user);
        navigate("/dashboard");
      } catch (error) {
        console.error("Failed to fetch Google user info:", error);
        setErrorMessage("Could not get your Google profile info.");
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
      setErrorMessage("Google login failed. Please try again.");
    },
  });

  const handleGoogleLogin = () => {
    googleLogin();
  };

  const handleFacebookLogin = async () => {
    try {
      setErrorMessage("");

      await loadFacebookSdk();
      const profile = await facebookLogin();

      if (!profile.email) {
        setErrorMessage("Facebook login failed. Please allow email access.");
        return;
      }

      const existingUser = await findUserByEmail(profile.email);

      let user = existingUser;

      if (!user) {
        const users = await getUsers();
        user = {
          id: users.length + 1,
          name: profile.name,
          email: profile.email,
          password: "",
        };
        await addUser(user);
      }

      setCurrentUser(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Facebook login error:", error);
      setErrorMessage("Facebook login failed. Please try again.");
    }
  };

  return (
    <div className={`social-login-buttons ${className}`}>
      <div className="icons-row">
        <div
          className="social-btn google"
          onClick={handleGoogleLogin}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleGoogleLogin();
            }
          }}
        >
          <GoogleIcon size={30} />
        </div>

        <div
          className="social-btn facebook"
          onClick={handleFacebookLogin}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              handleFacebookLogin();
            }
          }}
        >
          <FacebookIcon size={30} />
        </div>
      </div>

      <div className="social-button-error-message">{errorMessage}</div>
    </div>
  );
}