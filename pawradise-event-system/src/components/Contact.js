import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import backgroundImage from "../components/poodle-torn-paper.png";

const contactDetails = [
  {
    icon: Mail,
    label: "Email Us",
    value: "info@pawradise.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+254 712 345 678",
  },
  {
    icon: MapPin,
    label: "Our Location",
    value: "Nairobi, Kenya",
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", msg: "Message sent successfully!" });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          msg: data?.errors?.[0]?.msg || data?.error || "Something went wrong",
        });
      }
    } catch (error) {
      setStatus({ type: "error", msg: "Network error, please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f7ecd0] pt-32 pb-20 px-6 md:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "auto 100%",
          backgroundPosition: "100% 0%",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #f7ecd0 0%, #f7ecd0 55%, rgba(247,236,208,0) 82%)",
        }}
      />
      <div className="pointer-events-none select-none absolute inset-0 bg-[#f7ecd0]/70" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="font-heading text-5xl md:text-6xl text-black mb-3">Contact Us</h1>
        <div className="w-16 h-1 bg-orange-500 mb-4"></div>
        <p className="text-gray-700 text-lg max-w-xl mb-16">
          We'd love to hear from you! Fill in the form below and our team will get back to
          you as soon as possible.
        </p>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-2">
            <h2 className="font-heading text-2xl text-black mb-6">Get In Touch</h2>
            <div className="space-y-6">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading text-black">{item.label}</p>
                      <p className="text-gray-700">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-white/70 border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-white/70 border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full bg-white/70 border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-4 rounded-full shadow transition"
            >
              {loading ? "Sending..." : "Submit"}
            </button>

            {status && (
              <p
                className={`text-sm ${
                  status.type === "success" ? "text-green-700" : "text-red-600"
                }`}
              >
                {status.msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
