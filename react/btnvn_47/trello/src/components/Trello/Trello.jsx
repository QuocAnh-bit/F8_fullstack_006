import React, { useId } from "react";
import "../Trello/Trello.scss";
import { v4 as uuid } from "uuid";
import ListColumn from "./ListColumn";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { sliceTrello } from "../../redux/slice/trelloSlice";
const { addCol, sortColNew } = sliceTrello.actions;

export default function Trello() {
  const dispatch = useDispatch();
  const { listCol } = useSelector((state) => state.trello);

  const handleAddColum = () => {
    const colAdd = {
      _id: uuid(),
      columnName: `Column: ${listCol.length + 1}`,
    };
    dispatch(addCol(colAdd));
  };

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  const sensors = useSensors(pointerSensor);

  const handleDragEnd = (e) => {
    const { active, over } = e;
    console.log(e);
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = listCol.findIndex((item) => item._id === active.id);
      const newIndex = listCol.findIndex((item) => item._id === over.id);
      const sortColDragEnd = arrayMove(listCol, oldIndex, newIndex);
      dispatch(sortColNew(sortColDragEnd));
    }
  };
  return (
    // Vùng kéo
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="wrap-trello">
        <ListColumn listCol={listCol} />
        <div className="btn-add-col">
          <button onClick={handleAddColum}>
            <i className="fa-solid fa-circle-plus"></i>
            Add column
          </button>
        </div>
      </div>
    </DndContext>
  );
}
