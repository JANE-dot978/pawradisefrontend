import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  MapPin,
  Ticket,
  Wallet,
  PawPrint,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock3,
} from "lucide-react";
import fallbackImage from "../assets/many dogs.jpg";
import Profile from "./Profile";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const statusStyles = {
  paid: { label: "Paid", icon: CheckCircle2, className: "bg-green-100 text-green-700" },
  pending: { label: "Pending", icon: Clock3, className: "bg-orange-100 text-orange-700" },
  cancelled: { label: "Cancelled", icon: XCircle, className: "bg-red-100 text-red-700" },
};

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("bookings");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        setUser(null);
      }
    }

    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view your dashboard.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data || []);
      } catch (err) {
        setError("Failed to load your bookings.");
        console.error("Dashboard fetch error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const now = new Date();
  const upcomingBookings = bookings.filter(
    (b) => b.event?.date && new Date(b.event.date) >= now && b.paymentStatus !== "cancelled"
  );
  const totalSpent = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + (b.amount || 0), 0);

  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(b.bookedAt || 0) - new Date(a.bookedAt || 0)
  );

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: Ticket },
    { label: "Upcoming Events", value: upcomingBookings.length, icon: Calendar },
    { label: "Total Spent", value: `KSH ${totalSpent.toLocaleString()}`, icon: Wallet },
  ];

  return (
    <div className="bg-[#f7ecd0] min-h-screen pt-32 pb-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-3">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl text-black mb-2">
              {user?.name ? `Welcome back, ${user.name}` : "My Dashboard"}
            </h1>
            <div className="w-16 h-1 bg-orange-500"></div>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition shrink-0"
          >
            Browse Events <ArrowRight size={18} />
          </Link>
        </div>
        <p className="text-gray-700 mb-10">Here's what's happening with your bookings.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-white" />
                </div>
                <div>
                  <p className="font-heading text-2xl text-black">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-6 border-b border-orange-200 mb-8">
          {["bookings", "profile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 font-semibold capitalize transition border-b-2 ${
                activeTab === tab
                  ? "text-orange-500 border-orange-500"
                  : "text-gray-600 border-transparent hover:text-orange-500"
              }`}
            >
              {tab === "bookings" ? "My Bookings" : "Profile"}
            </button>
          ))}
        </div>

        {activeTab === "profile" && <Profile />}

        {activeTab === "bookings" && (
          <>
            {loading && <p className="text-gray-600 py-10 text-center">Loading your bookings...</p>}
            {!loading && error && <p className="text-red-500 py-10 text-center">{error}</p>}

            {!loading && !error && bookings.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                <p className="text-gray-700 mb-4">You haven't booked any events yet.</p>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition"
                >
                  Browse Events <ArrowRight size={18} />
                </Link>
              </div>
            )}

            {!loading && !error && bookings.length > 0 && (
              <div className="space-y-6">
            {sortedBookings.map((booking) => {
              const event = booking.event || {};
              const status = statusStyles[booking.paymentStatus] || statusStyles.pending;
              const StatusIcon = status.icon;
              const eventDate = event.date ? new Date(event.date) : null;

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row"
                >
                  <img
                    src={event.image || fallbackImage}
                    alt={event.title || "Event"}
                    className="w-full sm:w-56 h-48 sm:h-auto object-cover"
                  />
                  <div className="p-6 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <h3 className="font-heading text-xl text-black">
                        {event.title || "Event"}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${status.className}`}
                      >
                        <StatusIcon size={14} /> {status.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600 mb-3">
                      {eventDate && (
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-orange-500" />
                          {eventDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      )}
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} className="text-orange-500" /> {event.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Ticket size={14} className="text-orange-500" /> {booking.ticketCount} spot
                        {booking.ticketCount > 1 ? "s" : ""}
                      </span>
                    </div>

                    {booking.pets?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {booking.pets.map((pet, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 bg-[#f7ecd0] text-black text-xs font-medium px-3 py-1 rounded-full"
                          >
                            <PawPrint size={12} /> {pet.name || "Pet"}
                            {pet.breed ? ` · ${pet.breed}` : ""}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="font-semibold text-black">
                      KSH {(booking.amount || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
