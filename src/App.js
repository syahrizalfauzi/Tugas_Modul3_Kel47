import "./App.css";
import { createContext, useEffect, useReducer, useState } from "react";
import Selector from "./Components/SelectorClass";

const initialProductState = {
  products: [],
  selectedProducts: [],
  categories: [],
  selectedCategory: null,
};
function productReducer(state, action) {
  switch (action.type) {
    case "setProducts":
      return { ...state, products: action.payload };
    case "setCategory":
      return {
        ...state,
        categories: action.payload,
        category: action.payload[0],
      };
    case "changeCategory":
      return {
        ...state,
        selectedProducts: state.products.filter(
          (product) => product.category === action.payload
        ),
        selectedCategory: action.payload,
      };
    default:
      throw new Error();
  }
}

export const ProductContext = createContext([]);
export const FetchingContext = createContext(false);

export default function App() {
  const [productState, productDispatch] = useReducer(
    productReducer,
    initialProductState
  );
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((json) => {
        productDispatch({ type: "setProducts", payload: json });
        return fetch("https://fakestoreapi.com/products/categories");
      })
      .then((res) => res.json())
      .then((json) => {
        productDispatch({ type: "setCategory", payload: json });
        setIsFetching(false);
      });
  }, []);

  return (
    <div className="App">
      <ProductContext.Provider value={[productState, productDispatch]}>
        <FetchingContext.Provider value={isFetching}>
          <Selector />
        </FetchingContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}
