import React, { Component } from "react";
import ProductCard from "./ProductCard";
import "./Sorter.css";

export default class Sorter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "title",
      order: "asc",
      electronicProducts: [],
      jeweleryProducts: [],
      menProducts: [],
      womenProducts: [],
      isFetching: true,
    };
    this.handleChangeOrder = this.handleChangeOrder.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.getProductArray = this.getProductArray.bind(this);
    this.sortProductArrays = this.sortProductArrays.bind(this);
  }

  componentDidMount() {
    //Array yang berisi Promise fetching ke API
    const fetches = [
      fetch(`https://fakestoreapi.com/products/category/electronics`)
        .then((res) => res.json())
        .then((json) =>
          this.setState((state) => ({
            ...state,
            electronicProducts: json,
          }))
        ),
      fetch(`https://fakestoreapi.com/products/category/jewelery`)
        .then((res) => res.json())
        .then((json) =>
          this.setState((state) => ({
            ...state,
            jeweleryProducts: json,
          }))
        ),
      fetch(`https://fakestoreapi.com/products/category/men's%20clothing`)
        .then((res) => res.json())
        .then((json) =>
          this.setState((state) => ({
            ...state,
            menProducts: json,
          }))
        ),
      fetch(`https://fakestoreapi.com/products/category/women's%20clothing`)
        .then((res) => res.json())
        .then((json) =>
          this.setState((state) => ({
            ...state,
            womenProducts: json,
          }))
        ),
    ];

    //Fetch semua data dari API secara parallel
    Promise.all(fetches).then(() => {
      this.sortProductArrays();
      this.setState((state) => {
        console.log(state);
        return {
          ...state,
          isFetching: false,
        };
      });
    });
  }

  //Fungsi untuk mengurutkan produk, dipanggil tiap dropdown pengurut diubah
  sortProductArrays() {
    const sorter = (a, b) => {
      if (a[this.state.sortBy] < b[this.state.sortBy])
        return this.state.order === "asc" ? -1 : 1;
      if (a[this.state.sortBy] > b[this.state.sortBy])
        return this.state.order === "asc" ? 1 : -1;
      return 0;
    };

    const electronicProducts = this.state.electronicProducts.sort(sorter);
    const jeweleryProducts = this.state.jeweleryProducts.sort(sorter);
    const menProducts = this.state.menProducts.sort(sorter);
    const womenProducts = this.state.womenProducts.sort(sorter);

    this.setState((state) => ({
      ...state,
      electronicProducts,
      jeweleryProducts,
      menProducts,
      womenProducts,
    }));
  }

  //Fungsi untuk mengambil jenis produk yang ditampilkan
  getProductArray() {
    switch (this.props.category) {
      case "electronics":
        return this.state.electronicProducts;
      case "jewelery":
        return this.state.jeweleryProducts;
      case "men's clothing":
        return this.state.menProducts;
      case "women's clothing":
        return this.state.womenProducts;
      default:
        return this.state.electronicProducts;
    }
  }

  handleChangeSort(event) {
    this.setState(
      (state) => ({ ...state, sortBy: event.target.value }),
      this.sortProductArrays
    );
  }

  handleChangeOrder(event) {
    this.setState(
      (state) => ({ ...state, order: event.target.value }),
      this.sortProductArrays
    );
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
        {this.getProductArray().map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    );
  }
}
