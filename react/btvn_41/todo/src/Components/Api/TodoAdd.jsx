import React, { Component } from "react";
import config from "../../config.json";
import "../../asset/todoAdd.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "../../client";
import Loading from "../Loading/Loading";

const { SERVER_API } = config;

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        todo: "",
      },
      isLoading: false,
    };
  }
  componentDidMount() {
    if (localStorage.getItem("nameUser")) {
      const userName = localStorage.getItem("nameUser");
      toast.success(`Chào mừng bạn: ${userName}`);
    }
  }
  handleChange = (e) => {
    const data = { ...this.state.form };
    data[e.target.name] = e.target.value;
    this.setState({
      form: data,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { todo } = this.state.form;
    this.setState({
      isLoading: true,
    });
    this.handleAddTodo(todo);
  };
  handleAddTodo = async (todo) => {
    const apiKey = localStorage.getItem("apiKey");
    console.log(apiKey);
    const { data } = await client.post(`/todos`, { todo: todo }, apiKey);

    if (data.message !== "Unauthorize") {
      toast.success(data.message);
      this.props.onSuccess(true);
      this.setState({
        isLoading: false,
        form: {
          todo: "",
        },
      });
    } else {
      toast.error(data.message);
      localStorage.removeItem("apiKey");
      localStorage.removeItem("nameUser");
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  };

  render() {
    const { isLoading, form } = this.state;

    return (
      <>
        {isLoading ? <Loading /> : ""}
        <div className="container-todo">
          <div className="wrap-form">
            <h1 className="title-todo">Welcome to Todo App!</h1>
            <form action="" className="form-add" onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="todo"
                placeholder="Add todo list"
                onChange={this.handleChange}
                value={form.todo}
              />
              <button className="btn-submit">Add</button>
            </form>
            {/* <Search /> */}
          </div>
        </div>
        <ToastContainer />
      </>
    );
  }
}
