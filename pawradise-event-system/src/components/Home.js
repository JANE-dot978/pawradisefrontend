import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  CalendarCheck,
  PawPrint,
  Users,
  ShieldCheck,
  Compass,
  ArrowRight,
  Star,
  Ticket,
  Info,
} from "lucide-react";

import heroImage from "../components/dogwalks.webp";
import whyChooseImage from "../components/womandog.jpg";
import ctaImage from "../components/gallery15.jpg";

import pic1 from "../components/pic1.webp";
import pic2 from "../components/pic2.jpg";
import pic3 from "../components/pic3.jpg";
import pic4 from "../components/pic4.jpeg";

import avatar1 from "../components/mandog.jpg";
import avatar2 from "../components/gallery12.jpg";
import avatar3 from "../components/shiku.jpg";

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
import Imagen from "../components/gallery14.jpg";
import Imageo from "../components/gallery15.jpg";

const NEXT_EVENT_DATE = new Date("2026-09-12T09:00:00");

const events = [
  {
    image: pic4,
    title: "Dog Training Workshop",
    description: "Learn tips and tricks from top trainers.",
    date: "22nd Aug 2026",
    location: "Karura Forest, Nairobi",
    price: "KES 1,500",
  },
  {
    image: pic3,
    title: "Pet Festival",
    description: "A fun day out for pets and owners.",
    date: "5th Sep 2026",
    location: "Uhuru Gardens, Nairobi",
    price: "KES 2,000",
  },
  {
    image: pic2,
    title: "Dog Agility Competition",
    description: "Watch dogs show off their skills!",
    date: "19th Sep 2026",
    location: "Ngong Racecourse, Nairobi",
    price: "KES 2,500",
  },
  {
    image: pic1,
    title: "Charity Dog Walk",
    description: "Walk with your furry friends for a cause.",
    date: "3rd Oct 2026",
    location: "Karura Forest, Nairobi",
    price: "KES 1,000",
  },
];

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Discover",
    subtitle: "Find Your Adventure",
    description:
      "Browse dog-friendly events near you, from hikes and agility challenges to social meetups and outdoor adventures.",
  },
  {
    step: "02",
    icon: CalendarCheck,
    title: "Book",
    subtitle: "Save your spot",
    description:
      "Choose an event, check the details, and book your place quickly and securely.",
  },
  {
    step: "03",
    icon: PawPrint,
    title: "Enjoy",
    subtitle: "Make Memories Together",
    description:
      "Show up, meet fellow dog lovers, and enjoy an unforgettable experience with your best friend.",
  },
];

const benefits = [
  {
    icon: Users,
    title: "Community",
    description:
      "Connect with fellow dog lovers, share stories, and build friendships that outlast the event.",
  },
  {
    icon: ShieldCheck,
    title: "Safety",
    description:
      "Every event runs in supervised, dog-friendly spaces so you can relax and let them off the leash.",
  },
  {
    icon: Compass,
    title: "Adventure",
    description:
      "From hikes to pool days, discover new experiences your dog will drag you back to again and again.",
  },
];

const testimonials = [
  {
    avatar: avatar1,
    quote:
      "Pawradise completely changed our weekends. Biscuit gets so excited when I grab his leash now — he knows we're going somewhere amazing.",
    name: "Jane M.",
    meta: "Golden Retriever Mum · Nairobi",
    rating: 5,
  },
  {
    avatar: avatar2,
    quote:
      "The booking system is so easy to use. I never miss a dog event anymore. Highly recommend Pawradise to every dog owner I know!",
    name: "Brian O.",
    meta: "Husky Dad · Nairobi",
    rating: 4,
  },
  {
    avatar: avatar3,
    quote:
      "Such a brilliant idea. My dog is always excited whenever we attend Pawradise events — the community is the best part.",
    name: "Aisha L.",
    meta: "Shepherd Mum · Nairobi",
    rating: 5,
  },
];

const galleryImages = [
  { src: Imagee, alt: "Dog and owner happy moments" },
  { src: Imageb, alt: "Dogs with owners during event" },
  { src: Imagec, alt: "Friends and dogs together" },
  { src: Imaged, alt: "Dog jumping for a ball" },
  { src: Imagek, alt: "Owners with dogs at an event" },
  { src: Imagef, alt: "Dogs happy moments" },
  { src: Imageg, alt: "Owner with a dog and trophy" },
  { src: Imagem, alt: "Owner holding a small dog" },
  { src: Imagei, alt: "Team with shelter dogs" },
  { src: Imagej, alt: "Group event with dogs" },
  { src: Imagea, alt: "Group of friends with dogs" },
  { src: Imagel, alt: "Studio dog photoshoot" },
  { src: Imageh, alt: "Dog leaping over an obstacle" },
  { src: Imagen, alt: "Moments after a dog walk" },
  { src: Imageo, alt: "Child running with a dog" },
];

const getTimeRemaining = () => {
  const diff = Math.max(0, NEXT_EVENT_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const Home = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  const countdownUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative min-h-[600px] flex items-center px-6 md:px-16 py-24">
        <img
          src={heroImage}
          alt="Dogs and their humans enjoying an outdoor event"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-3 gap-10 items-center">
          <div className="md:col-span-2 text-white">
            <span className="inline-flex items-center gap-2 bg-white/90 text-gray-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              📅 12 SEP 2026 · NAIROBI
            </span>
            <h1 className="font-heading text-5xl md:text-6xl text-orange-400 mb-4">
              Dog's Park Day
            </h1>
            <p className="text-lg md:text-xl max-w-xl mb-8 text-white/90">
              A day of play, socializing and outdoor fun for dogs and their humans.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow transition"
              >
                <Ticket size={18} /> Book Your Spot
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-gray-900 transition"
              >
                <Info size={18} /> View Details
              </Link>
            </div>
            <p className="text-sm text-white/80">All breeds welcome • Safe play zones</p>
          </div>

          <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-white">
            <p className="text-xs uppercase tracking-wide text-white/80 mb-3 text-center">
              Next adventure starts in
            </p>
            <div className="grid grid-cols-4 gap-2 text-center">
              {countdownUnits.map((unit) => (
                <div key={unit.label}>
                  <p className="text-2xl md:text-3xl font-heading text-orange-400">
                    {String(unit.value).padStart(2, "0")}
                  </p>
                  <p className="text-[10px] uppercase text-white/70">{unit.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-black mb-2">
                Upcoming Events
              </h2>
              <div className="w-16 h-1 bg-orange-500 mb-2"></div>
              <p className="text-gray-600">More Adventures await</p>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-1 text-orange-500 font-semibold hover:text-orange-600 transition"
            >
              Explore All Events <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event) => (
              <div
                key={event.title}
                className="bg-[#f7ecd0] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-heading text-xl text-black mb-2">{event.title}</h3>
                  <p className="text-gray-700 text-sm mb-4">{event.description}</p>
                  <p className="text-sm font-semibold text-black">{event.date}</p>
                  <p className="text-sm text-gray-600 mb-1">{event.location}</p>
                  <p className="text-sm font-semibold text-orange-600 mb-4">{event.price}</p>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-1 border border-orange-400 text-orange-600 hover:bg-orange-500 hover:text-white transition rounded-full px-4 py-1.5 text-sm font-medium"
                  >
                    View Event <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#f7ecd0] py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-black mb-2">How It Works</h2>
          <div className="w-16 h-1 bg-orange-500 mb-3"></div>
          <p className="text-gray-700 mb-12">From Discovery to Tail-Wagging Adventures</p>

          <div className="space-y-12">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const reversed = index % 2 === 1;
              return (
                <div
                  key={item.step}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    reversed ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`flex-1 ${reversed ? "md:text-right" : ""}`}>
                    <h3 className="font-heading text-2xl text-black mb-1">{item.title}</h3>
                    <p className="text-orange-600 font-semibold mb-2">{item.subtitle}</p>
                    <p className="text-gray-700 max-w-sm md:ml-auto">
                      {reversed ? item.description : item.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-xs uppercase text-gray-500">Step</span>
                    <span className="font-heading text-3xl text-orange-500">{item.step}</span>
                  </div>

                  <div className="flex-1 flex justify-center">
                    <div className="w-28 h-28 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
                      <Icon size={44} className="text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE PAWRADISE */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl text-black mb-2">
              Why Choose Pawradise
            </h2>
            <div className="w-16 h-1 bg-orange-500 mb-3"></div>
            <p className="text-gray-600 mb-10">More Adventures. More Wagging. More Memories.</p>

            <h3 className="font-heading text-2xl md:text-3xl text-orange-500 mb-4">
              Everything Your Dog Loves, In One Place.
            </h3>
            <p className="text-gray-700">
              We built Pawradise because great dog experiences deserve more than a Facebook
              group and crossed fingers. Here's what makes us different.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <img
              src={whyChooseImage}
              alt="A Pawradise community member with her dog"
              className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover shadow-xl shrink-0"
            />
            <div className="flex flex-col gap-4 w-full">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-4 bg-[#f7ecd0] rounded-2xl p-4 shadow-md"
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading text-black mb-1">{benefit.title}</p>
                      <p className="text-sm text-gray-700">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#f7ecd0] py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-black mb-2">Testimonials</h2>
          <div className="w-16 h-1 bg-orange-500 mb-3"></div>
          <p className="text-gray-700 mb-12">Good Times. Happy Dogs. Happy Owners.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-3xl rounded-tl-none p-6 shadow-md"
              >
                <div className="flex items-center gap-1 text-orange-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-gray-800 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-heading text-sm text-black">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-black mb-2">Gallery</h2>
          <div className="w-16 h-1 bg-orange-500 mb-10"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className="h-48 w-full object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative py-24 px-6 text-center">
        <img
          src={ctaImage}
          alt="Happy dog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-orange-400 mb-4">
            Ready to Treat Your Dog?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Don't let another weekend go by without a tail-wagging story to tell. Thousands of
            dogs and their humans are already exploring.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow transition"
          >
            Explore Events <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
