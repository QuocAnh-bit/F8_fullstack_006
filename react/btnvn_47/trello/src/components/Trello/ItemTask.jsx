import React from "react";
import { sliceTrello } from "../../redux/slice/trelloSlice";
import { useDispatch } from "react-redux";
const { deleteTask } = sliceTrello.actions;

export default function ItemTask({ content, id }) {
  const dispatch = useDispatch();

  const handleDeleteTask = (idTask) => {
    dispatch(deleteTask(idTask));
  };

  return (
    <div className="item-task">
      <p>{content}</p>
      <button onClick={() => handleDeleteTask(id)}>Delete</button>
    </div>
  );
}
