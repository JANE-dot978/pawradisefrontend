// import React, { useState, useEffect } from "react";

// export default function EmployeeDashboard() {
//   const [view, setView] = useState("create");
//   const [events, setEvents] = useState([]);
//   const [event, setEvent] = useState({
//     title: "",
//     description: "",
//     date: "",
//     location: "",
//     price: "",
//     image: "",
//   });
//   const [editEvent, setEditEvent] = useState(null);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");
//   const employeeId = localStorage.getItem("userId");

//   // Fetch only events created by this employee
//   const fetchEvents = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:4000/api/events?createdBy=${employeeId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await res.json();
//       setEvents(data);
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
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ ...event, createdBy: employeeId }),
//       });

//       if (response.ok) {
//         setMessage("✅ Event created successfully!");
//         setEvent({
//           title: "",
//           description: "",
//           date: "",
//           location: "",
//           price: "",
//           image: "",
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
//             Authorization: `Bearer ${token}`,
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

//   return (
//     <div className="flex h-screen mt-16"> 
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-900 text-white p-6">
//         <h2 className="text-2xl font-bold mb-8">Employee Panel</h2>
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
//               📋 Manage My Events
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8 bg-gray-100 overflow-y-auto mt-6">
//         {/* 👆 added mt-6 for margin-top */}
//         <h1 className="text-2xl font-bold mb-6">
//           👋 Hello Employee, Welcome to Your Dashboard
//         </h1>

//         {/* Create Event */}
//         {view === "create" && !editEvent && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Create Event</h2>
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
//                 name="image"
//                 placeholder="Image URL (https://...)"
//                 value={event.image}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />

//               {event.image && (
//                 <img
//                   src={event.image}
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
//             <h2 className="text-xl font-bold mb-4">Edit Event</h2>
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
//                 name="image"
//                 value={editEvent.image}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />

//               {editEvent.image && (
//                 <img
//                   src={editEvent.image}
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
//             <h2 className="text-xl font-bold mb-6">Manage My Events</h2>
//             {events.length === 0 ? (
//               <p>No events created yet</p>
//             ) : (
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {events.map((ev) => (
//                   <div
//                     key={ev._id}
//                     className="bg-white shadow p-4 rounded-lg flex flex-col"
//                   >
//                     <img
//                       src={ev.image || "/default-event.jpg"}
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
//                       {/* ❌ Removed delete button */}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
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
