import { useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeaderSection from "@/components/HeaderSection";
import CtaSection from "@/components/CtaSection";
import Table from "@/components/TableLayout";
import { useParams } from "react-router-dom";
import { brokers } from "@/utils/dataBroker/brokers";
import NotFound from "./NotFound";

type Schedule = {
  category: string;
  schedule: string;
}

const scheduleItems: Schedule[] = [
  {
    category: "Laporan Rebate Muncul di Sistem",
    schedule: "Harian: Sehari setelah penutupan order, yaitu dari pukul 00.00 hingga 16.59 UTC (GMT+0).",
  },
  {
    category: "Rebate Dikreditkan ke Saldo Rebate",
    schedule: "Harian: Sehari setelah penutupan order, yaitu dari pukul 00.00 hingga 16.59 UTC (GMT+0).",
  },
  {
    category: "AutoRebate ke Akun Trading atau Dompet Broker",
    schedule: "Fitur tidak tersedia.",
  },
  {
    category: "AutoRebate dari Saldo Rebate ke Bank / E-Currency",
    schedule: "Mingguan: Setiap Senin hingga Rabu pukul 16.59 UTC (GMT+0), jika batas minimum pembayaran telah tercapai.",
  },
]

const SchedulePage = () => {
  const { brokerId } = useParams();
  const broker = brokers[brokerId as keyof typeof brokers];
  
  useEffect(() => {
    if (broker) {
      document.title = `Cek Jadwal Rutin Rebate ${broker.name} Terbaru | FX Payout`;
    } else {
      document.title = "Broker Tidak Ditemukan | FX Payout";
    }
  }, [broker]);

  if (!broker) {
    return <NotFound />
  }

  return (
    <div className="font-inter">
      <Navbar active="Klaim Rebate" />
      <main>
        <HeaderSection 
          icon="/calendar-icon.svg" 
          badge="JADWAL REBATE BROKER" 
          title="JADWAL REBATE" 
          titleHighlight={broker.name.toUpperCase()}
          paragraph={`Berikut adalah jadwal rebate ${broker.name} dalam kondisi normal. Jadwal rebate dapat mengalami keterlambatan dalam kondisi tertentu, seperti masalah server, pemeliharaan sistem, gangguan pada sistem pembayaran, dan keterlambatan data rebate dari broker.`} />
        <section className="px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 mt-10 lg:mt-8 2xl:mt-10">
          <Table>
            <Table.Heading>
              <Table.HeadingItem>
                Kategori
              </Table.HeadingItem>
              <Table.HeadingItem>
                Jadwal Rebate
              </Table.HeadingItem>
            </Table.Heading>
  
            <Table.Body>
              {scheduleItems.map((row, rowIdx) => (
                <Table.Row key={rowIdx}>
                  <Table.Cell rowIndex={rowIdx}>
                    {row.category}
                  </Table.Cell>
                  <Table.Cell rowIndex={rowIdx}>
                    {row.schedule}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </section>
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default SchedulePage;
