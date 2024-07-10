import React from "react";
import Product from "./Product";
import Category from "./Category";
import "./Products.css";

export default function Products({
  products,
  category,
  handleCartItems,
  cartItems,
}) {
  return (
    <div>
      <Category category={category} />
      <div className="Product">
        {products?.map((product, index) => {
          return (
            <Product
              product={product}
              cartItems={cartItems}
              index={index}
              handleCartItems={(e, id, operator, cartPCount) =>
                handleCartItems(e, id, operator, cartPCount)
              }
            />
          );
        })}
      </div>
    </div>
  );
}
