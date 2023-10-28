import TodoAdd from "./TodoAdd";
import EditTodo from "./EditTodo";
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
    };
  }

  getTodos = async () => {
    try {
      const apiKey = localStorage.getItem("apiKey");
      const { data } = await client.get(`/todos`, null, apiKey);
      // console.log(data.data.listTodo);
      this.setState({
        todos: data.data.listTodo,
      });
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
      this.getTodos();
    }
  };
  handleDelete = async (id) => {
    const apiKey = localStorage.getItem("apiKey");
    const { data } = await client.delete(`/todos/${id}`, apiKey);
    if (data.status_code === "SUCCESS") {
      this.getTodos();
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };
  handleEdit = (id) => {
    this.setState({
      todoId: id,
    });
  };
  render() {
    const { todos, todoId } = this.state;
    console.log(todoId);

    return (
      <>
        <TodoAdd onSuccess={this.handleSuccess} />
        <div className="wrap-todo-item">
          {todos.map((todo) =>
            todoId === todo._id ? (
              <EditTodo key={todo._id} id={todo._id} todo={todo.todo} />
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
          )}
        </div>
      </>
    );
  }
}
