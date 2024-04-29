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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Auth0Provider
        domain="dev-zji640lby6lh7gyi.us.auth0.com"
        clientId="RT558RVQll6AQMy2PEhT39FU1b9qPi7S"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Auth0Provider>
    </ChakraProvider>
  </React.StrictMode>
);
