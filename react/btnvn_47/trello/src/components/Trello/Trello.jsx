import React, { useEffect, useId, useState } from "react";
import "../Trello/Trello.scss";
import { getTasksApi } from "../../redux/slice/trelloSlice";
import { v4 as uuid } from "uuid";
import ListColumn from "./components/Columns/ListColumn";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { sliceTrello } from "../../redux/slice/trelloSlice";
import ItemColumn from "./components/Columns/ItemColumn/ItemColumn";
import ItemTask from "./components/Tasks/ItemTask/ItemTask";

const {
  addCol,
  updateListCol,
  setItemDragId,
  setItemDragType,
  setItemDragData,
  resetItemsDrag,
} = sliceTrello.actions;

const TYPE_DRAG = {
  activeColumn: "DRAG_COLUMN",
  activeTask: "DRAG_TASK",
};

export default function Trello() {
  const dispatch = useDispatch();
  console.log(getTasksApi());
  const { listCol, itemDragId, itemDragType, itemDragData, listTask, loading } =
    useSelector((state) => state.trello);

  function generateId() {
    /* Generate a random number between 0 and 10000 */
    return Math.floor(Math.random() * 10001);
  }
  const handleAddColum = () => {
    const colAdd = {
      column: generateId(),
      _id: uuid(),
      columnName: `Column: ${listCol.length + 1}`,
    };
    dispatch(addCol(colAdd));
  };

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  const sensors = useSensors(pointerSensor);

  const handleDragStar = (e) => {
    const typeItem = e.active.data.current.columnId;
    const dataItem = e.active.data.current;

    dispatch(
      setItemDragType(typeItem ? TYPE_DRAG.activeTask : TYPE_DRAG.activeColumn)
    );
    dispatch(setItemDragData(dataItem));
  };

  const handleDragOver = (e) => {
    if (itemDragType === TYPE_DRAG.activeColumn) return;
    if (itemDragType === TYPE_DRAG.activeTask) {
      const { active, over } = e;

      const activeColumn = active.data.current;
      const overColumn = over.data.current;

      if (!activeColumn.columnId || !overColumn.columnId) return;

      if (activeColumn.columnId !== overColumn.columnId) {
        const activeIndex = listTask.findIndex(
          (t) => t._id === activeColumn._id
        );

        const overIndex = listTask.findIndex((t) => t._id === overColumn._id);

        console.log(
          listTask[activeIndex].columnId,
          listTask[overIndex].columnId,
          activeColumn
        );

        if (listTask[activeIndex].columnId != listTask[overIndex].columnId) {
        }

        dispatch(indexTask(arrayMove(listTask, activeIndex, overIndex)));
        // let newIndex;
        // const isBelowOverItem =
        //   active.rect.current.translated &&
        //   active.rect.current.translated.top > over.rect.top + over.rect.height;

        // const modifier = isBelowOverItem ? 1 : 0;

        // newIndex = overIndex >= 0 ? overIndex + modifier : listTask.length + 1;
        // console.log("isBelowOverItem:", isBelowOverItem);
        // console.log("modifier:", modifier);
        // console.log("newIndex:", newIndex);

        // const a = [...listTask];
        // const
      }
    }
  };

  const handleDragEnd = (e) => {
    if (itemDragType === TYPE_DRAG.activeTask) {
      return;
    }

    const { active, over } = e;

    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = listCol.findIndex((item) => item._id === active.id);
      const newIndex = listCol.findIndex((item) => item._id === over.id);
      const sortColDragEnd = arrayMove(listCol, oldIndex, newIndex);
      dispatch(updateListCol(sortColDragEnd));
    }

    dispatch(resetItemsDrag());
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };
  useEffect(() => {
    dispatch(getTasksApi());
  }, []);
  return (
    // Vùng <>kéo
    <>
      <DndContext
        onDragStart={handleDragStar}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div className="wrap-trello">
          <ListColumn listCol={listCol} loading={loading} />
          <DragOverlay dropAnimation={dropAnimation}>
            {itemDragType === TYPE_DRAG.activeColumn ? (
              <ItemColumn column={itemDragData} />
            ) : (
              <ItemTask task={itemDragData} />
            )}
          </DragOverlay>
          <div className="btn-add-col">
            <button onClick={handleAddColum}>
              <i className="fa-solid fa-circle-plus"></i>
              Add column
            </button>
          </div>
        </div>
      </DndContext>
    </>
  );
}
