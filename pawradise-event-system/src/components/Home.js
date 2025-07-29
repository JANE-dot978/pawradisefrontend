import React from "react";
import video from "../components/dog show.mp4";
import myImage from "../components/ceo.jpg"; // Add your image

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
          <button className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300">
            Explore Events
          </button>
        </div>
      </div>

      {/* ABOUT Section: Visible below the video */}
<div className="bg-white text-gray-800 py-12 px-6 md:px-20 flex flex-col md:flex-row items-center md:items-start md:gap-4 mx-auto">
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

    </div>
  );
};

export default Home;
