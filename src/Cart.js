import React, { useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import "./Cart.css";

export default function Cart({
  cartItems,
  handleCartItems,
  generateTotalPoints,
  totalPoints,
}) {
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const handleSetCheckOut = () => {
    setIsCheckedOut(!isCheckedOut);
  };
  return (
    <div className="main-cart">
      <div className="cartDiv">
        {cartItems?.map((item) => {
          return (
            <CartItem
              cartItem={item}
              handleCartItems={(e, id, operator, count) =>
                handleCartItems(e, id, operator, count)
              }
              isCheckedOut={isCheckedOut}
            />
          );
        })}
      </div>
      <div>
        {cartItems && cartItems.length > 0 && (
          <Checkout
            cartItems={cartItems}
            generateTotalPoints={(e, points) => generateTotalPoints(e, points)}
            totalPoints={totalPoints}
            handleSetCheckOut={handleSetCheckOut}
            isCheckedOut={isCheckedOut}
          />
        )}
      </div>
    </div>
  );
}
