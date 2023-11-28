import React, { useEffect, useId, useState } from "react";
import "../Trello/Trello.scss";
import { getTasksApi, updateData } from "../../redux/slice/trelloSlice";
import { v4 as uuid } from "uuid";
import ListColumn from "./components/Columns/ListColumn";
import { useDispatch, useSelector } from "react-redux";
import { sliceTrello } from "../../redux/slice/trelloSlice";
import { DragDropContext } from "react-beautiful-dnd";
import ListTask from "./components/Tasks/ListTask";
import Loading from "./components/Loading/Loading";

const { addCol, sortColumn, sortTask } = sliceTrello.actions;

export default function Trello() {
  const dispatch = useDispatch();

  const { loading, data } = useSelector((state) => state.trello);

  function generateId() {
    /* Generate a random number between 0 and 10000 */
    return Math.floor(Math.random() * 10001);
  }
  const handleAddColum = () => {
    dispatch(
      addCol({
        _id: uuid(),
        column: generateId().toString(),
        columnName: `column ${data.length + 1}`,
        tasks: [],
      })
    );
  };

  useEffect(() => {
    dispatch(getTasksApi());
  }, []);

  useEffect(() => {
    if (data) {
      const bodyApi = data.reduce((bodyAdd, col) => {
        const itemAdd = col.tasks.map((task) => {
          return {
            column: task.column,
            content: task.content,
            columnName: col.columnName,
          };
        });
        return [...bodyAdd, ...itemAdd];
      }, []);
      dispatch(updateData(bodyApi));
    }
  }, [data]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.type === "column") {
      dispatch(sortColumn(result));
    } else {
      dispatch(sortTask(result));
      console.log(data);
    }
  };
  return (
    <>
      {loading && <Loading />}
      {data && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="wrap-trello">
            <ListColumn listCol={data} loading={loading} />
            <div className="btn-add-col">
              <button onClick={handleAddColum}>
                <i className="fa-solid fa-circle-plus"></i>
                Add column
              </button>
            </div>
          </div>
        </DragDropContext>
      )}
    </>
  );
}
