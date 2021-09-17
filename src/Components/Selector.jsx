import React, { Component } from "react";
import Sorter from "./Sorter";
import "./Selector.css";

export default class Selector extends Component {
  constructor(props) {
    super(props);
    this.handleCategoryButton = this.handleCategoryButton.bind(this);

    this.state = {
      categories: [],
      isFetching: true,
      category: undefined,
    };
  }

  componentDidMount() {
    this.setState((state) => ({ ...state, isFetching: true }));
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) =>
        this.setState((state) => ({
          ...state,
          categories: json,
          isFetching: false,
          category: json[0],
        }))
      );
  }

  handleCategoryButton(event) {
    this.setState((state) => ({ ...state, category: event.target.name }));
  }

  render() {
    return (
      <div>
        <div>
          <p>Pilih kategori produk : </p>
          {this.state.isFetching ? (
            <b>Loading...</b>
          ) : (
            <ul>
              {this.state.categories.map((category, index) => (
                <button
                  key={index}
                  name={category}
                  onClick={this.handleCategoryButton}
                >
                  {category}
                </button>
              ))}
            </ul>
          )}
          {!this.state.isFetching && <p>{this.state.category} terpilih</p>}
        </div>
        <Sorter category={this.state.category} />
      </div>
    );
  }
}
