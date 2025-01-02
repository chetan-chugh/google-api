import React, { useState } from 'react';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { LoginSocialFacebook } from 'reactjs-social-login';

const FacebookLoginComponent = () => {
  const [userData, setUserData] = useState(null);

  const responseFacebook = (response) => {
    console.log(response); 
    if (response && response.name && response.email) {
      setUserData(response);
    }
  };

  return (
    <div>
      <h2>Facebook Login</h2>

      <LoginSocialFacebook 
        appId="584733514193950"
        onResolve={responseFacebook} 
        onReject={(err) => console.log('Facebook login error', err)}
        fields="name,email,picture,gender,birthday" 
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>

      {userData && (
        <div>
          <h3>Welcome, {userData.name}!</h3>
          <p>Email: {userData.email}</p>
          <p>Gender: {userData.gender}</p>
          <p>Date of Birth: {userData.birthday}</p>
          <img src={userData.picture.data.url} alt="Profile" />
        </div>
      )}
    </div>
  );
};

export default FacebookLoginComponent;
