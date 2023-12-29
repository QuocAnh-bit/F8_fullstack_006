import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "../redux/middlewares/fetchTodo";
export default function Todo() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todoList);
  useEffect(() => {
    // dispatch middleware --> middleware call api ---> dispatch tới action
    // reducer của store
    dispatch(fetchTodo());
    console.log(todos);
  }, []);
  return (
    <div>
      <h1>Todo</h1>
    </div>
  );
}
