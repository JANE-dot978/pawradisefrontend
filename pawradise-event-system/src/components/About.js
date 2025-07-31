// import react from "react";
import { Link } from "react-router-dom";
import image from "../components/many dogs.jpg";

const About = ()=>{
    return (
        <div>
<section className="bg-white from-pink-100 via-white to-pink-100 pt-32 pb-16 px-6">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
    
    {/* Text content */}
    <div className="text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
        Welcome to Pawradise 🐾
      </h1>
      <p className="text-3xl text-gray-600 mb-6">
        We bring dogs and their humans together through fun, safe, and exciting events. Whether it’s playtime, training, or meetups, Pawradise is where every pup belongs!
      </p>
      <Link
        to="/events"
        className="inline-block bg-blue-700 hover:bg-blue-400 text-white font-semibold py-3 px-6 rounded-full shadow transition duration-300"
      >
        See Upcoming Events
      </Link>
    </div>

    {/* Image content */}
    <div className="flex justify-center">
      <img
        src= {image}
        alt="Happy dog at an event"
        className="rounded-xl shadow-lg max-h-[600px] object-cover"
      />
    </div>

  </div>
</section>
</div>

    )
};
export default About;