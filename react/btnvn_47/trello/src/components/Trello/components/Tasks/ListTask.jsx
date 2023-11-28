import React from "react";
import ItemTask from "./ItemTask/ItemTask";
import "./ListTask.scss";
import { sliceTrello } from "../../../../redux/slice/trelloSlice";
import { useDispatch, useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
const { updateListTask } = sliceTrello.actions;

export default function ListTask({ column, tasks }) {
  return (
    <Droppable droppableId={column.column.toString()} type="task">
      {(provided) => (
        <div
          className="content-column"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {tasks.map((task, index) => (
            <ItemTask key={task._id} index={index} task={task} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
