import React, { useState } from "react";
import "./Product.css";

export default function Product({
  product,
  handleCartItems,
  index,
  cartItems,
}) {
  const { id, description, image, price, title, rating } = product;

  const findCartItemCount = () => {
    const cartItem = cartItems.find((item) => item.id === id);
    if (cartItems.length === 0 || !cartItem) {
      return 0;
    } else {
      return cartItem.count;
    }
  };
  findCartItemCount();
  // const count = cartItems && cartItems.length > 0 ? findCartItemCount() : 0;
  const count = findCartItemCount();

  const handleButtonClick = (e, id, operator) => {
    if (operator === "+") {
      if (cartItems && cartItems.length > 0) {
        handleCartItems(e, id, operator, count + 1);
      } else if (cartItems && cartItems.length === 0) {
        handleCartItems(e, id, operator, 1);
      }
    } else if (operator === "-" && count > 0) {
      handleCartItems(e, id, operator, count - 1);
    }
  };
  return (
    <div className="Prod">
      <img className="Prod-image" src={image} alt={`image of product ${id}`} />
      <p>{`Price: $${price}`}</p> <span>{`Ratings: ${rating.rate}`}</span>
      <h5>{title}</h5>
      <button onClick={(e) => handleButtonClick(e, id, "-")}>-</button>
      {count}
      <button onClick={(e) => handleButtonClick(e, id, "+")}>+</button>
      <label style={{ display: "block" }}>Add To Cart</label>
    </div>
  );
}
