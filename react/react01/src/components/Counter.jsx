// Class Component
import React, { Component } from "react";

export default class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }
  handleIncrement = () => {
    // cập nhật state => sd pthuc setState
    // this.setState({ count: this.state.count + 1 });
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };
  handleDecrement = () => {
    // this.setState({ count: this.state.count - 1 });
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  };
  render() {
    const { count } = this.state;
    return (
      <div>
        <h1>Count: {count}</h1>
        <button onClick={this.handleDecrement}>-</button>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}
/*
state: Hđ nội bộ trong component
- khi state thay đổi => component sẽ đc tự động re-render
- Không thay đổi trưc tiếp state mà phải thông qua hàm có sẵn của react


*/
