import React, { Component } from "react";
import ProductCard from "./ProductCard";

export default class Sorter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "title",
      order: "asc",
      products: [],
      isFetching: true,
    };

    this.handleChangeOrder = this.handleChangeOrder.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
  }

  componentDidMount() {
    fetch(`https://fakestoreapi.com/products/category/${this.props.category}`)
      .then((res) => res.json())
      .then((json) => this.setState({ products: json, isFetching: false }));
  }

  componentDidUpdate(prev, next) {
    console.log("prev", prev);
    console.log("next", next);
    if (prev.sortBy === next.sortBy && prev.order === next.order) return;

    const sortedProducts = next.products.sort((a, b) => {
      if (a[next.sortBy] > b[next.sortBy]) return next.order === "asc" ? -1 : 1;
      if (a[next.sortBy] < b[next.sortBy]) return next.order === "asc" ? 1 : -1;
      return 0;
    });

    console.log(sortedProducts);
    // this.setState({ products: sortedProducts });
  }

  handleChangeSort(event) {
    this.setState({ sortBy: event.target.value });
  }

  handleChangeOrder(event) {
    this.setState({ order: event.target.value });
  }

  render() {
    return (
      <div>
        Urutkan berdasarkan :
        <select onChange={this.handleChangeSort}>
          <option value="title">Nama</option>
          <option value="price">Harga</option>
        </select>
        <select onChange={this.handleChangeOrder}>
          <option value="asc">Menaik (ASC)</option>
          <option value="desc">Menurun (DESC)</option>
        </select>
        {this.state.isFetching && <p>Loading...</p>}
        {this.state.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
}
