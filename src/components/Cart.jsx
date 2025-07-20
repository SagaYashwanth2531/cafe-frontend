import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => sum + value.qty * value.price, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      const result = await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">My Cart</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="space-y-4">
        {cart &&
          cart.map(
            (value) =>
              value.qty > 0 && (
                <li
                  key={value._id}
                  className="bg-white shadow p-4 rounded flex justify-between items-center"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                      {value.productName}
                    </span>
                    <span className="text-sm text-gray-500">
                      ₹{value.price} x {value.qty} = ₹
                      {value.price * value.qty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrement(value._id, value.qty)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      -
                    </button>
                    <span className="px-2">{value.qty}</span>
                    <button
                      onClick={() => increment(value._id, value.qty)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                </li>
              )
          )}
      </ul>

      <h5 className="text-xl font-medium mt-6">
        Order Value: ₹{orderValue}
      </h5>

      <div className="mt-4">
        {user?.token ? (
          <button
            onClick={placeOrder}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Place Order
          </button>
        ) : (
          <button
            onClick={() => Navigate("/login")}
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
          >
            Login to Order
          </button>
        )}
      </div>
    </div>
  );
}
