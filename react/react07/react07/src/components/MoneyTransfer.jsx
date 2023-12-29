import React, { useMemo, useState } from "react";
import MoneyHistories from "./MoneyHistories";

export default function MoneyTransfer() {
  const [histories, setHistories] = useState([]);
  const [cost, setCost] = useState(0);

  const handleChange = (e) => {
    setCost(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setHistories([...histories, +cost]);
    setCost("");
  };
  const total = useMemo(() => {
    return histories.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  }, [histories]);
  const handleDelete = () => {
    setHistories([]);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Số tiền..."
          value={cost}
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
      <MoneyHistories
        histories={histories}
        total={total}
        deleteBtn={handleDelete}
      />
    </div>
  );
}

/*
useMemo(callback,deps) --> cache giá trị tính toán sau mỗi lần re-render

-> Trả về giá trị 
-> callback phải có return
- Áp dụng cho bieur thức logic 
*/
