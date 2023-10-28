import React, { Component } from "react";
import TodoList from "./TodoList";
import { client } from "../../client.jsx";
import config from "../../config.json";
import "../../asset/confirm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { SERVER_API } = config;

export default class Confirm_email extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: "",
      },
      isConfirm: false,
    };
  }
  componentDidMount() {
    if (localStorage.getItem("apiKey")) {
      this.setState({
        isConfirm: true,
      });
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
    const { email } = this.state.form;
    this.handleConfirm(email);
  };

  handleConfirm = async (email) => {
    const nameUser = email;
    email = email.replace("@", "%40");
    const { data } = await client.get(`/api-key?email=${email}`);
    console.log(data);
    if (data.code === 200) {
      const apiKey = data.data.apiKey;
      localStorage.setItem("apiKey", apiKey);
      localStorage.setItem("nameUser", nameUser);
      this.setState({
        isConfirm: true,
      });
    } else {
      toast.error(data.message);
    }
  };

  render() {
    const { isConfirm } = this.state;

    return (
      <>
        {isConfirm ? (
          <TodoList />
        ) : (
          <div className="wrapper-confirm">
            <form action="" className="confirm" onSubmit={this.handleSubmit}>
              <h1 className="title-form">Vui lòng nhập email để xác nhận</h1>
              <input
                type="email"
                className="email"
                name="email"
                placeholder="Email..."
                onChange={this.handleChange}
                required
              />
              <button className="btn_submit">Gửi</button>
            </form>
            <ToastContainer />
          </div>
        )}
      </>
    );
  }
}
