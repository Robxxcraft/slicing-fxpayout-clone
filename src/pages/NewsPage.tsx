import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeaderNews from "@/components/pages/newsPage/HeaderNews";
import HeroNews from "@/components/pages/newsPage/HeroNews";
import CategorySection from "@/components/pages/newsPage/CategorySection";
import SubscribeNews from "@/components/pages/newsPage/SubscribeNews";
import MainNews from "@/components/pages/newsPage/MainNews";

const NewsPage = () => {
  return (
    <div className="font-inter">
      <title>News</title>
      <Navbar active="news" />
      <main>
        <HeaderNews />
        <HeroNews />
        <CategorySection />
        <MainNews />
        <SubscribeNews />
      </main>
      <Footer />
    </div>
  )
}

export default NewsPage;
