import React, { Component } from "react";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);
    const { id, todo } = this.props;
    this.state = {
      id: id,
      todo: todo,
    };
  }
  render() {
    const { id, todo } = this.state;
    console.log(id, todo);
    return (
      <div className="item-todo" key={id}>
        <input className="todo" defaultValue={todo} />
        <div className="control-item">
          <div className="completed">
            <input type="checkbox" id="check-completed" />
            <label htmlFor="check-completed">Xong</label>
          </div>
          <div className="btn-wrapper">
            <button className="btn-edit">Edit</button>
            <button>Delete</button>
            <button className="btn-exit">Thoát</button>
          </div>
        </div>
      </div>
    );
  }
}
