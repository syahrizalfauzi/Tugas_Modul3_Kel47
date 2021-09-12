import React, { Component } from "react";

export default class ProductCard extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.product.title}</h4>
        <p>{this.props.product.price} USD</p>
      </div>
    );
  }
}
