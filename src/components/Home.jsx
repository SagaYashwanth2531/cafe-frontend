import React, { useContext } from "react";
import { Link } from "react-router-dom";
import App, { AppContext } from "../App";

export default function Home() {
  const { user } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero / Welcome */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4 text-center shadow">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          MERN Frontend
        </h1>
        <p className="mt-4 text-lg opacity-90">
          Welcome{user?.firstName ? `, ${user.firstName}` : ""}! Shop, manage orders, and update your profile.
        </p>
      </section>

      {/* Quick Nav Actions */}
      <section className="max-w-4xl w-full mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link
          to="/cart"
          className="group bg-white p-6 rounded-lg shadow hover:shadow-lg border border-transparent hover:border-indigo-300 transition"
        >
          <h3 className="text-xl font-semibold text-indigo-700 group-hover:text-indigo-800">
            My Cart
          </h3>
          <p className="text-sm text-gray-500 mt-1">View & update items.</p>
        </Link>

        <Link
          to="/order"
          className="group bg-white p-6 rounded-lg shadow hover:shadow-lg border border-transparent hover:border-indigo-300 transition"
        >
          <h3 className="text-xl font-semibold text-indigo-700 group-hover:text-indigo-800">
            My Orders
          </h3>
          <p className="text-sm text-gray-500 mt-1">Track your past orders.</p>
        </Link>

        {user?.token ? (
          <Link
            to="/profile"
            className="group bg-white p-6 rounded-lg shadow hover:shadow-lg border border-transparent hover:border-indigo-300 transition"
          >
            <h3 className="text-xl font-semibold text-indigo-700 group-hover:text-indigo-800">
              Profile
            </h3>
            <p className="text-sm text-gray-500 mt-1">Update your info.</p>
          </Link>
        ) : (
          <Link
            to="/login"
            className="group bg-white p-6 rounded-lg shadow hover:shadow-lg border border-transparent hover:border-indigo-300 transition"
          >
            <h3 className="text-xl font-semibold text-indigo-700 group-hover:text-indigo-800">
              Login
            </h3>
            <p className="text-sm text-gray-500 mt-1">Sign in to continue.</p>
          </Link>
        )}

        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="group bg-white p-6 rounded-lg shadow hover:shadow-lg border border-transparent hover:border-indigo-300 transition sm:col-span-2 md:col-span-1"
          >
            <h3 className="text-xl font-semibold text-indigo-700 group-hover:text-indigo-800">
              Admin Panel
            </h3>
            <p className="text-sm text-gray-500 mt-1">Manage users, products & orders.</p>
          </Link>
        )}
      </section>
    </div>
  );
}
