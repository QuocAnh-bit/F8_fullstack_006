import React from "react";
import ItemTask from "./ItemTask/ItemTask";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import "./ListTask.scss";
import { sliceTrello } from "../../../../redux/slice/trelloSlice";
import { useDispatch } from "react-redux";
const { updateListTask } = sliceTrello.actions;

export default function ListTask({ listTask }) {
  const dispatch = useDispatch();
  const updateTask = (id, content) => {
    const newTask = listTask.map((task) => {
      if (task._id !== id) return task;
      return { ...task, content };
    });
    dispatch(updateListTask(newTask));
  };
  return (
    <div className="content-column">
      <SortableContext
        items={listTask.map((item) => item._id)}
        strategy={verticalListSortingStrategy}
      >
        {listTask.map((task, index) => (
          <ItemTask key={index} task={task} updateTask={updateTask} />
        ))}
      </SortableContext>
    </div>
  );
}
