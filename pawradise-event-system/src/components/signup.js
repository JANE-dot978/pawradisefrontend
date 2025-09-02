// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user"); // default role
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//      const res = await fetch("http://localhost:4000/api/users/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password, role }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", data.user.role);

//         // 🔹 Redirect by role
//         if (data.user.role === "admin") {
//           navigate("/AdminDashboard");
//         } else if (data.user.role === "employer") {
//           navigate("/EmployerDashboard");
//         } else {
//           navigate("/UserDashboard");
//         }
//       } else {
//         alert(data.message || "Signup failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form
//         onSubmit={handleSignup}
//         className="bg-white p-6 rounded-xl shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full p-2 mb-3 border rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-3 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-3 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         {/* Role selection */}
//         <select
//           className="w-full p-2 mb-3 border rounded"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="user">User</option>
//           <option value="employer">Employer</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           Signup
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Signup;
  // import React from "react";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.message || "Signup successful! Please login.");
      onClose();
      navigate("/login"); // 🔹 go to login after signup
    } catch (err) {
      console.error(err);
      alert("Signup error!");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Signup;

// import React, { useState } from 'react';
// import React, { useState } from "react";

// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user'); // default role
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const res = await fetch('http://localhost:4000/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password, role }),
//       });

//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) {
//         throw new Error(data?.message || `Registration failed (${res.status})`);
//       }

//       setSuccess('Account created successfully — redirecting to login...');
//       setTimeout(() => navigate('/login'), 1500);
//     } catch (err) {
//       console.error('Signup error:', err);
//       setError(err.message || 'Registration error');
//     }
//   };

//   return (
//     <section className="bg-gray-100 min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

//         {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
//         {success && <div className="text-green-600 mb-4 text-center">{success}</div>}

//         <form onSubmit={handleSubmit}>
//           {/* Name */}
//           <div className="mb-4">
//             <label className="block mb-1">Full Name</label>
//             <input
//               type="text"
//               value={name}
//               required
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Your full name"
//               className="w-full px-4 py-2 border border-blue-600 rounded-md focus:ring-2 focus:ring-blue-600"
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-4">
//             <label className="block mb-1">Email</label>
//             <input
//               type="email"
//               value={email}
//               required
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Your email"
//               className="w-full px-4 py-2 border border-blue-600 rounded-md focus:ring-2 focus:ring-blue-600"
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label className="block mb-1">Password</label>
//             <input
//               type="password"
//               value={password}
//               required
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Your password"
//               className="w-full px-4 py-2 border border-blue-600 rounded-md focus:ring-2 focus:ring-blue-600"
//             />
//           </div>

//           {/* Role */}
//           <div className="mb-6">
//             <label className="block mb-1">Role</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full px-4 py-2 border border-blue-600 rounded-md focus:ring-2 focus:ring-blue-600"
//             >
//               <option value="user">User</option>
//               <option value="employee">Employee</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-blue-700 w-full"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="mt-4 text-center">
//           Already have an account?{" "}
//           <button
//             type="button"
//             onClick={() => navigate('/login')}
//             className="text-blue-600 underline"
//           >
//             Go to Login
//           </button>
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Signup;
