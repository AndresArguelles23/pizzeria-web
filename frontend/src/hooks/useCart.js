// frontend/src/hooks/useCart.js
import { useState, useEffect } from "react";

const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addItem = (product) => {
    let newCart = [...cart];
    const exist = newCart.find((item) => item._id === product._id);
    if (exist) {
      newCart = newCart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart.push({ ...product, quantity: 1 });
    }
    updateCart(newCart);
  };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item._id !== id);
    updateCart(newCart);
  };

  const changeQuantity = (id, quantity) => {
    const newQuantity = Math.max(Number(quantity), 1);
    const newCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(newCart);
  };

  const clearCart = () => {
    updateCart([]);
    localStorage.removeItem("cart");
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return { cart, addItem, removeItem, changeQuantity, clearCart, totalPrice };
};

export default useCart;
