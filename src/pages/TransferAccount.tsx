import { useEffect } from "react";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeaderSection from "@/components/HeaderSection";
import TransferForm from "@/components/pages/transferAccount/TransferForm";

const TransferAccount = () => {
  useEffect(() => {
    document.title = "Formulir Transfer IB Trading ke FX Payout | FX Payout";
  }, []);

  return (
    <div className="font-inter">
      <Navbar active="layanan" />
      <main>
        <div className="bg-[#F9F9F9] pb-10">
          <HeaderSection 
            icon="/transfer-ib.svg" 
            badge="Transfer IB" 
            title="Pindahkan Akun Trading Anda ke IB fxpayout" 
            paragraph="Lengkapi formulir di bawah ini untuk melakukan Transfer IB dan menghubungkan akun trading Anda ke fxpayout." />
          <TransferForm />
        </div>
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default TransferAccount;
