import heroImage from "../components/black women with dogs.jpg";
import founderImage from "../components/ceo.jpg";
import teamImage1 from "../components/gallery6.jpg";
import teamImage2 from "../components/eventc2.jpg";
import teamImage3 from "../components/gallery5.jpg";

const team = [
  {
    name: "Sarah Kimani",
    role: "Event Coordinator",
    image: teamImage1,
  },
  {
    name: "Nelson Ndung'u",
    role: "Dog Trainer",
    image: teamImage2,
  },
  {
    name: "Amara Atieno",
    role: "Community Lead",
    image: teamImage3,
  },
];

const About = () => {
  return (
    <div className="bg-[#f7ecd0]">
      {/* Our Story */}
      <section className="relative overflow-hidden pt-32 pb-16 px-6 md:px-16">
        <div className="absolute top-8 left-6 text-4xl text-orange-300 opacity-60 rotate-12 select-none">
          🐾
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
          <div className="hidden md:block md:col-span-1">
            <ul className="space-y-3 mt-24 text-gray-800 font-medium">
              <li><a href="#our-story" className="hover:text-orange-500 transition">Our Story</a></li>
              <li><a href="#founder" className="hover:text-orange-500 transition">Meet the Founder</a></li>
              <li><a href="#team" className="hover:text-orange-500 transition">The Team</a></li>
            </ul>
          </div>

          <div id="our-story" className="md:col-span-3">
            <h1 className="font-heading text-5xl text-black mb-3">Our Story</h1>
            <div className="w-16 h-1 bg-orange-500 mb-4"></div>
            <h2 className="font-heading text-2xl md:text-3xl text-orange-500 mb-6">
              Built by dog people, for dog people.
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Pawradise was born out of a simple yet powerful dream — to create a place where dogs aren't just pets, but celebrated members of the family.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Our journey began with a single community dog walk. What started as a small gathering quickly grew into a vibrant community of dog lovers who shared more than just leashes and treats — we shared stories, laughter, and unconditional love. We believe every dog deserves joy, safety, and belonging. From playful puppy meetups to heartwarming adoption drives and thoughtful training sessions, every event is crafted with care and compassion.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Pawradise is more than just events — it's a movement. A place where tails wag freely, friendships bloom, and humans learn to see the world through their dog's eyes: full of wonder, loyalty, and love.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12">
          <img
            src={heroImage}
            alt="Pawradise community members with their dogs at an event"
            className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Meet the Founder */}
      <section id="founder" className="py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative px-4">
            <span className="text-7xl text-orange-400 font-serif leading-none select-none">“</span>
            <blockquote className="text-lg md:text-xl text-black font-medium leading-relaxed -mt-6">
              When I started Pawradise, I just wanted a place where my dog could play without fear and meet other pups. But what I found was so much more — a family of people who care deeply for their furry friends and each other. Thank you for being part of this journey.
            </blockquote>
            <div className="flex justify-end">
              <span className="text-7xl text-orange-400 font-serif leading-none select-none">”</span>
            </div>
            <p className="text-center font-semibold text-black -mt-4">Jane Gathu - Founder</p>
          </div>

          <div className="flex justify-center">
            <img
              src={founderImage}
              alt="Jane Gathu, Founder of Pawradise"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>
      </section>

      {/* The Team */}
      <section id="team" className="py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-black mb-2">The Team</h2>
          <div className="w-16 h-1 bg-orange-500 mb-6"></div>
          <p className="text-gray-700 text-lg max-w-2xl mb-10">
            Our team is made up of passionate dog lovers dedicated to creating joyful experiences for pets and their people.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="relative rounded-2xl overflow-hidden shadow-lg h-80 group"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-bold text-lg">{member.name}</p>
                  <p className="text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-orange-500 mb-4">
          Join Our Pawradise Community
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
          Be part of a vibrant community of dog lovers! Get the latest updates on upcoming events, special offers, and heartwarming paw stories delivered right to your inbox.
        </p>
        <form
          className="flex flex-col sm:flex-row justify-center gap-3 max-w-lg mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default About;
