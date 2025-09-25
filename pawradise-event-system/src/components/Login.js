// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:4000/api/auth/login", {
//         email,
//         password,
//       });

//       const { token, role } = res.data;

//       // Store token & role
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);

//       // Redirect based on role
//       if (role === "admin") {
//         navigate("/admin-dashboard");
//       } else if (role === "employee") {
//         navigate("/employee-dashboard");
//       } else {
//         navigate("/events");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//       <form
//         onSubmit={handleLogin}
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "10px",
//           padding: "20px",
//           border: "1px solid #ccc",
//           borderRadius: "8px",
//           backgroundColor: "#f9f9f9",
//           width: "300px"
//         }}
//       >
//         <h2 style={{ textAlign: "center" }}>Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{ padding: "10px" }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ padding: "10px" }}
//         />
//         <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
// src/components/Login.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login({ onClose, onSuccess }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
//   const navigate = useNavigate();

//   const API_BASE =
//     process.env.REACT_APP_API_URL || "http://localhost:4000/api/users/login";

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrMsg("");

//     try {
//       const { data } = await axios.post(`${API_BASE}/api/auth/login`, {
//         email,
//         password,
//       });

//       // Your backend sends: { message, token, role, user: {...} }
//       const token = data?.token;
//       const user = data?.user;
//       const role = data?.role ?? data?.user?.role;

//       if (!token || !role) {
//         throw new Error("Invalid response from server");
//       }

//       // Persist
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);
//       if (user) localStorage.setItem("user", JSON.stringify(user));

//       // Optional callbacks (for modal usage)
//       if (typeof onSuccess === "function") onSuccess({ token, role, user });
//       if (typeof onClose === "function") onClose();

//       // If used as a full page, navigate here
//       if (!onClose) {
//         if (role === "admin") navigate("/AdminDashboard");
//         else if (role === "employee") navigate("/EmployeeDashboard");
//         else navigate("/Events");
//       }
//     } catch (err) {
//       const msg =
//         err?.response?.data?.message ||
//         err?.message ||
//         "Login failed";
//       setErrMsg(msg);
//       console.error("Login error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <form
//         onSubmit={handleLogin}
//         className="flex flex-col gap-4 p-6 border border-gray-200 rounded-lg bg-white shadow w-full max-w-sm"
//       >
//         <h2 className="text-center text-2xl font-bold">Login</h2>

//         {errMsg ? (
//           <div className="text-red-600 text-sm text-center">{errMsg}</div>
//         ) : null}

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="p-2 border rounded"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="p-2 border rounded"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const url = 'http://localhost:4000/api/users/login'; 
//       console.log('Posting login to', url, { email, password: password ? '*' : '' });

//       const res = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const text = await res.text().catch(() => '');
//       let data;
//       try { data = JSON.parse(text); } catch { data = text; }
//       console.log('Login response', res.status, data);

//       if (!res.ok) {
//         const msg =
//           (data && (data.message || data.error || data.error?.message)) ||
//           `Login failed (${res.status})`;
//         throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
//       }

//       const token = data?.token || data?.data?.token || data?.accessToken || null;
//       let user = data?.user || data?.data?.user || data?.payload?.user || null;

//       if (!user && data && typeof data === 'object') {
//         for (const k of ['user', 'result', 'data']) {
//           if (data[k] && typeof data[k] === 'object' && (data[k].email || data[k].name || data[k].role)) {
//             user = data[k];
//             break;
//           }
//         }
//       }

//       if (!user) {
//         user = data;
//       }

//       if (token) localStorage.setItem('token', token);
//       if (user) {
//         localStorage.setItem('user', JSON.stringify(user));
//         window.dispatchEvent(new Event('user-changed'));
//       }

//       navigate('/events');
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(err.message || 'Login failed');
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-1">Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block mb-1">Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//           </div>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-xl font-medium hover:bg-blue-700 w-full" type="submit">
//             Login
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };


// // export default Login;
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const LoginCard = ({ setIsAuthenticated }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:4000/api/auth/login", {
//         email,
//         password,
//       });

//       console.log("Login response:", res.data);

//       // Save token
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       // ✅ Update authentication state
//       setIsAuthenticated(true);

//       // ✅ Navigate based on role
//       if (res.data.role === "admin") {
//         navigate("/admin-dashboard");
//       } else if (res.data.role === "employee") {
//         navigate("/employee-dashboard");
//       } else {
//         navigate("/user-dashboard");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="absolute top-5 right-5 bg-white shadow-lg p-6 rounded-xl w-80">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 rounded-md"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 rounded-md"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginCard;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const LoginCard = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(true); // ✅ controls visibility
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:4000/api/auth/login", {
//         email,
//         password,
//       });

//       console.log("✅ Login response:", res.data);

//       // Save token + role
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       // Update authentication state
//       if (onLogin) onLogin();

//       // ✅ Hide form after successful login
//       setShowForm(false);

//       // Redirect based on role
//       if (res.data.role === "admin") {
//         navigate("/admin");
//       } else if (res.data.role === "employee") {
//         navigate("/employee");
//       } else {
//         navigate("/events");
//       }
//     } catch (err) {
//       console.error("❌ Login error:", err);

//       if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     }
//   };

//   // ✅ Don't render if form is hidden
//   if (!showForm) return null;

//   return (
//     <div className="absolute top-5 right-5 bg-white shadow-lg p-6 rounded-xl w-80">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 rounded-md"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 rounded-md"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginCard;

// src/components/Login.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const LoginCard = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(true);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:4000/api/auth/login", {
//         email,
//         password,
//       });

//       // ✅ Extract user data properly from backend response
//       const token = res.data.token;
//       const role = res.data.user?.role || "user";
//       const userId = res.data.user?.id || res.data.user?._id || null;
//       const userEmail = res.data.user?.email || email;

//       // Save token & role (legacy compatibility)
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);

//       // ✅ Save full user object consistently
//       const userObj = {
//         id: userId,
//         email: userEmail,
//         role,
//         token,
//       };
//       localStorage.setItem("user", JSON.stringify(userObj));

//       // Inform parent that login succeeded
//       if (onLogin) onLogin();

//       // Hide the form after login
//       setShowForm(false);

//       // ✅ Redirect based on role
//       if (role === "admin") {
//         navigate("/admin");
//       } else if (role === "employee") {
//         navigate("/employee");
//       } else {
//         navigate("/events");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     }
//   };

//   if (!showForm) return null;

//   return (
//     <div className="absolute top-5 right-5 bg-white shadow-lg p-6 rounded-xl w-80">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 rounded-md"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 rounded-md"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginCard;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:4000/api/auth/login", {
//         email,
//         password,
//       });

//       const token = res.data.token;
//       const role = res.data.user?.role || "user";
//       const userId = res.data.user?.id || res.data.user?._id || null;
//       const userEmail = res.data.user?.email || email;

//       // Save to localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);
//       localStorage.setItem("user", JSON.stringify({
//         id: userId,
//         email: userEmail,
//         role,
//         token,
//       }));

//       // Inform parent that login succeeded
//       if (onLogin) onLogin();

//       // Redirect based on role
//       if (role === "admin") {
//         navigate("/admin");
//       } else if (role === "employee") {
//         navigate("/employee");
//       } else {
//         navigate("/events");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border rounded-lg"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border rounded-lg"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, onLoginSuccess }) => { // Changed prop name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      const role = res.data.user?.role || "user";
      const userId = res.data.user?.id || res.data.user?._id || null;
      const userEmail = res.data.user?.email || email;
      const userName = res.data.user?.name || "User"; // CRUCIAL: Added name

      // Save to localStorage - INCLUDING NAME
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify({
        id: userId,
        email: userEmail,
        name: userName, // This is what the navbar needs
        role,
        token,
      }));

      // Inform parent that login succeeded with user data
      if (onLoginSuccess) {
        onLoginSuccess({
          id: userId,
          email: userEmail,
          name: userName,
          role,
          token
        });
      }

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "employee") {
        navigate("/employee");
      } else {
        navigate("/events");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Demo hint */}
        <p className="text-center text-gray-600 mt-4 text-sm">
          For demo: Use your registered credentials
        </p>

        {/* Close button for modal */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;