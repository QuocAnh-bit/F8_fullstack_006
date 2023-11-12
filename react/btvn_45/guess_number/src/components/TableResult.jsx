import React from "react";
import { useSelector } from "../core/useSelector";
import { setLocalStorage, getLocalStorage } from "../utils/localStorage";
import "../assets/Table.css";
import MAX_TURN from "../config/config";

export default function TableResult() {
  const { state, dispatch } = useSelector();
  const datas = getLocalStorage("arr");
  return (
    <div className="wrap-table">
      {datas.map((data, index) => {
        return (
          <table id="customers" key={index}>
            <thead>
              <tr>
                <th>Số lần nhập</th>
                <th>Số đã nhập</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.number}</td>
                  <td>{item.dona}</td>
                </tr>
              ))}
              <tr>
                <td>Lần chơi thứ: </td>
                <td>
                  {datas.length - index} / {datas.length}
                </td>
              </tr>
              <tr>
                <td>Số lần nhập </td>
                <td>
                  {data.length} / {MAX_TURN} lần
                </td>
              </tr>
              <tr>
                <td>Tỉ lệ </td>
                <td>
                  {data[data.length - 1].rate !== undefined
                    ? data[data.length - 1].rate + `%`
                    : 0 + `%`}
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
}
