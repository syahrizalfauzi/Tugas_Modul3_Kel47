import { useContext } from "react";
import { FetchingContext, ProductContext } from "../App";
import Sorter from "./SorterClass";

export default function Selector() {
  const isFetching = useContext(FetchingContext);
  const [productState, productDispatch] = useContext(ProductContext);

  function handleCategoryButton(event) {
    productDispatch({ type: "changeCategory", payload: event.target.name });
  }

  return (
    <div>
      <div>
        <p>Pilih kategori produk : </p>
        {isFetching ? (
          <b>Loading...</b>
        ) : (
          <ul>
            {productState.categories.map((category, index) => (
              <button
                key={index}
                name={category}
                onClick={handleCategoryButton}
              >
                {category}
              </button>
            ))}
          </ul>
        )}
        {!isFetching && <p>{productState.category} terpilih</p>}
      </div>
      <Sorter category={productState.category} />
    </div>
  );
}
