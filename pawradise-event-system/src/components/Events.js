// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Events = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [bookingLoading, setBookingLoading] = useState(false);

//   // Fetch events (with localStorage caching)
//   useEffect(() => {
//     const cachedEvents = localStorage.getItem("events");
//     if (cachedEvents) {
//       setEvents(JSON.parse(cachedEvents));
//       setLoading(false);
//     }

//     const fetchEvents = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/api/events");
//         setEvents(res.data);

//         // Save to cache
//         localStorage.setItem("events", JSON.stringify(res.data));
//       } catch (err) {
//         if (!cachedEvents) {
//           setError("Failed to load events");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   // Handle booking
//   const handleBooking = async () => {
//     if (!selectedEvent) return;

//     try {
//       setBookingLoading(true);
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("⚠️ Please login first before booking.");
//         return;
//       }

//       await axios.post(
//         "http://localhost:4000/api/bookings",
//         { eventId: selectedEvent._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("✅ Booking successful!");
//       setSelectedEvent(null);
//     } catch (err) {
//       alert("❌ Booking failed. Please try again.");
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading events...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-8 text-center">🎉 Upcoming Events</h1>

//       {events.length === 0 ? (
//         <p className="text-center text-gray-600">No events available</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {events.map((event) => (
//             <div
//               key={event._id}
//               className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition flex flex-col"
//             >
//               <img
//                 src={event.imageUrl || "/default-event.jpg"}
//                 alt={event.title}
//                 className="w-full h-48 object-cover rounded-lg"
//                 onError={(e) => (e.target.src = "/default-event.jpg")}
//               />

//               <h2 className="text-xl font-semibold mt-4">{event.title}</h2>
//               <p className="text-gray-700 mt-2">{event.description}</p>

//               <div className="mt-3 text-sm text-gray-500">
//                 📅 {new Date(event.date).toLocaleDateString()} <br />
//                 📍 {event.location}
//               </div>

//               <button
//                 onClick={() => setSelectedEvent(event)}
//                 className="mt-5 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//               >
//                 Book Now
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Booking Modal */}
//       {selectedEvent && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-96">
//             <h2 className="text-xl font-bold mb-4">
//               Confirm Booking: {selectedEvent.title}
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Are you sure you want to book{" "}
//               <span className="font-semibold">{selectedEvent.title}</span>?
//             </p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setSelectedEvent(null)}
//                 className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleBooking}
//                 disabled={bookingLoading}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
//               >
//                 {bookingLoading ? "Booking..." : "Confirm Booking"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Events;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Fetch events (with localStorage caching)
  useEffect(() => {
    const cachedEvents = localStorage.getItem("events");
    if (cachedEvents) {
      setEvents(JSON.parse(cachedEvents));
      setLoading(false);
    }

    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/events");
        setEvents(res.data);

        // Save to cache
        localStorage.setItem("events", JSON.stringify(res.data));
      } catch (err) {
        if (!cachedEvents) {
          setError("Failed to load events");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle booking
  const handleBooking = async () => {
    if (!selectedEvent) return;

    try {
      setBookingLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("⚠️ Please login first before booking.");
        return;
      }

      await axios.post(
        "http://localhost:4000/api/bookings",
        { eventId: selectedEvent._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Booking successful!");
      setSelectedEvent(null);
    } catch (err) {
      alert("❌ Booking failed. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading events...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">🎉 Upcoming Events</h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events available</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition flex flex-col"
            >
              {/* ✅ Corrected image field */}
              <img
                src={event.image || "/default-event.jpg"}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => (e.target.src = "/default-event.jpg")}
              />

              <h2 className="text-xl font-semibold mt-4">{event.title}</h2>
              <p className="text-gray-700 mt-2">{event.description}</p>

              <div className="mt-3 text-sm text-gray-500">
                📅 {new Date(event.date).toLocaleDateString()} <br />
                📍 {event.location}
              </div>

              <button
                onClick={() => setSelectedEvent(event)}
                className="mt-5 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">
              Confirm Booking: {selectedEvent.title}
            </h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to book{" "}
              <span className="font-semibold">{selectedEvent.title}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {bookingLoading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
