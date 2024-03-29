import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import Provider from "./core/Provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-5vk4j6kjlworbkf6.us.auth0.com"
      clientId="AUW5SRjrm7cS2JX16y0MjnA3VtzRgWxc"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
