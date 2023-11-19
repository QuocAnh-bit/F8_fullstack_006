import React, { useState } from "react";
import ItemTask from "./ItemTask";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { sliceTrello } from "../../redux/slice/trelloSlice";
import ListColumn from "./ListColumn";
const { addTask, deleteCol, updateListCol } = sliceTrello.actions;

export default function ItemColumn({ columnName, id: columnId, listCol }) {
  const dispatch = useDispatch();
  const { listTask } = useSelector((state) => state.trello);
  const [edit, setEdit] = useState(false);
  const listTaskFilter = listTask.filter((task) => task.column === columnId);

  const handleAddTask = () => {
    const taskAdd = {
      _id: uuid(),
      content: `Task: ${listTask.length + 1}`,
      column: columnId,
    };
    dispatch(addTask(taskAdd));
  };

  const handleEditCol = (columnName, columnId) => {
    const newListCol = listCol.map((col) => {
      if (col._id !== columnId) return col;
      return { ...col, columnName };
    });
    console.log(newListCol);
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
    isDragging,
  } = useSortable({ id: columnId });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <div
      className="item-column"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="title-column" onClick={() => setEdit(true)}>
        {edit ? (
          <input
            type="text"
            defaultValue={columnName}
            onChange={(e) => handleEditCol(e.target.value, columnId)}
            onBlur={() => setEdit(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                return setEdit(false);
              }
            }}
            autoFocus
          />
        ) : (
          <h3>{columnName}</h3>
        )}
        <button onClick={() => handleDeleteCol(columnId)}>Delete</button>
      </div>
      <div className="content-column">
        {listTaskFilter.map(({ content, _id }, index) => (
          <ItemTask key={index} content={content} id={_id} />
        ))}
      </div>
      <div className="footer-column">
        <button className="btn-add-task" onClick={handleAddTask}>
          add task
        </button>
      </div>
    </div>
  );
}
