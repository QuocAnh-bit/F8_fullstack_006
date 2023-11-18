import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { sliceTrello } from "../../redux/slice/trelloSlice";
import ItemTask from "./ItemTask";
const { addTask } = sliceTrello.actions;
export default function ItemColumn({ columnName, id: columnId }) {
  const dispatch = useDispatch();
  const { listTask } = useSelector((state) => state.trello);
  const listTaskFilter = listTask.filter((task) => task.column === columnId);

  const handleAddTask = () => {
    const taskAdd = {
      _id: uuid(),
      content: `Task: ${listTask.length + 1}`,
      column: columnId,
    };
    dispatch(addTask(taskAdd));
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
      <div className="title-column">
        <h3>{columnName}</h3>
        <button>Delete</button>
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
