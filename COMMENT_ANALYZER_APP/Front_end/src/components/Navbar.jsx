import React, { useEffect, useRef, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
export const Navbar = () => {

const [mode,setMode] =  useState("light");
const [login,setlogin] = useState("LoggedIn");
const { user, loginWithRedirect,isAuthenticated} = useAuth0();
const  history = useNavigate();
const location = useLocation()

const userFromLocalStorage = localStorage.getItem('username');
const user1 = "Rudrakumar"

useEffect(()=>
{
  if(localStorage.getItem("token"))
  {
    setlogin("LoggedOut");
  }
},[user]);

 const setDarkMode = () =>{
    document.querySelector("body")?.setAttribute("data-theme-body","dark");
 }
 const setLightMode = () =>{
    document.querySelector("body")?.setAttribute("data-theme-body","light");
 }

 const toggleDarkMode = () =>{
  if(mode === "dark")
  {
    console.log("setting mode");
    setMode("white");
    setLightMode();
  }
  else
  {
    setMode("dark");
    setDarkMode();
  }

 }
 const handleSelect = (e)=>
 {
    if(e.target.value === "History")
    {
      history("/History");
    }
    else if(e.target.value === "Payment")
    {
      history("/Payment");
    }
    else
    {
      history("/");
    }
 }
 const handleOnLogin = ()=>
{
  localStorage.removeItem("token");
  setlogin("LoggedIn");
} 

 return (
    <>
      <header className="p-3 text-bg-white nav">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <div className="name d-flex" >
            <img src="../../logo.png" alt="image" id="logo"/>
            <p
              className="d-flex align-items-center mb-2 mb-lg-0 fw-bold text-decoration-none web-name"
            >
            CommentSense
            </p>
            </div>
            
            <div className="text-end button d-flex">
               <Link to="/Login" className="btn btn-outline-dark me-2 Login" onClick={handleOnLogin}>{login === "LoggedOut" ? "Logout" : "Login"}</Link>
               
                <Link to = "/Signup" className="btn signup">Sign up</Link>

              <p className="mode" onClick={toggleDarkMode}>{mode === "dark" ?<MdLightMode/> : <MdDarkMode/>}</p>
                
               
              <select style={{marginLeft:"1rem",border:"1px solid black",borderRadius:"5px"}} onChange={handleSelect}>
                <option value={`${userFromLocalStorage} ? ${userFromLocalStorage} : ${user1} `}>{`${userFromLocalStorage}`}</option>
                <option value={"History"}>History</option>
                <option value={"Payment"}>Payment</option>
              </select>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
