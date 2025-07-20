import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const { cart, setCart } = useContext(AppContext);

  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.qty = 1;
      setCart([...cart, product]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Our Products</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products &&
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <img
                src={product.imgUrl}
                alt={product.productName}
                className="w-32 h-32 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                {product.productName}
              </h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>
              <h4 className="text-md font-bold text-green-600 mb-4">
                ₹{product.price}
              </h4>
              <button
                onClick={() => addToCart(product)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
