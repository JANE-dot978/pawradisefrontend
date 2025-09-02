
import React, { useState } from "react";

export default function AdminDashboard() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        setMessage("Event created successfully!");
        setEvent({ title: "", description: "", date: "", location: "", price: "" });
      } else {
        setMessage("Failed to create event.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again.");
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard - Create Event</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={event.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={event.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={event.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price (KES)"
          value={event.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Add Event
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}
