// import React from "react";
import NavBar from "../components/nav/NavBar";
import LoginFrom from "../components/signIn/LoginFrom";
export default function SignUp() {
  return (
    <div>
      <NavBar hiddenBtn={true} />
      <LoginFrom />
    </div>
  );
}
