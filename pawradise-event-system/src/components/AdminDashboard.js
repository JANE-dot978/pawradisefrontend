
import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:4000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Event created!" });
        setForm({ title: "", date: "", description: "", price: "" });
        fetchEvents();
      } else {
        setMessage({ type: "error", text: data.error || "Error creating event" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Create Event */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Create Event</h2>

        {message && (
          <p className={message.type === "success" ? "text-green-600" : "text-red-600"}>
            {message.text}
          </p>
        )}

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="border p-2 w-full rounded-lg"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Event Description"
            rows="4"
            className="border p-2 w-full rounded-lg"
            required
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Event Price (KES)"
            className="border p-2 w-full rounded-lg"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </section>

      {/* Event List */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Events</h2>
        {events.length === 0 ? (
          <p>No events yet</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Price (KES)</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td className="border p-2">{event.title}</td>
                  <td className="border p-2">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="border p-2">{event.description}</td>
                  <td className="border p-2">{event.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
