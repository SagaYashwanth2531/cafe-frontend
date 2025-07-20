import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <header className="bg-indigo-700 text-white p-4 shadow flex flex-wrap justify-between items-center">
      <h1 className="text-xl font-bold tracking-wide">MERN Frontend</h1>

      <nav className="flex gap-4 flex-wrap mt-2 sm:mt-0">
        <Link to="/" className="hover:text-yellow-300 font-medium">Home</Link>
        <Link to="/cart" className="hover:text-yellow-300 font-medium">MyCart</Link>
        <Link to="/order" className="hover:text-yellow-300 font-medium">MyOrder</Link>
        {user?.role === "admin" && (
          <Link to="/admin" className="hover:text-yellow-300 font-medium">Admin</Link>
        )}
        {user?.token ? (
          <Link to="/profile" className="hover:text-yellow-300 font-medium">Profile</Link>
        ) : (
          <Link to="/login" className="hover:text-yellow-300 font-medium">Login</Link>
        )}
      </nav>
    </header>
  );
}
