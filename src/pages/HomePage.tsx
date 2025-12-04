import { useEffect } from "react";
import Benefits from "../components/Benefits";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
import HeroHome from "../components/HeroHome";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import Reviews from "../components/Reviews";
import Rewards from "../components/Rewards";

const HomePage = () => {
  useEffect(() => {
    document.title = "Rebate FX";
  }, []);

  return (
    <div className="font-inter">
      <Navbar active="home" />
      <HeroHome />
      <Benefits />
      <HowItWorks />
      <Rewards />
      <Reviews />
      <Profile />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default HomePage;
