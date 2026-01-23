import { useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeaderSection from "@/components/HeaderSection";
import CtaSection from "@/components/CtaSection";
import CalculatorSection from "@/components/pages/calculatorPage/CalculatorSection";

const CalculatorPage = () => {
  useEffect(() => {
    document.title = "Trading Lebih Untung Rebate Hingga 90% | FX Payout";
  }, []);

  return (
    <div className="font-inter">
      <Navbar active="kalkulator" />
      <main>
        <HeaderSection 
            icon="/kalkulator-icon.svg" 
            badge="KALKULATOR REBATE FXPAYOUT" 
            title="Hitung Estimasi Rebate Trading Anda Sekarang" 
            paragraph="Masukkan broker, tipe akun, dan total lot trading Anda untuk mengetahui estimasi rebate yang bisa Anda dapatkan setiap bulan cepat, transparan, dan tanpa biaya." />
        <CalculatorSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default CalculatorPage;
