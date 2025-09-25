// src/pages/Booking.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Booking({ event }) {
//   const navigate = useNavigate();
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleBooking = async () => {
//     const userStr = localStorage.getItem("user");
//     let user = null;
//     try { user = userStr ? JSON.parse(userStr) : null; } catch(e){ user = null; }

//     if (!user || !user.token) {
//       alert("You must register and log in before booking.");
//       navigate("/signup");
//       return;
//     }

//     if (!phone) {
//       alert("Enter Mpesa phone number (for future payment).");
//       return;
//     }

//     try {
//       setLoading(true);
//       await axios.post(
//         "http://localhost:4000/api/bookings",
//         { eventId: event._id, phone },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       alert("Booking request created. Payment will be handled soon (STK push).");
//     } catch (err) {
//       console.error(err);
//       alert("Booking failed. " + (err.response?.data?.message || ""));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border rounded bg-gray-50">
//       <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Mpesa phone (07...)" className="w-full p-2 border rounded mb-2" />
//       <button onClick={handleBooking} disabled={loading} className="w-full bg-green-600 text-white p-2 rounded">
//         {loading ? "Processing..." : "Book & Pay"}
//       </button>
//     </div>
//   );
// }
// src/pages/Booking.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Booking({ event }) {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        setIsLoggedIn(!!userData.token);
      } catch (e) {
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleBooking = async () => {
    if (!isLoggedIn) {
      alert("You must register and log in before booking.");
      navigate("/signup");
      return;
    }

    if (!phoneNumber) {
      alert("Enter Mpesa phone number (for future payment).");
      return;
    }

    if (!phoneNumber.match(/^07\d{8}$/)) {
      alert("Please enter a valid Mpesa phone number (07xxxxxxxx).");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:4000/api/bookings",
        { 
          eventId: event._id, 
          phoneNumber,
          ticketCount,
          amount: event.price * ticketCount
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert(`Booking request for ${ticketCount} ticket(s) created. Payment will be handled soon (STK push).`);
    } catch (err) {
      console.error(err);
      alert("Booking failed. " + (err.response?.data?.message || ""));
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: "booking", eventId: event._id } });
  };

  const handleSignupRedirect = () => {
    navigate("/signup", { state: { from: "booking", eventId: event._id } });
  };

  // Calculate total amount
  const amount = event.price * ticketCount;

  if (!isLoggedIn) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Book Tickets</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
          <p className="text-yellow-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-9a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            You need to login or register to book tickets
          </p>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Number of Tickets</label>
          <select 
            value={ticketCount} 
            onChange={(e) => setTicketCount(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled
          >
            {[...Array(10)].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1} ticket(s)</option>
            ))}
          </select>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Price per ticket:</span>
            <span className="font-medium">KSh {event.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Number of tickets:</span>
            <span className="font-medium">{ticketCount}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="text-gray-800 font-semibold">Total amount:</span>
            <span className="text-blue-600 font-bold">KSh {amount.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={handleLoginRedirect}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Login to Book
          </button>
          <button 
            onClick={handleSignupRedirect}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Book Tickets</h3>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">Number of Tickets</label>
        <select 
          value={ticketCount} 
          onChange={(e) => setTicketCount(parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i+1} value={i+1}>{i+1} ticket(s)</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">M-Pesa Phone Number</label>
        <input 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          placeholder="07xxxxxxxx" 
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">Enter your M-Pesa number to receive payment request</p>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Price per ticket:</span>
          <span className="font-medium">KSh {event.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Number of tickets:</span>
          <span className="font-medium">{ticketCount}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-200">
          <span className="text-gray-800 font-semibold">Total amount:</span>
          <span className="text-blue-600 font-bold">KSh {amount.toLocaleString()}</span>
        </div>
      </div>
      
      <button 
        onClick={handleBooking} 
        disabled={loading || !phoneNumber}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        ) : `Pay KSh ${amount.toLocaleString()}`}
      </button>
    </div>
  );
}