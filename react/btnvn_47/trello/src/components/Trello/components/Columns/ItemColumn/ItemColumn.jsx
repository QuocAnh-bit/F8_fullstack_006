import React, { useState } from "react";
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { sliceTrello } from "../../../../../redux/slice/trelloSlice";
import ListTask from "../../Tasks/ListTask";
import "./ItemColumn.scss";

const { addTask, deleteCol, updateListCol, indexTask } = sliceTrello.actions;

export default function ItemColumn({ column, listCol }) {
  const dispatch = useDispatch();
  const { listTask } = useSelector((state) => state.trello);
  const [edit, setEdit] = useState(false);

  const handleAddTask = () => {
    const taskAdd = {
      _id: uuid(),
      content: `Task: ${listTask.length + 1}`,
      column: column.column,
    };
    dispatch(addTask(taskAdd));
  };

  const handleEditCol = (columnName, column) => {
    const newListCol = listCol.map((col) => {
      if (col._id !== column) return col;
      return { ...col, columnName };
    });

    dispatch(updateListCol(newListCol));
  };

  const handleDeleteCol = (id) => {
    dispatch(deleteCol(id));
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    over,
    isDragging,
  } = useSortable({
    id: column._id,
    disabled: edit,
    data: { ...column },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div
      className="item-column"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div
        className="title-column"
        onClick={() => {
          setEdit(true);
        }}
      >
        {edit ? (
          <input
            type="text"
            defaultValue={column.columnName}
            onChange={(e) => handleEditCol(e.target.value, column._id)}
            onBlur={() => setEdit(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.key !== "Enter") return;
                setEdit(false);
              }
            }}
            autoFocus
          />
        ) : (
          <h3>{column.columnName}</h3>
        )}

        <button onClick={() => handleDeleteCol(column._id)}>Delete</button>
      </div>

      <ListTask
        listTask={listTask.filter((task) => task.column === column.column)}
      />

      <div className="footer-column">
        <button className="btn-add-task" onClick={handleAddTask}>
          add task
        </button>
      </div>
    </div>
  );
}
