
// import React, { useState } from "react";

// export default function AdminDashboard() {
//   const [event, setEvent] = useState({
//     title: "",
//     description: "",
//     date: "",
//     location: "",
//     price: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEvent({ ...event, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:4000/api/events", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(event),
//       });

//       if (response.ok) {
//         setMessage("Event created successfully!");
//         setEvent({ title: "", description: "", date: "", location: "", price: "" });
//       } else {
//         setMessage("Failed to create event.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Server error. Try again.");
//     }
//   };

//   return (
//     <div className="p-8 max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Admin Dashboard - Create Event</h2>

//       <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-lg rounded-lg p-6">
//         <input
//           type="text"
//           name="title"
//           placeholder="Event Title"
//           value={event.title}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Event Description"
//           value={event.description}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="date"
//           name="date"
//           value={event.date}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={event.location}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price (KES)"
//           value={event.price}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
//           Add Event
//         </button>
//       </form>

//       {message && <p className="mt-4 text-center text-green-600">{message}</p>}
//     </div>
//   );
// }

//hhhhhhhhhh
// import React, { useState, useEffect } from "react";

// export default function AdminDashboard() {
//   const [view, setView] = useState("create");
//   const [events, setEvents] = useState([]);
//   const [event, setEvent] = useState({
//     title: "",
//     description: "",
//     date: "",
//     location: "",
//     price: "",
//     imageUrl: "",
//   });
//   const [editEvent, setEditEvent] = useState(null);
//   const [message, setMessage] = useState("");

//   // Fetch events
//   // const fetchEvents = async () => {
//   //   try {
//   //     const res = await fetch("http://localhost:4000/api/events");
//   //     const data = await res.json();
//   //     setEvents(data);
//   //   } catch (err) {
//   //     console.error("Failed to fetch events", err);
//   //   }
//   // };
//   const fetchEvents = async () => {
//   try {
//     const res = await fetch("http://localhost:4000/api/events");
//     const data = await res.json();

//     // ✅ Sort events by date ascending before saving
//     const sortedEvents = data.sort(
//       (a, b) => new Date(a.date) - new Date(b.date)
//     );

//     setEvents(sortedEvents);
//   } catch (err) {
//     console.error("Failed to fetch events", err);
//   }
// };


//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     editEvent
//       ? setEditEvent({ ...editEvent, [name]: value })
//       : setEvent({ ...event, [name]: value });
//   };

//   // Create event
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:4000/api/events", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(event),
//       });

//       if (response.ok) {
//         setMessage("✅ Event created successfully!");
//         setEvent({
//           title: "",
//           description: "",
//           date: "",
//           location: "",
//           price: "",
//           imageUrl: "",
//         });
//         fetchEvents();
//       } else {
//         setMessage("❌ Failed to create event.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("⚠️ Server error. Try again.");
//     }
//   };

//   // Update event
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `http://localhost:4000/api/events/${editEvent._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(editEvent),
//         }
//       );

//       if (response.ok) {
//         setMessage("✏️ Event updated successfully!");
//         setEditEvent(null);
//         fetchEvents();
//       } else {
//         setMessage("❌ Failed to update event.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("⚠️ Server error. Try again.");
//     }
//   };

//   // Delete event
//   const handleDelete = async (id) => {
//     try {
//       await fetch(`http://localhost:4000/api/events/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setMessage("🗑️ Event deleted");
//       fetchEvents();
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Failed to delete");
//     }
//   };

//   return (
//     <div className="flex h-screen mt-20"> 
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-900 text-white p-6">
//         <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
//         <ul className="space-y-4">
//           <li>
//             <button
//               onClick={() => {
//                 setView("create");
//                 setEditEvent(null);
//               }}
//               className={`w-full text-left ${
//                 view === "create" ? "text-blue-400" : ""
//               }`}
//             >
//               ➕ Create Event
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => {
//                 setView("manage");
//                 setEditEvent(null);
//               }}
//               className={`w-full text-left ${
//                 view === "manage" ? "text-blue-400" : ""
//               }`}
//             >
//               📋 Manage Events
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setView("reviews")}
//               className={`w-full text-left ${
//                 view === "reviews" ? "text-blue-400" : ""
//               }`}
//             >
//               ⭐ Reviews
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8 bg-gray-100 overflow-y-auto mt-6">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h1 className="text-5xl font-bold">👋 Hello Admin</h1>
//           <p className="text-gray-600 text-3xl">
//             Welcome to your dashboard. Manage events, reviews, and more below.
//           </p>
//         </div>

//         {/* Create Event */}
//         {view === "create" && !editEvent && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Create Event</h2>
//             <form
//               onSubmit={handleSubmit}
//               className="space-y-4 bg-white shadow-lg rounded-lg p-6"
//             >
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Event Title"
//                 value={event.title}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <textarea
//                 name="description"
//                 placeholder="Event Description"
//                 value={event.description}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="date"
//                 name="date"
//                 value={event.date}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="location"
//                 placeholder="Location"
//                 value={event.location}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Price (KES)"
//                 value={event.price}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="imageUrl"
//                 placeholder="Image URL (https://...)"
//                 value={event.imageUrl}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />

//               {event.imageUrl && (
//                 <img
//                   src={event.imageUrl}
//                   alt="Preview"
//                   className="w-full h-48 object-cover rounded-lg border"
//                 />
//               )}

//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
//               >
//                 Add Event
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Edit Event */}
//         {editEvent && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Edit Event</h2>
//             <form
//               onSubmit={handleUpdate}
//               className="space-y-4 bg-white shadow-lg rounded-lg p-6"
//             >
//               <input
//                 type="text"
//                 name="title"
//                 value={editEvent.title}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <textarea
//                 name="description"
//                 value={editEvent.description}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="date"
//                 name="date"
//                 value={editEvent.date?.substring(0, 10)}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="location"
//                 value={editEvent.location}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="price"
//                 value={editEvent.price}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="imageUrl"
//                 value={editEvent.imageUrl}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />

//               {editEvent.imageUrl && (
//                 <img
//                   src={editEvent.imageUrl}
//                   alt="Preview"
//                   className="w-full h-48 object-cover rounded-lg border"
//                 />
//               )}

//               <button
//                 type="submit"
//                 className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
//               >
//                 Update Event
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Manage Events */}
//         {view === "manage" && !editEvent && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Manage Events</h2>
//             {events.length === 0 ? (
//               <p>No events available</p>
//             ) : (
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {events.map((ev) => (
//                   <div
//                     key={ev._id}
//                     className="bg-white shadow p-4 rounded-lg flex flex-col"
//                   >
//                     <img
//                       src={ev.imageUrl || "/default-event.jpg"}
//                       alt={ev.title}
//                       className="h-40 object-cover rounded"
//                     />
//                     <h3 className="font-bold mt-2">{ev.title}</h3>
//                     <p className="text-sm text-gray-600">{ev.description}</p>
//                     <p className="text-xs text-gray-500">
//                       {new Date(ev.date).toLocaleDateString()} - {ev.location}
//                     </p>

//                     <div className="flex gap-2 mt-3">
//                       <button
//                         onClick={() => setEditEvent(ev)}
//                         className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(ev._id)}
//                         className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Reviews */}
//         {view === "reviews" && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Reviews</h2>
//             <p className="text-gray-500">⭐ Review management coming soon...</p>
//           </div>
//         )}

//         {message && (
//           <p className="mt-4 text-center text-green-600 font-medium">
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// src/components/AdminDashboard.js
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const [view, setView] = useState("create");
//   const [events, setEvents] = useState([]);
//   const [event, setEvent] = useState({
//     title: "",
//     description: "",
//     date: "",
//     location: "",
//     price: "",
//     imageUrl: "",
//   });
//   const [editEvent, setEditEvent] = useState(null);
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate(); // for redirect on logout

//   // Fetch events
//   const fetchEvents = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/api/events");
//       const data = await res.json();

//       // Sort events by date ascending
//       const sortedEvents = data.sort(
//         (a, b) => new Date(a.date) - new Date(b.date)
//       );

//       setEvents(sortedEvents);
//     } catch (err) {
//       console.error("Failed to fetch events", err);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     editEvent
//       ? setEditEvent({ ...editEvent, [name]: value })
//       : setEvent({ ...event, [name]: value });
//   };

//   // Create event
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:4000/api/events", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(event),
//       });

//       if (response.ok) {
//         setMessage("✅ Event created successfully!");
//         setEvent({
//           title: "",
//           description: "",
//           date: "",
//           location: "",
//           price: "",
//           imageUrl: "",
//         });
//         fetchEvents();
//       } else {
//         setMessage("❌ Failed to create event.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("⚠️ Server error. Try again.");
//     }
//   };

//   // Update event
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `http://localhost:4000/api/events/${editEvent._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(editEvent),
//         }
//       );

//       if (response.ok) {
//         setMessage("✏️ Event updated successfully!");
//         setEditEvent(null);
//         fetchEvents();
//       } else {
//         setMessage("❌ Failed to update event.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("⚠️ Server error. Try again.");
//     }
//   };

//   // Delete event
//   const handleDelete = async (id) => {
//     try {
//       await fetch(`http://localhost:4000/api/events/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setMessage("🗑️ Event deleted");
//       fetchEvents();
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Failed to delete");
//     }
//   };

//   // Logout
//   const handleLogout = () => {
//     // remove any stored auth info you use across the app
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("user");
//     // navigate to login page
//     navigate("/login");
//   };

//   return (
//     <div className="flex h-screen mt-20">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
//         <div>
//           <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
//           <ul className="space-y-4">
//             <li>
//               <button
//                 onClick={() => {
//                   setView("create");
//                   setEditEvent(null);
//                 }}
//                 className={`w-full text-left ${
//                   view === "create" ? "text-blue-400" : ""
//                 }`}
//               >
//                 ➕ Create Event
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => {
//                   setView("manage");
//                   setEditEvent(null);
//                 }}
//                 className={`w-full text-left ${
//                   view === "manage" ? "text-blue-400" : ""
//                 }`}
//               >
//                 📋 Manage Events
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setView("reviews")}
//                 className={`w-full text-left ${
//                   view === "reviews" ? "text-blue-400" : ""
//                 }`}
//               >
//                 ⭐ Reviews
//               </button>
//             </li>
//           </ul>
//         </div>

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="mt-8 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full"
//         >
//           🚪 Logout
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8 bg-gray-100 overflow-y-auto mt-6">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h1 className="text-5xl font-bold">👋 Hello Admin</h1>
//           <p className="text-gray-600 text-3xl">
//             Welcome to your dashboard. Manage events, reviews, and more below.
//           </p>
//         </div>

//         {/* Create Event */}
//         {view === "create" && !editEvent && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Create Event</h2>
//             <form
//               onSubmit={handleSubmit}
//               className="space-y-4 bg-white shadow-lg rounded-lg p-6"
//             >
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Event Title"
//                 value={event.title}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <textarea
//                 name="description"
//                 placeholder="Event Description"
//                 value={event.description}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="date"
//                 name="date"
//                 value={event.date}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="location"
//                 placeholder="Location"
//                 value={event.location}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Price (KES)"
//                 value={event.price}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="imageUrl"
//                 placeholder="Image URL (https://...)"
//                 value={event.imageUrl}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />

//               {event.imageUrl && (
//                 <img
//                   src={event.imageUrl}
//                   alt="Preview"
//                   className="w-full h-48 object-cover rounded-lg border"
//                 />
//               )}

//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
//               >
//                 Add Event
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Edit Event */}
//         {editEvent && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Edit Event</h2>
//             <form
//               onSubmit={handleUpdate}
//               className="space-y-4 bg-white shadow-lg rounded-lg p-6"
//             >
//               <input
//                 type="text"
//                 name="title"
//                 value={editEvent.title}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <textarea
//                 name="description"
//                 value={editEvent.description}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="date"
//                 name="date"
//                 value={editEvent.date?.substring(0, 10)}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="location"
//                 value={editEvent.location}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="price"
//                 value={editEvent.price}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="imageUrl"
//                 value={editEvent.imageUrl}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />

//               {editEvent.imageUrl && (
//                 <img
//                   src={editEvent.imageUrl}
//                   alt="Preview"
//                   className="w-full h-48 object-cover rounded-lg border"
//                 />
//               )}

//               <button
//                 type="submit"
//                 className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
//               >
//                 Update Event
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Manage Events */}
//         {view === "manage" && !editEvent && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Manage Events</h2>
//             {events.length === 0 ? (
//               <p>No events available</p>
//             ) : (
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {events.map((ev) => (
//                   <div
//                     key={ev._id}
//                     className="bg-white shadow p-4 rounded-lg flex flex-col"
//                   >
//                     <img
//                       src={ev.imageUrl || "/default-event.jpg"}
//                       alt={ev.title}
//                       className="h-40 object-cover rounded"
//                     />
//                     <h3 className="font-bold mt-2">{ev.title}</h3>
//                     <p className="text-sm text-gray-600">{ev.description}</p>
//                     <p className="text-xs text-gray-500">
//                       {new Date(ev.date).toLocaleDateString()} - {ev.location}
//                     </p>

//                     <div className="flex gap-2 mt-3">
//                       <button
//                         onClick={() => setEditEvent(ev)}
//                         className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(ev._id)}
//                         className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Reviews */}
//         {view === "reviews" && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Reviews</h2>
//             <p className="text-gray-500">⭐ Review management coming soon...</p>
//           </div>
//         )}

//         {message && (
//           <p className="mt-4 text-center text-green-600 font-medium">
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const [view, setView] = useState("create");
//   const [events, setEvents] = useState([]);
//   const [event, setEvent] = useState({
//     title: "",
//     description: "",
//     date: "",
//     location: "",
//     price: "",
//     image: "", // CHANGED: imageUrl → image
//   });
//   const [editEvent, setEditEvent] = useState(null);
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   // Fetch events
//   const fetchEvents = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/api/events");
//       const data = await res.json();
//       const sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date));
//       setEvents(sortedEvents);
//     } catch (err) {
//       console.error("Failed to fetch events", err);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     editEvent
//       ? setEditEvent({ ...editEvent, [name]: value })
//       : setEvent({ ...event, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:4000/api/events", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(event),
//       });

//       if (response.ok) {
//         setMessage("✅ Event created successfully!");
//         setEvent({ title: "", description: "", date: "", location: "", price: "", image: "" });
//         fetchEvents();
//       } else {
//         setMessage("❌ Failed to create event.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("⚠️ Server error. Try again.");
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `http://localhost:4000/api/events/${editEvent._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(editEvent),
//         }
//       );

//       if (response.ok) {
//         setMessage("✏️ Event updated successfully!");
//         setEditEvent(null);
//         fetchEvents();
//       } else {
//         setMessage("❌ Failed to update event.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("⚠️ Server error. Try again.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await fetch(`http://localhost:4000/api/events/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setMessage("🗑️ Event deleted");
//       fetchEvents();
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Failed to delete");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div className="flex h-screen mt-20">
//       <div className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
//         <div>
//           <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
//           <ul className="space-y-4">
//             <li><button onClick={() => { setView("create"); setEditEvent(null); }} className={`w-full text-left ${view === "create" ? "text-blue-400" : ""}`}>➕ Create Event</button></li>
//             <li><button onClick={() => { setView("manage"); setEditEvent(null); }} className={`w-full text-left ${view === "manage" ? "text-blue-400" : ""}`}>📋 Manage Events</button></li>
//             <li><button onClick={() => setView("reviews")} className={`w-full text-left ${view === "reviews" ? "text-blue-400" : ""}`}>⭐ Reviews</button></li>
//           </ul>
//         </div>
//         <button onClick={handleLogout} className="mt-8 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full">🚪 Logout</button>
//       </div>

//       <div className="flex-1 p-8 bg-gray-100 overflow-y-auto mt-6">
//         <div className="mb-8">
//           <h1 className="text-5xl font-bold">👋 Hello Admin</h1>
//           <p className="text-gray-600 text-3xl">Welcome to your dashboard. Manage events, reviews, and more below.</p>
//         </div>

//         {view === "create" && !editEvent && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Create Event</h2>
//             <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-lg rounded-lg p-6">
//               <input type="text" name="title" placeholder="Event Title" value={event.title} onChange={handleChange} className="w-full border p-2 rounded" required />
//               <textarea name="description" placeholder="Event Description" value={event.description} onChange={handleChange} className="w-full border p-2 rounded" required />
//               <input type="date" name="date" value={event.date} onChange={handleChange} className="w-full border p-2 rounded" required />
//               <input type="text" name="location" placeholder="Location" value={event.location} onChange={handleChange} className="w-full border p-2 rounded" required />
//               <input type="number" name="price" placeholder="Price (KES)" value={event.price} onChange={handleChange} className="w-full border p-2 rounded" required />
//               <input type="text" name="image" placeholder="Image URL (https://...)" value={event.image} onChange={handleChange} className="w-full border p-2 rounded" /> {/* CHANGED: imageUrl → image */}

//               {event.image && (
//                 <img src={event.image} alt="Preview" className="w-full h-48 object-cover rounded-lg border" onError={(e) => { e.target.style.display = 'none'; }} /> // CHANGED: imageUrl → image
//               )}

//               <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">Add Event</button>
//             </form>
//           </div>
//         )}

//         {editEvent && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Edit Event</h2>
//             <form onSubmit={handleUpdate} className="space-y-4 bg-white shadow-lg rounded-lg p-6">
//               <input type="text" name="title" value={editEvent.title} onChange={handleChange} className="w-full border p-2 rounded" required />
//               <textarea name="description" value={editEvent.description} onChange={handleChange} className="w-full border p-2 rounded" required />
//               <input type="date" name="date" value={editEvent.date?.substring(0, 10)} onChange={handleChange} className="w-full border p-2 rounded" required />
//               <input type="text" name="location" value={editEvent.location} onChange={handleChange} className="w-full border p-2 rounded" required />
//               <input type="number" name="price" value={editEvent.price} onChange={handleChange} className="w-full border p-2 rounded" required />
//               <input type="text" name="image" value={editEvent.image} onChange={handleChange} className="w-full border p-2 rounded" /> {/* CHANGED: imageUrl → image */}

//               {editEvent.image && (
//                 <img src={editEvent.image} alt="Preview" className="w-full h-48 object-cover rounded-lg border" onError={(e) => { e.target.style.display = 'none'; }} /> // CHANGED: imageUrl → image
//               )}

//               <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700">Update Event</button>
//             </form>
//           </div>
//         )}

//         {view === "manage" && !editEvent && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Manage Events</h2>
//             {events.length === 0 ? <p>No events available</p> : (
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {events.map((ev) => (
//                   <div key={ev._id} className="bg-white shadow p-4 rounded-lg flex flex-col">
//                     <img
//                       src={ev.image || "/default-event.jpg"}
//                       alt={ev.title}
//                       className="h-40 object-cover rounded"
//                       onError={(e) => {
//                         e.target.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80";
//                       }}
//                     />
//                     <h3 className="font-bold mt-2">{ev.title}</h3>
//                     <p className="text-sm text-gray-600">{ev.description}</p>
//                     <p className="text-xs text-gray-500">{new Date(ev.date).toLocaleDateString()} - {ev.location}</p>
//                     <div className="flex gap-2 mt-3">
//                       <button onClick={() => setEditEvent(ev)} className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
//                       <button onClick={() => handleDelete(ev._id)} className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {view === "reviews" && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Reviews</h2>
//             <p className="text-gray-500">⭐ Review management coming soon...</p>
//           </div>
//         )}

//         {message && <p className="mt-4 text-center text-green-600 font-medium">{message}</p>}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [view, setView] = useState("create");
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    capacity: "",
    image: "",
  });
  const [editEvent, setEditEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRevenue: 0,
    totalTicketsSold: 0,
    upcomingEvents: 0
  });

  const navigate = useNavigate();

  // Calculate statistics
  const calculateStats = useCallback((events) => {
    const totalRevenue = events.reduce((sum, event) => sum + (event.ticketsSold || 0) * event.price, 0);
    const totalTicketsSold = events.reduce((sum, event) => sum + (event.ticketsSold || 0), 0);
    const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).length;
    
    setStats({
      totalEvents: events.length,
      totalRevenue,
      totalTicketsSold,
      upcomingEvents
    });
  }, []);

  // Fetch events with useCallback to prevent infinite re-renders
  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:4000/api/events");
      const data = await res.json();
      const sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(sortedEvents);
      
      // Calculate statistics
      calculateStats(sortedEvents);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  }, [calculateStats]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]); // Now fetchEvents is included in the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    editEvent
      ? setEditEvent({ ...editEvent, [name]: value })
      : setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert capacity to number, default to 0 (unlimited) if empty
      const eventData = {
        ...event,
        capacity: event.capacity ? parseInt(event.capacity) : 0
      };

      const response = await fetch("http://localhost:4000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        setMessage("✅ Event created successfully!");
        setEvent({ title: "", description: "", date: "", location: "", price: "", capacity: "", image: "" });
        fetchEvents();
      } else {
        setMessage("❌ Failed to create event.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error. Try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Convert capacity to number
      const eventData = {
        ...editEvent,
        capacity: editEvent.capacity ? parseInt(editEvent.capacity) : 0
      };

      const response = await fetch(
        `http://localhost:4000/api/events/${editEvent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(eventData),
        }
      );

      if (response.ok) {
        setMessage("✏️ Event updated successfully!");
        setEditEvent(null);
        fetchEvents();
      } else {
        setMessage("❌ Failed to update event.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error. Try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("🗑️ Event deleted");
      fetchEvents();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to delete");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen mt-20">
      <div className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <ul className="space-y-4">
            <li><button onClick={() => { setView("create"); setEditEvent(null); }} className={`w-full text-left ${view === "create" ? "text-blue-400" : ""}`}>➕ Create Event</button></li>
            <li><button onClick={() => { setView("manage"); setEditEvent(null); }} className={`w-full text-left ${view === "manage" ? "text-blue-400" : ""}`}>📋 Manage Events</button></li>
            <li><button onClick={() => setView("reviews")} className={`w-full text-left ${view === "reviews" ? "text-blue-400" : ""}`}>⭐ Reviews</button></li>
            <li><button onClick={() => setView("stats")} className={`w-full text-left ${view === "stats" ? "text-blue-400" : ""}`}>📊 Statistics</button></li>
          </ul>
        </div>
        <button onClick={handleLogout} className="mt-8 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full">🚪 Logout</button>
      </div>

      <div className="flex-1 p-8 bg-gray-100 overflow-y-auto mt-6">
        <div className="mb-8">
          <h1 className="text-5xl font-bold">👋 Hello Admin</h1>
          <p className="text-gray-600 text-3xl">Welcome to your dashboard. Manage events, reviews, and more below.</p>
        </div>

        {view === "stats" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Event Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-600">Total Events</h3>
                <p className="text-3xl font-bold">{stats.totalEvents}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-600">Total Revenue</h3>
                <p className="text-3xl font-bold">KES {stats.totalRevenue}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-600">Tickets Sold</h3>
                <p className="text-3xl font-bold">{stats.totalTicketsSold}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-600">Upcoming Events</h3>
                <p className="text-3xl font-bold">{stats.upcomingEvents}</p>
              </div>
            </div>
          </div>
        )}

        {view === "create" && !editEvent && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Create Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-lg rounded-lg p-6">
              <input type="text" name="title" placeholder="Event Title" value={event.title} onChange={handleChange} className="w-full border p-2 rounded" required />
              <textarea name="description" placeholder="Event Description" value={event.description} onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="date" name="date" value={event.date} onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="text" name="location" placeholder="Location" value={event.location} onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="number" name="price" placeholder="Price (KES)" value={event.price} onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="number" name="capacity" placeholder="Capacity (0 for unlimited)" value={event.capacity} onChange={handleChange} className="w-full border p-2 rounded" min="0" />
              <input type="text" name="image" placeholder="Image URL (https://...)" value={event.image} onChange={handleChange} className="w-full border p-2 rounded" />

              {event.image && (
                <img src={event.image} alt="Preview" className="w-full h-48 object-cover rounded-lg border" onError={(e) => { e.target.style.display = 'none'; }} />
              )}

              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">Add Event</button>
            </form>
          </div>
        )}

        {editEvent && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Edit Event</h2>
            <form onSubmit={handleUpdate} className="space-y-4 bg-white shadow-lg rounded-lg p-6">
              <input type="text" name="title" value={editEvent.title} onChange={handleChange} className="w-full border p-2 rounded" required />
              <textarea name="description" value={editEvent.description} onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="date" name="date" value={editEvent.date?.substring(0, 10)} onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="text" name="location" value={editEvent.location} onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="number" name="price" value={editEvent.price} onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="number" name="capacity" value={editEvent.capacity} onChange={handleChange} className="w-full border p-2 rounded" min="0" />
              <input type="text" name="image" value={editEvent.image} onChange={handleChange} className="w-full border p-2 rounded" />

              {editEvent.image && (
                <img src={editEvent.image} alt="Preview" className="w-full h-48 object-cover rounded-lg border" onError={(e) => { e.target.style.display = 'none'; }} />
              )}

              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700">Update Event</button>
            </form>
          </div>
        )}

        {view === "manage" && !editEvent && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Manage Events</h2>
            {events.length === 0 ? <p>No events available</p> : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((ev) => (
                  <div key={ev._id} className="bg-white shadow p-4 rounded-lg flex flex-col">
                    <img
                      src={ev.image || "/default-event.jpg"}
                      alt={ev.title}
                      className="h-40 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80";
                      }}
                    />
                    <h3 className="font-bold mt-2">{ev.title}</h3>
                    <p className="text-sm text-gray-600">{ev.description}</p>
                    <p className="text-xs text-gray-500">{new Date(ev.date).toLocaleDateString()} - {ev.location}</p>
                    
                    {/* Ticket information */}
                    <div className="mt-2 text-xs">
                      <p className="font-semibold">Price: KES {ev.price}</p>
                      <p className={ev.capacity === 0 ? "text-green-600" : "text-blue-600"}>
                        Capacity: {ev.capacity === 0 ? "Unlimited" : ev.capacity}
                      </p>
                      <p className={ev.ticketsSold > 0 ? "text-green-600" : "text-gray-500"}>
                        Tickets Sold: {ev.ticketsSold || 0}
                      </p>
                      {ev.capacity > 0 && (
                        <p className={ev.ticketsSold >= ev.capacity ? "text-red-600" : "text-green-600"}>
                          Available: {ev.capacity - (ev.ticketsSold || 0)}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => setEditEvent(ev)} className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                      <button onClick={() => handleDelete(ev._id)} className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === "reviews" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            <p className="text-gray-500">⭐ Review management coming soon...</p>
          </div>
        )}

        {message && <p className="mt-4 text-center text-green-600 font-medium">{message}</p>}
      </div>
    </div>
  );
}