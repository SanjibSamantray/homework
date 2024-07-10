import React, { useState, useEffect } from "react";
import Products from "./Products";
import Cart from "./Cart";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const result = await response.json();
      setProducts(result);
      const categories = getCategories(result);
      setCategories(categories);
    }
    getProducts();

    setCategories();
  }, []);

  function getCategories(prods) {
    const uniQueCategories = [];
    const productCategories = prods.map((prd) => prd.category);
    for (let p of productCategories) {
      if (!uniQueCategories.includes(p)) {
        uniQueCategories.push(p);
      }
    }
    return uniQueCategories;
  }

  const handleCartItems = (e, id, operator, cartPCount) => {
    const cartProduct = products.find((prod) => prod.id === id);
    const cartItemsNew = [...cartItems];
    if (operator === "+") {
      cartProduct.count = cartPCount;
      cartProduct.totalPrice = Math.round(cartProduct.price * cartPCount);
      if (!cartItemsNew.includes(cartProduct)) {
        cartItemsNew.push(cartProduct);
      }
      setCartItems(cartItemsNew);
    } else if (operator === "-") {
      cartProduct.count = cartPCount;
      cartProduct.totalPrice = Math.round(cartProduct.price * cartPCount);
      if (cartProduct.count === 0) {
        const prodIndex = cartItemsNew.findIndex(
          (item) => item.id === cartProduct.id
        );
        cartItemsNew.splice(prodIndex, 1);
        setCartItems(cartItemsNew);
      } else {
        setCartItems(cartItemsNew);
      }
    }
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };
  const handleEmptyCart = () => {
    setCartItems([]);
  };

  const generateTotalPoints = (e, newPoints) => {
    setTotalPoints(totalPoints + newPoints);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!isCartOpen ? (
          <h1>Welcome To The Store</h1>
        ) : (
          <h1>{`Cart(${cartItems.length})`}</h1>
        )}
        <button onClick={handleEmptyCart} className="empty-cart">
          EMPTY CART
        </button>
        <button className="cart" onClick={handleCartClick}>
          {!isCartOpen ? `OPEN CART (${cartItems.length})` : "GO BACK TO STORE"}
        </button>
      </header>
      {!isCartOpen ? (
        <article>
          {categories &&
            products &&
            categories.map((category) => {
              const filteredProducts = products.filter(
                (prd) => prd.category === category
              );
              return (
                <div>
                  <Products
                    category={category}
                    products={filteredProducts}
                    cartItems={cartItems}
                    handleCartItems={(e, id, operator, cartPCount) =>
                      handleCartItems(e, id, operator, cartPCount)
                    }
                  />
                </div>
              );
            })}
        </article>
      ) : (
        <Cart
          cartItems={cartItems}
          handleCartItems={(e, id, operator, cartPCount) =>
            handleCartItems(e, id, operator, cartPCount)
          }
          generateTotalPoints={(e, points) => generateTotalPoints(e, points)}
          totalPoints={totalPoints}
        />
      )}
    </div>
  );
}

export default App;
