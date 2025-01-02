import React, { useState, useEffect } from "react";
import axios from "axios";

const GoogleLogin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "664050492027-5dr06sj6tf9r8aem1m0dflam353vsutb.apps.googleusercontent.com",
        callback: handleLogin,
        scope: "profile email",
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignInBtn"),
        {
          theme: "outline",
          size: "large",
        }
      );
    };
  }, []);

  const handleLogin = (response) => {
    const decodedUser = jwt_decode(response.credential);
    console.log(decodedUser);
    const { given_name, family_name, email, gender } = decodedUser;

    const userData = {
      firstName: given_name,
      lastName: family_name,
      email: email,
      gender: gender || "Not Provided",
    };

    setUser(userData);

    axios
      .post("http://localhost:5000/api/users", userData)
      .then((response) => {
        console.log("User data saved to the database:", response.data);
      })
      .catch((error) => {
        console.error("There was an error saving the data:", error);
      });
  };

  return (
    <>
    <div className="App">
      <h1>Google Login Example</h1>
      {!user ? (
        <div id="googleSignInBtn"></div>
      ) : (
        <div>
          <h2>
            Welcome, {user.firstName} {user.lastName}!
          </h2>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
        </div>
      )}
    </div></>
  );
};

const jwt_decode = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export default GoogleLogin;