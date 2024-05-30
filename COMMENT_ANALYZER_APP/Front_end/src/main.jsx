import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Bodyarea } from "../src/components/Bodyarea.jsx";
import { Login } from "./components/Login.jsx";
import { History } from "../src/components/History.jsx";
import Signup from "./components/Signup.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import Payment from "./components/Payment.jsx";
import AnalysisWithAi from "./components/AnalysisWithAi.jsx";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Bodyarea /> },
      { path: "/Login", element: <Login /> },
      { path: "/Signup", element: <Signup /> },
      { path: "/History", element: <History /> },
      { path: "/payment", element: <Payment /> },
      { path: "/paymentsuccess", element: <Bodyarea /> },
      {path:"/AnalysisWithAi",element: <AnalysisWithAi/> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
    <GoogleOAuthProvider clientId={import.meta.env.GoogleClient}>
      <Auth0Provider
        domain={import.meta.env.Domain}
        clientId= {import.meta.env.ClientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <Provider store={store}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
        </Provider>
      </Auth0Provider>
      </GoogleOAuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
