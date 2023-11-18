import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTokenApi } from "../../redux/slice/loginSlice";
import Trello from "../Trello/Trello";
import "../Login/Login.css";

export default function Login() {
  const dispatch = useDispatch();
  const [apiKey, setApiKey] = useState(
    localStorage.getItem("apiKey") ? localStorage.getItem("apiKey") : null
  );

  const { loading, messErr } = useSelector((state) => state.login);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailUser = e.target.email.value;
    dispatch(getTokenApi(emailUser, dispatch)).then(() =>
      setApiKey(localStorage.getItem("apiKey"))
    );
  };

  return (
    <>
      {apiKey !== null ? (
        <Trello />
      ) : (
        <div className="form-wrap">
          <form onSubmit={handleSubmit}>
            {loading ? <h3>Loading...</h3> : <h3>Enter the Email!</h3>}
            <input type="email" name="email" placeholder="Nhập email..." />
            {messErr && <h3>{messErr} vui lòng thử lại</h3>}
          </form>
        </div>
      )}
    </>
  );
}
