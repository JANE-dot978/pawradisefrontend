import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
     const res = await fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        // 🔹 Redirect by role
        if (data.user.role === "admin") {
          navigate("/AdminDashboard");
        } else if (data.user.role === "employer") {
          navigate("/EmployerDashboard");
        } else {
          navigate("/UserDashboard");
        }
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-3 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Role selection */}
        <select
          className="w-full p-2 mb-3 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="employer">Employer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
