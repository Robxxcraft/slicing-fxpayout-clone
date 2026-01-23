import { useEffect, useState } from "react";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeaderSection from "@/components/HeaderSection";
import ValidationForm from "@/components/pages/validationPage/ValidationForm";
import TermValidation from "@/components/pages/validationPage/TermValidation";

const ValidationPage = () => {
  const [showNotify, setShowNotify] = useState<boolean>(true);
  
  useEffect(() => {
    document.title = "Trading Lebih Untung Rebate Hingga 90% | FX Payout";
  }, []);

  return (
    <div className="font-inter">
      <Navbar active="layanan" />
      <main>
        <div className="bg-[#F9F9F9] pb-10">
          <HeaderSection 
            icon="/check-white.svg" 
            badge="VALIDASI AKUN TRADING" 
            title="Verifikasi Akun Trading untuk Mulai Mendapatkan Rebate" 
            paragraph="Lengkapi formulir validasi di bawah ini untuk menghubungkan akun trading Anda dengan fxpayout dan mulai menerima rebate secara otomatis." />
          <ValidationForm />
        </div>
        {showNotify && <TermValidation setShowNotify={setShowNotify}/> }
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default ValidationPage;
