let facebookSdkLoadingPromise = null;

export function loadFacebookSdk() {
  if (window.FB) {
    return Promise.resolve(window.FB);
  }

  if (facebookSdkLoadingPromise) {
    return facebookSdkLoadingPromise;
  }

  facebookSdkLoadingPromise = new Promise((resolve, reject) => {
    const appId = import.meta.env.VITE_FACEBOOK_APP_ID;

    if (!appId) {
      reject(new Error("Facebook App ID is missing."));
      return;
    }

    window.fbAsyncInit = function () {
      if (!window.FB) {
        reject(new Error("Facebook SDK failed to initialize."));
        return;
      }

      window.FB.init({
        appId,
        cookie: true,
        xfbml: false,
        version: "v23.0",
      });

      resolve(window.FB);
    };

    const existingScript = document.getElementById("facebook-jssdk");

    if (existingScript) {
      if (window.FB) {
        resolve(window.FB);
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";

    script.onerror = () => {
      reject(new Error("Failed to load Facebook SDK."));
    };

    document.body.appendChild(script);
  });

  return facebookSdkLoadingPromise;
}

export function facebookLogin() {
  return new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error("Facebook SDK is not loaded."));
      return;
    }

    window.FB.login(
      (response) => {
        if (!response || !response.authResponse) {
          reject(new Error("Facebook login was cancelled or failed."));
          return;
        }

        window.FB.api(
          "/me",
          { fields: "id,name,email,picture" },
          (userInfo) => {
            if (!userInfo || userInfo.error) {
              reject(new Error("Could not fetch Facebook user profile."));
              return;
            }

            resolve(userInfo);
          }
        );
      },
      { scope: "public_profile,email" }
    );
  });
}