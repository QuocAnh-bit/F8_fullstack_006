import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTask,
  initTask,
  taskSlice,
  updateTask,
} from "../../redux/slice/taskSlice.js";
import { FULFILLED, PENDING, REJECTED } from "../../constant/apiStatus.js";
import { loadingSlice } from "../../redux/slice/loadingSlice.js";
import { useNavigate } from "react-router-dom";
import {
  getLocalStorage,
  removeLocalStorage,
} from "../../utils/localStorage.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Styles from "./Home.module.scss";
import Column from "./components/Column.jsx";
import clsx from "clsx";
import { authSlice } from "../../redux/slice/authSlice.js";
import { containUnicodeCharacter } from "../../utils/stringUtil.js";

const { turnOn, turnOff } = loadingSlice.actions;
const {
  reset: taskReset,
  reorderTask,
  reorderColumn,
  addColumn,
  removeTask,
} = taskSlice.actions;
const { reset: loginReset } = authSlice.actions;
function Home(props) {
  const dispatch = useDispatch();
  const { data, error, status } = useSelector((state) => state.task);
  const navigate = useNavigate();

  const logout = () => {
    removeLocalStorage("apiKey");
    dispatch(taskReset());
    // dispatch(loginReset());
    navigate("/login");
  };

  useEffect(() => {
    const apiKey = getLocalStorage("apiKey");

    if (!apiKey || containUnicodeCharacter(apiKey)) {
      logout();
    } else {
      dispatch(fetchTask());
    }
  }, []);

  useEffect(() => {
    status === PENDING ? dispatch(turnOn()) : dispatch(turnOff());
    if (status === FULFILLED && data && data.length === 0) {
      const taskList = [
        {
          column: "doing",
          content: "Đi học",
          columnName: "Việc cần làm",
        },
        {
          column: "done",
          content: "Tập thể dục",
          columnName: "Việc đã làm xong",
        },
        {
          column: "todo",
          content: "Thêm nội dung",
          columnName: "Thêm thứ bạn muốn",
        },
      ];
      dispatch(initTask(taskList));
    } else if (status === REJECTED && error && error.code === 401) {
      console.log(error);
      logout();
    }
  }, [status]);

  function handleOnDragEnd(result) {
    // console.log(result)
    if (
      !result.destination ||
      (result.source.index === result.destination.index &&
        result.source.droppableId === result.destination.droppableId)
    ) {
      return;
    }
    if (result.type === "column") {
      dispatch(reorderColumn(result));
    } else if (result.type) {
      dispatch(reorderTask(result));
    }
  }

  return (
    <>
      <div className={clsx(Styles.home)}>
        <div className={clsx(Styles.overlay)}></div>

        <header className={clsx(Styles.home_header)}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {data && (
              <Droppable
                droppableId="all-columns"
                direction="horizontal"
                type="column"
              >
                {(provided) => (
                  <>
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={clsx(Styles.column_group)}
                    >
                      {data.length > 0 &&
                        data.map((column, index) => {
                          return (
                            <Column
                              column={column}
                              columnIndex={index}
                              key={column.column}
                            ></Column>
                          );
                        })}
                      {provided.placeholder}
                    </div>
                    <button
                      onClick={() => dispatch(addColumn())}
                      className={clsx(Styles.button_add_column)}
                    >
                      {" "}
                      <i className="fa-solid fa-plus"></i> Thêm mới cột
                    </button>
                  </>
                )}
              </Droppable>
            )}
          </DragDropContext>
        </header>
      </div>
    </>
  );
}

export default Home;
