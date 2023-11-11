import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector } from "./core/useSelector";
import Content from "./components/Content";
import FormGuessNumber from "./components/FormGuessNumber";
import "./assets/App.css";
import TableResult from "./components/TableResult";

export default function App() {
  const { state, dispatch } = useSelector();
  console.log(state.result);
  const handleChangeColor = () => {
    if (state.backgroundColor === "#ffffff") {
      dispatch({
        type: "background_color/dark",
      });
      localStorage.setItem("background_color", "#1a202c");
    } else {
      dispatch({
        type: "background_color/light",
      });
      localStorage.setItem("background_color", "#ffffff");
    }
  };

  useLayoutEffect(() => {
    document.body.style.backgroundColor =
      localStorage.getItem("background_color");
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = state.backgroundColor;
  }, [state.backgroundColor]);
  return (
    <>
      <div className="container">
        <div className="btn-wrap">
          <button className="btn-change" onClick={handleChangeColor}>
            {state.backgroundColor === "#ffffff" ? (
              <i className="fa-solid fa-moon"></i>
            ) : (
              <i className="fa-solid fa-sun light"></i>
            )}
          </button>
        </div>
        <Content />
        <FormGuessNumber />
        {state.result !== null ? <TableResult /> : ""}
      </div>
    </>
  );
}
