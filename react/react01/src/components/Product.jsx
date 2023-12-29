import React, { Component } from "react";

export default class Product extends Component {
  constructor() {
    super();
    console.log("1. Contructor");
    this.state = {
      count: 0,
    };
  }
  componentDidMount = () => {
    console.log("3. ComponentDidMount");
    // chi chay 1 lan sau render lan dau tien
  };
  componentDidUpdate = (prevProps, prevState) => {
    console.log(prevState, this.state);
  };
  componentWillUnmount = () => {
    console.log("5. componentWillUnmount");
  };
  handleClick = () => {
    this.setState((prev) => ({ count: prev.count + 1 }));
  };
  render() {
    console.log("2. Render");
    return (
      <div>
        <h1>Product</h1>
        <button onClick={this.handleClick}>222</button>
      </div>
    );
  }
}
