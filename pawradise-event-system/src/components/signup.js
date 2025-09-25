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

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:4000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       alert(data.message || "Signup successful! Please login.");
//       onClose();
//       navigate("/login"); // 🔹 go to login after signup
//     } catch (err) {
//       console.error(err);
//       alert("Signup error!");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             className="w-full border px-3 py-2 rounded"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="w-full border px-3 py-2 rounded"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="w-full border px-3 py-2 rounded"
//             onChange={handleChange}
//             required
//           />
//           <select
//             name="role"
//             className="w-full border px-3 py-2 rounded"
//             onChange={handleChange}
//           >
//             <option value="user">User</option>
//             <option value="employee">Employee</option>
//             <option value="admin">Admin</option>
//           </select>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Sign Up
//           </button>
//         </form>
//         <button
//           onClick={onClose}
//           className="mt-4 text-gray-500 hover:text-gray-700"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:4000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.status === 201 || res.status === 200) {
//         alert(data.message || "Signup successful! Please login.");
//         setFormData({ name: "", email: "", password: "", role: "user" }); // ✅ clear form
//         navigate("/login"); // ✅ go to login page
//       } else {
//         alert(data.message || "Signup failed!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Signup error!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             className="w-full border px-3 py-2 rounded"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="w-full border px-3 py-2 rounded"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="w-full border px-3 py-2 rounded"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <select
//             name="role"
//             className="w-full border px-3 py-2 rounded"
//             value={formData.role}
//             onChange={handleChange}
//           >
//             <option value="user">User</option>
//             <option value="employee">Employee</option>
//             <option value="admin">Admin</option>
//           </select>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm">
//           Already have an account?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="text-blue-600 cursor-pointer hover:underline"
//           >
//             Login here
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// src/components/Signup.js
// src/components/Signup.js
// src/components/Signup.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       console.log("📤 Sending signup data:", formData);

//       const res = await axios.post("http://localhost:4000/api/auth/register", {
//         ...formData,
//         role: "user", // ✅ only normal user
//       });

//       console.log("✅ Backend response:", res.data);

//       if (res.status === 201 || res.status === 200) {
//         alert("✅ Registration successful! Redirecting to login...");
//         // ✅ give React Router time to update
//         setTimeout(() => {
//           navigate("/login", { replace: true });
//         }, 500);
//       }
//     } catch (err) {
//       console.error("❌ Signup error:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Registration failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border rounded-lg"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border rounded-lg"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border rounded-lg"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition"
//           >
//             {loading ? "Registering..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-center text-gray-600 mt-4">
//           Already have an account?{" "}
//           <button
//             type="button"
//             onClick={() => navigate("/login")}
//             className="text-pink-600 hover:underline"
//           >
//             Login
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", {
        ...formData,
        role: "user",
      });

      if (res.status === 201 || res.status === 200) {
        alert("✅ Registration successful! Redirecting to login...");
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("❌ Signup error:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || "Registration failed!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join us to get started</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={goToLogin}
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;