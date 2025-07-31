import React from "react";
import { Link } from "react-router-dom";
import video from "../components/dog show.mp4";
import myImage from "../components/ceo.jpg"; // Add your image
import Image from "../components/mandog.jpg";
import Image1 from "../components/mandogsss.webp";
import Image2 from "../components/womandog.jpg";
import Image3 from "../components/black women with dogs.jpg";
import Imagea from "../components/gallery1.jpg";
import Imageb from "../components/gallery2.jpg";
import Imagec from "../components/gallery3.jpg";
import Imaged from "../components/gallery4.jpg";
import Imagee from "../components/gallery5.jpg";
import Imagef from "../components/gallery6.jpg";
import Imageg from "../components/gallery7.jpg";
import Imageh from "../components/gallery 8.jpg";
import Imagei from "../components/gallery9.jpg";
import Imagej from "../components/galley10.jpeg";
import Imagek from "../components/gallery11.jpeg";
import Imagel from "../components/gallery13.jpg";
import Imagem from "../components/gallery12.jpg";
import Imagen from"../components/gallery14.jpg";
import Imageo from"../components/gallery15.jpg";



const Home = () => {
  return (
    <div className="flex flex-col">
      {/* HERO Section: Video with overlay */}
      <div className="relative h-screen w-full">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay content */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-8xl font-bold mb-4">
            Welcome to Pawradise Event System
          </h1>
          <h2 className="text-2xl md:text-6xl mb-4">
            Your Hub For Fun Dog Activities!
          </h2>
          <p className="text-lg md:text-3xl max-w-2xl">
            Explore, book, and enjoy fun dog-friendly events with our trusted platform.
          </p>
          <br />
          <button className="mt-6 bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300">
            Explore Events
          </button>
        </div>
      </div>

      {/* ABOUT Section: Visible below the video */}
<div className="bg-pink-50 text-gray-800 py-12 px-6 md:px-20 flex flex-col md:flex-row items-center md:items-start md:gap-4 mx-auto">
  <img
    src={myImage}
    alt="You holding a dog at an event"
    className="w-64 md:w-[700px] rounded-lg shadow-lg object-cover"
  />
  <div className="md:ml-6 mt-6 md:mt-0 max-w-xl">
    <h2 className="text-6xl font-extrabold mb-6">About Me</h2>
   <p className="text-2xl leading-relaxed">
      Hi! I'm the founder of <strong>Pawradise Event System</strong>, and a passionate dog lover who's always believed that dogs deserve just as much joy, connection, and community as we do. My journey started at a local dog show, where I saw the excitement and happiness dogs experienced when socializing and showing off their unique personalities.
      <br /><br />
      I created this platform to make it easier for dog owners to find and join fun events like dog festivals, training camps, adoption drives, and pet playdates. Whether you're a first-time dog parent or a seasoned trainer, Pawradise is your one-stop destination for discovering and booking dog-friendly activities.
      <br /><br />
      I believe dogs bring people together, and every event is a chance to build lasting memories, share knowledge, and celebrate the bond we share with our furry friends.
    </p>
  </div>
</div>

{/* WHY PAWRADISE Section */}
<section className="bg-pink-50 py-12 px-6 text-center">
  <h2 className="text-5xl font-extrabold mb-8 text-black">Why Pawradise?</h2>
  <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
    <div className="bg-white p-10 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Pet-Friendly Events 🐶</h3>
      <p className="text-blue-700 text-3xl">We create safe, exciting environments where dogs can have fun and socialize.</p>
    </div>
    <div className="bg-white p-10 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Meet Dog Lovers 👩‍👩‍👦‍👦</h3>
      <p className="text-blue-700 text-3xl">Connect with a community of pet parents who love dogs just as much as you do!</p>
    </div>
    <div className="bg-white p-10 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Easy Booking📳</h3>
      <p className="text-blue-700 text-3xl">Book events in just a few clicks with our user-friendly system.</p>
    </div>
    <div className="bg-white p-10 rounded-lg shadow-lg">
  <h3 className="text-2xl font-bold mb-4">Expert Training Tips🎓</h3>
  <p className=" text-blue-700 text-3xl">
    Our platform offers access to events hosted by certified trainers and behaviorists
  </p>
</div>
<div className="bg-white p-10 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Tailored Experiences 🎯</h3>
      <p className="text-blue-700 text-3xl">Find events that match your dog’s breed, energy level, and interests for a truly personal experience</p>
    </div>
    <div className="bg-white p-10 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4"> Trusted by Dog Lovers🐾</h3>
      <p className="text-blue-700 text-3xl">Hundreds of pet owners trust Pawradise to deliver safe and joyful events every month.</p>
    </div>

  </div>
</section>
{/* TESTIMONIALS Section */}
<section className="bg-pink-50 py-16 px-6 text-center">
  <h2 className="text-5xl font-extrabold text-black mb-10">What Dog Owners Say</h2>
  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    
    {/* Testimonial 1 */}
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <img
        src={Image1}
        alt="User 1"
        className="w-20 h-20 mx-auto mb-4 rounded-full object-cover"
      />
      <h3 className="text-lg font-semibold text-gray-700">Jane M.</h3>
      <p className="text-black italic mt-2 text-2xl">
        “Pawradise helped my pup make so many new friends. The events are well organized and so much fun!”
      </p>
      <p className="mt-3 text-yellow-500">⭐⭐⭐⭐⭐</p>
    </div>

    {/* Testimonial 2 */}
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <img
       src={Image2}
        alt="User 2"
        className="w-20 h-20 mx-auto mb-4 rounded-full object-cover"
      />
      <h3 className="text-lg font-semibold text-gray-700">Brian O.</h3>
      <p className="text-black italic mt-2 text-2xl">
        “The booking system is so easy to use. I never miss a dog event anymore. Highly recommend!”
      </p>
      <p className="mt-3 text-yellow-500">⭐⭐⭐⭐</p>
    </div>

    {/* Testimonial 3 */}
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <img
       src={Image}
        alt="User 3"
        className="w-20 h-20 mx-auto mb-4 rounded-full object-cover"
      />
      <h3 className="text-lg font-semibold text-gray-700">Aisha L.</h3>
      <p className="text-black italic mt-2 text-2xl">
        “Such a brilliant idea. My dog is always excited whenever we attend Pawradise events.”
      </p>
      <p className="mt-3 text-yellow-500">⭐⭐⭐⭐⭐</p>
    </div>

  </div>
</section>
{/* CALL TO ACTION Section */}
<section className="bg-pink-50 py-16 px-6">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
    
    {/* Text content */}
    <div className="md:w-1/2">
      <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
        Ready to Treat Your Dog?
      </h2>
      <p className="text-3xl text-black mb-6">
        Join our growing Pawradise family and give your pup the adventure they deserve!
      </p>
      <Link
        to="/events"
        className="bg-blue-700 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-block"
      >
        Book Your First Event 🐶
      </Link>
    </div>

    {/* Side image */}
    <div className="md:w-1/2">
      <img
       src={Image3}
        alt="People and dogs enjoying an event"
        className="rounded-lg shadow-md w-full object-cover max-h-[400px]"
      />
    </div>
  </div>
</section>

<section className="bg-pink-50 py-16 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Moments from Pawradise 🐾</h2>
    <p className="text-gray-600 mb-10 text-2xl">
      A glimpse into our fun-filled dog events captured with wagging tails and happy faces!<br></br>
      The unforgettable momments
    </p>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <img src={Imagee} alt="Dog nd owner happy momments" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      <img src={Imageb} alt=" dogs  with owners during event" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      <img src={Imagec} alt="happy moments" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      <img src={Imaged} alt="Puppy showcasing skills" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      <img src={Imagek} alt="owners after at event" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      <img src={Imagef} alt="Dogs happy moments" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      <img src={Imageg} alt="owner with a dog and medal" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      <img src={Imagem} alt="Owner hugging a dog" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      <img src={Imagei} alt="after grooming session happy moments" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      <img src={Imagej} alt="happy moments" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      <img src={Imagea} alt="happy puppies and owners" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      <img src={Imagel} alt="kid and dog shoot session" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      <img src={Imageh} alt="dog jumping" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      <img src={Imagen} alt="moments after dog walks" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      <img src={Imageo} alt="happy dog with a kid running" className="h-48 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
    </div>
  </div>
</section>



    </div>
  );
};

export default Home;
