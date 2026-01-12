import { useEffect } from "react";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Benefits from "@/components/pages/homePage/Benefits";
import HeroHome from "@/components/pages/homePage/HeroHome";
import HowItWorks from "@/components/pages/homePage/HowItWorks";
import Profile from "@/components/pages/homePage/Profile";
import Reviews from "@/components/pages/homePage/Reviews";
import Rewards from "@/components/pages/homePage/Rewards";

const HomePage = () => {
  useEffect(() => {
    document.title = "FX Payout";
  }, []);

  return (
    <div className="font-inter">
      <Navbar active="home" />
      <main>
        <HeroHome />
        <Benefits />
        <HowItWorks />
        <Rewards />
        <Reviews />
        <Profile />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
