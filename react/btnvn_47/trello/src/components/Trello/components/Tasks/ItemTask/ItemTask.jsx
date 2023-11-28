import React, { useState } from "react";
import { sliceTrello } from "../../../../../redux/slice/trelloSlice";
import { Provider, useDispatch, useSelector } from "react-redux";
const { deleteTask } = sliceTrello.actions;

import "./ItemTask.scss";
import { Draggable } from "react-beautiful-dnd";

export default function ItemTask({ task, index }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.trello);
  const [edit, setEdit] = useState(false);

  const handleDeleteTask = (task) => {
    dispatch(deleteTask(task));
  };

  // const toggleEditMode = () => {
  //   setEdit((prev) => !prev);
  //   setEdit(false);
  // };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className="item-task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{task.content}</p>
          <button onClick={() => handleDeleteTask(task)}>Delete</button>
        </div>
      )}
    </Draggable>
  );
}
