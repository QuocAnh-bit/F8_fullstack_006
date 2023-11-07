import React from "react";
import LoginButton from "./components/LoginButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="container">
      {isAuthenticated ? <Profile /> : <LoginButton />}
    </div>
  );
}
