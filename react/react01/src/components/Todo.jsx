import React, { Component } from "react";
import "../asset/todo.css";
export default class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      form: {
        doName: "",
        prior: 0,
      },
      msg: "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submit");
    const { doName, prior } = this.state.form;

    if (doName !== "") {
      const todo = {
        id: this.state.todoList.length + 1,
        name: doName,
        isCompleted: false,
        prior,
      };
      this.setState({
        todoList: [...this.state.todoList, todo],
        form: {
          doName: "",
          prior: 0,
        },
      });
    }
  };
  handleChange = (e) => {
    // Update du lieu
    // const data = { ...this.state.form };
    // data[e.target.name] = e.target.value; -> Computed property
    // this.setState({ form: data });
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value },
    });
  };
  handleCompleted = (id, status) => {
    this.setState({
      todoList: this.state.todoList.map((todo) => {
        if (id === todo.id) {
          todo.isCompleted = status;
        }
        return todo;
      }),
    });
  };
  render() {
    console.log("re-render");
    const { todoList, form } = this.state;
    const { doName, prior } = form;

    return (
      <div>
        <div className="todo">
          {todoList.map(({ id, name, isCompleted, prior }) => (
            <div key={id} className={`${isCompleted ? "completed" : ""}`}>
              <input
                type="checkbox"
                // checked={isCompleted}
                onChange={(e) => {
                  this.handleCompleted(id, e.target.checked);
                }}
              />
              <span>{name}</span>
              <small style={{ fontStyle: "italic", marginLeft: "5px" }}>
                {prior === 0 ? "Khong uu tien" : "uu tien"}
              </small>
            </div>
          ))}
        </div>
        <hr />
        <form action="" onSubmit={this.handleSubmit}>
          <select value={prior} name="prior" onChange={this.handleChange}>
            <option value="0">Khong uu tien</option>
            <option value="1">uu tien</option>
          </select>
          <input
            value={doName}
            type="text"
            placeholder="Name..."
            onChange={this.handleChange}
            name="doName"
          />
        </form>
      </div>
    );
  }
}
