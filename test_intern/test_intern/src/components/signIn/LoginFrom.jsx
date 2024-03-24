// import React from "react";
import "../signIn/loginFrom.scss";
import Button from "../Button";
import { useState } from "react";
import authApi from "../../api/authApi";

export default function LoginFrom() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target[0].name;
    const value = e.target[0].value;
    if (value.trim() === "") {
      setError("Tên người dùng không được để trống");
    } else {
      const postLogin = await authApi.postLogin({ [name]: value });
      if (!postLogin) {
        setLoading(false);
        setError("Tên người dùng không tồn tại");
      } else {
        setLoading(false);
        window.location.href = "http://localhost:5173/profile";
      }
    }
  };
  return (
    <div className="wrap-login">
      <div className="form">
        <div>
          <h1>Sign In</h1>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="username">User name</label>
          <input
            type="text"
            placeholder="Enter your name..."
            name="username"
            id="username"
          />
          {error && <span>{error}</span>}
          <Button
            btnText={loading ? "Loading..." : "Sign in"}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}
