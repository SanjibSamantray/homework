import React from "react";
import "./Product.css";

export default function Category(props) {
  return (
    <div className="category">
      <h3>{props.category}</h3>
    </div>
  );
}
