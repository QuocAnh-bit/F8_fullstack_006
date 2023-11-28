import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { sliceTrello } from "../../../../../redux/slice/trelloSlice";
import ListTask from "../../Tasks/ListTask";
import "./ItemColumn.scss";
import { Draggable } from "react-beautiful-dnd";

const { addTask, deleteCol, updateListCol, indexTask } = sliceTrello.actions;

export default function ItemColumn({ column, indexCol }) {
  const dispatch = useDispatch();
  const { data, totalTask } = useSelector((state) => state.trello);
  const [edit, setEdit] = useState(false);

  const handleAddTask = () => {
    const taskAdd = {
      _id: uuid(),
      content: `New Task`,
      column: column.column,
    };
    dispatch(addTask(taskAdd));
    console.log(data);
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

  return (
    <Draggable draggableId={column.column.toString()} index={indexCol}>
      {(provided) => (
        <div
          className="item-column"
          key={column.column}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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

          <ListTask column={column} tasks={column.tasks} />

          <div className="footer-column">
            <button className="btn-add-task" onClick={handleAddTask}>
              add task
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
