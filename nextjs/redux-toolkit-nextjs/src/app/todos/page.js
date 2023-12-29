"use client";
import { fetchTodos } from "@/redux/middlewares/todomiddleware";
import { todosSlice } from "@/redux/slide/todosSlide";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const todos = useSelector((state) => state.todos.listTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div>
      <ul>
        {todos.map(({ title, id }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
}
