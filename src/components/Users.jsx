import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/users/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(result.data.users);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/users/${id}`;
      const result = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setError("User Deleted Successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/users`;
      const result = await axios.post(url, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setError("User added succesfully");
      fetchUsers();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setForm({
      ...form,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/users/${editId}`;
      const result = await axios.patch(url, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchUsers();
      setEditId();
      resetForm();
      setError("User information updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      ...form,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">User Management</h2>
      {error && <p className="mb-2 text-red-500">{error}</p>}
      <div className="mb-4">
        <form ref={frmRef} className="space-y-2 flex flex-col sm:flex-row sm:flex-wrap gap-3">
          <input
            name="firstName"
            value={form.firstName}
            type="text"
            placeholder="First Name"
            onChange={handleChange}
            required
            className="p-2 border rounded w-full sm:w-40"
          />
          <input
            name="lastName"
            value={form.lastName}
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            required
            className="p-2 border rounded w-full sm:w-40"
          />
          <input
            name="email"
            value={form.email}
            type="text"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="p-2 border rounded w-full sm:w-52"
          />
          <input
            name="password"
            value={form.password}
            type="password"
            placeholder="New Password"
            onChange={handleChange}
            required
            className="p-2 border rounded w-full sm:w-52"
          />
          <select
            name="role"
            value={form.role}
            required
            onChange={handleChange}
            className="p-2 border rounded w-full sm:w-36"
          >
            <option value="">--Select Role--</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* <input
            name="role"
            value={form.role}
            type="text"
            onChange={handleChange}
            placeholder="Role"
          /> */}

          {editId ? (
            <>
              <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
                Update
              </button>
              <button onClick={handleCancel} className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={handleAdd} className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700">
              Add
            </button>
          )}
        </form>
      </div>
      <div className="mb-4">
        <input
          type="text"
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search..."
          className="p-2 border rounded mr-2"
        />
        <button onClick={() => fetchUsers()} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 border">First Name</th>
              <th className="px-3 py-2 border">Last Name</th>
              <th className="px-3 py-2 border">Email Address</th>
              <th className="px-3 py-2 border">Role</th>
              <th className="px-3 py-2 border">Actions</th>
            </tr>
          </thead>
          {users.map((value) => (
            <tbody key={value._id}>
              <tr className="text-center">
                <td className="px-3 py-2 border">{value.firstName}</td>
                <td className="px-3 py-2 border">{value.lastName}</td>
                <td className="px-3 py-2 border">{value.email}</td>
                <td className="px-3 py-2 border">{value.role}</td>
                <td className="px-3 py-2 border space-x-2">
                  <button onClick={() => handleEdit(value)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(value._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
