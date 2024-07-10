import React from "react";
import "./Product.css";

export default function CartItem({ cartItem, handleCartItems, isCheckedOut }) {
  const {
    id,
    category,
    description,
    image,
    price,
    title,
    rating,
    count,
    totalPrice,
  } = cartItem;

  const handleButtonClick = (e, id, operator) => {
    if (!isCheckedOut && operator === "+") {
      handleCartItems(e, id, operator, count + 1);
    } else if (!isCheckedOut && operator === "-" && count > 0) {
      handleCartItems(e, id, operator, count - 1);
    }
  };
  return (
    <div className="Prod">
      <img className="Prod-image" src={image} alt={`image of product ${id}`} />
      <h5>{title}</h5>
      <button onClick={(e) => handleButtonClick(e, id, "-")}>-</button>
      {count}
      <button onClick={(e) => handleButtonClick(e, id, "+")}>+</button>
      <p>{`Price Per Piece: $${price}`}</p>
      <p>{`Total Price: $${totalPrice}`}</p>
    </div>
  );
}
