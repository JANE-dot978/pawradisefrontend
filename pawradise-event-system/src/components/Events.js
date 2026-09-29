import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, MapPin, X, Minus, Plus, Trash2 } from "lucide-react";
import fallbackImage from "../assets/many dogs.jpg";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list"); // list | month | day

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pets, setPets] = useState([{ name: "", breed: "" }]);
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const resetBookingForm = () => {
    setSelectedEvent(null);
    setTicketCount(1);
    setPhone("");
    setName("");
    setEmail("");
    setPets([{ name: "", breed: "" }]);
    setNotes("");
    setPaymentMethod("mpesa");
    setAgreedToTerms(false);
  };

  const updatePet = (index, field, value) => {
    setPets((prev) => prev.map((pet, i) => (i === index ? { ...pet, [field]: value } : pet)));
  };

  const addPet = () => setPets((prev) => [...prev, { name: "", breed: "" }]);

  const removePet = (index) => setPets((prev) => prev.filter((_, i) => i !== index));

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_BASE}/events`);
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

  const formatPhoneNumber = (phoneValue) => {
    if (!phoneValue) return "";
    let formatted = phoneValue.trim().replace(/\D/g, "");

    if (formatted.startsWith("0") && formatted.length === 10) {
      formatted = "254" + formatted.substring(1);
    } else if (formatted.startsWith("7") && formatted.length === 9) {
      formatted = "254" + formatted;
    } else if (formatted.startsWith("254") && formatted.length === 12) {
      // already valid
    } else {
      throw new Error("Invalid phone number format. Use 07XXX or +254...");
    }

    return formatted;
  };

  const calculateTotalAmount = () => {
    if (!selectedEvent) return 0;
    return (selectedEvent.price || 0) * ticketCount;
  };

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

    if (!name.trim() || !email.trim()) {
      alert("Please enter your name and email.");
      return;
    }

    if (!phone) {
      alert("Enter your MPesa phone number (07...)");
      return;
    }

    if (!agreedToTerms) {
      alert("Please agree to Pawradise's terms and the event's cancellation policy.");
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
          name,
          email,
          pets: pets.filter((pet) => pet.name.trim() || pet.breed.trim()),
          notes,
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

      alert(paymentResponse.data?.message || "✅ Payment request sent! Check your phone to complete payment.");

      resetBookingForm();
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

  const now = new Date();

  const filteredEvents = events
    .filter((ev) => {
      const term = searchTerm.trim().toLowerCase();
      if (!term) return true;
      return (
        ev.title?.toLowerCase().includes(term) ||
        ev.location?.toLowerCase().includes(term)
      );
    })
    .filter((ev) => {
      const d = new Date(ev.date);
      if (viewMode === "month") {
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
      }
      if (viewMode === "day") {
        return d.toDateString() === now.toDateString();
      }
      return true;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const groupedByMonth = filteredEvents.reduce((groups, ev) => {
    const d = new Date(ev.date);
    const key = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!groups[key]) groups[key] = [];
    groups[key].push(ev);
    return groups;
  }, {});

  return (
    <div className="bg-[#f7ecd0] min-h-screen pt-32 pb-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-heading text-5xl md:text-6xl text-black mb-2">Upcoming Events</h1>
          <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-10">
          <div className="flex-1 flex items-center bg-white rounded-full shadow overflow-hidden">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events by name or location..."
              className="flex-1 px-6 py-3 focus:outline-none"
            />
            <span className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold px-6 py-3 m-1 rounded-full">
              <Search size={18} /> Find Events
            </span>
          </div>

          <div className="flex items-center gap-6 justify-center">
            {["list", "month", "day"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`capitalize font-medium transition ${
                  viewMode === mode ? "text-orange-500" : "text-gray-600 hover:text-orange-500"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="text-center text-gray-600 py-20">Loading events...</p>}
        {!loading && error && <p className="text-center text-red-500 py-20">{error}</p>}
        {!loading && !error && filteredEvents.length === 0 && (
          <p className="text-center text-gray-600 py-20">
            {searchTerm.trim()
              ? `No events match "${searchTerm}".`
              : viewMode === "month"
              ? "No events scheduled for this month."
              : viewMode === "day"
              ? "No events scheduled for today."
              : "No upcoming events right now — check back soon!"}
          </p>
        )}

        {!loading &&
          !error &&
          Object.entries(groupedByMonth).map(([month, monthEvents]) => (
            <div key={month} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-heading text-2xl text-black whitespace-nowrap">{month}</h2>
                <div className="flex-1 h-px bg-orange-300"></div>
              </div>

              <div className="space-y-10">
                {monthEvents.map((ev) => {
                  const d = new Date(ev.date);
                  return (
                    <div
                      key={ev._id}
                      className="flex flex-col md:flex-row gap-6 md:gap-8 border-b border-orange-200/70 pb-10"
                    >
                      <div className="flex md:flex-col md:items-center gap-3 md:gap-1 md:w-16 shrink-0">
                        <p className="text-gray-700 font-medium">
                          {d.toLocaleDateString("en-US", { weekday: "short" })}
                        </p>
                        <p className="text-3xl font-bold text-black leading-none">{d.getDate()}</p>
                      </div>

                      <div className="hidden md:block w-px bg-orange-300 self-stretch"></div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Calendar size={16} className="text-orange-500" />
                          {d.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <h3 className="font-heading text-2xl text-black mb-1">{ev.title}</h3>
                        <p className="flex items-center gap-1 text-gray-700 font-medium mb-3">
                          <MapPin size={14} /> {ev.location}
                        </p>
                        <p className="text-gray-700 mb-4 max-w-xl">{ev.description}</p>
                        <p className="font-semibold text-black mb-4">
                          KSH {ev.price ?? "Free"}
                        </p>
                        <button
                          onClick={() => setSelectedEvent(ev)}
                          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-full transition"
                        >
                          Book Your Spot
                        </button>
                      </div>

                      <div className="md:w-72 shrink-0">
                        <img
                          src={ev.image || fallbackImage}
                          alt={ev.title}
                          className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>

      {/* Confirm Booking Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4 py-8">
          <div className="bg-[#f7ecd0] p-8 rounded-3xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-2">
              <h2 className="font-heading text-4xl text-black">Book Your Spot</h2>
              <button
                onClick={resetBookingForm}
                aria-label="Close"
                className="text-black hover:text-orange-500 transition"
              >
                <X size={28} />
              </button>
            </div>
            <p className="text-gray-700 mb-3">
              Fill in your details below. It takes about a minute. You'll get a confirmation by
              email once payment goes through.
            </p>
            <div className="w-14 h-1 bg-orange-500 mb-6"></div>

            <label className="block font-semibold text-black mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border border-gray-400 rounded-full px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block font-semibold text-black mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-gray-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block font-semibold text-black mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="07XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent border border-gray-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            <label className="block font-semibold text-black mb-1">Spots for People</label>
            <div className="flex items-center justify-between border border-gray-400 rounded-full px-3 py-2 mb-6">
              <button
                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                className="w-9 h-9 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-full transition"
              >
                <Minus size={16} />
              </button>
              <span className="font-medium text-black">{ticketCount}</span>
              <button
                onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                className="w-9 h-9 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-full transition"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="border-2 border-dashed border-orange-400 rounded-2xl p-5 mb-6">
              {pets.map((pet, index) => (
                <div key={index} className={index > 0 ? "mt-5 pt-5 border-t border-orange-300" : ""}>
                  {pets.length > 1 && (
                    <div className="flex justify-end mb-1">
                      <button
                        onClick={() => removePet(index)}
                        className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 text-sm font-medium"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-black mb-1">Pet's Name</label>
                      <input
                        type="text"
                        value={pet.name}
                        onChange={(e) => updatePet(index, "name", e.target.value)}
                        className="w-full bg-transparent border border-gray-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-black mb-1">Breed</label>
                      <input
                        type="text"
                        value={pet.breed}
                        onChange={(e) => updatePet(index, "breed", e.target.value)}
                        className="w-full bg-transparent border border-gray-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={addPet}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition"
              >
                <Plus size={18} /> Add another pet
              </button>
            </div>

            <label className="block font-semibold text-black mb-1">
              Anything the organizer should know (optional)
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-transparent border border-gray-400 rounded-2xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>

            <label className="block font-semibold text-black mb-2">Payment</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod("mpesa")}
                className="flex items-center gap-3 border border-gray-400 rounded-full px-4 py-3"
              >
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "mpesa" ? "border-orange-500" : "border-gray-400"
                  }`}
                >
                  {paymentMethod === "mpesa" && (
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  )}
                </span>
                <span className="font-medium text-black">M-Pesa</span>
              </button>
              <button
                type="button"
                disabled
                title="Card payments are coming soon"
                className="flex items-center gap-3 border border-gray-300 rounded-full px-4 py-3 opacity-50 cursor-not-allowed"
              >
                <span className="w-5 h-5 rounded-full border-2 border-gray-400"></span>
                <span className="font-medium text-black">Card (coming soon)</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 mb-4">
              <div className="flex justify-between text-gray-700 mb-3">
                <span>
                  {ticketCount} spot{ticketCount > 1 ? "s" : ""} x {selectedEvent.price ?? 0}
                </span>
                <span>{calculateTotalAmount()}</span>
              </div>
              <div className="h-px bg-orange-400 mb-3"></div>
              <div className="flex justify-between font-semibold text-black">
                <span>TOTAL</span>
                <span>KSH {calculateTotalAmount()}</span>
              </div>
            </div>

            <label className="flex items-start gap-2 mb-6 text-sm text-black">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5"
              />
              I agree to Pawradise's terms and event's cancellation policy
            </label>

            <button
              onClick={handleBooking}
              disabled={bookingLoading || !agreedToTerms}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-full transition mb-3"
            >
              {bookingLoading ? "Processing..." : `Confirm and Pay KSH ${calculateTotalAmount()}`}
            </button>
            <p className="text-center text-sm text-gray-600">
              Payments are processed securely. You'll receive an M-Pesa prompt after submission
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
