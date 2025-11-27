import Benefits from "../components/Benefits";
import HeroHome from "../components/HeroHome";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div className="font-inter">
      <Navbar active="home" />
      <HeroHome />
      <Benefits />
    </div>
  );
};

export default HomePage;
