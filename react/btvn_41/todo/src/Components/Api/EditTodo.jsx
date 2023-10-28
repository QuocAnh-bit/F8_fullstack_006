import React, { Component } from "react";
import { client } from "../../client.jsx";
import "../../asset/todoList.css";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);
    const { id, todo } = this.props;
    this.state = {
      id: id,
      todo: todo,
      isLoading: false,
      form: {
        todo: "",
      },
    };
  }
  handleExit = (e) => {
    this.props.onExit(true);
  };
  handleDelete = async (id) => {
    try {
      const apiKey = localStorage.getItem("apiKey");
      const { data } = await client.delete(`/todos/${id}`, apiKey);
      if (data.status_code === "SUCCESS") {
        toast.success(data.message);
        this.props.onSuccess(true);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      localStorage.removeItem("apiKey");
      localStorage.removeItem("nameUser");
      location.reload();
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const data = { ...this.state.form };
    console.log(data);
    data[e.target.name] = e.target.value;
    this.setState({
      form: data,
    });
  };

  handleUpdate = (e) => {
    e.preventDefault();

    const id = e.target.getAttribute("id");
    const { todo } = this.state.form;
    if (todo === "") {
      toast.warning("Ít nhất 1 ký tự hoặc sử lại bản update");
    } else {
      this.handleUpdateTodo(todo, id);
    }
  };

  handleUpdateTodo = async (todoUpdate, id) => {
    try {
      const apiKey = localStorage.getItem("apiKey");
      const { data } = await client.patch(
        `/todos/${id}`,
        { todo: todoUpdate },
        apiKey
      );

      if (data.status_code === "SUCCESS") {
        toast.success(data.message);
        this.props.onExit(true);
        this.props.onSuccess(true);
        this.setState({
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
  render() {
    const { id, todo, isLoading } = this.state;

    return (
      <>
        {isLoading ? <Loading /> : ""}

        <form
          className="item-todo"
          id={id}
          key={id}
          onSubmit={this.handleUpdate}
        >
          <input
            className="todo"
            defaultValue={todo}
            name="todo"
            type="text"
            onChange={this.handleChange}
          />
          <div className="control-item">
            <div className="completed">
              <input type="checkbox" id="check-completed" />
              <label htmlFor="check-completed">Xong</label>
            </div>
            <div className="btn-wrapper">
              <button className="btn-update" type="submit">
                Update
              </button>
              <button
                className="btn-delete"
                type="button"
                onClick={() => {
                  this.handleDelete(id);
                }}
              >
                Delete
              </button>
              <button className="btn-exit" onClick={this.handleExit}>
                Thoát
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
}
