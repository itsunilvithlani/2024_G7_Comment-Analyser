import React, { useEffect } from "react";
import { Searchbar } from "./Searchbar";
import { Footer } from "./Footer";
import "../App.css";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

export const Bodyarea = () => {
  const history = useNavigate();
  // const { user, loginWithRedirect,isAuthenticated} = useAuth0();

  useEffect(() => {
    console.log("in bodyarea")
    if (!localStorage.getItem("token") && !localStorage.getItem("username")) {
      history("/Login");
    }
  },[]);
  return (
    <>
      <div className="Bodyarea">
        <div className="welcome-text">
          <h1>Welcome to CommentSense</h1>
        </div>
        <div className="searchbar">
          <Searchbar></Searchbar>
        </div>
      </div>
        <Footer></Footer>
    </>
  );
};
