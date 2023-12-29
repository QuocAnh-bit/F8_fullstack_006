import React, { Component } from "react";
import Product from "./Product";
export default class Categoery extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  handleToggle = () => {
    this.setState({ show: !this.state.show });
  };
  render() {
    return (
      <div>
        {this.state.show && <Product />}
        <button onClick={this.handleToggle}>Click</button>
      </div>
    );
  }
}

// Mouting -> Component dc dua vao dom
// Unmouting -> Component bi loai bo khoi Dom
