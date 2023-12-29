import { memo } from "react";
import React from "react";

const MoneyHistories = ({ histories, total, deleteBtn }) => {
  return (
    <div>
      <h2>Lịch sử chuyển tiền</h2>
      {histories.map((item, index) => (
        <h3 key={index}>{item.toLocaleString()}đ</h3>
      ))}
      <h2>Tổng tiền: {total.toLocaleString()}đ </h2>
      <button onClick={deleteBtn}>Xóa lịch sử</button>
    </div>
  );
};
export default memo(MoneyHistories);
