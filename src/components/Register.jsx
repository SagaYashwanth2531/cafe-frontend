import React, { useState } from 'react';
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      const url = "https://cafe-backend-alpha-one.vercel.app/api/users/register"; 
      const result = await axios.post(url, user);
      setError("Data saved successfully");
      console.log("Sent User:", user);
      console.log("Server Response:", result.data);
    } catch (err) {
      console.log("Error:", err);
      setError("Something went wrong");
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <p style={{ color: error.includes("wrong") ? "red" : "green" }}>{error}</p>
      
      <p>
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
      </p>

      <p>
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
      </p>

      <p>
        <input
          type="text"
          placeholder="Email Address"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </p>

      <p>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </p>

      <button onClick={handleClick}>Submit</button>
    </div>
  );
}
