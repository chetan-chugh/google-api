import React, { useState, useEffect } from "react";
import GoogleLogin from "./components/GoogleLogin"
import FacebookLoginComponent from './components/FacebookLoginComponent';

const App = () => {
  return (
    <div className="App">
      <GoogleLogin/>
      <FacebookLoginComponent/>
    </div>
  );
};

export default App;