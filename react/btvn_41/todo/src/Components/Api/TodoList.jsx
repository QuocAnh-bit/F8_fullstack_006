import TodoAdd from "./TodoAdd";
import EditTodo from "./EditTodo";
import Loading from "../Loading/Loading";
import React, { Component } from "react";
import { client } from "../../client.jsx";
import "../../asset/todoList.css";
import { toast } from "react-toastify";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoId: null,
      isLoading: true,
    };
  }

  getTodos = async () => {
    try {
      const apiKey = localStorage.getItem("apiKey");
      const { data } = await client.get(`/todos`, null, apiKey);
      if (data.status_code === "SUCCESS") {
        this.setState({
          todos: data.data.listTodo,
          isLoading: false,
        });
      } else {
        localStorage.removeItem("apiKey");
        localStorage.removeItem("nameUser");
        location.reload();
      }
    } catch (e) {
      localStorage.removeItem("apiKey");
      localStorage.removeItem("nameUser");
      location.reload();
    }
  };

  componentDidMount = () => {
    this.getTodos();
  };
  handleSuccess = (status) => {
    if (status) {
      this.setState({
        isLoading: true,
      });
      this.getTodos();
    }
  };
  handleDelete = async (id) => {
    try {
      this.setState({
        isLoading: true,
      });
      const apiKey = localStorage.getItem("apiKey");
      const { data } = await client.delete(`/todos/${id}`, apiKey);

      if (data.status_code === "SUCCESS") {
        this.setState({
          isLoading: false,
        });
        this.getTodos();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      localStorage.removeItem("apiKey");
      localStorage.removeItem("nameUser");
      location.reload();
    }
  };
  handleEdit = (id) => {
    toast.success("Đang vào trỉnh sửa");
    this.setState({
      todoId: id,
    });
  };
  handleExit = (status) => {
    if (status) {
      toast.success("Thoát trình chỉnh sửa");
      this.setState({
        todoId: null,
      });
    }
  };
  render() {
    const { todos, todoId, isLoading } = this.state;
    console.log(todoId);

    return (
      <>
        <TodoAdd onSuccess={this.handleSuccess} />
        <div className="wrap-todo-item">
          {isLoading ? (
            <Loading />
          ) : (
            todos.map((todo) =>
              todoId === todo._id ? (
                <EditTodo
                  key={todo._id}
                  id={todo._id}
                  todo={todo.todo}
                  onExit={this.handleExit}
                  onSuccess={this.handleSuccess}
                />
              ) : (
                <div className="item-todo" key={todo._id}>
                  <input className="todo" value={todo.todo} readOnly />
                  <div className="control-item">
                    <div className="btn-wrapper">
                      <button
                        className="btn-edit"
                        onClick={() => {
                          this.handleEdit(todo._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          this.handleDelete(todo._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </>
    );
  }
}
