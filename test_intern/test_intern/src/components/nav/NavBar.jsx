// import React from "react";
import "../nav/navbar.scss";
import Logo from "../Logo";
import Button from "../Button";

// eslint-disable-next-line react/prop-types
export default function NavBar({ hiddenBtn }) {
  return (
    <header className="wrapper">
      <div className="header-wrap">
        <div className="nav-bar">
          <Logo />
          {hiddenBtn ? "" : <Button btnText={"Sign In"} link={"/sign-in"} />}
        </div>
      </div>
    </header>
  );
}
