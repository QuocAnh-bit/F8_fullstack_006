import React from "react";
import LoginButton from "./components/LoginButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "./core/useSelector";

export default function App() {
  const { isAuthenticated } = useAuth0();
  const context = useSelector();
  console.log(context);
  return (
    <div className="container">
      {isAuthenticated ? <Profile /> : <LoginButton />}
    </div>
  );
}
