import React, { Component } from "react";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescription: false,
    };

    this.handleDescriptionButton = this.handleDescriptionButton.bind(this);
  }

  handleDescriptionButton() {
    //Toggle kondisi state showDescription
    this.setState((state) => ({ showDescription: !state.showDescription }));
  }

  render() {
    return (
      <div style={{ border: "2px solid black" }}>
        <img
          src={this.props.product.image}
          alt={this.props.product.title}
          style={{
            height: 64,
            width: 64,
          }}
        />
        <h3>{this.props.product.title}</h3>
        <button onClick={this.handleDescriptionButton}>
          {this.state.showDescription ? "Tutup deskripsi" : "Lihat deskripsi"}
        </button>
        {this.state.showDescription && (
          <div>
            <b>Deskripsi produk :</b>
            <p>{this.props.product.description}</p>
          </div>
        )}
        <p>Harga : {this.props.product.price} USD</p>
      </div>
    );
  }
}
