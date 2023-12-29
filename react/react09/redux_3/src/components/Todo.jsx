import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/slice/todoSlice";

export default function Todo() {
  const todoList = useSelector((state) => state.todo.todoList);
  const status = useSelector((state) => state.todo.status);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  console.log(todoList);
  return (
    <div>
      <ul>
        {status !== "idle" && status === "pending"
          ? "load.."
          : todoList.map(({ id, title }) => <li key={id}>{title}</li>)}
      </ul>
    </div>
  );
}
