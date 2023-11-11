import MAX_TURN, { randomNumber } from "../config/config";
import { setLocalStorage, getLocalStorage } from "../utils/localStorage";

export const initialState = {
  backgroundColor:
    localStorage.getItem("background_color") === null
      ? "#ffffff"
      : localStorage.getItem("background_color"),
  countTurn: MAX_TURN,
  message: "Chào mừng bạn đến với trò chơi đoán số !",
  randomNumber: randomNumber(),
  result: getLocalStorage("arr") === null ? null : getLocalStorage("arr"),
  rate: false,
};
export const rootReducer = (state, action) => {
  switch (action.type) {
    case "background_color/light":
      return { ...state, backgroundColor: "#ffffff" };
    case "background_color/dark":
      return { ...state, backgroundColor: "#1a202c" };
    case "counter/turn":
      return { ...state, countTurn: state.countTurn - 1 };

    case "UP":
      return { ...state, message: "Hmmm... Tăng lên một chút" };
    case "DOWN":
      return { ...state, message: "Hmmm... Giảm xuống một chút" };
    case "SUCCESS":
      return { ...state, message: "Chúc mừng bạn đã trả lời đúng" };
    case "reset/number":
      return { ...state, randomNumber: randomNumber() };
    case "RESET":
      return { ...initialState };
    case "GET/DATA":
      return { ...state, result: getLocalStorage("arr") };
    default:
      return state;
  }
};
