import React, { useEffect, useId } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "../core/useSelector";
import { v4 as uuid } from "uuid";

export default function Chat() {
  const id = uuid();
  const { state, dispatch } = useSelector();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.message.value.trim().length) {
      console.log("no");
    }
    const msg = e.target.message.value;
    dispatch({
      type: "chat/add",
      payload: {
        msg,
        id,
      },
    });

    e.target.message.value = "";
  };
  useEffect(() => {
    setTimeout(() => {
      dispatch(
        {
          type: "chat/fetch",
          payload: getLocalStorage(),
        },
        500
      );
    });
  });
  useEffect(() => {
    if (state.message.length) {
      setLocalStorage("message", state.message);
    }
  }, [state.message]);

  return (
    <div className="container">
      <div className="py-3">
        <div className="message">
          {state.message.map(({ msg, id }, index) => (
            <div className="mb-2" key={index}>
              {msg}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="message"
              className="form-control"
              placeholder="Tin nhắn"
              autoFocus
            />
            <button className="btn btn-primary">Gửi</button>
          </div>
        </form>
      </div>
    </div>
  );
}
