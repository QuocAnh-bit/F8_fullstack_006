import React, { useEffect, useRef } from "react";
import "../assets/FormGuessNumber.css";
import { setLocalStorage, getLocalStorage } from "../utils/localStorage";
import { useSelector } from "../core/useSelector";
import MAX_TURN from "../config/config";

export default function FormGuessNumber() {
  const inputRef = useRef();
  const arrRef = useRef([]);
  const total = useRef([]);
  const a = useRef(1);
  const { state, dispatch } = useSelector();

  const handleSubmit = (e) => {
    e.preventDefault();

    const numberCurrent = +inputRef.current.value;
    const numberRandom = state.randomNumber;
    if (numberCurrent) {
      if (numberRandom !== numberCurrent) {
        arrRef.current.push({
          number: a.current++,
          dona: numberCurrent,
        });
      } else {
        arrRef.current.push({
          number: a.current++,
          dona: numberCurrent,
          rate: (((MAX_TURN - (a.current - 1)) / MAX_TURN) * 100).toFixed(2),
        });
      }

      console.log(numberRandom, numberCurrent);
      if (numberRandom < numberCurrent) {
        console.log("lớn hơn ");
        dispatch({
          type: "DOWN",
        });
      }
      if (numberRandom > numberCurrent) {
        console.log("nhỏ hơn");
        dispatch({
          type: "UP",
        });
      }
      if (numberRandom === numberCurrent) {
        total.current.unshift(arrRef.current);
        setLocalStorage("arr", total.current);

        dispatch({
          type: "SUCCESS",
        });
        dispatch({
          type: "reset/number",
        });
        state.countTurn = 1;
      }
      if (a.current - 1 === MAX_TURN) {
        total.current.unshift(arrRef.current);
        setLocalStorage("arr", total.current);
        dispatch({
          type: "SUCCESS",
        });
        dispatch({
          type: "reset/number",
        });
      }
      dispatch({ type: "counter/turn" });
      inputRef.current.value = "";
    } else {
      console.log("Không nhận");
    }
  };
  const handleChange = (e) => {
    const patch = /^[0-9]/;
    const patch2 = /^[0-9]{2}/;

    if (!patch.test(e.target.value)) {
      inputRef.current.value = "";
    }
    if (e.target.value.length > 1) {
      inputRef.current.value = e.target.value.match(patch2);
    }
  };
  const handlePlayAgain = () => {
    dispatch({
      type: "RESET",
    });
    dispatch({
      type: "reset/number",
    });
    dispatch({
      type: "GET/DATA",
    });
    a.current = 1;
    arrRef.current = [];
  };
  return (
    <div className="form-submit">
      {state.countTurn > 0 ? (
        <>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="number">Hãy thử một số: </label>
            <input
              ref={inputRef}
              type="text"
              name="number"
              id="number"
              placeholder="Thử nhập 1 số ..."
              onChange={handleChange}
            />
            <button>Kiểm Tra</button>
          </form>
        </>
      ) : (
        <button className="btn-play-again" onClick={handlePlayAgain}>
          Chơi lại
        </button>
      )}
    </div>
  );
}
