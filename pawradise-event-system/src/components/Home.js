import React from "react";

import video from "../components/dogs vid.mp4"; 

const Home = () => {
  return (
    <div className="video-container">
      <video autoPlay loop muted className="bg-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay-text">
        <h1>Welcome to the Dog Event System</h1>
        <p>Book events, meet pet lovers, and enjoy!</p>
      </div>
    </div>
  );
};

export default Home;
