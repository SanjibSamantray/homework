import React, { useState } from "react";

export default function Checkout({
  cartItems,
  generateTotalPoints,
  totalPoints,
  handleSetCheckOut,
  isCheckedOut,
}) {
  function getTotalAmount() {
    const newCart = cartItems.map((item) => item.totalPrice);
    const totalAmount = newCart.reduce((a, b) => a + b);
    return totalAmount;
  }
  const totalPrice = getTotalAmount();

  function calculatePoints() {
    let points;
    if (totalPrice < 50) {
      points = 0;
    } else if (totalPrice > 50 && totalPrice <= 100) {
      points = totalPrice - 50;
    } else if (totalPrice > 100) {
      points = totalPrice - 100 * 2 + 50;
    }
    return points;
  }
  const points = calculatePoints();
  const handleCheckOut = (e) => {
    generateTotalPoints(e, points);
    handleSetCheckOut();
  };

  return (
    <div>
      <h4>Checkout</h4>
      <p>{`Total Price: $${totalPrice}`}</p>
      {!isCheckedOut && <button onClick={handleCheckOut}>Checkout</button>}
      {isCheckedOut && (
        <div>
          <h4>{`Your Point is : ${points}`}</h4>
          <h5>{`Your Total Points Yet : ${totalPoints}`}</h5>
        </div>
      )}
    </div>
  );
}
