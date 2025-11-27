type Benefit = {
  icon: string;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    icon: "trader.png",
    title: "Rebate 80% untuk trader",
    description: "Dapatkan Cashback terbesar setiap lot",
  },
  {
    icon: "wallet.png",
    title: "Pembayaran mingguan atau on-demand",
    description: "Nikmati Cair cepat via bank lokal/e-wallet.",
  },
  {
    icon: "dashboard.png",
    title: "Dashboard monitoring real-time",
    description: "Pantau Riwayat rebate secara lengkap.",
  },
  {
    icon: "support.png",
    title: "Support lokal WhatsApp & Telegram",
    description: "Dilengkapi Support dengan respon cepat",
  },
];

const Benefits = () => {
  return (
    <section className="relative">
      <div className="px-56 absolute top-1/2 -translate-y-1/2">
        <div className="flex gap-4 w-fit">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="p-5 w-full max-w-[460px] rounded-2xl bg-white border border-[rgba(34,34,34,0.1)] shadow-[0_4px_41.8px_0_rgba(0,0,0,0.1)]">
              <div className="mb-3 flex gap-3 items-center">
                <img src={`/${item.icon}`} alt={`icon ${item.title}`} />
                <p className="text-lg font-semibold leading-7">{item.title}</p>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
