import React, { useState } from "react";
import { sliceTrello } from "../../../../../redux/slice/trelloSlice";
import { useDispatch } from "react-redux";
const { deleteTask } = sliceTrello.actions;
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./ItemTask.scss";

export default function ItemTask({ task, updateTask }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id, data: { ...task } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  const handleDeleteTask = (idTask) => {
    dispatch(deleteTask(idTask));
  };

  const toggleEditMode = () => {
    setEdit((prev) => !prev);
    setEdit(false);
  };

  return (
    <>
      {edit ? (
        <div
          className="item-task"
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
        >
          <textarea
            autoFocus
            defaultValue={task.content}
            // onChange={(e) => updateTask(task.id, e.target.value)}
          ></textarea>
          <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
        </div>
      ) : (
        <div
          className="item-task"
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          onClick={toggleEditMode}
          onMouseEnter={() => {
            setEdit(true);
          }}
          onMouseLeave={() => {
            setEdit(false);
          }}
        >
          <p>{task.content}</p>
          <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
        </div>
      )}
    </>
  );
}
