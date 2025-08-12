
import { Link } from "react-router-dom";
import image from "../components/many dogs.jpg"
import image2 from "../components/dogwalks.webp";
import image3 from "../components/founder.jpg";
import image4 from "../components/eventc.jpg";
import image5 from "../components/eventc2.jpg";
import image6 from "../components/dogtoys.jpg";
import image7 from "../components/dogsplaying.jpg";
import image8 from "../components/doggrooming.png";
import image9 from "../components/behind.jpg";
import image10 from "../components/dogsetup.jpg";
import image11 from "../components/dogoos.webp";


const About = ()=>{
    return (
        <div>
<section className="bg-pink-50 from-pink-100 via-white to-pink-100 pt-32 pb-16 px-6">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
    
  
    <div className="text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
        Welcome to Pawradise 🐾
      </h1>
      <p className="text-3xl text-gray-600 mb-6">
        We bring dogs and their humans together through fun, safe, and exciting events. Whether it’s playtime, training, or meetups, Pawradise is where every pup belongs!
      </p>
      <Link
        to="/events"
        className="inline-block bg-pink-600 hover:bg-pink-400 text-white font-semibold py-3 px-6 rounded-full shadow transition duration-300"
      >
        See Upcoming Events
      </Link>
    </div>

  
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
    
  
    <div className="flex justify-center">
      <img
        src={image2}
        alt="Dogs playing happily"
        className="rounded-xl shadow-lg object-cover w-full h-[400px] md:h-[500px] lg:h-[600px]"
      />
    </div>


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
      
      <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
        <div className="text-5xl mb-4">🐕</div>
        <h3 className="text-3xl font-semibold mb-2 text-black">Dog Meetups</h3>
        <p className="text-black text-2xl">Fun social gatherings where dogs (and their humans!) meet, play, and make new furry friends.</p>
      </div>

      
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

<section className="bg-pink-50 py-16 px-6">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-5xl font-bold text-gray-800 mb-4">Meet the Team 🐶</h2>
    <p className="text-3xl text-gray-600 mb-10">
      Our team is made up of passionate dog lovers dedicated to creating joyful experiences for pets and their people.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {/* Team Member 1 */}
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
        <img
          src={image3}
          alt="Founder"
          className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
        />
        <h3 className="text-3xl font-semibold text-gray-800">Jane Wanjiku</h3>
        <p className="text-pink-600 font-medium text-2xl">Founder & Dog Mom</p>
        <p className="text-gray-600 mt-2 text-2xl">
          "Bringing dogs and people together is my life's joy."
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
        <img
          src={image4}
          alt="Event Planner"
          className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
        />
        <h3 className="text-3xl font-semibold text-gray-800">Nelson Ndung'u</h3>
        <p className="text-pink-600 font-medium text-2xl">Event Coordinator</p>
        <p className="text-gray-600 mt-2 text-2xl">
          "Every tail wag and happy bark is worth the work."
        </p>
      </div>

    
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
        <img
          src={image5}
          alt="Trainer"
          className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
        />
        <h3 className="text-3xl font-semibold text-gray-800">Azaan Kiarie</h3>
        <p className="text-pink-600 font-medium text-2xl">Dog Trainer</p>
        <p className="text-gray-600 mt-2 text-2xl">
          "I help pups find confidence and fun through training!"
        </p>
      </div>
    </div>
  </div>
</section>

<section className="relative py-20 px-6 bg-pink-50">
  {/* Content wrapper */}
  <div className="relative z-10 max-w-7xl mx-auto text-center mb-12">
    <h2 className="text-5xl font-bold text-gray-800">Why Pawradise is Different 🐶</h2>
    <p className="text-gray-600 mt-4 text-3xl">
      At Pawradise, we go beyond events we create unforgettable moments between dogs and their humans 🐾❤️
    </p>
  </div>


  <div className="relative z-10 grid sm:grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
    {/* Card 1 */}
    <div className="bg-white w-full md:w-[90%] mx-auto p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-2xl font-semibold text-pink-600 mb-3">🎯 Tailored Events for Every Pup</h3>
      <p className="text-gray-600 text-2xl">
        From shy pups to energetic furballs, we design events that suit every dog’s personality and needs.
      </p>
    </div>

  
    <div className="bg-white w-full md:w-[90%] mx-auto p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-2xl font-semibold text-pink-600 mb-3">🛡️ Certified & Safe Spaces</h3>
      <p className="text-gray-600 text-2xl">
        Our venues are clean, secure, and supervised by trained staff to ensure total comfort and security.
      </p>
    </div>

  
    <div className="bg-white w-full md:w-[90%] mx-auto p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-3xl font-semibold text-pink-600 mb-3">👩‍⚕️ Trained Handlers On Site</h3>
      <p className="text-gray-600 text-2xl">
        Every dog deserves love and care — our handlers ensure every tail keeps wagging safely.
      </p>
    </div>

    {/* Card 4 */}
    <div className="bg-white w-full md:w-[90%] mx-auto p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-2xl font-semibold text-pink-600 mb-3">🎁 Surprise Treats & Giveaways</h3>
      <p className="text-gray-600 text-2xl">
        Every event features pawsome goodies, treats, and surprises that make tails wag and hearts melt!
      </p>
    </div>
  </div>

  {/* Quote */}
  <div className="relative z-10 mt-16 text-center">
    <blockquote className="italic text-2xl text-gray-700 max-w-2xl mx-auto">
      “Dogs are not our whole life, but they make our lives whole.” Roger Caras 🐾
    </blockquote>
  </div>
</section>
<section className="relative py-20 px-6 bg-white">
  <div className="relative z-10 max-w-7xl mx-auto text-center mb-12">
    <h2 className="text-5xl font-bold text-black">🐾 Behind the Scenes at Pawradise</h2>
    <p className="text-gray-600 mt-4 text-3xl">
      Peek into the pawsitive chaos, joy, and pure doggy delight that happens when the cameras aren’t rolling!
    </p>
  </div>

  {/* Gallery grid */}
  <div className="relative z-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <img
      src={image11}
      alt="Behind the scenes 1"
      className="w-full h-64 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
    />
    <img
      src={image6}
      alt="Behind the scenes 2"
      className="w-full h-64 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
    />
    <img
      src={image7}
      alt="Behind the scenes 3"
      className="w-full h-64 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
    />
    <img
      src={image8}
      alt="Behind the scenes 4"
      className="w-full h-64 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
    />
    <img
      src={image9}
      alt="Behind the scenes 5"
      className="w-full h-64 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
    />
    <img
      src={image10}
      alt="Behind the scenes 6"
      className="w-full h-64 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
    />
  </div>

  {/* CTA */}
  <div className="relative z-10 mt-12 text-center">
    <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300">
      View Full Gallery 🐶📸
    </button>
  </div>
</section>




</div>

    )
};
export default About;