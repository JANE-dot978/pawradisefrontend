import React from 'react';
import image from "../components/logo.jpg";
const Contact =() =>{
    return(
        <div>
        <section id="contact" className="py-16 bg-pink-50">
  <div className="max-w-6xl mx-auto px-4">
    
    {/* Logo + Heading */}
    <div className="flex flex-col items-center mb-8 pt-24">
      <img
        src={image}
        alt="Pawradise logo"
        className="rounded-xl shadow-lg max-h-[300px] object-contain mb-4"
      />
      <h2 className="text-7xl font-bold text-black text-center">
        Contact Pawradise
      </h2>
      <p className="text-black text-center max-w-lg text-2xl">
        We'd love to hear from you! Fill in the form below and our team will get back to you 
        as soon as possible.
      </p>
    </div>

    {/* Form + Contact Info */}
    <div className="grid md:grid-cols-2 gap-8">
      
      {/* Contact Form */}
      <form className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-pink-700 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
        >
          Send Message
        </button>
      </form>

      {/* Contact Info */}
      <div className="flex flex-col justify-center space-y-4 text-black text-xl">
        <p className="text-2xl">📍 Nairobi, Kenya</p>
        <p className="text-2xl">📧 contact@pawradise.com</p>
        <p className="text-2xl">📞 +254 700 123 456</p>
      </div>

    </div>
  </div>
</section>

        </div>
    )
};
export default Contact;