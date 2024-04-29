import React, { useEffect, useState } from "react";
import {LoadingSpinner} from "./LodingSpinner.jsx";
export const History = () => {
  const [urls, setUrls] = useState([]);
  const [click,setClick] = useState(false);

  useEffect(() => {
    const fetchUrls = async () => {
      const response = await fetch(
        "http://localhost:3001/comments/fetchallurls",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authtoken: localStorage.getItem("token"),
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUrls(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUrls();
  }, []);

  return (
    <>
      <div style={{width:"100vw",height:"100vh"}}>
        <div
          style={{ display: "flex", flexDirection: "column",margin:"1rem"}}
        >
          {click ? <LoadingSpinner/> : urls.map((url,i) => {
            return (
              <div key={i} style={{ border: "1px solid black",borderRadius:"5px",height:"40px",display:"flex",alignItems:"center",margin:"5px",padding:"5px"}}>
                <h5>{url}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
