// import React from "react";
import NavBar from "../components/nav/NavBar";
import Hero from "../components/hero/Hero";
import Features from "../components/features/features";
import Testimonials from "../components/testimonials/Testimonials";
import Footer from "../components/footer/Footer";
import Chat from "../components/Chat";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Chat />
      </main>
      <Footer />
    </div>
  );
}
