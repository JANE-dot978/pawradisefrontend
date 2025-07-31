// import react from "react";
import { Link } from "react-router-dom";
import image from "../components/many dogs.jpg";
// import image1 from "../components/shiku.jpg";
import image2 from "../components/dogwalks.webp";

const About = ()=>{
    return (
        <div>
<section className="bg-pink-50 from-pink-100 via-white to-pink-100 pt-32 pb-16 px-6">
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

<section className="bg-pink-50 py-20 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    
    {/* Image Part */}
    <div className="flex justify-center">
      <img
        src={image2}
        alt="Dogs playing happily"
        className="rounded-xl shadow-lg object-cover w-full h-[400px] md:h-[500px] lg:h-[600px]"
      />
    </div>

    {/* Text Content */}
    <div>
      <h2 className="text-4xl md:text-7xl font-bold text-black mb-6 text-center md:text-left">Our Story 🐶❤️</h2>
      <p className="text-lg md:text-xl text-black leading-relaxed mb-6">
        Pawradise was born out of a simple yet powerful dream — to create a place where dogs aren't just pets, but celebrated members of the family.
        <br /><br />
        Our journey began with a single community dog walk. What started as a small gathering quickly grew into a vibrant community of dog lovers who shared more than just leashes and treats — we shared stories, laughter, and unconditional love.
        <br /><br />
        We believe every dog deserves joy, safety, and belonging. From playful puppy meetups to heartwarming adoption drives and thoughtful training sessions, every event is crafted with care and compassion.
        <br /><br />
        Pawradise is more than just events — it's a movement. A place where tails wag freely, friendships bloom, and humans learn to see the world through their dog’s eyes: full of wonder, loyalty, and love.
      </p>

      {/* Founder’s Note */}
      <div className="bg-white border-l-4 border-pink-400 p-4 shadow rounded">
        <p className="italic text-gray-600">
          "When I started Pawradise, I just wanted a place where my dog could play without fear and meet other pups. But what I found was so much more — a family of people who care deeply for their furry friends and each other. Thank you for being part of this journey."
        </p>
        <p className="mt-2 font-semibold text-pink-600">— Founder, Pawradise</p>
      </div>
    </div>

  </div>
</section>

<section className="bg-pink-50 py-20 px-6">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl md:text-6xl font-bold text-black mb-4">What We Do</h2>
    <p className="text-3xl text-black max-w-4xl mx-auto mb-12">
      At Pawradise, we believe every dog deserves joy, adventure, and love. From exciting events to bonding activities, here's what we do to make tails wag!
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {/* Card 1 */}
      <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
        <div className="text-5xl mb-4">🐕</div>
        <h3 className="text-3xl font-semibold mb-2 text-black">Dog Meetups</h3>
        <p className="text-black text-2xl">Fun social gatherings where dogs (and their humans!) meet, play, and make new furry friends.</p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
        <div className="text-5xl mb-4">🎓</div>
        <h3 className="text-3xl font-semibold mb-2 text-black">Training Sessions</h3>
        <p className="text-black text-2xl">Group classes designed to build trust, improve behavior, and strengthen your bond.</p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-3xl font-semibold mb-2 text-black">Themed Events</h3>
        <p className="text-black text-2xl">From doggy birthdays to costume parades, we celebrate every moment with style and joy.</p>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
        <div className="text-5xl mb-4">🏞️</div>
        <h3 className="text-3xl font-semibold mb-2 text-black">Outdoor Adventures</h3>
        <p className="text-black text-2xl">Join us for walks, hikes, and exciting outdoor explorations tailored to active pups.</p>
      </div>
    </div>

    {/* CTA Button */}
    <div className="mt-12">
      <Link
        to="/events"
        className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow transition duration-300"
      >
        Explore Upcoming Events
      </Link>
    </div>
  </div>
</section>


</div>

    )
};
export default About;