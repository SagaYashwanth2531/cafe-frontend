import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h3 className="text-2xl font-bold text-indigo-700 mb-6">My Orders</h3>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {orders &&
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded p-4 mb-6 border border-gray-200"
          >
            <p className="font-semibold text-gray-800">
              <span className="text-indigo-600">Order ID:</span> {order._id}
            </p>
            <p className="text-gray-600">Order Value: ₹{order.orderValue}</p>
            <p className="text-gray-600 mb-2">Status: {order.status}</p>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-center border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-4 py-2">Product</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Quantity</th>
                    <th className="border px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{item.productName}</td>
                      <td className="border px-4 py-2">₹{item.price}</td>
                      <td className="border px-4 py-2">{item.qty}</td>
                      <td className="border px-4 py-2">₹{item.qty * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </div>
  );
}
