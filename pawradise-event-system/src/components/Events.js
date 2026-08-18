

// export default Events;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [eventPhones, setEventPhones] = useState({}); // store phone per event

  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/events");
        setEvents(res.data);
      } catch (err) {
        setError("Failed to load events");
        console.error("Events fetch error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Format phone number for M-Pesa
  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    let formattedPhone = phone.trim().replace(/\D/g, "");

    if (formattedPhone.startsWith("0") && formattedPhone.length === 10) {
      formattedPhone = "254" + formattedPhone.substring(1);
    } else if (formattedPhone.startsWith("7") && formattedPhone.length === 9) {
      formattedPhone = "254" + formattedPhone;
    } else if (formattedPhone.startsWith("254") && formattedPhone.length === 12) {
      // already valid
    } else {
      throw new Error("Invalid phone number format. Use 07XXX or +254...");
    }

    return formattedPhone;
  };

  // Track phone for each event
  const handlePhoneChange = (eventId, phoneNumber) => {
    setEventPhones((prev) => ({
      ...prev,
      [eventId]: phoneNumber,
    }));
  };

  const getPhoneForEvent = (eventId) => eventPhones[eventId] || "";

  // Calculate total amount
  const calculateTotalAmount = () => {
    if (!selectedEvent) return 0;
    return (selectedEvent.price || 0) * ticketCount;
  };

  // Handle booking + MPesa payment using the new backend flow
  const handleBooking = async () => {
    if (!selectedEvent) return;

    const userStr = localStorage.getItem("user");
    const storedUser = userStr ? JSON.parse(userStr) : null;
    const token = storedUser?.token || localStorage.getItem("token");

    if (!token) {
      alert("⚠️ Please log in first.");
      navigate("/login");
      return;
    }

    const phone = getPhoneForEvent(selectedEvent._id);
    if (!phone) {
      alert("Enter your MPesa phone number (07...)");
      return;
    }

    let formattedPhone;
    try {
      formattedPhone = formatPhoneNumber(phone);
    } catch (err) {
      alert(err.message);
      return;
    }

    try {
      setBookingLoading(true);

      const bookingResponse = await axios.post(
        `${API_BASE}/bookings`,
        {
          eventId: selectedEvent._id,
          phoneNumber: formattedPhone,
          ticketCount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const booking = bookingResponse.data?.booking || bookingResponse.data;
      const bookingId = booking?._id || booking?.id || booking?.booking?._id;

      if (!bookingId) {
        throw new Error("Booking was created but the server did not return a booking id.");
      }

      const paymentResponse = await axios.post(
        `${API_BASE}/payments/initiate`,
        {
          bookingId,
          phoneNumber: formattedPhone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Booking/payment response:", paymentResponse.data);
      alert(paymentResponse.data?.message || "✅ Payment request sent! Check your phone to complete payment.");

      setSelectedEvent(null);
      setTicketCount(1);
    } catch (err) {
      console.error("❌ Booking/payment error:", {
        message: err.message,
        response: err.response?.data,
      });

      let errorMessage = "❌ Booking or payment failed.";
      if (err.response?.data?.message) {
        errorMessage += " " + err.response.data.message;
      } else if (err.response?.data?.errorMessage) {
        errorMessage += " " + err.response.data.errorMessage;
      }
      alert(errorMessage);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative">
      {/* 🐶 Welcome Section */}
      <div
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center mt-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1074&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/70 via-pink-400/50 to-pink-200/30"></div>
        <div className="relative z-10 text-center text-black px-6">
          <h1 className="text-7xl font-extrabold drop-shadow-2xl">
            🐾 Welcome, Dog Lovers!
          </h1>
          <p className="mt-4 text-4xl max-w-3xl mx-auto font-light text-black">
            Join fun-filled dog events, meet other passionate owners, and create
            unforgettable memories 🐕✨
          </p>
          <button
            onClick={() =>
              document
                .getElementById("events-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="mt-6 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full shadow-lg transition transform hover:scale-105 animate-bounce"
          >
            Explore Events 🎉
          </button>
        </div>
      </div>

      {/* 🎉 Events Section */}
      <div id="events-section" className="p-6">
        <h2 className="text-3xl font-bold mb-8 text-center">
          🎉 Upcoming Events
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((ev) => (
            <div
              key={ev._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={ev.image || "/default-event.jpg"}
                alt={ev.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold mt-2">{ev.title}</h3>
                <p className="text-gray-700 mt-2 text-2xl">{ev.description}</p>
                <p className="text-gray-500 text-2xl">
                  📅 {new Date(ev.date).toLocaleDateString()} <br /> 📍{" "}
                  {ev.location}
                </p>
                <p className="text-lg font-bold text-green-600 mt-2">
                  💰 KES {ev.price ?? "Free"} per ticket
                </p>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Enter MPesa phone (07...)"
                    value={getPhoneForEvent(ev._id)}
                    onChange={(e) => handlePhoneChange(ev._id, e.target.value)}
                    className="p-2 border rounded w-full mb-2"
                  />
                  <button
                    onClick={() => setSelectedEvent(ev)}
                    className="mt-2 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 w-full"
                  >
                    Book & Pay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Booking Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-3">Confirm Booking</h2>
            <p>
              Event: <strong>{selectedEvent.title}</strong>
            </p>
            <p>
              Price per ticket:{" "}
              <strong>KES {selectedEvent.price ?? "Free"}</strong>
            </p>

            {/* Ticket Quantity */}
            <div className="my-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of tickets:
              </label>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    setTicketCount(Math.max(1, ticketCount - 1))
                  }
                  className="px-3 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={ticketCount}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value >= 1 && value <= 10) setTicketCount(value);
                  }}
                  className="w-16 py-1 text-center border-t border-b"
                />
                <button
                  onClick={() =>
                    setTicketCount(Math.min(10, ticketCount + 1))
                  }
                  className="px-3 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            <p>
              Total Amount: <strong>KES {calculateTotalAmount()}</strong>
            </p>
            <p>
              Phone:{" "}
              <strong>
                {getPhoneForEvent(selectedEvent._id)} (
                {formatPhoneNumber(getPhoneForEvent(selectedEvent._id))})
              </strong>
            </p>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  setTicketCount(1);
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
              >
                {bookingLoading
                  ? "Processing..."
                  : `Pay KES ${calculateTotalAmount()}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
