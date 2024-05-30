import React from "react";
import {GoogleLogin} from 'react-google-login';
import { useNavigate } from "react-router-dom";

export const Logingoogle = ()=>{

  const history = useNavigate()

  const onFailure = (res)=>
    {
      console.log('Login failed',res);
    }
  
  const handleGoogleLogin = async(res) => {  
    localStorage.setItem("username",res.profileObj.givenName);
    localStorage.setItem("email",res.profileObj.email);

    await fetch("http://localhost:3001/auth/Login", {
      method: "POST",
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        password:"1234567"
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error === "Please try to Login with correct credentials") {
          console.log("Please try to Login with correct credentials");
        } else if (data === "Internal Server Error") {
          console.log("in internal");
        } else {
          //save the auth token and redirect   
          localStorage.setItem("token", data.authtoken);
          history("/");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={import.meta.env.GoogleClient}
        buttonText="Continue with Google"
        onSuccess={handleGoogleLogin}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

