
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import {
  PlusCircle,
  ClipboardList,
  Star,
  BarChart3,
  User,
  Users,
  Calendar,
  Wallet,
  Ticket,
  Hourglass,
  LogOut,
  PawPrint,
  Trash2,
  ShieldCheck,
  MapPin,
  Tag,
  Layers,
} from "lucide-react";

const navItems = [
  { key: "create", label: "Create Event", icon: PlusCircle },
  { key: "manage", label: "Manage Events", icon: ClipboardList },
  { key: "users", label: "Manage Users", icon: Users },
  { key: "reviews", label: "Reviews", icon: Star },
  { key: "stats", label: "Statistics", icon: BarChart3 },
  { key: "profile", label: "Profile", icon: User },
];

const roleBadgeStyles = {
  admin: "bg-purple-100 text-purple-700",
  employee: "bg-blue-100 text-blue-700",
  user: "bg-gray-100 text-gray-700",
};

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
  const [bookings, setBookings] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

  // Fetch events
  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/events`);
      const data = await res.json();
      const sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(sortedEvents);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  }, [API_BASE]);

  // Fetch real, live statistics data (bookings + user count) from the actual system
  const fetchStatsData = useCallback(async () => {
    setStatsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const [bookingsRes, usersRes] = await Promise.all([
        fetch(`${API_BASE}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/users/stats/count`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const bookingsData = bookingsRes.ok ? await bookingsRes.json() : [];
      const usersData = usersRes.ok ? await usersRes.json() : { totalUsers: 0 };

      setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      setUserCount(usersData.totalUsers || 0);
    } catch (err) {
      console.error("Failed to fetch live statistics", err);
    } finally {
      setStatsLoading(false);
    }
  }, [API_BASE]);

  // Fetch all registered users (admin only)
  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.ok ? await res.json() : [];
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setUsersLoading(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!localStorage.getItem("token") || role !== "admin") {
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setCurrentUserId(storedUser?.id || storedUser?._id || null);

    fetchEvents();
    fetchStatsData();
    fetchUsers();
  }, [fetchEvents, fetchStatsData, fetchUsers, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    editEvent
      ? setEditEvent({ ...editEvent, [name]: value })
      : setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        ...event,
        capacity: event.capacity ? parseInt(event.capacity) : 0,
      };

      const response = await fetch(`${API_BASE}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        setMessage("Event created successfully!");
        setEvent({ title: "", description: "", date: "", location: "", price: "", capacity: "", image: "" });
        fetchEvents();
      } else {
        setMessage("Failed to create event.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        ...editEvent,
        capacity: editEvent.capacity ? parseInt(editEvent.capacity) : 0,
      };

      const response = await fetch(`${API_BASE}/events/${editEvent._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        setMessage("Event updated successfully!");
        setEditEvent(null);
        fetchEvents();
      } else {
        setMessage("Failed to update event.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("Event deleted");
      fetchEvents();
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Role updated to ${newRole}`);
        fetchUsers();
      } else {
        setMessage(data.message || "Failed to update role.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again.");
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Delete ${userName}'s account? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${API_BASE}/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("User deleted");
        fetchUsers();
        fetchStatsData();
      } else {
        setMessage(data.message || "Failed to delete user.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Derive real, live statistics from actual events + bookings data
  const now = new Date();
  const upcomingEvents = events.filter((ev) => new Date(ev.date) > now).length;
  const activeBookings = bookings.filter((b) => b.paymentStatus !== "cancelled");
  const paidBookings = bookings.filter((b) => b.paymentStatus === "paid");
  const pendingBookings = bookings.filter((b) => b.paymentStatus === "pending");
  const confirmedRevenue = paidBookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const pendingRevenue = pendingBookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const ticketsSold = activeBookings.reduce((sum, b) => sum + (b.ticketCount || 0), 0);
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.bookedAt || 0) - new Date(a.bookedAt || 0))
    .slice(0, 6);

  const statCards = [
    { label: "Total Events", value: events.length, icon: Calendar },
    { label: "Upcoming Events", value: upcomingEvents, icon: Calendar },
    { label: "Registered Users", value: userCount, icon: Users },
    { label: "Total Bookings", value: bookings.length, icon: Ticket },
    { label: "Tickets Sold", value: ticketsSold, icon: Layers },
    { label: "Confirmed Revenue", value: `KSH ${confirmedRevenue.toLocaleString()}`, icon: Wallet },
    { label: "Pending Payments", value: `KSH ${pendingRevenue.toLocaleString()}`, icon: Hourglass },
  ];

  return (
    <div className="flex min-h-screen bg-[#f7ecd0] pt-20">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <PawPrint size={24} className="text-orange-500" />
            <h2 className="font-heading text-2xl">Admin Panel</h2>
          </div>
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = view === item.key;
              return (
                <li key={item.key}>
                  <button
                    onClick={() => {
                      setView(item.key);
                      if (item.key !== "manage") setEditEvent(null);
                    }}
                    className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-full transition ${
                      isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon size={16} /> {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="mt-8 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-full w-full transition"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="font-heading text-4xl text-black mb-1">Hello Admin</h1>
          <div className="w-14 h-1 bg-orange-500 mb-3"></div>
          <p className="text-gray-700">Welcome to your dashboard. Manage events, reviews, and more below.</p>
        </div>

        {view === "stats" && (
          <div className="mb-8">
            <h2 className="font-heading text-2xl text-black mb-6">Live Statistics</h2>

            {statsLoading ? (
              <p className="text-gray-600">Loading live data...</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                  {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                          <Icon size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-heading text-2xl text-black">{stat.value}</p>
                          <p className="text-sm text-gray-600">{stat.label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <h3 className="font-heading text-xl text-black mb-4">Recent Bookings</h3>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  {recentBookings.length === 0 ? (
                    <p className="p-6 text-gray-600">No bookings yet.</p>
                  ) : (
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#f7ecd0] text-gray-700">
                        <tr>
                          <th className="px-5 py-3">Event</th>
                          <th className="px-5 py-3">Customer</th>
                          <th className="px-5 py-3">Tickets</th>
                          <th className="px-5 py-3">Amount</th>
                          <th className="px-5 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((b) => (
                          <tr key={b._id} className="border-t border-gray-100">
                            <td className="px-5 py-3">{b.event?.title || "—"}</td>
                            <td className="px-5 py-3">{b.user?.name || b.name || "—"}</td>
                            <td className="px-5 py-3">{b.ticketCount}</td>
                            <td className="px-5 py-3">KSH {(b.amount || 0).toLocaleString()}</td>
                            <td className="px-5 py-3">
                              <span
                                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                                  b.paymentStatus === "paid"
                                    ? "bg-green-100 text-green-700"
                                    : b.paymentStatus === "cancelled"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {b.paymentStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {view === "create" && !editEvent && (
          <div>
            <h2 className="font-heading text-2xl text-black mb-6">Create Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-sm rounded-2xl p-6 max-w-2xl">
              <input type="text" name="title" placeholder="Event Title" value={event.title} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <textarea name="description" placeholder="Event Description" value={event.description} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <input type="date" name="date" value={event.date} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <input type="text" name="location" placeholder="Location" value={event.location} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <input type="number" name="price" placeholder="Price (KES)" value={event.price} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <input type="number" name="capacity" placeholder="Capacity (0 for unlimited)" value={event.capacity} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" min="0" />
              <input type="text" name="image" placeholder="Image URL (https://...)" value={event.image} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" />

              {event.image && (
                <img src={event.image} alt="Preview" className="w-full h-48 object-cover rounded-xl border" onError={(e) => { e.target.style.display = "none"; }} />
              )}

              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-3 rounded-full w-full transition">
                Add Event
              </button>
            </form>
          </div>
        )}

        {editEvent && (
          <div>
            <h2 className="font-heading text-2xl text-black mb-6">Edit Event</h2>
            <form onSubmit={handleUpdate} className="space-y-4 bg-white shadow-sm rounded-2xl p-6 max-w-2xl">
              <input type="text" name="title" value={editEvent.title} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <textarea name="description" value={editEvent.description} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <input type="date" name="date" value={editEvent.date?.substring(0, 10)} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <input type="text" name="location" value={editEvent.location} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <input type="number" name="price" value={editEvent.price} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <input type="number" name="capacity" value={editEvent.capacity} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" min="0" />
              <input type="text" name="image" value={editEvent.image} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" />

              {editEvent.image && (
                <img src={editEvent.image} alt="Preview" className="w-full h-48 object-cover rounded-xl border" onError={(e) => { e.target.style.display = "none"; }} />
              )}

              <div className="flex gap-3">
                <button type="button" onClick={() => setEditEvent(null)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-3 rounded-full transition">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-3 rounded-full transition">
                  Update Event
                </button>
              </div>
            </form>
          </div>
        )}

        {view === "manage" && !editEvent && (
          <div>
            <h2 className="font-heading text-2xl text-black mb-6">Manage Events</h2>
            {events.length === 0 ? (
              <p className="text-gray-600">No events available</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((ev) => {
                  const sold = ev.ticketsSold || 0;
                  const soldOut = ev.capacity > 0 && sold >= ev.capacity;
                  const fillPct = ev.capacity > 0 ? Math.min(100, Math.round((sold / ev.capacity) * 100)) : 0;

                  return (
                    <div
                      key={ev._id}
                      className="bg-white shadow-sm hover:shadow-md rounded-2xl overflow-hidden flex flex-col transition-shadow"
                    >
                      <div className="relative">
                        <img
                          src={ev.image || "/default-event.jpg"}
                          alt={ev.title}
                          className="h-44 w-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80";
                          }}
                        />
                        <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/95 text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
                          <Tag size={12} className="text-orange-500" /> KES {ev.price}
                        </span>
                        {soldOut && (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            Sold Out
                          </span>
                        )}
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-heading text-lg text-black mb-1">{ev.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{ev.description}</p>

                        <div className="flex flex-col gap-1 text-xs text-gray-600 mb-3">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-orange-500" />
                            {new Date(ev.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} className="text-orange-500" /> {ev.location}
                          </span>
                        </div>

                        <div className="mb-4">
                          {ev.capacity === 0 ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                              <Layers size={12} /> Unlimited capacity · {sold} sold
                            </span>
                          ) : (
                            <>
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>{sold} / {ev.capacity} booked</span>
                                <span>{ev.capacity - sold} left</span>
                              </div>
                              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${soldOut ? "bg-red-500" : "bg-orange-500"}`}
                                  style={{ width: `${fillPct}%` }}
                                ></div>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="flex gap-2 mt-auto">
                          <button onClick={() => setEditEvent(ev)} className="flex-1 bg-amber-500 text-white px-3 py-1.5 rounded-full hover:bg-amber-600 transition text-sm font-medium">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(ev._id)} className="flex-1 bg-red-600 text-white px-3 py-1.5 rounded-full hover:bg-red-700 transition text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {view === "users" && (
          <div>
            <h2 className="font-heading text-2xl text-black mb-6">Manage Users</h2>

            {usersLoading ? (
              <p className="text-gray-600">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="text-gray-600">No users found.</p>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#f7ecd0] text-gray-700">
                    <tr>
                      <th className="px-5 py-3">Name</th>
                      <th className="px-5 py-3">Email</th>
                      <th className="px-5 py-3">Role</th>
                      <th className="px-5 py-3">Joined</th>
                      <th className="px-5 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => {
                      const isSelf = u._id === currentUserId;
                      return (
                        <tr key={u._id} className="border-t border-gray-100">
                          <td className="px-5 py-3 font-medium text-black">
                            {u.name} {isSelf && <span className="text-xs text-gray-400">(you)</span>}
                          </td>
                          <td className="px-5 py-3 text-gray-600">{u.email}</td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full capitalize ${roleBadgeStyles[u.role] || roleBadgeStyles.user}`}>
                              <ShieldCheck size={12} /> {u.role}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-gray-600">
                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <select
                                value={u.role}
                                disabled={isSelf}
                                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                className="border border-gray-300 rounded-full px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                              >
                                <option value="user">User</option>
                                <option value="employee">Employee</option>
                                <option value="admin">Admin</option>
                              </select>
                              <button
                                onClick={() => handleDeleteUser(u._id, u.name)}
                                disabled={isSelf}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-red-600 hover:bg-red-50 disabled:text-gray-300 disabled:cursor-not-allowed transition"
                                title="Delete user"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {view === "reviews" && (
          <div>
            <h2 className="font-heading text-2xl text-black mb-6">Reviews</h2>
            <p className="text-gray-600">Review management coming soon...</p>
          </div>
        )}

        {view === "profile" && (
          <div>
            <h2 className="font-heading text-2xl text-black mb-6">Profile</h2>
            <Profile />
          </div>
        )}

        {message && <p className="mt-4 text-center text-green-600 font-medium">{message}</p>}
      </div>
    </div>
  );
}
