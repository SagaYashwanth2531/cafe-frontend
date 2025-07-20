import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-700 text-white p-4 flex justify-center gap-6 shadow-md">
        <Link to="/admin" className="hover:text-yellow-300 font-medium">Users</Link>
        <Link to="/admin/products" className="hover:text-yellow-300 font-medium">Products</Link>
        <Link to="/admin/orders" className="hover:text-yellow-300 font-medium">Orders</Link>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
